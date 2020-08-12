import { Selector } from 'testcafe';
import { t } from 'testcafe';

class SignupPage{
	constructor(){
		this.signup = Selector('a').withText('Sign Up')
		this.firstname = Selector('#user_first_name')
		this.lastname = Selector('#user_last_name')
		this.username = Selector('#user_username')
		this.email = Selector('#user_signup_email')
		this.password = Selector('#user_signup_password')
		this.confirmPassword = Selector('#user_password_confirmation')
		this.accessCode = Selector('#user_accesscode')
		this.certifyCheck = Selector('input[class="certify-check"')
		this.register = Selector('.cust-btn-signup')
		this.success = Selector('h3').withText('Success!')
	}

	async validateUserRegistration(fname, lname, uname, emailid, pwd, code){
		await t
			.click(this.signup)
			.typeText(this.firstname, fname)
			.typeText(this.lastname, lname)
			.typeText(this.username, uname)
			.typeText(this.email, emailid)
			.typeText(this.password, pwd)
			.typeText(this.confirmPassword, pwd)
			.typeText(this.accessCode, code)
			.click(this.certifyCheck)
			.click(this.register)
			.expect(this.success.exists).ok('Registration unsuccesful')

		console.log('Registration Sucessful.')
	}
	

}
export default new SignupPage();
