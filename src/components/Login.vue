<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-alert v-show="errorAlert" show variant="danger">Something went wrong!!!</b-alert>

      

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import values from '../value'
const axios = require('axios');

  export default {
    data() {
      return {
          email: '',
          password: '',
          errorAlert: false
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        console.log(this.email)
        console.log(this.password)
        let info = {email:this.email,password:this.password}
        axios.post(`${values.BASE_URL}/api/login`,info)
        .then(res => {
            localStorage.setItem('auth-token',res.data.access_token)
            this.$router.replace(this.$route.query.redirect || '/home')
        }).catch(e => {
            this.errorAlert = true
            console.log(e)
        })
        
      },
      onReset(evt) {
        
      }
    }
  }
</script>