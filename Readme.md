# SquadQuizz repo

This is a web application that allows you to create a quizz with a series of questions and share them with friends to play live and have the best jeopardy game night of your life ! have fun !

## How to run

- Run `npm install` in both server and client directories to install packages.
- Run `npm run dev` in both server and client directories to start both applications.
- The front-end is now running at http://localhost:3000 and the backend at http://localhost:8000

- the database is an SQL database hosted online on tiDBcloud.com
- Using next-routes package for next.js routes

## Features

- [x] Create predefined lobby (hardcoded set of quizzes) and become admin of it
- [ ] Access lobby/quizzes from other client by sharing the url to the other players
  - [ ] Share lobby button
- [ ] Players accessing the lobby will see the actions taken by the admin:
  - [x] Selection and navigation to a given quizz
  - [ ] Navigation back from the quizz to the lobby
  - [x] Reveal of the question and/or options
  - [ ] Accessing the link of a quizz/lobby shows the current state of what the admin sees
- [x] Accessing lobby or quizzes from another window on the same client correctly identifies the admin/player
- [ ] Submitting an answer resolves the quizz after a hardcoded delay

# Dev features

- [ ] Extract colors in colors.ts file
- [ ] Match height of quizz options
- [ ] Store db schema on repo
