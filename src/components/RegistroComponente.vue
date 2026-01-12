
<template>
    <div class="min-h-screen relative overflow-hidden">
        <!-- Background de pizarra -->
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/src/assets/chalkboard-bg.jpg')">
        </div>



        <!-- Contenido principal -->
        <div class="relative z-10 min-h-screen flex">
            <!-- Lado izquierdo - Texto informativo -->
            <div class="w-1/2 flex items-center justify-center p-12">
                <div class="max-w-md">
                    <h1 class="text-6xl font-bold text-white mb-6 leading-tight">
                        CREA TU<br>CUENTA
                    </h1>
                    <p class="text-white text-lg leading-relaxed opacity-90">
                        Regístrate para crear tu perfil de usuario y comenzar a gestionar tus datos.
                        Completa el formulario con información válida y únete a nuestra comunidad.
                    </p>
                </div>
            </div>

            <!-- Lado derecho - Formulario -->
            <div class="w-1/2 flex items-center justify-center p-12">
                <div class="w-full max-w-md">
                    <div class="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-10 shadow-2xl">
                        <h2 class="text-3xl font-bold text-white mb-8 text-center">Registro</h2>

                        <form @submit.prevent="registrarUsuario" class="space-y-6">
                            <div>
                                <input type="email" id="email" v-model="email" placeholder="Email" required
                                    class="w-full px-5 py-4 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all">
                            </div>

                            <div>
                                <input type="password" id="pass" v-model="password"
                                    placeholder="Contraseña (mínimo 6 caracteres)" required
                                    class="w-full px-5 py-4 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all">
                            </div>

                            <div>
                                <input type="password" id="confirmPassword" v-model="confirmPassword"
                                    placeholder="Confirmar contraseña" required
                                    class="w-full px-5 py-4 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all">
                            </div>

                            <div v-if="error"
                                class="bg-red-500 bg-opacity-20 border border-red-400 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {{ error }}
                            </div>

                            <div v-if="exito"
                                class="bg-green-500 bg-opacity-20 border border-green-400 text-green-200 px-4 py-3 rounded-lg text-sm">
                                {{ exito }}
                            </div>

                            <button type="submit" :disabled="cargando"
                                class="w-full bg-gray-900 hover:bg-gray-950 disabled:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg">
                                {{ cargando ? "Creando usuario..." : "Registrar usuario" }}
                            </button>
                        </form>

                        <div class="text-center mt-8">
                            <p class="text-white text-sm">
                                ¿Ya tienes cuenta?
                                <router-link to="/login"
                                    class="text-white font-bold hover:text-cyan-300 transition-colors">
                                    Inicia sesión
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { registrar } from '@/servicios/autenticacion.js'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const exito = ref('')
const cargando = ref(false)

const coinciden = computed(() => {
    return password.value === confirmPassword.value
})

const registrarUsuario = async () => {
    error.value = ''
    exito.value = ''

    //validacion basica
    if (!coinciden.value) {
        error.value = "Las contraseñas no coinciden"
        return //
    }

    cargando.value = true
    const resultado = await registrar(email.value, password.value)
    cargando.value = false

    //ultimas comprobaciones

    if (resultado.ok) {
        exito.value = `✅yes ${email.value} creado exitosamente`
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
    } else {
        error.value = `❌oh no! error en los datos ingresados`
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
    }
}
</script>

<style></style>