//const {Given, When, Then, Before, And } = require('cypress-cucumber-preprocessor/steps');
const { Given, When, Then, Before, And } = require('@badeball/cypress-cucumber-preprocessor');

Before(function() {
    // This code will run before each scenario
    cy.fixture("example").then(function(data)  {
        this.data = data;
    });
  });
  Given("I open ecommerce page", function () {
    cy.visit(Cypress.env("url")+'/angularpractice/');
    });

When('I add items to Cart',function(){
    cy.get('li.nav-item a').contains("Shop").click()
            for(let i=0;i<this.data.products.length;i++)
            {
                cy.addProduct(this.data.products[i])
            }
            cy.get(".nav-link.btn.btn-primary").click({force:true})
})
When('I Validate the total price',()=>{
    let curtotal=0
    cy.get('.table.table-hover tbody tr').each((el,idx,list) => {
        cy.wrap(el).find('td').eq(3).invoke('text').then((text) => {
            if (text === "Total") {
                cy.log("Inside if loops");
                cy.wrap(el).find('td').eq(4).invoke('text').then((totalsum) => {


                    cy.log("Total sum is", totalsum);
                    cy.log("Current total is", curtotal);
                    let myArr=totalsum.split(".")
                    let refactoredSum=myArr[1].trim()
                    // Compare the calculated total sum with the expected total sum
                    if (!(parseInt(refactoredSum) === curtotal)) {
                        cy.log(curtotal);
                        cy.log(refactoredSum);
                        // Fail the test if the total sum does not match
                        expect(parseInt(refactoredSum)).to.eq(curtotal);
                    }
                });
            } else {
                if(idx!=list.length-1){
                cy.wrap(el).find('td').eq(3).find('strong').invoke('text').then((displayTotal)=>{
                let myArrText=displayTotal.split(".")
                let refactoredText=myArrText[1].trim()
                cy.log(refactoredText)
                curtotal += parseInt(refactoredText);
                })
            }
            }
        });
    });
    cy.contains("Checkout").click()
})
Then('success message should be displayed',()=>{
    cy.get("#country").type("India",{force:true})
           cy.get(".suggestions>ul>li>a").each((el,idx,list)=>{
            const text=el.text()
            if(text==="India")
            {
                cy.wrap(el).click()
            }
           })
           cy.get(".checkbox.checkbox-primary").find('input').click({force:true})
           cy.contains("Purchase").click()
           cy.get('.alert').invoke('text').then((text)=>{
            expect(text).to.have.string('Success')
           })
})