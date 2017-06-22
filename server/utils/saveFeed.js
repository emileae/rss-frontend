const FeedParser = require('feedparser');
const request = require('request');
const _ = require('lodash');

var {Feed} = require('./../models/feed');

var SaveFeed = (channel) => {

  return new Promise((resolve, reject) => {

    var req = request(channel.url);
    var feedparser = new FeedParser();

    req.on('error', function (error) {
      reject("Unable to reach RSS channel", error);
    });

    req.on('response', function (res) {
      var stream = this; // `this` is `req`, which is a stream
      if (res.statusCode !== 200) {
        // this.emit('error', new Error('Bad status code, when requesting Channel URL'));
        reject("Bad status code, when requesting Channel URL");
      }
      else {
        stream.pipe(feedparser);
      }
    });

    feedparser.on('error', function (error) {
      // always handle errors
      reject("Unable to parse RSS feed", error);
    });


    // set a maximum number of feeds to read before stopping
    var maxFeeds = 10;
    var items = [];
    var channelTitle = "";
    feedparser.on('readable', function () {

      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;

      console.log("Start parsing feed.......");

      // update the channel document to reflect the title if its not already set
      // don't return a promise from this instance method,
      // since we don't want to interfere with promises down the line
      // TODO: optimise this... its called several times on feedparser.readable
      channelTitle = meta.title;

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

    feedparser.on('end', function () {
      console.log("calling end of streammmmmmm");
      console.log("items.length: ", items.length);
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
      }else{
        console.log("nothing to save to DB");
        return Promise.reject("No feeds available");
      }

    });

  });

};

module.exports = {
  SaveFeed: SaveFeed
}
