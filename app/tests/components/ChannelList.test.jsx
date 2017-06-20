var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var ChannelList = require('ChannelList');
var Channel = require('Channel');

describe('ChannelList', () => {
  it('should exist', () => {
    expect(ChannelList).toExist();
  });

  it('should render 1 channel component for each channel item',  ()=> {
      var channels = [
        {
          id: 1,
          title: 'Channel A'
        },
        {
          id: 2,
          title: 'Channel B'
        }
      ];
      var channelList = TestUtils.renderIntoDocument(<ChannelList channels={channels}/>);
      var channelsComponents = TestUtils.scryRenderedComponentsWithType(channelList, Channel);// returns an array fo channelsComponents
      expect(channelsComponents.length).toBe(channels.length);

  });

})
