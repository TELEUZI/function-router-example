import AppRoute from './enums/app-routes';
import { createRouter, Router } from './router';
import './style.scss';

function createLinks() {
  const links = [
    document.createElement('a'),
    document.createElement('a'),
    document.createElement('a'),
  ];
  links[0].href = `#${AppRoute.Start}`;
  links[0].textContent = 'Start';
  links[1].href = `#${AppRoute.Quiz}`;
  links[1].textContent = 'Quiz';
  links[2].href = `#${AppRoute.Results}`;
  links[2].textContent = 'Result';
  return links;
}

class App {
  private readonly appId = 'app';

  private router: Router;

  start(): void {
    const root = document.querySelector<HTMLElement>(`#${this.appId}`);
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    createLinks().forEach((link) => {
      root.appendChild(link);
    });
    root.appendChild(wrapper);

    if (root) {
      this.router = createRouter(wrapper);
    }
  }

  destroyApp() {
    const root = document.querySelector<HTMLElement>(`#${this.appId}`);
    root.innerHTML = '';
    this.router.destroy();
  }
}

const app: App = new App();
app.start();
