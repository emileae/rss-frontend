var axios = require('axios');

const RSS_BACKEND_URL = 'https://130.211.100.142/';

var APIAddChannel = {
  addChannel: function(url){
    var requestUrl = `${RSS_BACKEND_URL}/channels`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.post(requestUrl, {
      url: url
    }).then(function(response){
      console.log("addChannel response: ", response);
      if (response.data.hasOwnProperty('action')){
        if (response.data.action == "notification"){
          alert(response.data.message);
        }
      }
    }).catch(function (error){
      console.log("addChannel error: ", error);
      if (error.data.hasOwnProperty('action')){
        if (error.data.action == "notification"){
          alert(error.data.message);
        }
      }
    });

  }
}

module.exports = APIAddChannel;
