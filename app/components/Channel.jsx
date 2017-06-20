var React = require('react');

var Channel = React.createClass({
  render: function(){
    var {title} = this.props;
    return (
      <div>{title}</div>
    )
  }
});

module.exports = Channel;
