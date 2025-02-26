# Job Odyssey

Job Odyssey has also been incorporated into the Holberton School of Software Engineering for use
as an internal tool for students. Visit the revamped version here 
[Job Odyssey for Holberton](https://jobodyssey.hbtn.io) and the Github repo here
[Job Odyssey for Holberton - Github](https://github.com/christopherchoe/jobodyssey_hbtn).
<a href="https://jobodyssey.com">
    <img src="https://i.imgur.com/Z9dBwqq.png" alt="jobodyssey" title="JobOdyssey">
</a>

[Job Odyssey](https://jobodyssey.com) is a web application that is designed to gamify and organize your job search! Job Odyssey is specifically designed for
software engineers, with features to fit the software engineer job application process.
To achieve this goal, Job Odyssey provides a unique reward and currency system that is designed to re-energize your job 
search. Users can generate currency by performing certain actions - such as saving a job post, applying to jobs, and 
updating the status of previously applied jobs.

## Table of content

- [The Story](#the-story)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Features](#features)
    - [Github OAuth](#github-oauth)
    - [Job Search](#job-search)
    - [Add Applied](#add-applied)
    - [Applied Jobs](#applied-jobs)
    - [Rewards](#rewards)
- [Built With](#built-with)
- [API](#api)
- [Future](#future)
- [Authors](#authors)
    - [Christopher Choe](#christopher-choe)
    - [Susan Su](#susan-su)
- [Acknowledgments](#acknowledgements)

## The Story

At first, Job Odyssey was envisioned as much different to what it is now.
It started as an idea for parsing and aggregating job listings for a user. However this idea was quickly changed because of the difficulty in obtaining job search API access.
So faced with a road block, we actually thought about what would be a useful product. While the original thought seemed interesting, the usefulness seemed limited.
So brainstorming led to the insight that with the huge amount of jobs a software engineer applicant can go through, organization and motivation could dwindle quickly.
Job Odyssey attempts to address that by organizing applications and adding visible progression along the journey. We want to be there for support from the humble beginnings, the ups and downs, to hopefully, the ultimate success.

That is why we are called Job Odyssey!

A Kanban board on Trello was utilized throughout in order to keep tasks and communication organized.
The React front end and the way routing was designed, allowed Job Odyssey to have more dynamic features without handcuffing the rest of the project.
A REST API allowed for this frontend to interact with out backend in a simple and well documented way.
We decided to use ORM and MySQL because of modularity and familiarity.

Front End
* React components handling routing
* Material UI for consistent styling
* API calls to manipulate database

REST API
* GET, POST, PUT requests handled
* CRUD manipulation through REST API
* CSV formatted jobs applied

Relational Database
* Handled with ORM (SQLAlchemy)
* Model system with base model handling identification
* Many to many relationship for users and rewards

Server / Deployment
* Nginx / Gunicorn
* AWS EC2 on Ubuntu 16.04

## Getting Started

Access it on jobodyssey.com and create an account today!
* Must have a github account to use Job Odyssey
* To explore features without logging in, check out [Features](#features)

## Screenshots

<img width=50% src="https://i.imgur.com/i1Q9COP.png">

<img width=50% src="https://i.imgur.com/4xbKtA1.png">

<img width=50% src="https://i.imgur.com/6mkexPV.png">

## Features

Job Odyssey has features that can be found through our dropdown navigation bar menu.

<img width=50% src="https://i.imgur.com/h9BlAQx.png">

These features will be explored below!

<img width=50% src="https://i.imgur.com/SohetrC.png">

### **GitHub OAuth**

Job Odyssey handles user authorization through the Github OAuth. In order for
user data to be more secure, users are handled completely through authorization by Github. If you would like to logout, the authorization token will be erased but to have a completely separate user experience you will have to logout of Github as well.

<img width=50% src="https://i.imgur.com/4xbKtA1.png">

### **Job Search**

This job search feature used the Github Jobs API to search for a job based on user input parameters. The heart button on the left side will save the job as a job interested where pressed and delete it from jobs interested if pressed again.
The heart button required a lot of work with React states and figuring out the best way to have this dynamically populated list have individual reactions to user actions.
The message icon on the right side of the listing is a link which will open a new window of the url to the actual job listing.

<img width=75% src="https://i.imgur.com/aTtDNRo.png">

### **Add Applied**

This form will allow a user to add an applied job to their list of applied jobs. The company, position, address, and date applied are mandatory fields while the drop down forms like language can be manipulated by clicking on one to add, and clicking again to remove the specific option (e.g. click on C and Python to add both, click again on C to remove). When submitted, the form is sent through a POST request to our REST API updating the database.

<img width=75% src="https://i.imgur.com/hwcvTMM.png">

### **Applied Jobs**

Jobs applied will be listed on this page with the ability to edit and delete the listing. This allows for updates on the status, notes, or any other information you would like to change later. Any updates will be handled by React fetch requests to our REST API.

<img width=75% src="https://i.imgur.com/Hfftp3R.png">

This export to csv button allows you to see your applied jobs in a csv format. This can be saved and imported into excel or google sheets to have a better organized listing of all jobs applied.

<img width=75% src="https://i.imgur.com/tRFWRc2.png">

### **Rewards**

This rewards feature is a slot machine like spinner which will choose from a constructed group of ten possible rewards. The rewards are populated based on a rarity scale with each color representing a different rarity. The rewards are currently Holberton peers and staff but plans are to make them more general in the future. Each roll is 30 coins and repeats are not added to your total list of rewards. Check the home page to see which rewards you have won! Figuring out how to set this up on a flask / React web app was challenging but ultimately rewarding with a cute animation for rolling. This feature also required a careful handling of states and prev state when dealing with asynchronous loading.

<img width=75% src="https://i.imgur.com/RRwTdoV.png">

## Built With
* [Python](http://www.python.org) - The Backend Language
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The Frontend Language
* [Flask](http://flask.pocoo.org/docs/1.0/) - The Web Development Framework
* [SQLAlchemy](https://www.sqlalchemy.org/) - Python SQL Toolkit and Object Relational Mapper
* [MySQL](https://mysql.com) - Relational Database Management System
* [React](https://reactjs.org) - Javascript Library
* [Material UI](https://material-ui.com) - Pre-Built React components

## API

The API can be found in application/server/api/calls.py and to use any call, use jobodyssey.com/api/...

/api/rewards

GET: Returns a randomized array of ten rewards based on rarity for a user to win based on a roll POST: Takes a user id and reward id and adds that to the user rewards table

/api/user

GET: Returns the user's information based on session id

/api/user/currency

GET: Returns the user's currency based on session id

/api/csv

GET: Returns csv representation of jobs applied

/api/user/rewards

GET: Returns all rewards associated with a user

/api/job_search

POST: Returns job's matching the parameters through Github Jobs API

/api/jobs/interested

GET: Returns all the jobs marked as interested from job searches 
POST: Modify information related to an interested job 
PUT: Create a new interested job from a job search call 
DELETE: Delete an existing interested job

/api/jobs/applied

GET: Returns all jobs asscoiated with a user 
POST: Create a new user job 
PUT: Modify an existing user job
DELETE: Delete an existing user job

## Future

There are plenty of features that we would love to implement into Job Odyssey.
Adding more Job Search APIs (which mostly require approval) and allowing for the listing of those favorited jobs would be one towards the top of the list. Work is also being put into making
the view and formatting of the applied jobs easier to navigate and explore. Along with this, adding more features to keep users motivated and engaged such as alerts and notifications as well as more game features are currently being worked on. A community feature with a multiplayer aspect was also a consideration that we are looking into for the future.

If you have any suggestions or would like to contribute to Job Odyssey, please contact either of us.

## Authors
### **Christopher Choe**
[christopherchoe](https://github.com/christopherchoe)

Chris is a backend software engineer, working on the system design, database, and REST API for the most part with some fingerprints in the frontend in order to better understand and integrate the backend into the whole picture.

### **Susan Su**
[suhearsawho](https://github.com/suhearsawho)
    
Susan is a full stack software engineer who enjoys both backend work and frontend work, taking charge of the design and React portions of Job Odyssey while still being heavily involved in the backend database and API work as well. 
    
If you would like to contact [Susan](https://suhearsawho.github.io/) or [Chris](https://christopherchoe.github.io) about any opportunities, feel free to reach out!


## Acknowledgements
* [Holberton School](https://holbertonschool.com) (Staff and Students)
* Cats
* Cafes
