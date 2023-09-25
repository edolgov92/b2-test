# B2Broker Test app

> SPA Angular application to render large amount of data received from pseudo-socket

[![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/edolgov92/ch-test/blob/main/LICENSE)
![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
[![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io/)
[![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
[![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![Jasmine](https://img.shields.io/badge/-Jasmine-8A4182?style=flat-square&logo=jasmine&logoColor=white)](https://jasmine.github.io/)
[![Karma](https://img.shields.io/badge/-Karma-E62345?style=flat-square&logo=karma&logoColor=white)](https://karma-runner.github.io/)
[![RxJS](https://img.shields.io/badge/-RxJS-B7178C?style=flat-square&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![NgRx](https://img.shields.io/badge/-NgRx-76D7C4?style=flat-square&logo=ngrx&logoColor=white)](https://ngrx.io/)
[![NGX-Translate](https://img.shields.io/badge/-NGX%20Translate-007ACC?style=flat-square)](http://www.ngx-translate.com/)

<img src="https://static.news.bitcoin.com/wp-content/uploads/2021/04/atV9kzjK-b2b.jpg" alt="logo" style="height: 140px; width: 250px; margin-bottom: 20px; padding: 10px; background-color: #333; border-radius: 20px;"/>

- [Requirements](#requirements)
- [Run project](#run-project)
- [Used patterns](#used-patterns)
- [Rendering approaches](#rendering-approaches)

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

Also you can check deployed production version using this url: http://52.146.89.86/

To run tests you can use this command: `npm run test`

## Used Patterns

### Patterns from RxJS library

#### Observer and Publish-Subscribe Patterns

Implemented primarily by RxJS, these patterns allow multiple observers to listen and react to updates or changes in an observable. The Publish-Subscribe is a variant of the Observer pattern, extensively used with observables in RxJS.

### Patterns from NgRx library

#### State Pattern

The NgRx Store utilizes the State pattern, representing the application state and offering a set of predefined methods for state transitions.

#### Command Pattern

NgRx effects essentially utilize the Command pattern, with each effect acting as a command to invoke side effects.

#### Facade Pattern

The NgRx Store serves as a facade, offering a streamlined API for interacting with the underlying complex state management logic.

#### Chain of Responsibility Pattern

NgRx effects implement this pattern, allowing the decoupling of a request sender from its receiver by letting multiple objects handle the request.

### Patterns from Web Worker

#### Worker/Background Worker Pattern

Web Workers enable running code in the background on a separate thread, parallel to the main execution thread, offloading complex computations or tasks and ensuring a smoother user experience.

### Patterns from NGX-Translate

#### Proxy Pattern

NGX-Translate employs the Proxy pattern to retrieve translations from various sources while offering a consistent API for obtaining translated strings.

### Patterns from Angular Framework

#### Singleton Pattern

Angular services, being singletons by default, are instantiated once per application. The NgRx Store is also a singleton.

#### Decorator Pattern

Angular extensively uses decorators like @Component, @Injectable, @Input, etc., to augment class declarations with metadata.

#### Factory Pattern

Angular utilizes factories for creating and configuring objects, especially in the context of dependency injection.

#### Module Pattern

Angular’s modularity stems from the Module pattern, grouping related components, directives, pipes, and services.

#### Strategy Pattern

Angular’s dependency injection employs the Strategy pattern to manage the procurement of class dependencies.

#### Composite Pattern

Angular components create a tree structure, with each component acting as a composite of its child components.

#### Template Method Pattern

Angular’s lifecycle hooks embody the Template Method pattern, with the framework invoking specific methods at predetermined points in a component’s lifecycle.

#### Styling/Structural Principles

SCSS (Sass) adheres to the DRY (Don’t Repeat Yourself) principle, facilitating the development of maintainable and scalable styles.

## Rendering Data Table

The application frequently receives data via a pseudo-socket, necessitating performance optimizations to ensure seamless functionality.

### General Techniques

#### Utilizing `ChangeDetectionStrategy.OnPush` in All Components

This strategy mitigates unnecessary UI updates and optimizes the total number of such updates, enhancing the performance of the application.

#### Incorporation of RxJS along with `throttleTime` and `distinctUntilChanged`

By employing RxJS operators, the application can control the rate at which view rendering occurs, thus offering an optimized and efficient way to handle high-frequency data changes. The `throttleTime` operator limits the frequency of emitted events, while `distinctUntilChanged` ensures that only distinct, non-consecutive values are emitted, reducing the load on the rendering mechanism.

### Rendering Approaches

There are two prevalent approaches to rendering components subjected to high-frequency data alterations:

#### Angular Binding

This method leverages Angular's binding feature to exhibit tables as depicted below:

```html
<tr *ngFor="let data of dataList$ | async; let i = index; trackBy: trackById">
  ...
  <td>
    <span class="label label-int">{{ data.int }}</span>
  </td>
  ...
</tr>
```

Utilizing the async pipe is crucial in this context, providing a more reactive approach to handling data updates efficiently. This tool not only streamlines the subscription and unsubscription processes but also serves to diminish the risks of memory leaks associated with observable subscriptions, enhancing the overall reliability of the application. Moreover, it ensures the component stays up-to-date with the latest values, allowing the app to reflect the current state of the observable, fostering a more dynamic user interface.

Coupled with the trackBy function, it enhances Angular’s performance in tracking objects and reduces the overhead of object recreation, ensuring smoother and more efficient updates.

This approach was choosen due to its benefits in development speed, maintainability, and readability. It proficiently accommodates up to 10 items in the list, especially when enhanced with `throttleTime` and `distinctUntilChanged` pipes. This method serves the current scope effectively. However, as the application grows, if there’s a necessity to render a more extensive list of items, or if there are changes in requirements necessitating advanced performance optimizations, transitioning to a manual rendering approach would be necessary. This transition would allow for more granular control and optimization, ensuring seamless user experience regardless of the data volume or frequency of updates.

#### Manual Rendering

This concept revolves around preemptively creating 10 rows and all required columns in the HTML template before the commencement of data reception. Initially, these rows are hidden. Crucially, we abstain from recreating them with each alteration in data; instead, we focus on updating the text and styles of specific columns.

Here, 10 predefined rows can be embedded in the HTML template:

```html
<!--... 10 rows-->
<tr>
  ...
  <td>
    <span class="label label-int"></span>
  </td>
  ...
</tr>
```

Initially hidden, these rows are updated in terms of inner text and visibility upon the reception of new data:

```javascript
interface Row {
  rowElement: HTMLTableRowElement;
  idElement: HTMLSpanElement;
  // ...
  childIdElement: HTMLSpanElement;
  // ...
}

const rows: Row[] = //... initialize with predefined existing HTML elements
  dataList$.subscribe((dataList: DataDto[]) => {
    for (let i = 0; i < 10; i++) {
      if (dataList.length > i) {
        // manually update rows[i] and all inner elements with values and make the row visible
      } else {
        // make the row hidden using .hidden class or rows[i].rowElement.style.display = 'none'
      }
    }
  });
```

The advantage of this manual rendering approach is its efficiency; it avoids the recreation of HTML elements and their destruction upon the reception of new data with new values. Instead, it updates the inner text and styles of pre-existing HTML elements, which are stored in an array, eliminating the need for repeated lookups when rendering new data.
