# Full Stack Engineer Coding Challenge #

This challenge forms part of the interview process for the ASI Data Science engineering team. If you're interesting in helping us build a truly innovative data science platform, please get in contact at www.asidatascience.com.

Once you've completed the challenge, please deploy your your application behind a public facing URL so that we can test it.

Please also provide:
* README.md with instructions on how to start the application
* ANSWERS.md with the answers to the questions in QUESTIONS.md
* One folder containing the technical test

## User Story
Feature

	As a user running the application
    I want to search Github users' repositories

Scenario: Retrieve Github user's repositories

	When I type an existing Github username
	And I click "Get Repositories"
	Then I can see the user's top 10 repositories by number of stars.

## Design
You can find in `design.png` the required designs to be implemented.

## Tech Stack
The application needs to be implemented as a desktop web application. Our tech stack is as follows, so it would be useful if your solution were implemented in a similar fashion (although this is not required). 
* Backend: nodejs backend (preferably Express) responsible of querying the Github APIs
* Frontend: preferably React based application, querying the nodejs backend

Bonus points:
* Responsive layout
