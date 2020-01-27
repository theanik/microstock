<template>
 <div class="card">
      <b-alert v-show="successAlert" show variant="success">Product Add</b-alert>

                    <div class="card-header d-flex justify-content-between">
                        <h4 class="card-title">Category </h4>
                        <div class="card-tools">
                       
                        <button @click="showModal" type="button" class="btn btn-success">
                            Add New Product
                            <i class="fas fa-plus"></i>
                        </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="mb-3">
                            <div class="row">
                                <!-- <div class="col-md-2">
                                <strong>Search By :</strong>
                                </div>
                                <div class="col-md-3">
                                    Category Name
                                </div>
                                <div class="col-md-5">
                                <input v-model="query" type="text" class="form-control" placeholder="Search">
                                </div>
                                <div class="col-md-2">
                                     <button type="button" class="btn btn-primary" >
                                        Reset Search
                                        <i class="fas fa-sync"></i>
                                    </button>
                                </div> -->
                            </div>
                        </div>
                        <!-- table  -->
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th >Product Name</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Price </th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="(product, index) in products" :key="index">
                                            <td>{{ product.name }}</td>
                                            <td>{{ product.user_id }}</td>
                                            <td>{{ product.price }}</td>
                                            <td>{{ product.quantity }}</td>
                                        </tr>
                                    
                                </tbody>
                                </table>

                    </div>

                    <!-- start model -->
                    <b-modal ref="my-modal" hide-footer title="Add New Product">
                        
                            <b-form @submit="storData">
                                <b-form-group
                                    id="input-group-1"
                                    label="Product Name:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                    id="input-1"
                                    v-model="form.product"
                                    type="text"
                                    required
                                    placeholder="Enter Name"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group id="input-group-2" label="Product Price:" label-for="input-2">
                                    <b-form-input
                                    id="input-2"
                                    v-model="form.price"
                                    required
                                    placeholder="Enter Price"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group id="input-group-2" label="Product Quantity:" label-for="input-2">
                                    <b-form-input
                                    id="input-2"
                                    v-model="form.quantity"
                                    required
                                    placeholder="Enter Quantity"
                                    ></b-form-input>
                                </b-form-group>

                            

                                <b-button type="submit" variant="primary">Submit</b-button>
                                <b-button type="reset" variant="danger">Reset</b-button>
                            </b-form>
                        <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
                        <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> -->
                    </b-modal>
                    <!-- end modal -->
                </div>
            </div>
</template>

<script>
import values from '../value'
const axios = require('axios');
export default {
  name: 'Navbar',
  data () {
    return {
        userName : '',
        userEmail: '',
        userId: '',
        products : [],
        form: {
          product: '',
          price: '',
          quantity: '',
        },
        successAlert: false,
    }
  },
  mounted() {
      this.getAuthUserInfo()
      this.getData()
  },
  methods:{
      

      showModal() {
        this.$refs['my-modal'].show()
      },
    hideModal() {
        this.$refs['my-modal'].hide()
      },
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
                this.userId = res.data.user.id
                console.log(this.userEmail)
            })
            .catch(e=>{
                this.$router.replace(this.$route.query.redirect || '/login')
                localStorage.clear('auth-token')
                console.log('hereeeeeeeeeee')
            })
        },

    getData(){
          let token = localStorage.getItem('auth-token')
            this.$Progress.start()
            axios.get(`${values.BASE_URL}/api/all_product`,
            { 
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>{
                console.log(res)
                this.products = res.data.product
                // this.$Progress.finish()
            })
            .catch(e=>{
                console.log(e)
                this.$Progress.fail()
            })
        },
    
    storData(evt){
        evt.preventDefault()
            let token = localStorage.getItem('auth-token')
            this.$Progress.start()
            const headers = {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'application/json'
                }
            console.log(this.form.product)
            console.log(this.form.price)
            console.log(this.form.quantity)

            axios.post(`${values.BASE_URL}/api/product`,{
                name:this.form.product,
                price: this.form.price,
                quantity: this.form.quantity
                },{
                headers: headers
            })
            .then(res=>{
                console.log(res)
                this.successAlert = true
                this.hideModal()
                this.getData()
                setTimeout(()=>{
                    this.successAlert = false;
                }, 2000);
                this.form.product = ''
                this.form.price = ''
                this.form.quantity = ''
            })
            .catch(e=>{
                console.log(e)
                this.$Progress.fail()
            })
    }
  }
}
</script>