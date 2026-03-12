import { ref } from 'vue'
import { loginApi, registerApi } from '../utils/apiCalling'

export function useAuthentication() {
  const loading = ref(false)
  const userId = ref<string | null>(null)

  // Form state
  const activeForm = ref<'login' | 'register'>('login')
  const form = ref({
    username: '',
    password: ''
  })
  const registerForm = ref({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  // Validation rules
  const loginRules = {
    username: [
      { required: true, message: 'Username is required', trigger: 'blur' },
      { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Password is required', trigger: 'blur' },
      { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
    ]
  }
  const registerRules = {
    username: [
      { required: true, message: 'Username is required', trigger: 'blur' },
      { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' }
    ],
    email: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Email must be valid', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Password is required', trigger: 'blur' },
      { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
    ],
    confirm_password: [
      { required: true, message: 'Confirm password is required', trigger: 'blur' },
      {
        validator: (rule: any, value: string, callback: Function) => {
          if (value !== registerForm.value.password) {
            callback(new Error('Passwords do not match'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }

  async function loginSubmit(formRef: any) {
    if (!formRef) return
    await formRef.validate(async (valid: boolean) => {
      if (valid) {
        loading.value = true
        try {
          const res = await loginApi(form.value.username, form.value.password)
          if (res.status_code === 200) {
            notificationHelper.success('Login successful!')
            userId.value = res.data?.userId || null
          } else {
            notificationHelper.error(res.message || 'Login failed.')
            userId.value = null
          }
        } catch (err: any) {
          notificationHelper.error(err.message || 'Server error.')
          userId.value = null
        } finally {
          loading.value = false
        }
      }
    })
  }

  async function registerSubmit(formRef: any) {
    if (!formRef) return
    await formRef.validate(async (valid: boolean) => {
      if (valid) {
        loading.value = true
        try {
          const res = await registerApi(registerForm.value.username, registerForm.value.email, registerForm.value.password)
          if (res.status_code === 200) {
            notificationHelper.success('Registration successful!')
          } else {
            notificationHelper.error(res.message || 'Registration failed.')
          }
        } catch (err: any) {
          notificationHelper.error(err.message || 'Server error.')
        } finally {
          loading.value = false
        }
      }
    })
  }

  function switchForm(formType: 'login' | 'register') {
    activeForm.value = formType
  }

  return {
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
  }
}
