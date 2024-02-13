import 'cypress-iframe'
describe('Tutorialspoint Test', function () {
   // test case
   it('Test Case7', function (){
      // launch the application
      cy.visit("https://jqueryui.com/draggable/");
      // load the frame
      cy.frameLoaded('.demo-frame');
      //shift the focus to frame
      cy.iframe().find("#draggable").then(function(txt){
         const txtframe = txt.text();
         //assertion to verify text
         expect(txtframe).to.contains('Drag me around');
         cy.log(txtframe);
      })
      cy.contains("Droppable").click()
   });
});