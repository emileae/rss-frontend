var React = require('react');
var ReactDOM = require('react-dom');
var testUrils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var Channel = require('Channel');

describe('Channel', () => {
  it('should exist', () => {
    expect(Channel).toExist();
  });
})
