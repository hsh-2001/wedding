<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="space-y-6">
    <el-form-item :label="$t('Bride Name')" prop="bride_name">
      <el-input v-model="form.bride_name" :placeholder="$t('Enter bride name')" />
    </el-form-item>
    <el-form-item :label="$t('Groom Name')" prop="groom_name">
      <el-input v-model="form.groom_name" :placeholder="$t('Enter groom name')" />
    </el-form-item>
    <el-form-item :label="$t('Wedding Date')" prop="wedding_date">
      <el-date-picker v-model="form.wedding_date" type="date" :placeholder="$t('Select wedding date')" value-format="YYYY-MM-DD" />
    </el-form-item>
    <el-form-item :label="$t('Venue Name')" prop="venue_name">
      <el-input v-model="form.venue_name" :placeholder="$t('Enter venue name')" />
    </el-form-item>
    <el-form-item :label="$t('Venue Address')" prop="venue_address">
      <el-input v-model="form.venue_address" :placeholder="$t('Enter venue address')" />
    </el-form-item>
    <el-form-item :label="$t('Description')" prop="description">
      <el-input v-model="form.description" type="textarea" :placeholder="$t('Enter event description')" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEvent } from '../composables/useEvent'

const { loading, form, rules } = useEvent()
const formRef = ref()
</script>
