var React = require('react');

var $ = require('jquery');

var AlertModal = React.createClass({
  componentDidMount: function(){
    var {resetModal, message} = this.props;
    var modal = new Foundation.Reveal($("#login-modal"));// used jquery selector, configured in webpack
    modal.open();
    console.log("Open modal");
  },
  render: function(){
    var {message} = this.props;
    return (
      <div className="reveal tiny text-center" id="login-modal" data-reveal="">
        <h4>Notification</h4>
        <p>{message}</p>
      </div>
    );
  }
});

module.exports = AlertModal;
