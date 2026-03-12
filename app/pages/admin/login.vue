<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 animate-fade-in">
      <div class="flex justify-center mb-8 gap-2">
        <el-button :type="activeForm === 'login' ? 'primary' : 'default'" @click="switchForm('login')" class="w-1/2 rounded-full">Login</el-button>
        <el-button :type="activeForm === 'register' ? 'primary' : 'default'" @click="switchForm('register')" class="w-1/2 rounded-full">Register</el-button>
      </div>
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeForm === 'login'" key="login">
          <el-form :model="form" :rules="loginRules" ref="loginFormRef" class="space-y-6" label-position="top">
            <el-form-item label="Username" prop="username">
              <el-input v-model="form.username" placeholder="Enter your username" size="large" prefix-icon="el-icon-user" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="form.password" type="password" placeholder="Enter your password" size="large" prefix-icon="el-icon-lock" />
            </el-form-item>
            <el-button type="primary" class="w-full mt-4 rounded-full" @click="onLogin" size="large">Login</el-button>
          </el-form>
        </div>
        <div v-else key="register">
          <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" class="space-y-6" label-position="top">
            <el-form-item label="Username" prop="username">
              <el-input v-model="registerForm.username" placeholder="Choose a username" size="large" prefix-icon="el-icon-user" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="registerForm.email" placeholder="Enter your email" size="large" prefix-icon="el-icon-message" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="registerForm.password" type="password" placeholder="Create a password" size="large" prefix-icon="el-icon-lock" />
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirm_password">
              <el-input v-model="registerForm.confirm_password" type="password" placeholder="Confirm your password" size="large" prefix-icon="el-icon-lock" />
            </el-form-item>
            <el-button type="primary" class="w-full mt-4 rounded-full" @click="onRegister" size="large">Register</el-button>
          </el-form>
        </div>
      </transition>
      <div v-if="loading" class="mt-6 text-center text-gray-500">
        <el-loading text="Loading..." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthentication } from '../../composables/useAuthentication'
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

const loginFormRef = ref()
const registerFormRef = ref()

const {
  loading,
  userId,
  activeForm,
  form,
  registerForm,
  loginRules,
  registerRules,
  loginSubmit,
  registerSubmit,
  switchForm
} = useAuthentication()

function onLogin() {
  loginSubmit(loginFormRef.value)
}

function onRegister() {
  registerSubmit(registerFormRef.value)
}
</script>

<style scoped>
.text-primary {
  color: var(--color-primary);
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 1s ease;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>