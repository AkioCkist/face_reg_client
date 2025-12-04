<template>
  <div class="mb-4">
    <InputLabel v-if="label" :for="id" :value="label" :class="{ 'required': required }" />
    <TextInput
      :id="id"
      :type="type"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="{ 'mt-1': label }"
      class="block w-full"
    />
    <InputError v-if="error" :message="error" class="mt-2" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.required::after {
  content: ' *';
  color: #ef4444;
}
</style>
