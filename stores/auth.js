import { defineStore } from 'pinia'

import useRequest from '@/composables/useRequest'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)

  const setUser = async (newUser) => {
    user.value = newUser
  }

  const getUser = async () => {
    const { get } = useRequest()

    const response = await get('/auth/user')

    if (!response.data.success) {
      throw new Error(response.data)
    }

    setUser(response.data.data.user)
  }

  const login = async (payload) => {
    const { post } = useRequest()
    const token = useCookie('token')
    const context = useNuxtApp()

    console.log('CONTEXT', context)

    const response = await post('/auth/login', payload)

    if (!response.data.success) {
      throw new Error(response.data)
    }

    token.value = response.data.data.token

    context.$httpClient.defaults.headers = {
      common: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    }

    await getUser()
  }

  return { user, setUser, login }
})
