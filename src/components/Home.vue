<template>
    <div>
        <h1>MicroStock</h1>
        <p>User Name : {{ userName }}</p>
        <p>User Email : {{ userEmail }}</p>
    </div>
</template>
<script>
import values from '../value'
const axios = require('axios');
export default {
    data() {
        return{
            userName : '',
            userEmail : '',
        }
    },
    mounted() {
        
        if(!localStorage.getItem('auth-token')){
            this.$router.replace(this.$route.query.redirect || '/login')
        }
        this.getAuthUserInfo()
        // this.authValid()
        // console.log(this.userInfo)
    },
    methods:{
        getAuthUserInfo(){
            let token = localStorage.getItem('auth-token')
            axios.get(`${values.BASE_URL}/api/user`,{
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res =>{
                // console.log(res)
                this.userName = res.data.user.name
                this.userEmail = res.data.user.email
                console.log(this.userName)
            })
            .catch(e=>{
                this.$router.replace(this.$route.query.redirect || '/login')
                localStorage.clear('auth-token')
                console.log('hereeeeeeeeeee')
            })
        },
        authValid(){
            if(this.userName == '' && this.userEmail==''){
                this.$router.replace(this.$route.query.redirect || '/login')
                localStorage.clear('auth-token')
            }
        }
    }
}
</script>