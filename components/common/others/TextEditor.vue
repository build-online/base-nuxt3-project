<template>
  <ClientOnly>
    <div class="my-5 relative">
      <QuillEditor
        v-bind="$attrs"
        theme="snow"
        :content="modelValue"
        :content-type="'html'"
        :toolbar="[
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
        ]"
        class="h-40 border border-gray-300 border-t-0 rounded-b-lg overflow-hidden"
        @update:content="handleUpdate"
      />
      <div
        v-if="state.maxLength"
        class="w-full flex justify-end"
        :class="{ 'text-rose-400': state.error }"
      >
        <span class="text-sm"> {{ state.length }} / {{ maxLength }} </span>
      </div>
      <div v-if="hasErrorSlot && state.error">
        <p class="text-xs text-rose-600 capitalize">
          <slot name="error" />
        </p>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
/*------------ Declarations ------------*/

const props = defineProps({
  error: {
    type: String,
    default: '',
    required: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
  maxLength: {
    type: Number,
    default: -1,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:maxLengthReached'])
const slots = useSlots()

/*------------ State ------------*/

const state = reactive({
  html: '',
  text: '',
  maxLength: false,
  length: 0,
  error: false,
})

const hasErrorSlot = computed(() => {
  return !!slots.error
})

/*------------ Methods ------------*/

const lengthError = () => {
  return state.maxLength && state.length > props.maxLength
}

const handleUpdate = (value) => {
  const text = value.replace(/(<([^>]+)>)/gi, '')

  state.html = value
  state.text = text
  state.length = text.length
  const error = lengthError()

  if (state.error !== error) {
    state.error = error
    emit('update:maxLengthReached', error)
  }

  emit('update:modelValue', value)
}

const getHTML = () => {
  return state.html
}

const getText = () => {
  return state.text
}

const getLength = () => {
  return state.length
}

/*------------ Lifecycle Hooks ------------*/

onMounted(() => {
  state.length = props.modelValue.length
  state.maxLength = props.maxLength && props.maxLength !== -1
  state.error = lengthError()
})

/*------------ Exports ------------*/
defineExpose({
  getHTML,
  getText,
  getLength,
})
</script>

<style>
.ql-toolbar.ql-snow {
  @apply border rounded-t-lg border-gray-300;
}

.ql-editor {
  @apply text-sm;
}

.ql-editor h1 {
  @apply text-3xl font-semibold;
}

.ql-editor h2 {
  @apply text-2xl font-semibold;
}

.ql-editor h3 {
  @apply text-lg font-semibold;
}

.ql-tooltip {
  @apply hidden;
}

.ql-selected {
  @apply bg-gray-100;
}
</style>
