var axios = require('axios');

const RSS_BACKEND_URL = 'http://localhost:3000';

var APIAddChannel = {
  addChannel: function(url){
    var requestUrl = `${RSS_BACKEND_URL}/channels`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.post(requestUrl, {
      url: url
    }).then(function(response){
      console.log("addChannel response: ", response);
    }).catch(function (error){
      console.log("addChannel error: ", error);
    });

  }
}

module.exports = APIAddChannel;
