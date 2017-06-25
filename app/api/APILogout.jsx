var axios = require('axios');

const RSS_BACKEND_URL = 'https://130.211.100.142/';

var APILogout = {
  yoyo: function(){
    console.log("yoyo");
  },
  logout: function(){
    var requestUrl = `${RSS_BACKEND_URL}/users/me/token`;

    var authToken = localStorage.getItem('token');
    axios.defaults.headers.common['x-auth'] = authToken;

    return axios.delete(requestUrl).then(function(response){
      console.log("Logout response: ", response);
      localStorage.setItem("token", "");
    }).catch(function (error){
      console.log("Logout error: ", error);
    });

  }

}

module.exports = APILogout;
