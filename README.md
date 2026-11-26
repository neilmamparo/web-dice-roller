# Web Dice Roller

## Overview

Web Dice Roller is a web application that allows users to roll between one and six dice. It uses a Node.js server to generate random dice results and sends them to the browser, where they are displayed on the page.

## Features

- Roll between 1 and 6 dice.

- Automatically roll when changing the dice count.

- Roll dice using a button or the Enter key.

- Display results directly on the webpage.

## Tools & Technologies

- JavaScript – Handles user interactions and updates the webpage.

- Node.js + Express – Runs the server and handles dice roll requests.

- HTML/CSS – Structure and styling of the webpage.

- CORS – Allows the frontend to communicate with the server.

## How It Works

The webpage allows users to select how many dice they want to roll. When a roll is requested, the frontend sends a request to the Node.js server. The server generates random numbers between 1 and 6 for each die and returns the results. The webpage then updates the dice displays with the returned values.

## Screenshots
