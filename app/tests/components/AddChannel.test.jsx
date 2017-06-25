var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var AddChannel = require("AddChannel");
var APIAddChannel = require('APIAddChannel');

describe('AddChannel', ()=> {
  it ('should exist', ()=> {
    expect(AddChannel).toExist();
  });

  // it ('should call onAddChannel prop', ()=> {
  //   var channelURL = "http://feeds.reuters.com/news/artsculture";
  //   var spy = expect.createSpy();
  //   // var spy2 = expect.spyOn(APIAddChannel, 'addChannel');
  //   var addChannel = TestUtils.renderIntoDocument(<AddChannel onAddChannel={spy}/>);
  //   var $el = $(ReactDOM.findDOMNode(addChannel));
  //
  //   addChannel.refs.channelURL.value = channelURL;
  //   TestUtils.Simulate.submit($el.find('form')[0]);
  //
  //   // expect(spy).toHaveBeenCalledWith(channelURL);
  //   // expect(spy).toHaveBeenCalled();
  //   var spy2 = expect.spyOn(APIAddChannel, 'addChannel').and.returnValue(deferred.promise);
  //   expect(APIAddChannel.addChannel).toHaveBeenCalled();
  // });

  // it ('should not call onAddChannel prop with invalid data', ()=> {
  //   var channelURL = "";
  //   var spy = expect.createSpy();
  //   var addChannel = TestUtils.renderIntoDocument(<AddChannel onAddChannel={spy}/>);
  //   var $el = $(ReactDOM.findDOMNode(addChannel));
  //
  //   addChannel.refs.channelURL.value = channelURL;
  //   TestUtils.Simulate.submit($el.find('form')[0]);
  //
  //   expect(spy).toNotHaveBeenCalled();
  // });

});
