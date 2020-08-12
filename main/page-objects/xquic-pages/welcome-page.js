import { Selector } from 'testcafe';
import { t } from 'testcafe';

class WelcomePage{
	constructor(){
		this.iAmInRushBtn = Selector('p').withText('I’m in a rush, take me to my Dashboard!')
		this.headline1 = Selector('h1').withText('Please tell us a bit about yourself to get started')
		this.headline2 = Selector('h1').withText('Suggested Community Groups')
		this.headline3 = Selector('h3').withText('My Businesses')
		this.industryDD = Selector('#industry-option')
		this.departmentDD = Selector('#department-option')
		this.roleDD = Selector('#role-option')
		this.jobTitle = Selector('#user_job_title')
		this.businessLocation = Selector('#user_business_location')
		this.next = Selector('#contact-next-button')
		this.confirm = Selector('#contact-submit-button')

		this.settings = Selector('div[class="user-image-holder"]')
		this.logoutlink = Selector('span').withText('Log Out')
		this.login = Selector('a').withText('Log In')
	}

	async fillDataToGetStarted(industry, dept, role, job, businesslocation){
		await t	
			.click(this.iAmInRushBtn)
			.expect(this.headline1.exists).ok('Fill Information Page did not load')
			.click(this.industryDD)
			.click(Selector('#industry-option > option').withText(industry))
			.click(this.departmentDD)
			.click(Selector('#department-option > option').withText(dept))
			.click(this.roleDD)
			.click(Selector('#role-option > option').withText(role))
			.typeText(this.jobTitle, job)
			.typeText(this.businessLocation, businesslocation)
			.click(this.next)
			.expect(this.headline2.exists).ok()
			.click(this.confirm)
			.expect(this.headline3.exists).ok()
		console.log('Data filled Succesfully')
	}

	async logout(){
		await t
			.click(this.settings)
			.click(this.logoutlink)
			.expect(this.login.exists).ok('User did not logged out')
		console.log('User logged out sucessfully')
	}
	

}
export default new WelcomePage();
