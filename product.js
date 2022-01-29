
import { createApp } from'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';


const app = createApp({
  data(){
    return{
        user:{
            username:"",
            password:"",
        },
        api:"https://vue3-course-api.hexschool.io/v2",
        path:'david19921005',
        mytoken:'',
        myProducts:{
            products:[],
        },    
    }
  },
  methods: {
      currentenabled(p){
        if(p.is_enabled==1){
            p.is_enabled=2
        }else{
            p.is_enabled=1
        }
      },
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
     getData(){
        axios.get(`${this.api}/api/${this.path}/admin/products`).then((res)=>{
            this.myProducts=res.data;
        })
        .catch((err)=>{
           console.log(err);
        })
     },
     del(p){
        axios.delete(`${this.api}/api/${this.path}/admin/product/${p.id}`).then((res)=>{
            window.location="product.html"
            console.log(res);
        })
        .catch((err)=>{
           console.log(err);
        })
     }
  },
  created() {
      this.checkLogin();
  },
  computed:{
      totalProducts(){
          return this.myProducts.products.length;
      }
  }
});
app.mount('#app');
