/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';
import fetch from '../../core/fetch';

export default {

  path: '*',

  async action() {
    // const data = await require.ensure([], require => require('./page.md'), 'about');
    console.log(this);
    let data = {};
    if (this['json-path']) {
      const resp = await fetch('/assets/ajax/home.json');
      data = await resp.json();
      console.log(data);
    } else {
      data = data || {
        title: 'Page Title',
        modules: [
          {
            module: 'Intro',
          },
        ],
      };
    }

    return {
      title: data.title,
      chunk: 'page',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
