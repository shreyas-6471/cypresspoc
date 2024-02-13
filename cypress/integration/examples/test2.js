import homePage from '../Pages/homePage'
describe('My First Test', function()  {
    before(function() {
        cy.fixture("example").then(function(data)  {
            this.data = data;
        });
    });

    it('Does not do much!', function()  {
        Cypress.config('defaultCommandTimeout',8000)
        const home=new homePage()
        cy.visit(Cypress.env("url")+'/angularpractice/')

        // Retry until fixture data is loaded successfully
        cy.wrap({}).should(function()  {
            expect(this.data).to.exist;
        }).then(function()  {
           home.getName("Name").type(this.data.name);
           home.getEmail("Email").type(this.data.email);
            cy.wait(2000)
            cy.get('#inlineRadio3').should('be.disabled')
            cy.get('#inlineRadio3').should('have.attr','value',"option3")
            cy.get('li.nav-item a').contains("Shop").click()
            for(let i=0;i<this.data.products.length;i++)
            {
                cy.addProduct(this.data.products[i])
            }
            this.curtotal=0
           cy.get(".nav-link.btn.btn-primary").click({force:true})
           cy.get('.table.table-hover tbody tr').each((el,idx,list) => {
            cy.wrap(el).find('td').eq(3).invoke('text').then((text) => {
                if (text === "Total") {
                    cy.log("Inside if loops");
                    cy.wrap(el).find('td').eq(4).invoke('text').then((totalsum) => {


                        cy.log("Total sum is", totalsum);
                        cy.log("Current total is", this.curtotal);
                        let myArr=totalsum.split(".")
                        let refactoredSum=myArr[1].trim()
                        // Compare the calculated total sum with the expected total sum
                        if (!(parseInt(refactoredSum) === this.curtotal)) {
                            cy.log(this.curtotal);
                            cy.log(refactoredSum);
                            // Fail the test if the total sum does not match
                            expect(parseInt(refactoredSum)).to.eq(this.curtotal);
                        }
                    });
                } else {
                    if(idx!=list.length-1){
                    cy.wrap(el).find('td').eq(3).find('strong').invoke('text').then((displayTotal)=>{
                    let myArrText=displayTotal.split(".")
                    let refactoredText=myArrText[1].trim()
                    cy.log(refactoredText)
                    this.curtotal += parseInt(refactoredText);
                    })
                }
                }
            });
        });
        
           cy.contains("Checkout").click()
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
            expect(text).to.have.string('success')
           })
        })
    });
});