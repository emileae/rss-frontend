var {CronJob} = require('cron');

var {Channel} = require('./../models/channel');
var {UpdateFeed} = require('./updateFeed');


// cron job run every minute
var startUpdateFeeds = () => {
  new CronJob('0 */5 * * * *', function() {
    // TODO: paginate this... async pages, in increments of 100 or so... may go over the 5min limit after a while
    Channel.find().then((channels)=>{
      for (var i=0; i<channels.length; i++){
        UpdateFeed(channels[i]);
      }
    }).catch((err)=>{
      console.log("cron wnet wrong");
    });
  console.log('You will see this message every minute');
  }, null, true, 'Europe/Stockholm')
};

module.exports = {
  startUpdateFeeds
}
