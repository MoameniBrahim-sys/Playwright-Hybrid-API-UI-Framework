
const { expect } = require('@playwright/test');
class Product {


    constructor(page){
        this.page = page ; 
this.ProductList = page.getByRole('link',{name : ' Products'});
this.SearchProduct = page.getByPlaceholder("Search Product")
this.SubmitButton = page.locator('#submit_search')
this.AddtoCartButton =  page.locator('.btn').nth(2) ; 
this.Continue_Shopping = page.getByRole('button',{name : ' Continue Shopping'});
this.OpenCartList = page.getByRole('link',{name : '  Cart'});

    }


        async addProductTocart () 
    {
await this.ProductList.click();
await this.SearchProduct.fill("T-shirts");
await this.SubmitButton.click();
await this.AddtoCartButton .click();
await expect (  this.page.locator('.modal-title')).toContainText("Added!");
await this.Continue_Shopping.click();
await this.OpenCartList.click();
    }
}
module.exports = {Product};