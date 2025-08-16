Feature: Auth login

  Scenario: Successful login with valid credentials
    Given a user exists with email "jean@example.com" and password "123456"
    When I POST "/auth/login" with email "jean@example.com" and password "123456"
    Then the response status should be 201
    And the response should contain a JWT token
