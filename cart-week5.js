// import { createApp } from'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'david19921005';

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({ // 用來做一些設定
  generateMessage: localize('zh_TW'), //啟用 locale 
});

const app = Vue.createApp({
    data() {
        return {
            cartData:{
                carts:[]
            },
            form: {
                user: {
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:''
            },
            products:[],
            productId:'',
            isLoading:'',
        }
    },
    components: {
        VForm:Form,
        VField:Field,
        ErrorMessage:ErrorMessage
    },
    methods: {
        getPoducts () {
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
              .then((res)=>{
                  this.products = res.data.products
              })
        },
        openProductModal (id) {
            this.productId = id
            this.$refs.productbox.openModla();
        },
        getCart () {
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
              .then((res)=>{
                  this.cartData = res.data.data
              })
        },
        addToCart (id,qty=1) {
            const data ={
                product_id: id,
                qty: qty,
            };
            this.isLoading = id;
            axios.post(`${apiUrl}/api/${apiPath}/cart`,{data})
              .then((res)=>{
                  this.getCart();
                  this.$refs.productbox.closeModla();
                  this.isLoading ='';
              })
        },
        delCart (id){
            this.isLoading = id;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
              .then((res)=>{
                  this.getCart();
                  this.isLoading = '';
              })
        },
        updateCart (item) {
            const data ={
                product_id: item.product_id,
                qty: item.qty,
            };
            this.isLoading = item.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`,{data})
              .then((res)=>{
                  this.getCart();
                  this.isLoading ='';
              })
        },
        delAll () {
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
            .then((res)=>{
                this.getCart();
            })
        },
        postForm() {
            const cartlist = this.form
            const url = `${apiUrl}/api/${apiPath}/order`
            axios.post(url,{data:cartlist})
            .then((res)=>{
                this.$refs.form.resetForm();
                this.getCart();
            }).catch((err)=>{
                alert(err.data.message);
            })
        }
    },
    mounted () {
        this.getPoducts();
        this.getCart();
    },
});
app.component('productbox',{
    props:['id'],
    template: '#userProductModal',
    data() {
        return { 
            myModal:{},
            product:{},
            qty:1,
        }
    },
    watch:{
        id () {
            this.getcurrentPoduct();
        }
    },
    methods: {
        openModla () {
            this.myModal.show();
        },
        closeModla() {
            this.myModal.hide();
            this.qty=1;
        },
        getcurrentPoduct () {
            axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
              .then((res)=>{
                  this.product = res.data.product;
              })
        },
        addToCart () {
            this.$emit('add-cart',this.product.id,this.qty)
        }
    },
    mounted() {
        this.myModal = new bootstrap.Modal(this.$refs.modal)
        
    },
})


app.mount('#app');