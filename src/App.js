import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import Rpd from './containers/Rpd/Rpd'
import Pd from './containers/Pd/Pd'
import Logout from './components/Logout/Logout'
import {connect} from 'react-redux'
import {autoLogin} from './store/actions/auth'


class App extends Component {

  componentDidMount(){
    this.props.autoLogin()
  }
  render(){

    let routes = (
      <Switch>
      <Route path="/" exact component={Auth}/>
      <Redirect to={'/'}/>
    </Switch>
    )

    if(this.props.isAuthenicated){
      routes=(
        <Switch>
        {/* <Route path="/" component={Auth}/> */}
        <Route path="/pd" component={Pd}/>
        <Route path="/rpd" component={Rpd}/>
        <Route path="/" exact component={QuizList}/>
        <Route path="/logout" component={Logout}/>
        <Redirect to={'/'}/>
      </Switch>
      )
    }
  return (
<Layout>
    {routes}
</Layout>
  );
  }
}

function mapStateToProps(state){
  return{
    isAuthenicated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch){
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) 