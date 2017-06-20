var React = require('react');
var ReactDOM = require('react-dom');
var testUrils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var RSSApp = require('RSSApp');

describe('RSSApp', () => {
  it('should exist', () => {
    expect(RSSApp).toExist();
  });
})
