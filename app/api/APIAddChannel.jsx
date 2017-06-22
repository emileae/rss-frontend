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
      if (response.data.action == "notification"){
        alert(response.data.message);
      }
    }).catch(function (error){
      console.log("addChannel error: ", error);
      if (response.data.action == "notification"){
        alert(response.data.message);
      }
    });

  }
}

module.exports = APIAddChannel;
