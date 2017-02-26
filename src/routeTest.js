import fetch from './core/fetch';
/* eslint-disable global-require */

const url = 'http://localhost:3001/assets/ajax/routes.json';

const routes = {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./routes/page').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();
    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
    route.description = route.description || '';
    return route;
  },
};
const customRoute = {
  path: '/',
  children: [{
    path: '/',
  },
  {
    path: '/home',
  },
  {
    path: '*',
  },
  ],
  action: routes.action,
};

function routeTest() {
  return new Promise((resolve, reject) => {
    try {
      fetch(url).then(response => response.json())
      .then((routeData) => {
        if (routeData && routeData.result && routeData.result[0]) {
          const routeList = routeData.result[0];
          customRoute.children = routeList.children || customRoute.children;
          customRoute.children = customRoute.children.map((item) => {
            item.action = routes.children[0].action; // eslint-disable-line no-param-reassign
            console.log(item);
            return item;
          });
          resolve(customRoute);
        }
      });
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });
}

export default routeTest;
