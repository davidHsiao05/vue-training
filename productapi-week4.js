import { createApp } from'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import pagination from'./pagination.js';
import productmodal from'./productmodal.js';

let productModal = null;
let delProductModal =null;

createApp({
  components:{
    pagination,
    productmodal,
  },
  data() {
    return {
      api: 'https://vue3-course-api.hexschool.io/v2',
      path: 'david19921005',
      mytoken:'',
      stateToggle:'add',
      pagination:{},
      myProducts:{
          products:[],
      },
      currentProduct:{
        imagesUrl:[],
      }
    }
  },
  created() {
      this.checkLogin();
  },
  mounted() {
    productModal = new bootstrap.Modal(document.querySelector('#productModal'));
    delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
  },
  methods: {
    checkLogin(){
        this.mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)davidToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = this.mytoken;
        axios.post(`${this.api}/api/user/check`).then((res)=>{
            this.getData();
        })
        .catch((err)=>{
            alert('你沒登入哦～想幹嘛')
            window.location="index.html"
        })
    },
    getData(page=1){
        axios.get(`${this.api}/api/${this.path}/admin/products/?page=${page}`).then((res)=>{
            this.myProducts=res.data;
            this.pagination =res.data.pagination;
        })
        .catch((err)=>{
           console.log(err);
        })
     },
    
    delData(){
      axios.delete(`${this.api}/api/${this.path}/admin/product/${this.currentProduct.id}`).then((res)=>{
        this.getData();
        delProductModal.hide();
    })
    .catch((err)=>{
       console.log(err);
    })
    },
    ifdel(del){
      this.currentProduct = {
        ...del
      }
      delProductModal.show();
    },
    addProduct(){
        this.stateToggle = 'add';
        this.currentProduct ={
          imagesUrl:[],
        }
        productModal.show();
    },
    edit(item){
      this.stateToggle ='edit';
      this.currentProduct ={
        ...item
      }
      productModal.show();
    },
    modelClose(){
      productModal.hide();
    }
    
  },
}).mount('#app');