var React = require('react');

var Feed = React.createClass({
  render: function(){
    var {title} = this.props;
    var {link} = this.props;
    var {description} = this.props;
    return (
      <div>
        <h3><a href={link} target="_blank">{title}</a></h3>
        <div dangerouslySetInnerHTML={{__html: description}}>
        </div>
      </div>
    )
  }
});

module.exports = Feed;
