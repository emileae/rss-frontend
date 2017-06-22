var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var RSSApp = require('RSSApp');
var Main = require('Main');
var LoginPage = require('LoginPage');
var RegisterPage = require('RegisterPage');

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={LoginPage}></Route>
      <Route path="register" component={RegisterPage}></Route>
      <IndexRoute component={RSSApp}/>
    </Route>
  </Router>,
  // <RSSApp></RSSApp>,
  document.getElementById('app')
);
