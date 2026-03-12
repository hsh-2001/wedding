import { ref } from 'vue'
import axios from 'axios'

export function useAuthentication() {
  const loading = ref(false)
  const message = ref('')
  const userId = ref<string | null>(null)

  async function login(username: string, password: string) {
    loading.value = true
    message.value = ''
    try {
      const { data } = await axios.post('/api/auth/login', { username, password })
      if (data.success) {
        message.value = 'Login successful!'
        userId.value = data.userId || null
        // TODO: handle session/token
      } else {
        message.value = data.message || 'Login failed.'
        userId.value = null
      }
    } catch (err) {
      message.value = 'Server error.'
      userId.value = null
    } finally {
      loading.value = false
    }
  }

  async function register(username: string, email: string, password: string) {
    loading.value = true
    message.value = ''
    try {
      const { data } = await axios.post('/api/auth/register', { username, email, password })
      if (data.success) {
        message.value = 'Registration successful!'
      } else {
        message.value = data.message || 'Registration failed.'
      }
    } catch (err) {
      message.value = 'Server error.'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    message,
    userId,
    login,
    register
  }
}
