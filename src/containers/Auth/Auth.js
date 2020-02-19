import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button.js'
import Input from '../../components/UI/Input/Input.js'
import { stat } from 'fs';
import axios from 'axios'


// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

export default class Auth extends Component {

    state = {
        formControls:{
            email:{
                value:'',
                type:'email',
                label:'Email',
                errorMessage:'Введите корректный email',
                valid: false,
                touched: false,
                validation:{
                    required:true,
                    email: true,
                }
            },
            password:{
                value:'',
                type:'password',
                label:'Пароль',
                errorMessage:'Введите корректный пароль',
                valid: false,
                touched: false,
                validation:{
                    required:true,
                    minLength: 6
                }  
            }
        },

        token:''
    }

    

    loginHandler =  () => {

        // const authData={
        //     email:this.state.formControls.email.value,
        //     password:this.state.formControls.password.value,
        //     returnSecureToken:true
        // }
        // try{
        // const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1fRo7IHxrjMijezPwC9VZ45TpbXp8Sy4', authData)

        // console.log(response.data)
        // } catch(e){
        //     console.log(e)
        // }

        fetch('http://dashboard.kholodov.xyz/api/login', { //http://dashboard.kholodov.xyz/api/
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                    login:this.state.formControls.email.value,
                    password:this.state.formControls.password.value
            
            })

        }).then(function(response) {
            return response.json();
            
        }).then(response => {
            // response.message
            this.state.token = response.token;
            localStorage.setItem('token', response.token);
        }).catch(err => {
            console.error(err);
        });
        //  this.state.token=response.json()
        //  console.log(response.json())

        //localStorage.setItem('token', this.state.token);

    }

    registerHandler = async() => {
        const authData={
            email:this.state.formControls.email.value,
            password:this.state.formControls.password.value,
            returnSecureToken:true
        }
        try{
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1fRo7IHxrjMijezPwC9VZ45TpbXp8Sy4', authData)
        //this.state.token = response.idToken    
        console.log(response.data)
        //localStorage.setItem('token', response.data.idToken);
        } catch(e){
            console.log(e)
        }
    }

    submitHandler = (event) => {
        event.preventDefault()

    }
    validateControl(value, validation){
        // if(!validation){
        //     return true
        // }

        // let isValid = true

        // if (validation.required){
        //     isValid = value.trim() !=='' && isValid
        // }

        // if (validation.email){
        //     isValid = validateEmail(value) && isValid
        // }

        // if (validation.minLength){
        //     isValid = value.length >= validation.minLength && isValid
        // }

        // return isValid
        return true;
    }

    onChangeHandler= (event, controlName) =>{
        const formControls = { ...this.state.formControls}
        const control = { ...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
        
    }

    renderInputs(){
        return (Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
            return(
                <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                errorMessage={control.errorMessage}
                shoudValidate={!!control.validation}
                onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })   
        )
    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        { this.renderInputs() }


                        <Button
                            type='success'
                            onClick={this.loginHandler}
                        >
                            Войти
                        </Button>

                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                        >
                            Зарегистрироваться
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}