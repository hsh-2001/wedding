<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="space-y-6">
    <el-form-item label="Bride Name" prop="bride_name">
      <el-input v-model="form.bride_name" placeholder="Bride name" />
    </el-form-item>
    <el-form-item label="Groom Name" prop="groom_name">
      <el-input v-model="form.groom_name" placeholder="Groom name" />
    </el-form-item>
    <el-form-item label="Wedding Date" prop="wedding_date">
      <el-date-picker v-model="form.wedding_date" type="date" placeholder="Wedding date" value-format="YYYY-MM-DD" />
    </el-form-item>
    <el-form-item label="Venue Name" prop="venue_name">
      <el-input v-model="form.venue_name" placeholder="Venue name" />
    </el-form-item>
    <el-form-item label="Venue Address" prop="venue_address">
      <el-input v-model="form.venue_address" placeholder="Venue address" />
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description" type="textarea" placeholder="Description" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEvent } from '../composables/useEvent'

const { loading, form, rules } = useEvent()
const formRef = ref()
</script>
