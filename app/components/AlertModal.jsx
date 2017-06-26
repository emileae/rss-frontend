var React = require('react');

var $ = require('jquery');

var AlertModal = React.createClass({
  componentDidMount: function(){
    var {resetModal, message} = this.props;
    var modal = new Foundation.Reveal($("#login-modal"));// used jquery selector, configured in webpack
    modal.open();
    console.log("Open modal");
  },
  closeModal: function(){
    console.log("Closing modal");
    // var {okCallback} = this.props;
    // okCallback();
    // var modal = new Foundation.Reveal($("#login-modal"));// used jquery selector, configured in webpack
    // modal.close();
    // console.log("Close modal");
  },
  render: function(){
    var {message, okCallback} = this.props;
    return (
      <div className="reveal tiny text-center" id="login-modal" data-reveal="">
        <h4>Notification</h4>
        <p>{message}</p>
        <p>
          <button className="button hollow" data-close="">
            Okay
          </button>
        </p>
      </div>
    );
  }
});

module.exports = AlertModal;
