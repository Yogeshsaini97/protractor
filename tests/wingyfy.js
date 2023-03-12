const { browser, element } = require("protractor");

const Login = require("../controller/Login");

describe("Login and Home Page", function () {

   //...... 1st test case.....//
  it("To verify that error message comes when we keep username and password fields empty and try to login", async function () {
  
    let username = "";
    let password = "";
    let url = "https://sakshingp.github.io/assignment/login.html";

    browser.ignoreSynchronization = true;
    Login.get(url);
    browser.waitForAngularEnabled(false);

   

    
    // function to enter username, password and click on button
   
      Login.LoginWithButtonClick(username, password);
   
    browser.sleep(2000);

    
  });



  //...... 2nd test case.....//

  it("To verify without clicking on checkbox we are able to login", function () {


    let url = "https://sakshingp.github.io/assignment/login.html";
    let username = "Yogesh";
    let password = "Yogesh@1";
    let myname = "John Doe";

    browser.ignoreSynchronization = true;

    //function for url
    Login.get(url);

   
    browser.waitForAngularEnabled(false);

    

    // function to enter username, password and click on button
    Login.LoginWithoutCheckBoxClick(username, password);
    browser.sleep(1000);

    // function for verifying customer name
    Login.VerifyCustomerName(myname);
    browser.sleep(1000);

  });


  //...... 3rd test case.....//



  it("To verify user is able to login using credentials and keeping checkbox clicked", function () {
    // variables to be used
    let url = "https://sakshingp.github.io/assignment/login.html";
    let titleShouldbe = "Demo App";
    let username = "Yogesh";
    let password = "Yogesh@1";

    browser.ignoreSynchronization = true;

    //function for url
    Login.get(url);

    browser.waitForAngularEnabled(false);

    //function for showing url
    Login.showUrl();

    //function for verify url
    Login.verifyUrl(url);

    // function for showing title
    Login.showTitle();

    // function for verifying title
    Login.verifyTitle(titleShouldbe);

    // function to enter username, password and click on button
    Login.LoginWithButtonClick(username, password);

    
  });


   //...... 4rth test case.....//
  
  it("To verify the customer name is John Doe after login", async function () {

    browser.waitForAngularEnabled(false);

    let myname = "John Doe";

    // function for showing customer name

    Login.Showcustomername();

    // function for verifying customer name
    Login.VerifyCustomerName(myname);

    
  });



 //...... 5th test case.....//


  it("To verify after clicking on Amount header, values gets displayed in sorted order", async function () {



    browser.waitForAngularEnabled(false);

  

    // function for verifying sorted amount after click

    Login.VerifySortedAmountAfterClick();

    browser.sleep(1000);
  });
});

// });
