var axios = require('axios');

const RSS_BACKEND_URL = 'http://23.251.133.59/';

var APIFetchFeeds = {
  fetchFeeds: function(channelId){

    console.log("in API Fetch Feeds", channelId);

    var requestUrl = `${RSS_BACKEND_URL}/channels/${channelId}`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.get(requestUrl).then(function(response){
      console.log("Feeds: ", response);
      return response;
    }).catch((err)=>{
      console.log("Error fetching feeds: ", err);
    });

  }
}

module.exports = APIFetchFeeds;
