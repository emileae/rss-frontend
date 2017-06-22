var React = require('react');
var {Link} = require('react-router');

var Register = require('Register');
var Login = require('Login');
var Logout = require('Logout');

// API
var APIFetchChannels = require('APIFetchChannels');

var Nav = React.createClass({
  render: function(){
    // var loggedIn = this.state.loggedIn;
    // var loggedInText = loggedIn ? 'Logout' : 'Login';

    var {isLoggedIn, checkLogin} = this.props;

    var loginBtns = () => {
      if (isLoggedIn){
        return <Logout checkLogin={checkLogin}/>;
      }else{
        return (
          <div>
            <Link to="/login">Login</Link>
            /
            <Link to="/register">Register</Link>
          </div>
        );
      }
    };

    return (


        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text">Turbulent RSS</li>
              <li>
                <a href="#">Home</a>
              </li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                {loginBtns()}
              </li>
            </ul>
          </div>
        </div>

    )
  }
});

module.exports = Nav;
