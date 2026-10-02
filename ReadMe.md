# Krysselista

Built by [Anniken](https://github.com/AnnikenJE), [breadbakerlevi](https://github.com/breadbakerlevi) and [Adka001](https://github.com/Adka001).

A cross-platform attendance app for kindergartens. Parents register their children and check them in or out for the day, while employees get a live overview of who is present. Built with React Native and Expo Router on top of Firebase.

Built to demonstrate an agile development process for a university course, not as a finished product. Some features are partially wired up.

## Features

- **Roles:** sign up as a parent or an employee; the tab bar and home screen adapt to the role
- **Register child:** parents add a child with name, health info and birthday
- **Check in/out:** parents toggle a child's presence for the day
- **Status overview:** employees see every child with a present/absent filter
- **Search:** employees look up a child by name
- **My child:** parents view their child's details, presence status and their own contact info
- **Settings:** edit phone and email, pick an interface language, read the privacy policy, log out

## Tech Stack

| Layer | Tools |
|---|---|
| Language | TypeScript |
| UI | React Native, React 19, Expo SDK 54 |
| Navigation | Expo Router (file-based) with role-based bottom tabs |
| Authentication | Firebase Auth |
| Database | Cloud Firestore |
| Linting | ESLint (eslint-config-expo) |

## Architecture

```
Krysselista/
  app/
    authentication.tsx         Sign in and sign up
    (app)/_layout.tsx          Redirects to /authentication when signed out
    (app)/(tabs)/             homeParent, homeEmployee, children, myChild, settings
  api/                         Firebase access layer (auth, children, users)
  providers/authenticationContext.tsx  Auth session context, exposes the signed-in user and role
  interfaces/                  ChildData, UserData
  theme/                       Shared colors and font sizes
```

Screens never talk to Firebase directly, every read and write goes through a function in `api/`, which returns plain typed objects. `index.tsx` under `(tabs)/` redirects to `homeParent` or `homeEmployee` based on `user.isEmployee`.

The user interface is in Norwegian; code, comments and documentation are in English.

## Getting Started

**Requirements:** Node.js 18+, npm, and a Firebase project with Authentication and Firestore enabled.

```bash
git clone git@github.com:AnnikenJE/exam-agile-project-2025.git
cd exam-agile-project-2025/Krysselista
npm install
```

`firebaseConfig.js` and `firebaseEnv.js` are kept out of version control and must be added locally, exporting an initialized `auth` and `db` from your own Firebase project.

```bash
npm start        # Expo dev server
npm run android  # run on Android
npm run ios      # run on iOS
npm run web      # run in the browser
npm run lint     # ESLint
```

## Background

Originally built as the exam project for **Agile Project (7.5 ECTS)**, Kristiania University College, graded **A**.
