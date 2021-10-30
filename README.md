# Movies API

## Overview

This service exposes several API endpoints to manage movies database. It's a similar kind of platform like IMDB.


## Features

This exposes endpoints to manage movie DB with authorization implemented.

### Movies
> Movies can be listed by registered or non-registered users.
> Movie list can be sorted by popularity or alphabetically sorted by movie name or director's names also can be filtered by `genre`.
> Details like `Director`, `Popularity`, `IMDB Score` or `Genres` can be fetched by specific movie id.

### Users
 > Registered users can add, update or delete movies. 
 > Non-registered users can only view movies.
 

## Technical Information
 - Popular `MERN` stack is used to build this service, details are as follows
   - Node JS
   - Express
   - MongoDB
   - React JS
 - `JWT tokens` are being used to implement toke based authentication & authorization.
 - This is a `dockerized` application.
 - This application is already deployed on `Heroku`.
   - [https://fynd-hiring-movies-app.herokuapp.com/](https://fynd-hiring-movies-app.herokuapp.com/)
 - A detailed documentation of all the APIs can be found here at [https://fynd-hiring-movies-app.herokuapp.com/api-docs](https://fynd-hiring-movies-app.herokuapp.com/api-docs)

### Setup
### Using Docker
 - This requires basic minimal setup as this is already `dockerized`.
 - You will be requiring docker CLI installed to start this project.
 - We are assuming you have already `Docker CLI` installed.
   - To run this service follow these simple steps in side project directory
     - Run `docker build -t movie-app .`
     - Run `docker run -dp 3000:3000 movie-app`
     - After that you can visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to check if the application is running or not.

### Alternate way
- If you don't have docker installed, still you can start this service.
- You will be requiring `Node JS` installed. The minimum required Node JS version is `v12.0.0`. If you have any newer version that will work.
- Run the following commands inside project directory
  - `npm install --only=production`
  - `npm start`
- Great !!. Now you can visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to verify.


## Scaling
To scale this application we can do some changes in its architecture.

We can split the service in two different service.
- One service specifically for `CREATE`, `UPDATE` & `DELETE` movies. We can also implement queue if the no of requests are too high.
- One service specifically for fetching `movie list`, `movie details` etc.
- We also can `cache` most queried movie details into an in-memory cache like `redis`.
- We can have `multiple instances` of the same application and manage the traffic via a `Load Balancer`.
- We are using MongoDB as a DB Service. We can scale the DB `Horizontically` if the size of records increases.
