/*  Description: 
    Validate User is able to register
    Validates once User is registered, verification email is sent.
    Validates User is navigated to Profile page
    
*/
import { Selector, t } from 'testcafe';
import home from '../../main/page-objects/xquic-pages/home-page.js' 
import signup from '../../main/page-objects/xquic-pages/signup-page.js' 
import welcome from '../../main/page-objects/xquic-pages/welcome-page.js' 
import { ClientFunction } from 'testcafe';

var data;
var path = require('path')
var testfile = path.basename(__filename).split('.')[0]

var Fakerator = require("fakerator");
var fakerator = Fakerator();

const MailosaurClient = require('mailosaur');
const client = new MailosaurClient('FGaqMYuOPXEO0cs'); 
var serverId = 'zjtyfhio' 

var fname = fakerator.names.firstName()
var lname = fakerator.names.lastName()
var uname = fname + lname
var email  = fname +'.'+serverId+'@mailosaur.io'
var message;

//to handle location popup
const mockLocationAPI =  ClientFunction(() => {
  navigator.geolocation.getCurrentPosition = success =>  success({ coords: { latitude: 30, longitude: -105, }, timestamp: Date.now() });
});

const getUrl = ClientFunction(() => document.location.href) ;

fixture `User Sign Up`
  .page `${process.env.BASE_URL}`  
  .before( async t => {
    data = config.getTestData(__dirname,__filename)
  })   

test   
(testfile+': Sign UP', async t =>{

  console.log("Email Id: "+email)
  console.log("Username : "+uname)

  await t.maximizeWindow();

  await mockLocationAPI();
  await t.setNativeDialogHandler(() => true)
  var url = await getUrl();
  await t.navigateTo(url)

  //Validate Home Page Loaded Succesfully
  await home.validateHomePage()
  await signup.validateUserRegistration(fname, lname, uname , email, data.password , data.code)

});

test   
(testfile+': Email Verification', async t =>{

    console.log("Navigate to Confirmation Email")
    
    try{
        message = await client.messages.get(serverId, {
        sentTo: email
      },
      {
        timeout: 20000
      });
    }catch(err){
      console.log("Verification email is not sent to client")
      await t.expect(true).eql(false , 'Verification email is not sent to client' )
    }
    
    console.log("Verification email is sent to client")

    //verify email received to client
    console.log(message.subject)
    await t.expect(message.subject).eql('Confirm your email address', 'Subject is not Confirm your email address');
    const verificationLink = message.html.links[0].href;
    console.log(verificationLink)
    await t.navigateTo(verificationLink)
    
    await welcome.fillDataToGetStarted(data.industry, data.dept, data.role, data.job, data.location)
    await welcome.logout()

});

test   
(testfile+': Login with Credentials', async t =>{
  
  await home.login(email, data.password)

});
