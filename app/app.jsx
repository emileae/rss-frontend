var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var RSSApp = require('RSSApp');

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={RSSApp}>
    </Route>
  </Router>,
  // <RSSApp></RSSApp>,
  document.getElementById('app')
);
