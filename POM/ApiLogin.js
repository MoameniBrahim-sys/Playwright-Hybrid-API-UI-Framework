const { test, request } = require('@playwright/test');
const TestData1 = JSON.parse(JSON.stringify(require('../POM/TestData.json')));

class LoginWithApi {
  constructor(request) {
    this.request = request;
  }

async LoginwithUsernameandPassword(EmailREg) {
  for (const Data of TestData1) {
    // 1. افتح Context
    const apiTest = await this.request.newContext();

    // 2. اعمل GET لصفحة اللوجن من نفس الـ Context
    const GetLoginData = await apiTest.get('https://automationexercise.com/login');
    const responseText = await GetLoginData.text();

    // 3. استخرج الـ Token
    const htmlCsrfToken = responseText.split('name="csrfmiddlewaretoken" value="')[1]?.split('"')[0];

    // 4. استخرج الـ Cookie الناتجة من الـ GET
    const state = await apiTest.storageState();
    const csrfCookie = state.cookies.find(c => c.name === 'csrftoken')?.value;

    // 5. ابعت الـ POST مع إضافة الـ Headers والـ Cookie في الطلب نفسه
    const LoginAction = await apiTest.post('https://automationexercise.com/login', {
      form: {
        "email": EmailREg,
        "password": Data.Password,
        "csrfmiddlewaretoken": htmlCsrfToken,
      },
      headers: {
        'Referer': 'https://automationexercise.com/login',
        'Origin': 'https://automationexercise.com',
        'Cookie': `csrftoken=${csrfCookie}`
      }
    });

    console.log(" Login Status Code:", LoginAction.status());

    // 6. احفظ الـ State في ملف عشان الـ UI
    await apiTest.storageState({ path: 'state.json' });
  }
}
}

module.exports = { LoginWithApi };