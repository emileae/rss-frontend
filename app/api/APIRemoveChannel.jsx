var axios = require('axios');

const RSS_BACKEND_URL = window.location.origin;//'http://130.211.100.142';
// TODO: extract url into ENV variable
var APIRemoveChannel = {
  removeChannel: function(channelId){
    var requestUrl = `${RSS_BACKEND_URL}/channels/${channelId}`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.delete(requestUrl).then(function(response){
      console.log("removeChannel response: ", response);
      // if (response.data.action == "notification"){
      //   alert(response.data.message);
      // }
    }).catch(function (error){
      console.log("removeChannel error: ", error);
      if (response.data.action == "notification"){
        alert(response.data.message);
      }
    });

  }
}

module.exports = APIRemoveChannel;
