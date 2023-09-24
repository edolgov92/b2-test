# B2Broker Test app

> SPA Angular application to render large amount of data received from pseudo-socket

[![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/edolgov92/ch-test/blob/main/LICENSE)
![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
[![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io/)
[![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Jasmine](https://img.shields.io/badge/-Jasmine-8A4182?style=flat-square&logo=jasmine&logoColor=white)](https://jasmine.github.io/)
[![NgRx](https://img.shields.io/badge/-NgRx-76D7C4?style=flat-square&logo=ngrx&logoColor=white)](https://ngrx.io/)
[![NGX-Translate](https://img.shields.io/badge/-NGX%20Translate-007ACC?style=flat-square)](http://www.ngx-translate.com/)

<img src="https://static.news.bitcoin.com/wp-content/uploads/2021/04/atV9kzjK-b2b.jpg" alt="logo" style="height: 140px; width: 250px; margin-bottom: 20px; padding: 10px; background-color: #333; border-radius: 20px;"/>

- [Requirements](#requirements)
- [Run project](#run-project)

## Requirements

Create a SPA application that receives large amounts of data with high frequency. The data should be received in the web-worker from a pseudo-socket and passed to the main thread. The main thread should render the incoming data in the amount of the last 10 elements.

1. Make a pseudo-socket through a timer. Take into account the ability to change the value of the timer interval through the UI (input), in ms
2. The size of the data array coming from the pseudo-socket can be adjusted via the UI (input)
3. A single array element is an object that has the following fields:\
   a. id - string field\
   b. int - integer field\
   c. float - float field (precision === 18)\
   d. color - string field with color name (can be in any representation rgb, hex, string)\
   e. child - field which is an object that has two fields - id and color
4. Only the last 10 elements will be displayed in the UI and may contain their own set of ids, which can be set in the UI. For example, 1000 items come from the thread. Of these, 10 elements are selected for display as specified in the task. If additional_ids are set, the IDs are overwritten for the first elements of these 10 elements.
5. In the main thread, you need to use not raw objects, but classes that are created based on the models described in step 3
6. In the UI, it is required to display data in the following representation:
   a. each element is a table row b. fields are columns
   c. child is a nested table
   When rendering the color column, it is necessary to fill its background with the color specified in the field

#### Technologies and libraries:

1. Angular 15
2. Web-worker
3. Jest || Jasmine+Karma

#### The main points when checking the test:

1. Compliance with the specified requirements
2. Use of specified technologies and libraries
3. Performance (under different given conditions)
4. Decomposition of code entities
5. Writing unit-tests (jest is preferable)

#### Will be a plus:

1. Using design patterns

## Run project

1. Clone this repository: `git clone https://github.com/edolgov92/b2-test.git`
2. Install dependencies: `npm i`
3. Run project: `npm start`
