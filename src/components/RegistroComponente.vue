<template>
    <div class=" bg-white min-h-screen flex ">
        <div class="w-100 flex items-center justify-center p-12">
            <div class="w-full">
                <div class="bg-white-800">
                    <h2 class="text-3xl font-bold text-blue-700 mb-8 text-center">Registrate</h2>

                    <form @submit.prevent="registrarUsuario" class="space-y-6">
                        <div>
                            <input type="email" id="email" v-model="email" placeholder="Email" required
                                class="w-full px-5 py-4 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all">
                        </div>

                        <div>
                            <input type="password" id="pass" v-model="password"
                                placeholder="Contraseña (mínimo 6 caracteres)" required
                                class="w-full px-5 py-4 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all">
                        </div>

                        <div>
                            <input type="password" id="confirmPassword" v-model="confirmPassword"
                                placeholder="Confirmar contraseña" required
                                class="w-full px-5 py-4 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all">
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
                            class="w-full  bg-blue-700 hover:bg-blue-900 disabled:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg">
                            {{ cargando ? "Creando usuario..." : "Registrarse" }}
                        </button>
                    </form>

                    <div class="text-center mt-8">
                        <p class="text-black text-sm">
                            ¿Ya tienes cuenta?
                            <router-link to="/login" class="text-blue-700 font-bold] transition-colors">
                                Inicia sesión
                            </router-link>
                        </p>
                    </div>
                </div>
                <div>

                    <img src="../assets/img1.png" alt="" class="w-30">
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