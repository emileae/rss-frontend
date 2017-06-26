const FeedParser = require('feedparser');
const request = require('request');
const _ = require('lodash');

var {Feed} = require('./../models/feed');
var {Channel} = require('./../models/channel');

var SaveFeed = (channel) => {

  return new Promise((resolve, reject) => {

    var req = request(channel.url);
    var feedparser = new FeedParser();
    var isError = false;
    var errorMessage = "";

    // set a maximum number of feeds to read before stopping
    var maxFeeds = 10;
    var items = [];
    var channelTitle = "";
    var channelLink = "";

    var sentResponse = false;

    var sendResponse = () => {
      sentResponse = true;
      if (isError){
        console.log("Unable to parse a feed.... so don't save channel and return error");
        Channel.findByIdAndRemove(channel._id).then((res)=>{
        }).catch((err)=>{
          console.log("error removing channel after invalid link meta property");
        });
        reject(errorMessage);
      }else{
        console.log("SHOULD SAVE CHANNEL");
        channel.updateTitle(channelTitle);
        if (items.length > 0){
          console.log("there are lots of items so save to DB");
          Feed.insertMany(items).then(()=>{
            // success case, feed has been saved successfully
            resolve();
          }).catch((error) => {
            console.log(JSON.stringify(error));
            reject("Unable to insertMany: ", error);
          });
        };
      };
    };

    req.on('error', function (error) {
      console.log("REJECT PROMISE.... request error");
      isError = true;
      errorMessage = "Unable to request Channel URL";
      if (!sentResponse){
        console.log("a");
        sendResponse ();
      }
    });

    req.on('response', function (res) {
      var stream = this; // `this` is `req`, which is a stream
      if (res.statusCode !== 200) {
        console.log("REJECT PROMISE.... bad status code");
        isError = true;
        // this.emit('error', new Error('Bad status code, when requesting Channel URL'));
        errorMessage = "Bad status code, when requesting Channel URL";
        if (!sentResponse){
          console.log("b");
          sendResponse ();
        }
      }
      else {
        stream.pipe(feedparser);
      }
    });

    feedparser.on('error', function (error) {
      // always handle errors
      console.log("REJECT PROMISE.... cant parse feed");
      isError = true;
      errorMessage = "Unable to parse RSS feed";
      if (!sentResponse){
        console.log("c");
        sendResponse ();
      }
    });

    feedparser.on('readable', function () {

      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;

      // console.log("Start parsing feed.......");

      // update the channel document to reflect the title if its not already set
      // don't return a promise from this instance method,
      // since we don't want to interfere with promises down the line
      // TODO: optimise this... its called several times on feedparser.readable
      channelTitle = meta.title;
      channelLink = meta.link;// use this to validate if the url is a feed or not... no link = not RSS feed

      // This probably doesn't need to complete before returning success to server.js
      // it just needs to be kicked off
      // but if user wants to see complete list right away, then need to wait...

      while (item = stream.read()) {
        // pull the relevant properties form the item object
        item = _.pick(item, ['title', 'description', 'link', 'guid', 'author', 'pubDate']);
        // add the channel id to the feed item
        item._channel = channel._id;
        item.pubDate = item.pubDate.getTime();// convert to milliseconds since 1970
        items.push(item);
      };

    });

    // if (!channelLink || channelLink === null){
    //   isError = true;
    //   errorMessage = "Unable to parse RSS feed";
    //   if (!sentResponse){
    //     console.log("d");
    //     sendResponse ();
    //   }
    // }

    feedparser.on('end', function () {
      console.log("calling end of streammmmmmm");
      console.log("items.length: ", items.length);
        // channel.updateTitle(channelTitle);
        //
        // if (items.length > 0){
        //   console.log("there are lots of items so save to DB");
        //   Feed.insertMany(items).then(()=>{
        //     // success case, feed has been saved successfully
        //     resolve();
        //   }).catch((error) => {
        //     console.log(JSON.stringify(error));
        //     reject("Unable to insertMany: ", error);
        //   });
        // }else{
        //   // TODO: just because there are no feeds doesn't mean it should be rejected...
        //   // could be a valid RSS channel, that just hasn't started sending out items yet
        //   console.log("nothing to save to DB");
        //   return Promise.reject("No feeds available");
        // }

        if (!sentResponse){
          console.log("e");
          sendResponse ();
        }

    });

  });

};

module.exports = {
  SaveFeed: SaveFeed
}
