/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './Page.css';

import Feedback from '../Feedback';
import Footer from '../Footer';
import Header from '../Header';
import Layout from '../Layout';
import Link from '../Link';
import Navigation from '../Navigation';
import Intro from '../Intro';

const importedModules = {
  Feedback,
  Footer,
  Header,
  Layout,
  Link,
  Navigation,
  Intro,
};

class Page extends React.Component {
  static propTypes = {
    modules: React.PropTypes.arrayOf(React.PropTypes.shape({
      module: React.PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    const { modules } = this.props;
    let key = 0;
    const items = modules.map((item) => {
      key += 1;
      return React.createElement(importedModules[item.module], {
        key,
      });
    });
    return (
      <div className={s.root}>
        {items}
      </div>
    );
  }
}

export default Page;
