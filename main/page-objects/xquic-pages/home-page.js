import { Selector } from 'testcafe';
import { t } from 'testcafe';

class HomePage{
	constructor(){
		this.loginlink = Selector('a').withText('Log In')
		this.signup = Selector('a').withText('Sign Up')
		this.freeSignup = Selector('a').withText('Free Sign Up')
		this.userLoginEmail = Selector('#user_login_email')
		this.userLoginPassword = Selector('#user_login_password')
		this.loginBtn = Selector('button').withText('Log In')
		this.headline3 = Selector('h3').withText('My Businesses')
	}

	async validateHomePage(){
		await t
			.expect(this.loginlink.exists).ok('Login link does not exists')
			.expect(this.signup.exists).ok('Signup link does not exists')
			.expect(this.freeSignup.exists).ok('Free Signup link does not exists')
	}

	async login(username, pwd){
		await t	
			.click(this.loginlink)
			.typeText(this.userLoginEmail, username)
			.typeText(this.userLoginPassword, pwd)
			.click(this.loginBtn)
			.expect(this.headline3.exists).ok()
		console.log('User Logged in Succesfully')
	}
}
export default new HomePage();
