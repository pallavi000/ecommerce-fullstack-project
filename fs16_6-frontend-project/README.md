# Front-end Project: E-commerce

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)

This is a project for the Integrify Academy Frontend module. The task was to create an e-commerce website using API endpoints from [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/).

## Deploy

You can visit and check the demo website online by clicking [Visit Website](https://adorable-capybara-bd2a0a.netlify.app/)

## Table of contents

- [Technologies](#technologies)
- [Features](#features)
- [Project overview](#project-overview)
- [Running the project](#running-the-project)
- [Deployment](#deployment)

## Technologies

- Typescript
- React
- Redux toolkit
- Jest
- MUI

## Features

### User (unregistered/not logged in)

- able to view all product listings (all or by category)
- able to filter products
- able to view single product page
- able to register
- able to log in
  #### Logged in user
  - able to view own account details
  - able to modify email, password and name for self
  - able to log out
  - able to create cart
  - able to update cart
  - able to check out cart
  - able to view orders
  #### Admin
  - able to modify products (create, update, delete)
  - able to modify users (create, update, delete)
  - able to modify categories (create, update, delete)
  - able to view orders

### Product:

- can be viewed as list (all/by category)
  - can be viewed individually
  - can be sorted (by price)
  - can be filtered
- can be added to cart(by logged in user)
  - can be created, modified and deleted (by admin)

### Category:

- can be viewed as list

### Cart:

- can be created
  - can be modified (add cart item, update cart item quantity, delete cart item)
  - can be checked out
  - can be deleted

## Project overview

**Basic requirements**

- [x] Fetch and display all and single products.
- [x] Create at least 4 pages (products, profile, user, cart)
- [x] Product reducer
- [x] User reducer
- [x] Cart reducer
- [x] Adding and removing from the cart
- [x] Login and authorization (admins can delete and update products)
- [x] Routing and private pages
- [x] Testing the reducers
- [x] Rewrite the README, deploy the project, add the deployment link here and to the README.md

**Bonus requirements**

- [x] Context API
- [x] Pagination when fetching and displaying.
- [x] Any performance optimization, remember to mention it ie useMemo, debounce, etc

## Running the project

Requirements: Node

After cloning the project run `npm install` in project directory.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode

## Deployment

### `npm run build`
