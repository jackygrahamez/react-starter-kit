import fetch from './core/fetch';
/* eslint-disable global-require */

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

async function routeTest() {
  try {
    const result = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{routes{path,children{path}}}',
      }),
      credentials: 'include',
    });
    let routeData = await result.json();
    if (routeData.data && routeData.data.routes) {
      routeData = routeData.data.routes[0];
      customRoute.children = routeData.children || customRoute.children;
      customRoute.children = customRoute.children.map((item) => {
        item.action = routes.children[0].action; // eslint-disable-line no-param-reassign
        return item;
      });
      if (typeof customRoute) {
        return customRoute;
      }
    } else {
      const retry = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: '{routes{path,children{path}}}',
        }),
        credentials: 'include',
      });
      let routeDataRetry = await retry.json();
      if (routeDataRetry.data && routeDataRetry.data.routes) {
        routeDataRetry = routeDataRetry.data.routes[0];
        customRoute.children = routeDataRetry.children || customRoute.children;
        customRoute.children = customRoute.children.map((item) => {
          item.action = routes.children[0].action; // eslint-disable-line no-param-reassign
          return item;
        });
        if (typeof customRoute) {
          return customRoute;
        }
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default routeTest;
