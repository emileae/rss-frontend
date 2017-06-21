var axios = require('axios');

const RSS_BACKEND_URL = 'http://localhost:3000';

var APIFetchChannels = {
  fetchChannels: function(){

    var requestUrl = `${RSS_BACKEND_URL}/users/channels`;

    console.log("localStorage", localStorage.getItem('token'));

    var authToken = localStorage.getItem('token');

    console.log("localStorage", authToken);

    // axios.defaults.headers.common['x-auth'] = authToken;

    var config = {'x-auth': authToken, "x-BBBBBBBBBBBBBBBBBBBBBBBB": "BB"};

    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.get(requestUrl).then(function(response){
      console.log("Channels: ", response);
    }).catch((err)=>{
      console.log("Error fetching channels: ", err);
    });

  }
}

module.exports = APIFetchChannels;
