
let TestData1 = JSON.parse(JSON.stringify(require('../POM/TestData.json')));
let EmailAddress = Date.now() + "@test.com" ;
 for( const  Data of TestData1 ) 
{
class RegistrationWithApis{

constructor(request)
{
this.request = request ; 

}

async REGIST()
{
let apiTest= await this.request.newContext();
let RegisterationAPI = await apiTest.post('https://automationexercise.com/api/createAccount', 

{
  form :
  {
    "name":Data.name,
    "email":EmailAddress,
    "password":Data.Password  ,
    "title (for example: Mr, Mrs, Miss)":"Mr",
    "birth_date":"12",
    "birth_month":"2",
    "firstname":Data.FirstName ,
    "lastname":Data.LastName ,
    "address1":Data.Address,
    "country":"India",
    "zipcode":Data.ZipCode,
    "state":Data.State,
    "city":Data.City,
    "mobile_number":Data.MobileNumber
  },

  });

console.log("Status Code: ", RegisterationAPI.status());

return EmailAddress ; 

}}
module.exports={RegistrationWithApis};
}
