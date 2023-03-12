// An example configuration file.

var HTMLReport = require('../node_modules/protractor-html-reporter-2');



var jasmineReporters = require('../node_modules/jasmine-reporters');

var fs = require('../node_modules/fs-extra');



exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [
    {
      browserName: "chrome",
      chromeOptions: {
        prefs: {
          "profile.managed_default_content_settings.notifications": 1,
        },
      },
    },
  ],

  // Framework to use. Jasmine is recommended.
  framework: "jasmine",

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  // specs: ['../tests/example_spec.js'],
  specs: ["../tests/wingyfy.js"],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },


  //HTML REPORTS creation

  onPrepare:function()
  {
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './',
      filePrefix: 'xmlresults'

      
  }))
  
  
 
fs.emptyDir('screenshots/', function (err) {
        console.log("starting..");
    });
 
    jasmine.getEnv().addReporter({
        specDone: function(result) {
            if (result.status == 'failed') {
                browser.getCapabilities().then(function (caps) {
                    var browserName = caps.get('browserName');
 
                    browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                        stream.write(new Buffer.from(png, 'base64'));
                        stream.end();
                    });
                });
            }
        }
    });
  
  },
  //HTMLReport called once tests are finished
onComplete: function() {
  var browserName, browserVersion;
  var capsPromise = browser.getCapabilities();

  capsPromise.then(function (caps) {
     browserName = caps.get('browserName');
     browserVersion = caps.get('version');
     platform = caps.get('platform');

     

     testConfig = {
         reportTitle: 'Protractor Test Execution Report',
         outputPath: './',
         outputFilename: 'ProtractorTestReport',
         screenshotPath: './screenshots',                   //automatic screenshots will be taken when our test cases gets failed
         testBrowser: browserName,
         browserVersion: browserVersion,
         modifiedSuiteName: false,
         screenshotsOnlyOnFailure: true,
         testPlatform: platform
     };
     new HTMLReport().from('xmlresults.xml', testConfig);
 });
}


};
