import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {logout} from '../../store/actions/auth'

class Logout extends Component{

    componentDidMount(){
        this.props.logout()
    }

    render(){
        return <Redirect to={'/'}/>
    }
}

function MapDispatchToProps(dispatch){
    return{
        logout: () => dispatch(logout())
    }
}

export default connect(null, MapDispatchToProps)(Logout)