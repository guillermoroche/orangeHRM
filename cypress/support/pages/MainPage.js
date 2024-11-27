class MainPage {
    constructor() {
        // Define selectors here
        this.sideMenu = 'nav.oxd-navbar-nav';
        this.topBar = 'div.oxd-topbar-header';
        this.dashboard = 'div.orangehrm-dashboard-grid';

        this.userDropdown = `${this.topBar} span.oxd-userdropdown-tab`;
        this.logoutButton = `${this.topBar} ul[role='menu'] li a:contains('Logout')`;

        this.sideMenuOption = `${this.sideMenu} div.oxd-sidepanel-body li`;
    }

    checkMainPage() {
        cy.get(this.sideMenu).should('be.visible');
        cy.get(this.topBar).should('be.visible');
        cy.get(this.dashboard).should('be.visible');
    }

    selectSideMenuOption(option) {
        cy.get(this.sideMenuOption).contains(option).click();
    }

    userLogout() {
        cy.get(this.userDropdown).click();
        cy.get(this.logoutButton).click();
    }
}

module.exports = MainPage;