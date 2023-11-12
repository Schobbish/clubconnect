# ClubConnect

CS 4352 semester project.

## Build Instructions

Prerequisites: Node.js `^18.16.0`.

1. Ensure Node is installed:

```shell
node -v
```

2. Install dependencies (run these commands in this directory):

```shell
npm ci
```

3. Start the server:

```shell
npm run start
```

n.b.: `npm run zip` was used to generate the `build.zip` file.

4. Open the website in your browser. This should automatically happen, but it does not, instructions in your terminal should give you guidance.

## About the Project

This is a website built in Typescript using the React framework. It employs the following dependencies:

- Axios - for creating HTTP requests
- date-fns - to help with time conversions
- Formik - to handle form inputs
- Lodash - for utility functions
- Mock Service Worker - to accurately mock a database without a backend
- React Router - to create the separate pages of the app
- Yup - for form input validation

We also have the following dev dependencies:

- ESLint - to reduce the number of errors and bugs during development
- gh-pages - provides a deploy script to deploy a React website to GitHub Pages
- husky - to check files before committing
- lint-staged - helps with husky so we only check staged files
- Prettier - to enforce code style
- source-map-explorer - to see the components of our webpack for fun
- Tailwind - for styling via HTML classes
