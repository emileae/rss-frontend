var React = require('react');

var APIRemoveChannel = require('APIRemoveChannel');
var AlertModal = require('AlertModal');

var RemoveChannel = React.createClass({
  getInitialState: function(){
    return {
      confirmed: 0
    }
  },
  removeChannel: function(){
    console.log("------- remove channel......");
    if (this.state.confirmed === 1){
      var {channelId, removeChannel, clearFeeds} = this.props;
      APIRemoveChannel.removeChannel(channelId);
      removeChannel(channelId);
      clearFeeds();
      this.setState({
        confirmed: 2
      });
    }else{
      this.setState({
        confirmed: 1
      });
    }
  },
  unRemoveChannel: function(){
    this.setState({
      confirmed: 0
    });
  },
  render: function(){
    var {confirmed} = this.state;
    var okCallback = this.removeChannel;
    var notOkCallback = this.unRemoveChannel;
    function removeConfirmation(){
      if (confirmed === 0){
        return (
          <button className="close-button" aria-label="Close alert" type="button" onClick={okCallback}>
            <span aria-hidden="true">&times;</span>
          </button>
        )
      }else if (confirmed === 1){
        return(
          <p className="close-button" aria-label="Close alert">
            <span className="sure-text" aria-hidden="true">
              Sure? <span className="confirm-remove-option" onClick={okCallback}>yes</span> <span className="confirm-remove-option" onClick={notOkCallback}>no</span>
            </span>
          </p>
        )
      }
    }
    // <span>
    //   {alertModal()}
    //   <button className="button hollow" onClick={this.removeChannel}>Remove</button>
    // </span>
    return (
      <span>
      {removeConfirmation()}
      </span>
    );
  }
});

module.exports = RemoveChannel;
