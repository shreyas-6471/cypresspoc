class homePage
{
    getName(name) {
       return cy.contains("Name").next();
        
    }
    getEmail(email)
    {
        return  cy.contains("Email").next();
    }
}
export default homePage;