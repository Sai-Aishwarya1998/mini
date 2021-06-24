const LoginApi ={

    getLoginToken: ()=>localStorage.getItem('loginToken'),

    setLoginToken: (data)=>localStorage.setItem('loginToken',data),

    logout: ()=>{localStorage.removeItem('loginToken');localStorage.removeItem('isAdmin')},

    getIsAdmin: ()=>localStorage.getItem('isAdmin'),

    setIsAdmin: (data)=>localStorage.setItem('isAdmin',data),

}



export default LoginApi;