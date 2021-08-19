import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux'


import * as actions from "./store/actions/auth"
import Feed from './container/Feed/Feed';
import User from './container/User/User';
import Auth from './container/Auth/Signup/Signup';
import Full from './container/Full/Full';
import News from './container/News/News';
import Chat from './container/Chat/Chat';
import Room from './container/Room/Room'

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){

    let routes =  <div>
                      <Switch>
                        <Route path='/' exact component={Feed}/>
                        <Route path='/auth' exact component={Auth}/>
                        <Route path='/user' exact component={User}/>
                        <Route path='/news' exact component={News}/>
                        <Route path='/room' exact component={Room}/>
                        <Route path='/chat/:room' exact component={Chat}/>
                        <Route path='/auth' exact component={Feed}/>
                        <Route path='/full/:id' exact component={Full}/>
                        
                      </Switch>
                    </div>

    return(

      <div>
        {this.props.auth ? 
        routes :
        <div>
        <Switch>
          <Route path='/' exact component={Feed}/>
          <Route path='/auth' exact component={Auth}/>
          {/* <Route path='/user' exact component={User}/> */}
          <Route path='/news' exact component={News}/>
          {/* <Route path='/chat' exact component={Feed}/> */}
          {/* <Route path='/auth' exact component={Feed}/> */}
          {/* <Route path='/full/:id' exact component={Full}/> */}
          
        </Switch>
      </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
      auth: state.auth.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(App);
