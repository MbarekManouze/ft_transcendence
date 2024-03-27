# ft_transcendence

## Project Overview

ft_transcendence is a web application designed to facilitate online multiplayer gaming and communication features. The primary focus of the project is to enable users to engage in real-time Pong matches while also providing a robust chat system for communication among users.

## Technologies Used

Backend: Built with NestJS, a progressive Node.js framework. Utilizes WebSocketGateway for real-time communication, Passport strategy for social authentication (login with 42 network account), and JWT for session management.

Frontend: Developed using ReactJS with Tailwind CSS for styling. Ensures a responsive and visually appealing user interface.

Database: PostgreSQL database is utilized for data storage, ensuring reliability and scalability.

Other Libraries: Various libraries and frameworks are integrated into the project to enhance functionality and streamline development.

# Features

## User Account Management

OAuth Login: Users can authenticate using their 42 network account, providing a seamless and secure login experience.

Profile Customization: Users have the ability to set a unique display name and upload an avatar to personalize their profile.

Two-Factor Authentication: Enhanced security measures allow users to enable two-factor authentication for added protection.

Friend System: Users can add other users as friends, view their online status, and interact with them through the chat interface.

Stats and Match History: Detailed statistics and match history are displayed on user profiles, providing insights into gaming performance.

## Chat System

Channel Creation: Users can create public, private, or password-protected chat channels for group discussions.

Direct Messaging: Seamless direct messaging functionality allows users to communicate privately with each other.

Blocking Users: Users have the ability to block other users, preventing them from receiving messages from blocked accounts.

Channel Administration: Channel owners and administrators have control over channel settings, including password protection, user banning, and muting.

Integration with Pong: Users can invite others to play Pong matches directly from the chat interface, enhancing the gaming experience.

## Pong Game

Real-Time Gameplay: Engage in live Pong matches with other users directly on the website, ensuring an immersive gaming experience.

Matchmaking System: A matchmaking system automatically pairs users with opponents, reducing wait times and facilitating competitive gameplay.

Customization Options: Users can customize gameplay with power-ups or different maps while still having the option to play the classic version of Pong.

Responsive Design: The game interface is designed to be responsive, ensuring optimal gameplay experience across devices.

## Getting Started

To run the ft_transcendence project locally:

Clone the repository to your local machine.

Install dependencies for both the backend (NestJS) and frontend (ReactJS).

Run the project using **make build**.

Access the application via the specified URL and start exploring its features.

## Conclusion

ft_transcendence offers an engaging platform for users to connect, communicate, and compete in online multiplayer games.
With its robust features and modern technology stack, the project aims to deliver an exceptional user experience while showcasing the capabilities of NestJS and ReactJS.
