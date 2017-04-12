import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Intro from './index';

describe('Intro', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<Intro/>);
    expect(root).toExist();
  });

  it('changes without problems', function () {
    var root = TestUtils.renderIntoDocument(<Intro/>);

    expect(root !== null);

    // const inputNode = ReactDOM.findDOMNode(root.className);

    // const newValue = 'some text';
    // inputNode.value = newValue;
    // TestUtils.Simulate.change(inputNode);

    // const nameNode = ReactDOM.findDOMNode(root.refs.name);
    // expect(nameNode.textContent).toEqual(newValue);
  });
});
