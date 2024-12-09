class MainPage {
    constructor() {
        this.sideMenu = 'nav.oxd-navbar-nav';
        this.topBar = 'div.oxd-topbar-header';
        this.dashboard = 'div.orangehrm-dashboard-grid';

        this.userDropdown = `${this.topBar} span.oxd-userdropdown-tab`;
        this.username = `${this.userDropdown} p.oxd-userdropdown-name`;
        this.logoutButton = `${this.topBar} ul[role='menu'] li a:contains('Logout')`;

        this.sideMenuOption = `${this.sideMenu} div.oxd-sidepanel-body li`;

        this.sideMenuOptions = {
            dashboard: 'Dashboard',
            Admin: 'Admin',
            PIM: 'PIM',
            leave: 'Leave',
            time: 'Time',
            recruitment: 'Recruitment',
            performance: 'Performance',
            directory: 'Directory',
            maintenance: 'Maintenance'
        }
    }

    checkMainPage(accountDetails) {
        cy.get(this.sideMenu).should('be.visible');
        cy.get(this.topBar).should('be.visible');
        cy.get(this.dashboard).should('be.visible');

        if (accountDetails) {
            cy.get(this.username).should('contain', accountDetails.firstName + ' ' + accountDetails.lastName).and('be.visible');
            // TODO If the user is an ESS user, the Admin option should not be visible
            // TODO If the user is an Admin user, the Admin option should be visible
        }

        //TODO verify that the correct options in the side menu are visible according to the user's role
        
    }

    selectSideMenuOption(option) {
        cy.log('Selecting ' + option + ' from the side menu');
        cy.get(this.sideMenuOption).contains(option).click();
    }

    userLogout() {
        cy.get(this.userDropdown).click();
        cy.get(this.logoutButton).click();
    }
}

module.exports = MainPage;