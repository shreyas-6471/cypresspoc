Feature: End to end e-commerce validation
    Scenario: E commerce products delivery
     Given I open ecommerce page
    When I add items to Cart
    When I Validate the total price
    Then success message should be displayed
