var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var AddChannel = require("AddChannel");

describe('AddChannel', ()=> {
  it ('should exist', ()=> {
    expect(AddChannel).toExist();
  });

  it ('should call onAddChannel prop with valid data', ()=> {
    var channelURL = "http://emile.me/rss";
    var spy = expect.createSpy();
    var addChannel = TestUtils.renderIntoDocument(<AddChannel onAddChannel={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addChannel));

    addChannel.refs.channelURL.value = channelURL;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(channelURL);
  });

  it ('should not call onAddChannel prop with invalid data', ()=> {
    var channelURL = "";
    var spy = expect.createSpy();
    var addChannel = TestUtils.renderIntoDocument(<AddChannel onAddChannel={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addChannel));

    addChannel.refs.channelURL.value = channelURL;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });

});
