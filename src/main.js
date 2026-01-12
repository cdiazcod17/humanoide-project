import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { onAuthStateChanged } from 'firebase/auth'
import './style.css'

import '@/firebase/config.js'
import '@/servicios/autenticacion.js'
import { auth } from '@/firebase/config.js'

let app 

onAuthStateChanged(auth,()=>{
    if(!app){
        app = createApp(App)
        app.use(router)        
        app.mount('#app')
    }

})