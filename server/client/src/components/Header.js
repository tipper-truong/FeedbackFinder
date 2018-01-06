import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  renderContent() {
  	switch(this.props.auth) { // null | false --> not sure if user is logged in
  		case null:
  			return;
  		case false: 
  			return (
  				<li>
  					<a href ="/auth/google">Login with Google</a>
  				</li>
  			);
    	default:
        return [
        <li key="1"><Payments /></li>,

        <li key="3" style ={{margin: '0 15px'}}>
        Credits: {this.props.auth.credits}
        </li>,

        <li key="2"><a href="/api/logout">Logout</a></li>
        ]

  	}
  }

  render() {
  	//console.log(this.props); from authReducer
    return (
      <nav>
      	<div className="nav-wrapper" style={{margin: '0 15px'}}>
      		<Link 
	      		to={this.props.auth ? '/surveys' : '/'} 
	      		className="left brand-logo"
      		>
      			FeedbackFinder
      		</Link>
      		<ul className="right">
      			{this.renderContent()}
      		</ul>
      	</div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);