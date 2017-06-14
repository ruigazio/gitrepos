# Full Stack Engineer homework #

Thank you for taking the time to do our technical test.

Please submit your results by email to *email here* in a zip file. 

The archive needs to contain:
- README.md with instructions on how to start the application
- ANSWERS.md with the answers to the questions in QUESTIONS.md
- One folder containing the technical test

## User Story
Feature
	As a user running the application
	I want to search Github users' repositories

Scenario: Retrieve Github user's repositories
	When I type an existing Github username
	And I click "Get Repositories"
	Then I can see the user's top 10 repositories

## Design
You can find in `design.png` the required designs to be implemented.

## Tech Stack
The application needs to be implemented as a desktop web application, architectured in the following fashion:
	- Backend: nodejs backend (preferably Express) responsible of querying the Github APIs
	- Frontend: preferably React based application, querying the nodejs backend
	
Bonus points:
	- Responsive layout
	
	

