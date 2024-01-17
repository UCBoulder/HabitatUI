# HabitatUI

This is a Node.js application, built to be used with HabitatAPI and HabitatDB for the CU Boulder & Western Colorado University Partnership program's Computer Science class of 2024's capstone project, in conjunction with Gunnison Valley land management stakeholders to protect the biodiversity of the flora in Gunnison county. The app is intended for use by outdoor enthusiasts in Gunnison county to help find and log cheatgrass, so that land managers may better track its spread and plan their resources to effectively combat it. 

## How to Run 
After pulling this code, in terminal on VSCode (recommended) type 
```bash
npm install
```
to install any dependencies and then 
```bash
npm start
```
to run.
The android emulator should pop up automatically if correctly connected to VSCode. If you do not also run the HabitatAPI, you will get an API failed error. This does not effect development as of 1/15/24.

## Important Files
The App.js runs the functaionality of the project. It operates as a 'main'.

The Pages folder holds all of the pages within the app, such as MapPage.js, InformationPage.js, CameraPage.js etc. 

The Components folder holds the buttons and components used on those pages. 

The utils folder holds utilities to connect to the API (APIcalls.js), get permissions from the user (Permissions.js), and create an observation (MakeObservation.js).

The images folder holds the images and infographics used on the Information page.

## Technologies Used
[React Native](https://reactnative.dev/)


## Requirements
[Node.js](https://nodejs.org/en) version 20 or above.

[React Native](https://reactnative.dev/docs/environment-setup)

[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[VS Code](https://code.visualstudio.com/download) (recommended)

## Authors 
This project was created by the Western and CU Boulder partnership's Computer Science class of 2024: Sam Bernard, Ethan Way, Jack Lay, Davis Lapkin, Joel Carlson; and their professor: Kathy Nielsen. 

## Project Status 
Work on this project began Aug 2023, and will end May 2024. 



Thanks for reading :purple_heart:

