/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import RoutesType from '../types/RoutesType';

// React.js News Feed (RSS)
const url = 'http://localhost:3001/assets/ajax/routes.json';

let result = {};
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const routes = {
  type: new List(RoutesType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            result = data.result;
          }

          return result;
        })
        .finally(() => {
          lastFetchTask = null;
        });

      if (typeof result !== 'undefined') {
        return result;
      }

      return lastFetchTask;
    }

    return result;
  },
};

export default routes;
