import { Events } from './Events.js';

export class NavBar {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    // Create a <header> element to hold the navigation bar
    const elm = document.createElement('header');

    // Populate the <header> element with the navigation links
    elm.innerHTML = `
        <nav>
            <div class="p-1">
              <img
                src="/src/images/logo.png"
                alt="umassbuyandsell logo"
                class="w-32 h-22"
              />
              <h3 class="text-3xl ml-32 -mt-12 font-bold text-white">
                buyandsell
              </h3>
            </div>
            <div id="navbar">
              <ul>
                <li>
                  <a href="#browse">Browse</a>
                </li>
                <li>
                  <a href="#create">Create</a>
                </li>
                <li>
                  <a href="#myposts">My Posts</a>
                </li>
                <li class="mr-3">
                  <a href="#logout">Log Out</a>
                </li>
              </ul>
            </div>
          </nav>`;

    // Get all the anchor tags within the <header> element
    const links = elm.querySelectorAll('a');

    // Add event listeners to each anchor tag
    links.forEach(link => {
      link.addEventListener('click', async e => {
        // Prevent the default anchor tag behavior
        e.preventDefault();

        // Get the view name from the href attribute
        const view = e.target.getAttribute('href').replace('#', '');

        // Update the window's hash to reflect the current view
        window.location.hash = view;

        // Call the navigateTo function with the view name
        await this.#events.publish('navigateTo', view);
      });
    });

    // Return the populated navigation bar element
    return elm;
  }
}
