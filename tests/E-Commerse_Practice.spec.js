import { test , request} from '@playwright/test';
import { LoginWithApi } from '../POM/ApiLogin';
const { RegistrationWithApis } = require ( '../POM/ApiRegisteration'); 
const { Product } = require ( '../POM/Product');
const { Checkout } = require ( '../POM/Checkout');

 test.beforeAll('Registration and Login ',async()=>{
const RegisterationAPi = new RegistrationWithApis(request);
// استلام الإيميل الناتج من التسجيل
const createdEmail = await RegisterationAPi.REGIST();
const LoginApiTest = new LoginWithApi(request);
// تمرير نفس الإيميل لتسجيل الدخول
await LoginApiTest.LoginwithUsernameandPassword(createdEmail);});


test  ('Add Product to the Cart and Checkout', async ({ browser }) => {
// 1. افتح Browser Context جديد ومرر له الـ state.json
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();

  const addProduct = new Product(page);
  const checkoutProduct = new Checkout(page);

  // 2. لما تروح للموقع دلوقتي.. هتلاقيه فاتح وهو Logged In جاهز!
  await page.goto('https://automationexercise.com/products');

  await addProduct.addProductTocart();
  await checkoutProduct.proceedTocheckOut();
  });