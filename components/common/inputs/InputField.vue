<template>
  <div class="w-full">
    <label
      v-if="label !== ''"
      :for="id"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <div class="relative mt-2">
      <div
        v-if="hasLeftIcon"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot name="leftIcon"></slot>
      </div>
      <input
        v-bind="$attrs"
        :id="id"
        :value="modelValue"
        class="w-full shadow-inner shadow-slate-300 outline bg-gray-50 rounded-md py-2 px-3 text-sm"
        :class="{
          'focus:outline-secondary-500 text-gray-600 placeholder-gray-300':
            error === '',
          'text-rose-400 placeholder:text-rose-300 outline-rose-300 focus:outline-rose-500':
            error !== '',
          'outline-green-300 focus:outline-green-500': success,
          'outline-orange-300 focus:outline-orange-500': warning,
          'outline-blue-300 focus:outline-blue-500': info,
          'outline-transparent': state.emptyState,
          'pl-10': hasLeftIcon,
        }"
        @input="updateInput"
      />
      <div
        v-if="error !== ''"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationIcon class="text-rose-500" />
      </div>
    </div>
    <p
      v-if="error !== ''"
      id="email-error"
      class="mt-2 text-sm text-rose-500 capitalize"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { ExclamationIcon } from '@/components/common/icons'

/*------------ Declarations ------------*/

const props = defineProps({
  error: {
    type: String,
    default: '',
    required: false,
  },
  id: {
    type: String,
    default: '',
    required: false,
  },
  info: {
    type: Boolean,
    default: false,
    required: false,
  },
  label: {
    type: String,
    default: '',
    required: false,
  },
  modelValue: {
    type: String,
    default: '',
    required: false,
  },
  success: {
    type: Boolean,
    default: false,
    required: false,
  },
  warning: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const attrs = useAttrs()

/*------------ State ------------*/

const state = reactive({
  emptyState: true,
})

const hasLeftIcon = computed(() => {
  return !!slots.leftIcon
})

const id = computed(() => {
  const passedValue = props.id || attrs.id
  return passedValue || `input-${Math.random().toString(16).slice(2)}`
})

/*------------ Methods ------------*/

const updateInput = (event) => {
  emit('update:modelValue', event.target.value)
}

/*------------ Lifecycle Hooks ------------*/

onMounted(() => {
  state.emptyState =
    !props.success && !props.warning && !props.info && props.error === ''
})
</script>

<style scoped></style>
