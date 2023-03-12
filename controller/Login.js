let Login=
{


     get: function(url)
{
    browser.get(url);      //getting browser
},

showUrl: function()
{
    browser.getCurrentUrl().then((urls)=>
    {
        console.log("current url is " + urls);    //showing url
    })
}
,
verifyUrl: function(url) {
    
    browser.getCurrentUrl().then((urls)=>
    {
        expect(urls).toEqual(url);    //url verification
    })
}


,
showTitle: function()
{
    browser.getTitle().then((title)=>
        {
            var titles=title;
            console.log("Title is  " + titles);    //showing title
            
        })

        
},

verifyTitle: function(mytitle)
{

    browser.getTitle().then((title)=>
        {
           
            expect(title).toEqual(mytitle);   //title verification
            
        })

    

}
,

LoginWithButtonClick: async function (username,password) {

    await element(by.id('username')).sendKeys(username);
    browser.sleep(1000);
    await element(by.id('password')).sendKeys(password);
    await element(by.css(`[class="form-check-input"]`)).click();
    browser.sleep(1000);
    await  element(by.id('log-in')).click();
    browser.sleep(1000);
    await element(by.className("alert-warning")).getText((mytex)=>
    {
      
      expect(mytex).toBe("Both Username and Password must be present");
      
    })
    browser.sleep(2000);
}
,
LoginWithoutCheckBoxClick: function (username,password) {

  element(by.id('username')).sendKeys(username);
  browser.sleep(1000);
  element(by.id('password')).sendKeys(password);
 
  element(by.id('log-in')).click();
  browser.sleep(1000);
  
}
,
Showcustomername: function()
{
    element(by.id("logged-user-name"))
    .getText()
    .then((txt) => {
      console.log("customer name is " + txt);
    });
  
    
},

VerifyCustomerName:function(myname)
{
    element(by.id("logged-user-name"))
    .getText()
    .then((txt) => {
     expect(txt).toBe(myname)
    });
 
}
,
VerifySortedAmountAfterClick:function()
{
    var sorted = [],
    unSorted = [],
    afterClickSortCheck = [];

 
  let i = 0;
  element
    .all(by.css("tbody tr td:nth-of-type(5)"))
    .then((ele) => {
      ele.forEach(function (eachName) {
        eachName.getText().then(function (name) {
         let changenum = name.replace(" USD","");
         let againchangenum=changenum.replace(",","");
         unSorted[i]=parseFloat(againchangenum.replace(" ",""));
          // console.log(unSorted[i]);
          i++;
        });
      });
    })
    .then(async () => {
      var sorted = [...unSorted]; //making copy of array object
      
      sorted.sort((a, b) => a - b);
      // console.log("sorted");
      for (let j = 0; j < 6; j++) {
      //   console.log(sorted[j]);
      }
      // console.log("mera baby" + sorted[0]);
      element(by.id("amount")).click();
      browser.sleep(2000);
      

      let i = 0;
      element
        .all(by.css("tbody tr td:nth-of-type(5)"))
        .then((ele) => {
          ele.forEach(function (eachName) {
            eachName.getText().then(function (name) {
              let changenum = name.replace(" USD","");
         let againchangenum=changenum.replace(",","");
         afterClickSortCheck[i]=parseFloat(againchangenum.replace(" ",""));
        
              // console.log(afterClickSortCheck[i]);
              i++;
            });
          });
        }).then(() => {
            console.log("before click(should be)")
          for (let j = 0; j < 6; j++) {
            console.log( sorted[j]);
            
          }
          console.log("After click result!!!");

          for (let j = 0; j < 6; j++) {
             
              console.log(afterClickSortCheck[j]);
            }

          expect(sorted).toEqual(afterClickSortCheck);

        });
    });
}











}

module.exports=Login;