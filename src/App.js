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
import Group from './containers/Group/Group';
import Teatcher from './containers/Teatcher/Teatcher';
import Specialty from './containers/Specialty/Specialty';
import Acad_plan from './containers/Acad_plan/Acad_plan';
import Dep_load from './containers/Dep_load/Dep_load';
import Project from './containers/Project/Project';


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
        <Route path="/group" exact component={Group}/>
        <Route path="/teatcher" exact component={Teatcher}/>
        <Route path="/specialty" exact component={Specialty}/>
        <Route path="/acad_plan" exact component={Acad_plan}/>
        <Route path="/dep_load" exact component={Dep_load}/>
        <Route path="/project" exact component={Project}/>
        <Route path="/specialties" exact component={Specialty}/>
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