import { App } from './App.js';

const loginPageElm = document.getElementById("login page");
const loginPageInner = loginPageElm.innerHTML;
const emailInputElm = document.getElementById("emailInput");
const buttonElm = document.getElementById("next");


// Mount the application to the root element.
const app = new App();
await app.render('root');

// Testing Support
// const resetState = () => {
//   localStorage.clear();
//   const app = new App();
//   app.render('root');
// };

// document.getElementById('reset-state').addEventListener('click', resetState);