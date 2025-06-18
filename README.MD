# CampusConnect: Bridging Academia and Industry

CampusConnect is a Next.js web application designed to connect university students with companies and industry professionals. The platform facilitates mentorship opportunities, job discovery, event participation, and direct communication, all aimed at helping students launch their careers and enabling companies to find promising talent.

## Overview

The application provides a tailored experience for two main user types:

*   **Students**: Can create detailed profiles showcasing their academic achievements, skills, interests, and career aspirations. They can explore company profiles, discover relevant events (workshops, webinars, career fairs), search for job/internship opportunities, and receive AI-powered personalized recommendations.
*   **Companies/Recruiters**: Can create company profiles highlighting their culture, industry, mentorship programs, and job openings. They can search for student talent based on various criteria, post events, and connect directly with potential candidates or mentees.

## Key Features

*   **Dual User Roles**: Separate experiences and dashboards for Students and Companies.
*   **Comprehensive Profiles**:
    *   **Student Profiles**: Include university, major, year of study, skills, interests, achievements, bio, and mentorship preferences.
    *   **Company Profiles**: Detail industry, description, mentorship specialties, job opportunities, website, and location.
*   **Discoverability & Search**:
    *   Students can browse and filter company listings and upcoming events.
    *   Companies can search and filter student profiles.
*   **AI-Powered Opportunity Generation (for Students)**: Utilizes Genkit to provide personalized suggestions for mentorships, events, and job opportunities based on the student's profile and (mocked) in-app activities.
*   **Event Management**: Companies can create and list events, which students can then discover and (notionally) attend.
*   **Direct Messaging**: A built-in messaging system allows users to communicate directly (mock implementation).
*   **Authentication & Authorization**: Secure login and signup functionality, with distinct views and capabilities based on user type.
*   **Profile Management**: Users can easily update their personal or company information.
*   **Responsive Design**: Built with modern UI components for a seamless experience across devices.

## Tech Stack

This application is built with a modern, robust tech stack:

*   **Frontend**:
    *   **Next.js**: React framework for server-side rendering, static site generation, and App Router.
    *   **React**: JavaScript library for building user interfaces.
    *   **TypeScript**: Superset of JavaScript that adds static typing.
*   **UI & Styling**:
    *   **ShadCN UI**: Re-usable UI components built with Radix UI and Tailwind CSS.
    *   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
    *   **Lucide React**: Library for beautiful and consistent icons.
*   **Generative AI**:
    *   **Genkit (Firebase Genkit)**: Toolkit for building AI-powered features, used here for the opportunity generator.
*   **State Management**:
    *   **React Context API**: Used for global state management like authentication.
*   **Development Tools**:
    *   **ESLint & Prettier**: For code linting and formatting (configuration implied).

*   **Deployment**:The application is running under production in vercel

## Getting Started

This project is a starter application in Firebase Studio.

1.  **Explore the Code**: The main application logic resides in the `src` directory.
    *   `src/app`: Contains the Next.js pages and layouts using the App Router.
    *   `src/components`: Houses reusable React components, including UI elements from ShadCN.
    *   `src/ai`: Contains Genkit flows for AI-powered features.
    *   `src/contexts`: Includes React context providers (e.g., `AuthContext`).
    *   `src/lib`: Utility functions.
2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.
3.  **Run Genkit (for AI features)**:
    In a separate terminal, start the Genkit development server:
    ```bash
    npm run genkit:dev
    ```

## How It Works (Simplified Flow)

1.  **Sign Up/Login**: Users register as either a student or a company.
2.  **Profile Creation/Update**: Users fill out their respective profiles with relevant details.
3.  **Dashboard**: Users land on a personalized dashboard with quick links and relevant information.
    *   Students see an AI opportunity generator.
    *   Companies can see options to find students or post opportunities.
4.  **Discovery**:
    *   Students browse company profiles, job listings, and events.
    *   Companies browse student profiles.
5.  **Interaction**:
    *   Users can (mock) message each other.
    *   Students can (mock) apply for jobs or express interest in mentorship.
    *   Companies can (mock) invite students for interviews or mentorship.
6.  **AI Opportunities**: Students can use the AI feature to get tailored suggestions based on their input.

