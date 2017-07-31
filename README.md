## User Story

Feature

	As a user running the application
   	I want to search Github users' repositories

Scenario: Retrieve Github user's repositories

	When I type an existing Github username
	And I click "Get Repositories"
	Then I can see the user's top 10 repositories by number of stars.

## Design

You can find the required designs to be implemented in `design.png`.

## Tech Stack

The application needs to be implemented as a desktop web application. Our tech stack is as follows, so it would be useful if your solution were implemented in a similar fashion (although this is not required):

* Backend: Node.js (preferably Express), responsible for querying the Github API
* Frontend: preferably React application, querying the Node.js backend

Bonus points:

* Responsive layout

## To run in your local
`npm i && npm run server & npm run serve`
and point your browser to http://localhost:8080
