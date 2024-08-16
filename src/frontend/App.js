import { ProductView } from './ProductView.js';
import { Events } from './Events.js';
import { NavBar } from './Navbar.js';
import { Store } from './Store.js'

export class App {
  #productViewElm = null;
  #mainViewElm = null;
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render(root) {
    const rootElm = document.getElementById(root);
    rootElm.innerHTML = '<div id="login page" class="h-full"><div class="flex justify-center items-center h-full bg-red-800"><div class="w-7/12 p-6 bg-white rounded-md"><div class="justify-start"><img src="/src/images/logo.png" alt="UMASS logo" class="w-36 h-25"/><h3 class="text-4xl ml-36 -mt-12 font-bold">buyandsell</h3></div><div class="justify-start mt-4"><h1 class="text-4xl font-bold">Sign in</h1><h3 class="text-lg mt-2">Use your UMASS email</h3></div><div class="ml-96 -mt-10"><input type="email" id="emailInput" class="p-2 border border-gray-300 rounded" placeholder="Your UMASS email"/></div><div class="flex justify-end -mb-1"><button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" id="next">Next</button></div></div></div></div>';

    // const loginPageElm = document.getElementById("login page");
    // const loginPageInner = loginPageElm.innerHTML;
    const emailInputElm = document.getElementById("emailInput");
    const buttonElm = document.getElementById("next");
    const store = Store.store();
    store.set("users", [{id: "user1@umass.edu", posts: [{id: Math.random().toString(36), image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNiAqRnzwKt1nLUpWkRKEYzVCsU9QafUmcw&s', title: 'Grey Chair', price: '$25.00', description: 'This is a brief description of the grey chair. It is in good condition and very comfortable.', seller: 'user1@umass.edu'}]}, {id: "user2@umass.edu", posts: [{id: Math.random().toString(36), image: 'https://i5.walmartimages.com/seo/MERITLIFE-Modern-Sofa-Couch-Solid-Wood-Frame-Living-Room-Furniture-Removable-Back-Cushion-Seat-Cushion-Blue-88-58-Wide-3-Seater_2bdca44b-2f6f-4042-8297-8f7dc1e6abf6.42786963f0ff80bcb6ae30e61b0bfde5.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', title: 'Grey Sofa', price: '$100.00', description: 'This is a brief description of the grey sofa. It is in good condition and very comfortable. It is a must have.', seller: 'user2@umass.edu'}]}]);

    buttonElm.addEventListener("click", async () => {
      if (emailInputElm.value.slice(-10) === "@umass.edu") {
        // setting and storing the new user in the local database
        const userObj = {id: emailInputElm.value, posts: []};
        const tempArr = store.get("users");
        tempArr.push(userObj);
        store.set("users", tempArr);

        rootElm.innerHTML = "";

        const navbarElm = document.createElement('div');
        navbarElm.id = 'navbar';
        const navbar = new NavBar();
        navbarElm.appendChild(await navbar.render());

        this.#mainViewElm = document.createElement('div');
        this.#mainViewElm.id = 'main-view';

        rootElm.appendChild(navbarElm);
        rootElm.appendChild(this.#mainViewElm);

        const productView = new ProductView();
        this.#productViewElm = await productView.render();
        this.#navigateTo('browse');

        this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
      }
    });
  }

  async #navigateTo(view) {
    this.#mainViewElm.innerHTML = '';
    if (view === 'browse') {
      this.#mainViewElm.appendChild(this.#productViewElm);
      window.location.hash = view;
    } else if (view === 'create') {
      const create = document.createElement('div');
      create.innerHTML = '<h1>Create view (coming soon)</h1>';
      this.#mainViewElm.appendChild(create);
      // this.#mainViewElm.appendChild(this.#todolistViewElm);
      window.location.hash = view;
    }
    else if (view === "create") {
      const create = document.createElement('div');
      create.innerHTML = '<h1>Create view (coming soon)</h1>';
      this.#mainViewElm.appendChild(create);
      // this.#mainViewElm.appendChild(this.#todolistViewElm);
      window.location.hash = view;
    } 
    else if (view === "myposts") {
      const myPosts = document.createElement('div');
      myPosts.innerHTML = '<h1>My Posts view (coming soon)</h1>';
      this.#mainViewElm.appendChild(myPosts);
      // this.#mainViewElm.appendChild(this.#todolistViewElm);
      window.location.hash = view;
    }
    else if (view === "logout") {
      localStorage.clear();
      const app = new App();
      await app.render('root');
    }
    else {
      const browse = document.createElement('div');
      browse.innerHTML = '<h1>Browse view (coming soon)</h1>';
      this.#mainViewElm.appendChild(browse);
      // this.#mainViewElm.appendChild(this.#todolistViewElm);
      window.location.hash = view;
    }
  }
}