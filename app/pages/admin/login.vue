<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <div class="flex justify-center mb-6">
        <el-button :type="activeForm === 'login' ? 'primary' : 'default'" @click="switchForm('login')">Login</el-button>
        <el-button :type="activeForm === 'register' ? 'primary' : 'default'" @click="switchForm('register')">Register</el-button>
      </div>
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeForm === 'login'" key="login">
          <h2 class="text-2xl font-bold text-center mb-6 text-primary">Admin Login</h2>
          <el-form :model="form" class="space-y-4">
            <el-form-item label="Username">
              <el-input v-model="form.username" placeholder="Enter your username" />
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="form.password" type="password" placeholder="Enter your password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w-full" @click="onLogin">Login</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else key="register">
          <h2 class="text-2xl font-bold text-center mb-6 text-primary">Register</h2>
          <el-form :model="registerForm" class="space-y-4">
            <el-form-item label="Username">
              <el-input v-model="registerForm.username" placeholder="Choose a username" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="registerForm.email" placeholder="Enter your email" />
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="registerForm.password" type="password" placeholder="Create a password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w-full" @click="onRegister">Register</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <div v-if="loading" class="mt-4 text-center text-gray-500">
        Loading...
      </div>
      <div v-else-if="message" class="mt-4 text-center text-gray-500">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeForm = ref<'login' | 'register'>('login')
const form = ref({
  username: '',
  password: ''
})
const registerForm = ref({
  username: '',
  email: '',
  password: ''
})

const { loading, message, userId, login, register } = useAuthentication()

async function onLogin() {
  await login(form.value.username, form.value.password)
}

async function onRegister() {
  await register(registerForm.value.username, registerForm.value.email, registerForm.value.password)
  if (message.value === 'Registration successful!') {
    switchForm('login')
  }
}

function switchForm(formType: 'login' | 'register') {
  activeForm.value = formType
  message.value = ''
}
</script>

<style scoped>
.text-primary {
  color: var(--color-primary);
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>