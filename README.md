# Final Health Project UI

Super Health Inc.'s Patient Management Interface offers a user-friendly way to modify and manage patient encounter data

## Description

This UI allows healthcare profesionals to add and update patients and encounters with necessary details, ensuring up-to-date medical records.

## Prerequisites

- [Node.js](https://nodejs.org/en/)

## Setup & Running the Project

####  1. Clone the Repository

`git clone https://gitlab.ce.catalyte.io/training/cycleworkinggroups/nationwide/associates/christopher-davis/final-ui`

#### 2. Install dependencies:

### `npm install`

#### 3. Start the frontend server: 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Dependencies

- React: A JavaScript library for building user interfaces
- React-Router-Dom: Navigational components for react applications.
- ESLint (Airbnb config)

### Linting with ESLint (Airbnb configuration)

To set up ESLint, run:
- `npm install eslint --save-dev`

To lint your project, run:
- `npm run lint`

# Usage

1. Homepage: The main/landing page is the Patients Page, that displays a list of existing patients. You can navigate through them
and Add, Delete, or View patients.

2. Adding a new patient: Click the `Add New Patient` button to navigate to a form for creating a new patient. Fill out the required fields and click `Submit` to be navigated back to the Patients Page.

3. View a patient's details: Each patient has a `View` button. Clicking this will navigate you to the Patient Details Page, where you can see more details on that specific patient. Including the patient's encounters.

4. Edit Patient Details: On the Patient Details Page there is an `Edit Patient` button. Clicking this will navigate you to a form where you can update that patient's details.

5. Patient Encounters: On the Patient Details Page, you can see a list of that specific patient's encounters. 

6. View Details: Each encounter on the Patient Details page has a `View Details` button. Clicking this brings up a small modal, containing that encounter's details. On the modal is a `Close` button which closes the modal.

7. Edit Encounter: Also on the encounter modal is an `Edit Encounter` button. Clicking this will navigate you to a form which will allow you to update that specific encounter's details. Filling out the required fields and clicking `Submit` will navigate you back to the Patient Details Page.

8. Create Encounter: On the Patient Details Page, there is a `Create Encounter` button. Clicking this will navigate you to a form for creating a new encounter for that patient. Filling out the required fields and clicking `Submit` will navigate you back to the Patient Details Page.

9. NavBar: At any point in the application, you can click the company name in the top left of the navbar (`Super Health Inc.`) to be navigated back to the main page (Patients Page).

# Backend

For backend setup and instructions, please refer to the README in the [backend repository](https://github.com/ThidgesB/Catalyte-Final-API).
