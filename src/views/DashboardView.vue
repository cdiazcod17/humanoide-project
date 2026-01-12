<template>
    <div class="bg-white min-h-screen relative overflow-hidden">
        <!-- Contenido principal -->
        <div class="relative z-10 min-h-screen flex-col ">
            <!-- Lado izquierdo - Información del usuario -->
            <div class="w-100 flex items-center justify-center p-12">
                <div class="max-w-ld">
                    <h1 class="text-5xl font-bold text-black mb-4 leading-tight">
                        HOLA 😊,<br>
                        <span class="text-6xl">{{ usuario?.email?.split('@')[0].toUpperCase() || '[NOMBRE DE USUARIO]'
                            }}</span>
                    </h1>
                    <p class="text-[rgb(209,104,11)] text-lg opacity-90 mt-6">
                        Tu humanómetro:
                    </p>
                    
                        <!-- Información del perfil -->
                        <div class="space-y-4 text-black">
                            <div class="text-2xl font-bold">
                                {{ usuario?.nombre || 'Nombre' }}
                            </div>

                            <div class="text-xl opacity-90">
                                {{ usuario?.edad || 'No confirma' }}
                            </div>

                            <div class="text-xl opacity-90">
                                {{ usuario?.genero || 'No definido' }}
                            </div>

                            <div class="text-xl opacity-90">
                                {{ usuario?.email || '[correo@ejemplo.com]' }}
                            </div>

                            <div class="text-xl opacity-90">
                                {{ usuario?.email || '[correo@ejemplo.com]' }}
                            </div>

                            <div class="text-sm opacity-75 mt-6">
                                {{ usuario?.foto || 'FOTO' }}
                            </div>
                        </div>

                    <button @click="cerrarSesion"
                        class="mt-12 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                        Cerrar sesión
                    </button>
                </div>
            </div>
            <div>
                <img src="../assets/img1.png" alt="" class="w-30">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { obtenerUsuario, logout } from '@/servicios/autenticacion.js'

const router = useRouter()
const usuario = obtenerUsuario()

const cerrarSesion = async () => {
    const resultado = await logout()
    if (resultado.ok === true) {
        await router.push('/login')
    }
}
</script>