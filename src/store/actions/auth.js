import {AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/actionsTypes'

export function auth(login, password, isLogin){
    return async dispatch => {

        let url = 'http://dashboard.kholodov.xyz/api/register'

        if(isLogin){
            url = 'http://dashboard.kholodov.xyz/api/users/login'
        }

        fetch(url, { //http://dashboard.kholodov.xyz/api/
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                    login,
                    password
            
            })

        }).then(function(response) {
            return response.json();
            
        }).then(response => {
            const data = response
            //console.log(data)
            localStorage.setItem('token', data.token);
            dispatch(authSuccess(data.token))
        }).catch(err => {
            console.error(err);
        });



    }
}

export function logout(){
    localStorage.removeItem('token')
    return{
        type:AUTH_LOGOUT
    }
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogin(){
    return dispatch =>{
        const token = localStorage.getItem('token')

        if(!token){
            dispatch(logout())
        }else{
            dispatch(authSuccess(token))
        }

    }
    // return true
}