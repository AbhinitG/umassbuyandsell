// import { TodoListView, TaskList } from './TodoListView.js';
import { Events } from './Events.js';
import { NavBar } from './Navbar.js';

export class App {
  #todolistViewElm = null;
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

    buttonElm.addEventListener("click", async () => {
      console.log(emailInputElm.value);
      if (emailInputElm.value.slice(-10) === "@umass.edu") {
        rootElm.innerHTML = "";

        const navbarElm = document.createElement('div');
        navbarElm.id = 'navbar';
        const navbar = new NavBar();
        navbarElm.appendChild(await navbar.render());

        rootElm.appendChild(navbarElm);
      }
    });

    // const navbarElm = document.createElement('div');
    // navbarElm.id = 'navbar';
    // const navbar = new NavBar();
    // navbarElm.appendChild(await navbar.render());

    // this.#mainViewElm = document.createElement('div');
    // this.#mainViewElm.id = 'main-view';

    // rootElm.appendChild(navbarElm);
    // rootElm.appendChild(this.#mainViewElm);

    // const todoListView = new TodoListView();
    // this.#todolistViewElm = await todoListView.render();
    // this.#navigateTo('todolist');

    // this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
  }

  async #navigateTo(view) {
    this.#mainViewElm.innerHTML = '';
    if (view === 'todolist') {
      this.#mainViewElm.appendChild(this.#todolistViewElm);
      window.location.hash = view;
    } else if (view === 'archive') {
      console.log('It gets here');
      // TODO: this is where we want to add the archive view
      // Archive List View
      const archive = document.createElement('div');
      archive.id = 'archive-list-view';

      const titleElm = document.createElement('h1');
      titleElm.innerText = 'Archive View';

      const archiveListContainerElm = document.createElement('div');
      archiveListContainerElm.id = 'archive-list-container';

      archive.appendChild(titleElm);
      archive.appendChild(archiveListContainerElm);

      // archive.innerHTML = '<h1>Archive view (coming soon)</h1>';
      // Archive List 
      const archiveListElm = document.createElement('div');
      archiveListElm.id = 'archive-list';

      const archiveTaskList = new TaskList();
      const archiveTaskListElm = await archiveTaskList.archive_render();
      archiveListElm.appendChild(archiveTaskListElm);

      archive.appendChild(archiveListElm);

      this.#mainViewElm.appendChild(archive);
      window.location.hash = view;
    } else {
      this.#mainViewElm.appendChild(this.todolist);
      window.location.hash = 'todolist';
    }
  }
}