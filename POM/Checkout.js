const { expect } = require('@playwright/test');
class Checkout {


    constructor(page){
this.page = page ; 
this.CheckoutButton = page.getByText(/proceed to checkout/i);
this.PlaceOrderButton= page.getByText(/Place Order/i)
this.name_on_card = page.locator('[name="name_on_card"]');
this.Card_number= page.locator('[name="card_number"]');
this.cvc= page.locator('[name="cvc"]');
this.expiry_month= page.locator('[name="expiry_month"]');
this.expiry_year= page.locator('[name="expiry_year"]');
this.ConfirmCheckout= page.getByText(/Pay and Confirm Order/i);

    }


        async proceedTocheckOut () 
    {
await this.CheckoutButton.click();
await expect ( this.page.locator('.heading').nth(0)).toHaveText("Address Details");
await this.PlaceOrderButton.click();
await this.name_on_card.fill("Mohamed Axxx"); 
await this.Card_number.fill("1234532123"); 
await this.cvc.fill("630"); 
await this.expiry_month.fill("01"); 
await this.expiry_year.fill("2030"); 
await this.ConfirmCheckout.click();
await expect( this.page.locator('[data-qa="order-placed"]')).toHaveText("Order Placed!");
    }
}
module.exports = {Checkout};