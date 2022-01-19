
import { createApp } from'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';


const app = createApp({
  data(){
    return{
        user:{
            username:"",
            password:"",
        },
        api:"https://vue3-course-api.hexschool.io/v2",        
    }
  },
  methods: {
      login(){
          axios.post(`${this.api}/admin/signin`,this.user).then((res)=>{
            // console.log(res.data)
            const{ token,expired } = res.data;
            document.cookie = `davidToken=${token};expires=${new Date(expired)}`;
            window.location = 'product.html'
          })
          .catch((err)=>{
            console.dir(err);
          })
      }
  },
});
app.mount('#app');
