import React from 'react';
import { connect } from 'react-redux'
// import { updateProfile, changePassword, deleteAccount } from '../../actions/auth';
import { link, unlink } from '../../actions/oauth';
import Messages from '../Messages';

class Posts extends React.Component {
  constructor(props) {
    super();
 		 this.state={posts:[]};
  }

  componentDidMount(){
    fetch(`/posts`)
    .then(result=>result.json())
    .then(items=>this.setState({items}))
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handleProfileUpdate(event) {
  //   event.preventDefault();
  //   this.props.dispatch(updateProfile(this.state, this.props.token));
  // }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {

    return (
      <div className="container">
      <div>
        <Messages messages={this.props.messages}/>
      </div>

            	<ul>
                  {this.state.items.length ?
                  	this.state.items.map(item=><li key={item.id}>{item.body}</li>)
                    : <li>Loading...</li>
                  }
              </ul>






        // end of coontainer class
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Posts);
