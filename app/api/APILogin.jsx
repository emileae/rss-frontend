var axios = require('axios');

const RSS_BACKEND_URL = 'http://localhost:3000';

var APILogin = {
  login: function(email, password){
    var requestUrl = `${RSS_BACKEND_URL}/users/login`;

    axios.post(requestUrl, {
      email: email,
      password: password
    }).then(function(response){
      console.log("Axios response: ", response);
    }).catch(function (error){
      console.log("Axios error: ", error);
    });
  }
}

module.exports = APILogin;
