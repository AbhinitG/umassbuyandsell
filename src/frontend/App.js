import { TodoListView, TaskList } from './TodoListView.js';
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
    rootElm.innerHTML = '';

    const navbarElm = document.createElement('div');
    navbarElm.id = 'navbar';
    const navbar = new NavBar();
    navbarElm.appendChild(await navbar.render());

    this.#mainViewElm = document.createElement('div');
    this.#mainViewElm.id = 'main-view';

    rootElm.appendChild(navbarElm);
    rootElm.appendChild(this.#mainViewElm);

    const todoListView = new TodoListView();
    this.#todolistViewElm = await todoListView.render();
    this.#navigateTo('todolist');

    this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
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