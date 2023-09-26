<template>
  <PageWrapper>
    <div class="w-full flex justify-center mt-20">
      <div class="w-1/2 space-y-4">
        <InputField label="Name" />
        <SelectField label="Options" :options="options" />
        <Switch label="Switch" />

        <TextEditor
          ref="editor"
          v-model:model-value="editorContent"
          :max-length="50"
          class="h-44"
        >
          <template #error> Max length reached </template>
        </TextEditor>
        <Button class="w-40 ml-auto" type="button" @click="getHTMLDemo">
          Get HTML
        </Button>

        <div class="flex justify-center">
          <Dialog ref="dialog" title="Dialog">
            <template #trigger>
              <Button class="w-64" type="button"> Open Dialog </Button>
            </template>

            <template #content>
              <div class="space-y-4">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>

                <InputField label="Name" />

                <InputField label="Email" />

                <InputField label="Age" />

                <InputField label="Occupation" />

                <SelectField label="Options" :options="options" z-index="9" />
              </div>
            </template>

            <template #actions>
              <div class="w-full flex space-x-2">
                <Button
                  type="button"
                  button-type="primary-outlined"
                  @click="onDialogSave"
                >
                  Cancel
                </Button>
                <Button type="button" @click="onDialogSave"> Save </Button>
              </div>
            </template>
          </Dialog>
        </div>

        <div class="flex justify-center">
          <Dropdown width="64">
            <template #trigger>
              <Button class="w-64" type="button"> Open Dropdown </Button>
            </template>
            <template #content>
              <div class="w-full">
                <ul>
                  <li
                    class="flex space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <PenIcon />
                    <span>Edit</span>
                  </li>
                  <li
                    class="flex space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <TrashIcon />
                    <span>Delete</span>
                  </li>
                </ul>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import PageWrapper from '@/components/layout/wrappers/PageWrapper'

import InputField from '@/components/common/inputs/InputField'
import SelectField from '@/components/common/inputs/SelectField'

import Button from '@/components/common/buttons/Button'

import Dialog from '@/components/common/others/Dialog'
import Switch from '@/components/common/others/Switch'
import Dropdown from '@/components/common/others/Dropdown'
import TextEditor from '@/components/common/others/TextEditor.vue'

import { TrashIcon, PenIcon } from '@/components/common/icons'

const dialog = ref(null)
const options = reactive([
  { key: '1', value: 'Wade Cooper' },
  { key: '2', value: 'Arlene Mccoy' },
  { key: '3', value: 'Devon Webb' },
  { key: '4', value: 'Tom Cook' },
  { key: '5', value: 'Tanya Fox' },
  { key: '6', value: 'Hellen Schmidt' },
])

const editorContent = ref('')
const editor = ref(null)

const getHTMLDemo = () => {
  console.log(editor.value.getHTML())
}

const onDialogSave = () => {
  dialog.value.closeModal()
}
</script>
