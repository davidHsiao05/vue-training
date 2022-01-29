import { createApp } from'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';


const app = createApp({
  data(){
    return{
        newnums:[],
        nums:[
            {
                num:'一號',
                id:0,
            },
            {
                num:'二號',
                id:1,
            },
            {
                num:'三號',
                id:2,
            },
            {
                num:'四號',
                id:3,
            },
            {
                num:'五號',
                id:4,
            },
            
        ],
        index:0,
        user:{
            username:"",
            password:"",
        }, 
        timer:null,
    }
  },
  methods: {

    slide(i){
        this.index=(this.index+i+this.nums.length)%this.nums.length;
        

    } ,
    slotstar(){
        this.timer = setInterval(() => {
            this.slide(+1);
        }, 100);
        setTimeout(() => {
            this.close();
         },5000);
    },
    close(){
        clearInterval(this.timer);
        this.timer = null 
        console.log(this.timer);
    }

  },
  created() {
     
  },
  computed:{
        currentnum(){
            return {
                transform:`translateY(${this.index*-100}%)`,
                transition:`transform 0.2s ease-out `,
            }
        },
  }
});
app.mount('#app');
