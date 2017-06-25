var axios = require('axios');

const RSS_BACKEND_URL = window.location.origin;//'http://130.211.100.142';

var APILogin = {
  login: function(email, password){
    var requestUrl = `${RSS_BACKEND_URL}/users/login`;

    return axios.post(requestUrl, {
      email: email,
      password: password
    }).then(function(response){
      console.log("Login response: ", response);
      console.log("TOKEN: ", response.data.token);
      localStorage.setItem("token", response.data.token);
    }).catch(function (error){
      console.log("Login error: ", error);
    });

  }
}

module.exports = APILogin;
