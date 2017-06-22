var React = require('react');

var Login = React.createClass({
  render: function(){
    return (
      <div>
        <Link to="/login">Login</Link>
        /
        <Link to="/register">Register</Link>
      </div>
    );
  }
});

module.exports = Login;
