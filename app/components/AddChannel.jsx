var React = require('react');

var APIAddChannel = require('APIAddChannel');

var AddChannel = React.createClass({
  getInitialState: function(){
    return {
      fetchChannelLoader: false
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.setState({
      fetchChannelLoader: true,
      channelLoaded: false
    });
    var channelURL = this.refs.channelURL.value;
    var {onAddChannel} = this.props;
    // validate the url
    if (channelURL.length > 0){
      this.refs.channelURL.value = "";
      APIAddChannel.addChannel(channelURL).then((res)=>{
        console.log("Add channel: ", res);
        var wasError = false;
        var responseMessage = res.data.message;
        if (res.data.message === "Unable to parse RSS feed"){
          wasError = true;
        }
        this.setState({
          fetchChannelLoader: false,
          channelLoaded: true,
          wasError: wasError,
          responseMessage: responseMessage
        });
        setTimeout(()=>{
          this.setState({
            channelLoaded: false,
            wasError: false
          })
        }, 2500);
        onAddChannel();
      }).catch((err)=>{
        console.log("Add channel error: ", err);
      });
      // this.props.onAddChannel(channelURL);
    }else{
      this.refs.channelURL.focus();// takes user back to input
    }
  },
  render: function(){
    var {fetchChannelLoader, channelLoaded, wasError, responseMessage} = this.state;
    function loadingChannel(){
      if (fetchChannelLoader){
        return <p>Loading RSS Channel</p>
      }else if (channelLoaded){
        return <p>{responseMessage}</p>
      }
    };
    return (
      <div>
        {loadingChannel()}
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="channelURL" placeholder="http://example-feed-url.com"></input>
          <button className="button expanded">Add Channel</button>
        </form>
      </div>
    );
  }
});

module.exports = AddChannel;
