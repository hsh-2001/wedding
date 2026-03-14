<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="w-full max-w-md bg-(--color-surface) rounded-2xl shadow-xl p-10 animate-fade-in border border-(--color-border)">
      <div class="flex justify-center mb-8 gap-2">
        <el-button :type="activeForm === 'login' ? 'primary' : 'default'" @click="switchForm('login')" class="w-1/2">Login</el-button>
        <el-button :type="activeForm === 'register' ? 'primary' : 'default'" @click="switchForm('register')" class="w-1/2">Register</el-button>
      </div>
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeForm === 'login'" key="login">
          <el-form :model="form" :rules="loginRules" ref="loginFormRef" class="space-y-6" label-position="top">
            <el-form-item :label="$t('Username')" prop="username">
              <el-input v-model="form.username" :placeholder="$t('Enter your username')" size="large" />
            </el-form-item>
            <el-form-item :label="$t('Password')" prop="password">
              <el-input v-model="form.password" type="password" :placeholder="$t('Enter your password')" size="large" show-password />
            </el-form-item>
            <el-button type="primary" class="w-full mt-4" @click="onLogin" size="large">Login</el-button>
          </el-form>
        </div>
        <div v-else key="register">
          <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" class="space-y-6" label-position="top">
            <el-form-item :label="$t('Username')" prop="username">
              <el-input v-model="registerForm.username" :placeholder="$t('Enter your username')" size="large" />
            </el-form-item>
            <el-form-item :label="$t('Email')" prop="email">
              <el-input v-model="registerForm.email" :placeholder="$t('Enter your email')" size="large" />
            </el-form-item>
            <el-form-item :label="$t('Password')" prop="password">
              <el-input v-model="registerForm.password" type="password" :placeholder="$t('Create a password')" size="large" show-password />
            </el-form-item>
            <el-form-item :label="$t('Confirm Password')" prop="confirm_password">
              <el-input v-model="registerForm.confirm_password" type="password" :placeholder="$t('Confirm your password')" size="large" show-password />
            </el-form-item>
            <el-button type="primary" class="w-full mt-4" @click="onRegister" size="large">Register</el-button>
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