<template>
  <div id="app">
   <navbar></navbar>
  <div class="row">
    <div class="container">
      <div class="col-md-8 mt-3">
          <router-view />
          <vue-progress-bar></vue-progress-bar>
      </div>
    </div>
  </div>
    
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },
  mounted(){
    this.ckloing()
  },
  methods:{
    ckloing(){
      if(!localStorage.getItem('auth-token')){
          this.$router.replace(this.$router.query.redirect || '/login')
        }
    }
  }
}
</script>

<style>

</style>
