///<reference types="Cypress"/>



describe('My First Test', () => {
    before(()=>{
        

    })
    
    it('Does not do much!', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#checkbox-example label').each((el,idx,list)=>{
            cy.log(el.text())
            if(el.text().includes("2"))
            {
                cy.log("Came inside the if block")
                cy.wrap(el).find('input').check();
            }
        })
        cy.get('select').select('option1').should('have.value','option1')
        cy.get('.ui-autocomplete-input').type('India')
        cy.get('.ui-autocomplete li div').each((el,idx,list)=>{
            if(el.text()==="India")
            {
                cy.wrap(el).click()
            }
        })
        cy.get('#radio-btn-example label').each((el,idx,list)=>{
            if(el.text().includes("Radio3"))
            {
                cy.wrap(el).find('input').click()
            }
        })
        cy.get("#product[name='courses'] tbody tr").each((el,idx,list)=>{
          
            if(idx!=0){
                cy.wrap(el).find('td').eq(1).then((newel)=>{
                    if(newel.text().includes("Master Selenium Automation in simple Python Language"))
                    {
                        cy.wrap(el).find('td').eq(2).invoke('text').then((text) => {
                            expect(text.trim()).to.equal("25"); // Corrected assertion
                        });
                    }
                })
            }
        })
       cy.get('#opentab').invoke('removeAttr','target').click()
       cy.origin("https://www.qaclickacademy.com/",()=>{
        cy.get("div[id='navbarSupportedContent'] a[href='about.html']").click()
       })
      // cy.get('#opentab').click()
    })
  })