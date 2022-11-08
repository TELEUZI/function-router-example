import AppRoute from './enums/app-routes';

export interface Route {
  name: AppRoute;
  component: () => Promise<HTMLElement>;
}

export class Router {
  constructor(
    private readonly routes: Route[],
    private onHashChange: (route: Route) => void,
    private defaultComponent?: () => Promise<HTMLElement>,
  ) {
    window.addEventListener('hashchange', this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }

  onHashChangeHandler() {
    const path = window.location.hash.slice(1);
    const route = this.routes.find((r) => r.name === path);
    this.onHashChange(route ?? { name: AppRoute.Default, component: this.defaultComponent });
  }

  destroy() {
    window.removeEventListener('hashchange', this.onHashChangeHandler.bind(this));
  }
}

export function createRouter(routerOutlet: HTMLElement) {
  return new Router(
    [
      {
        name: AppRoute.Start,
        component: async () => {
          const { default: createPage } = await import('./components/start-page');
          return createPage();
        },
      },
      {
        name: AppRoute.Quiz,
        component: async () => {
          const { default: createPage } = await import('./components/quiz-page');
          return createPage([
            {
              name: 'bird1',
              description: 'bird 1',
              image: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/bird-1867616_960_720.jpg',
            },
            {
              name: 'bird2',
              description: 'bird 2',
              image: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/bird-1867616_960_720.jpg',
            },
            {
              name: 'bird3',
              description: 'bird 3',
              image: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/bird-1867616_960_720.jpg',
            },
          ]);
        },
      },
      {
        name: AppRoute.Results,
        component: async () => {
          const { default: createPage } = await import('./components/results-page');
          return createPage([
            { name: 'test', score: 100 },
            { name: 'test1', score: 110 },
            { name: 'test2', score: 120 },
            { name: 'test3', score: 130 },
          ]);
        },
      },
    ],
    (route) => {
      if (route) {
        route.component().then((component) => {
          routerOutlet.innerHTML = '';
          routerOutlet.appendChild(component);
        });
      }
    },
    async () => {
      const { default: createPage } = await import('./components/start-page');
      return createPage();
    },
  );
}
