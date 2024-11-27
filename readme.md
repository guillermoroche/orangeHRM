# OrangeHRM E2E Projects

This repository contains end-to-end (E2E) test projects for OrangeHRM.

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

## Introduction
OrangeHRM is an open-source human resource management software. This repository includes E2E test projects to ensure the quality and reliability of the OrangeHRM application.

## Project Structure
```
/home/guilleroche/E2E_projects/orangeHRM/
├── tests/
│   ├── login.test.js
│   ├── employee.test.js
│   └── leave.test.js
├── config/
│   ├── config.json
│   └── env.js
├── reports/
│   └── test-report.html
└── readme.md
```

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/guilleroche/orangeHRM.git
    ```
2. Navigate to the project directory:
    ```sh
    cd orangeHRM
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
To run the E2E tests, use the following command:
```sh
npx cypress run
```


## Authors
- Guillermo Roche Arcas (guillermorochea@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/guilleroche)


