/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const dataType = new ObjectType({
  name: 'data',
  fields: {
    articles: { type: StringType },
  },
});

const RoutesType = new ObjectType({
  name: 'Routes',
  fields: {
    path: { type: StringType },
    page: { type: StringType },
    chunk: { type: StringType },
    data: { type: dataType },
  },
});

export default RoutesType;
