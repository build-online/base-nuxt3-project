import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async (NuxtApp) => {
  const { setUser } = useAuthStore()
  const token = useCookie('token')

  const instance = axios.create({
    baseURL: NuxtApp.$config.apiBaseUrl,
    headers: {
      common: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    },
  })

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 401) {
        token.value = undefined
        window.location = '/auth/login'
      } else {
        return Promise.reject(error)
      }
    }
  )

  if (token.value) {
    const response = await instance.get('/auth/user')
    setUser(response.data.data.user)
  }

  return {
    provide: {
      httpClient: instance,
    },
  }
})