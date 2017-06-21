var axios = require('axios');

const RSS_BACKEND_URL = 'http://localhost:3000';

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
    }).catch(function (error){
      console.log("Registration error: ", error);
    });

  }
}

module.exports = APILogin;
