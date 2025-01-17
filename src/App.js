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
import { Parser } from './containers/Parser/parser';
import Dep_load_detail from "./containers/Dep_load/Dep_load_detail/Dep_load_detail";
import Acad_plan_detail from "./containers/Acad_plan/Acad_plan_detail/Acad_plan_detail";
import Dashboard from "./containers/Dashboard/Dashboard";
import Department from "./containers/Department/Department";
import Students from "./containers/Students/Students";
import ErrorsCol from "./containers/ErrorsCol/ErrorsCol";
import FailProject from "./containers/FailProject/FailProject";
import Dep_load_RPD from "./containers/Dep_load/Dep_load_RPD/Dep_load_RPD";
import Project_detail from "./containers/Project/Project_detail/Project_detail";
import TestDash from "./containers/Dashboard/TestDash/TestDash";


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
        <Route path="/dep_load_detail" component={Dep_load_detail}/>
        <Route path="/dep_load_rpd" component={Dep_load_RPD}/>
        <Route path="/project_detail" component={Project_detail}/>
        <Route path="/test_dash" component={TestDash}/>
        <Route path="/" exact component={QuizList}/>
        <Route path="/group" component={Group}/>
        <Route path="/teatcher" component={Teatcher}/>
        <Route path="/specialty" component={Specialty}/>
        <Route path="/acad_plan" component={Acad_plan}/>
        <Route path="/acad_plan_detail" component={Acad_plan_detail}/>
        <Route path="/dep_load" component={Dep_load}/>
        <Route path="/project" component={Project}/>
        <Route path="/specialties" component={Specialty}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/department" component={Department}/>
        <Route path="/errors_col" component={ErrorsCol}/>
        <Route path="/fail_project" component={FailProject}/>
        <Route path="/students" component={Students}/>
        <Route path="/parser" component={Parser}/>
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