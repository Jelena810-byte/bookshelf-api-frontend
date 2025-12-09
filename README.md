# Bookshelf React Frontend

* A modern React frontend for the Bookshelf project, built using Vite, React, and React Router. This frontend provides a responsive interface to view, manage and interact with books while connecting seamlessly to a backend API.

# Table of Contents

1. Project Overview

2. Features

3. Tech Stack

4. Installation

5. Running the App

6. Project Structure

7. Components

8. Routing

9. Backend Integration

10. Contributing

11. License


# Project Overview

# The Bookshelf React Frontend is a single-page application (SPA) that interacts with a backend API to display and manage books. It features:

* A dynamic homepage with book listings

* Authentication pages: login and signup

* Navigation bar for smooth routing

* Clean and modular React component architecture

* This project serves as the client-side portion of the full-stack Bookshelf application.



# Features

* Responsive React app compatible with desktop and mobile

* Client-side routing using React Router

* User authentication with login and signup forms

* Book management: view details, list books, navigate between book pages

* Live updates: can fetch new messages from backend (terminal integration possible)

* Modular components for easy maintenance and scalability



# Tech Stack

* Frontend Framework: React 

* Build Tool & Dev Server: Vite

* Routing: React Router DOM

* Package Management: npm

* Styling: CSS 



# Project Structure

src/
├─ components/
│  ├─ Navbar.jsx         # Navigation bar
│  ├─ Home.jsx           # Homepage / Book listing
│  ├─ Login.jsx          # Login page
│  ├─ Signup.jsx         # Signup page
│  ├─ BookList.jsx       # Book listing component
│  └─ BookDetail.jsx     # Individual book detail page
├─ App.jsx               # Main app component
├─ main.jsx              # React DOM render entry


# Components

* Navbar – Top navigation, handles login/logout, links to main pages

* Home – Displays book list, may include search or filters

* Login – Form for user authentication

* Signup – Form to register new users

* BookList – Reusable list component for displaying books

* BookDetail – Shows detailed info about a selected book

* Each component is modular and can be extended for additional features.


# Routing

* The app uses React Router DOM for client-side routing:

| Route        | Component  | Description             |
| ------------ | ---------- | ----------------------- |
| `/`          | Home       | Book list and homepage  |
| `/login`     | Login      | User login page         |
| `/signup`    | Signup     | User registration page  |
| `/books/:id` | BookDetail | Detailed view of a book |

# Backend Integration

# This frontend is designed to work with a backend API. Example endpoints:

* GET /books – Fetch all books

* GET /books/:id – Fetch a single book by ID

* POST /login – Authenticate user

* POST /signup – Register a new user


# Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build production-ready app       |
| `npm run preview` | Preview production build locally |
| `npm test`        | Run tests (if implemented)       |


# License

* This project is licensed under the MIT License.


