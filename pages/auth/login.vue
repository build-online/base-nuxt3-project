<template>
  <PageWrapper>
    <div class="w-full flex justify-center pt-20">
      <form class="w-1/2 space-y-4" @submit="onSubmit">
        <h1 class="text-xl text-blue font-semibold text-center mb-8">
          Welcome, enter to your account
        </h1>

        <InputField
          id="email-input"
          v-model="email"
          type="email"
          name="email"
          label="Email"
          :error="errors.email"
        />

        <InputField
          id="password-input"
          v-model="password"
          type="password"
          name="password"
          label="Password"
          :error="errors.password"
        />

        <Button id="submit-button" type="submit" button-type="secondary"
          >Login</Button
        >
      </form>
    </div>
  </PageWrapper>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'

import { useAuth } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import InputField from '@/components/common/inputs/InputField'
import Button from '@/components/common/buttons/Button'

import loginSchema from '@/schemas/loginSchema'

/* ---------------------------------------------------------------- */

const { login } = useAuth()
const { show: showToast } = useToast()

const { errors, handleSubmit } = useForm({ validationSchema: loginSchema })

const { value: email } = useField('email')
const { value: password } = useField('password')

/* ---------------------------------------------------------------- */

definePageMeta({
  layout: 'guest',
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await login({
      email: values.email,
      password: values.password,
    })

    navigateTo('/')
  } catch (ex) {
    showToast('Error', 'Something went wrong.', 'danger')
  }
})
</script>
