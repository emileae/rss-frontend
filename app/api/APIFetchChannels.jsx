var axios = require('axios');

const RSS_BACKEND_URL = 'https://130.211.100.142/';

var APIFetchChannels = {
  fetchChannels: function(){

    var requestUrl = `${RSS_BACKEND_URL}/users/channels`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.get(requestUrl).then(function(response){
      console.log("Channels: ", response);
      return response;
    }).catch((err)=>{
      console.log("Error fetching channels: ", err);
      if (err.status == 401){
        localStorage.setItem('token', "");
      }
    });

  }
}

module.exports = APIFetchChannels;
