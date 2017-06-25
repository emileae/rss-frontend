var axios = require('axios');

const RSS_BACKEND_URL = 'http://130.211.100.142';

var APIFetchChannels = {
  fetchChannels: function(){

    var requestUrl = `${RSS_BACKEND_URL}/users/me`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.get(requestUrl).then(function(response){
      console.log("Token valid: ", response);
      return response;
    }).catch((err)=>{
      console.log("Error token valid: ", err);
    });

  }
}

module.exports = APIFetchChannels;
