Simple Authentication Backend

Use email & password to create account and sign in.
User password is hashed and stored on Mongodb database.
Cookie is used for authenticated state storage and persistence until session is expired.

User must be authenticated to access
/dashboard

Unauthenticated users with be redirected to:
/login

## Getting Started

This project was bootstrapped with the create next-app

```bash
npx create-next-app@latest
# or
yarn create next-app
```

To run this project locally:
First clone this project. From a command line run:

```bash
npm run dev
# or
yarn dev
```

Set .env variables in .env.local file
MONGODB_URI = pathToDatabase
MONGODB_DB = nameOfDatabase
SECRET_COOKIE_PASSWORD = atLeast32characterPasswordForSessionEncryption

Create free Mongodb database here:
https://www.mongodb.com/

## Project Dependencies

# bcryptjs

Used to encrypt password. Only the hashed version of a user's password is stored on database.  
https://www.npmjs.com/package/bcrypt

# iron-session

Creates session to establish authentication state persistence. Easy to configure cookie options.
https://github.com/vvo/iron-session

# swr

React hook for automatic data fetching & refreshing. Reads
cookies by iron-session and helps maintain current auth state.
https://swr.vercel.app/

# mongodb

Api for Mongodb database. Used for creating and verifying user accounts.
https://www.npmjs.com/package/mongodb

# validator/normalizeEmail

Sanitizes email prior to database requests. Prevents multiple accounts with same email address from being created. ex: uSer@doMaIn.com becomes user@domain.com
https://github.com/validatorjs/validator.js

# next / react / react-dom

Nextjs: a framework for react built by vercel. Simplifies page routing and integrating backend.
React / React-dom: dependencies for react library.

## Project Map

/components
-Dashboard
-Layout
-Login
-NavBar
-Signup
/documentation
-readme.md
/lib
-session
-user
-useUser
/pages
/api
-login (login via email and password, compares user pw against hashed database password)
-logout (destroy current session)
-signup (create new user account, inserts document into Database)
-user (returns user session data)
-dashboard (protected route, must be authenticated)
-index
-login
-logout
-readme
-signup
/styles
-global.css
/util
-fetcher (simple fetch wrapper)
-mongodb (connect to database, creates index and establishes email as primary key for database collection)

## Database Schema

name : string
email : string, unique
password : string

Email is primary key and must be unique.
No rules set for name or password, except that they are each required fields when user registers account.

Would set minimum password requirements if this were for production.

## Deployments

## Source
