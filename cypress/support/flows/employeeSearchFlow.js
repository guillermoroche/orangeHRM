import MainPage from '../pages/MainPage';
import EmployeeManagementPage from '../pages/PIM/EmployeeManagementPage';
import EmployeeCreationPage from '../pages/PIM/EmployeeCreationPage';
import EmployeeProfilePage from '../pages/PIM/EmployeeProfilePage';


class EmployeeSearchFlow {
    constructor() {
        this.mainPage = new MainPage();
        this.employeeManagementPage = new EmployeeManagementPage();
        this.employeeCreationPage = new EmployeeCreationPage();
        this.employeeProfilePage = new EmployeeProfilePage();
    }

    /**
     * Searches for an employee and verifies the employee's basic details.
     *
     * @param {Object} searchCriteria - The details of the employee to be created.
     * @param {string} searchCriteria.employeeFullName - The first name of the employee.
     * @param {string} searchCriteria.employeeId - The ID of the employee.
     * @param {string} searchCriteria.employmentStatus - The employment status of the employee.
     * @param {string} searchCriteria.include - The include status of the employee.
     * @param {string} searchCriteria.supervisorName - The supervisor name of the employee.
     * @param {string} searchCriteria.jobTitle - The job title of the employee.
     * @param {string} searchCriteria.subUnit - The subunit of the employee.
     */
    searchEmployee(searchCriteria) {
        //STEP 1: Navigate to the Employee Management page
        this.mainPage.selectSideMenuOption(this.mainPage.sideMenuOptions.PIM);
        //STEP 2: Fill in the search criteria
        this.employeeManagementPage.checkEmployeeManagementPageLoads();
        this.#fillSearchCriteria(searchCriteria);
        //STEP 3: Click on the search button
        this.employeeManagementPage.clickSearchButton();
        //STEP 4: Verify the search results (1 employee should be found)
        this.employeeManagementPage.checkSearchResults();
        //STEP 5: Click on the employee row
        this.employeeManagementPage.clickEmployeeRow();
    }

    #fillSearchCriteria(searchCriteria) {
        cy.log('Filling search criteria');
        const criteriaMap = {
            employeeFullName: 'fillEmployeeFullName',
            employeeId: 'fillEmployeeId',
            employmentStatus: 'fillEmploymentStatus',
            include: 'fillInclude',
            supervisorName: 'fillSupervisorName',
            jobTitle: 'fillJobTitle',
            subUnit: 'fillSubUnit'
        };

        Object.keys(criteriaMap).forEach(key => {
            cy.log('Calling method: ' + criteriaMap[key]);
            if (searchCriteria[key] && searchCriteria[key].length > 0) {
            this.employeeManagementPage[criteriaMap[key]](searchCriteria[key]);
            }
        });
    }
}

export default EmployeeSearchFlow;