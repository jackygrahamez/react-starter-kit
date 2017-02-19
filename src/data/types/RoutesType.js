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
  GraphQLList as ListType,
} from 'graphql';

const childrenType = new ObjectType({
  name: 'children',
  fields: {
    path: { type: StringType },
  },
});

const RoutesType = new ObjectType({
  name: 'Routes',
  fields: {
    path: { type: StringType },
    children: { type: new ListType(childrenType) },
  },
});

export default RoutesType;
