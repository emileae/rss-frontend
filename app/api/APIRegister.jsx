var axios = require('axios');

const RSS_BACKEND_URL = window.location.origin;//'http://130.211.100.142';

var APILogin = {
  register: function(email, password, verify_password, name, surname){
    var requestUrl = `${RSS_BACKEND_URL}/users`;

    console.log("password: ", password);
    console.log("verify_password: ", verify_password);

    return axios.post(requestUrl, {
      email: email,
      password: password,
      verify_password: verify_password,
      name: name,
      surname: surname
    }).then(function(response){
      localStorage.setItem("token", response.data.token);
      console.log("API Registration success: ", response);
      if (response.data.hasOwnProperty('action')){
        if (response.data.action == "notification"){
          alert(response.data.message);
        }
      }
      return response;
    }).catch(function (error){
      console.log("API Registration error: ", error);
      if (error.data.hasOwnProperty('action')){
        if (error.data.action == "notification"){
          alert(error.data.message);
        }
      }
      return error;
    });

  }
}

module.exports = APILogin;
