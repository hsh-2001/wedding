<template>
  <div class="w-28">
    <el-select 
      v-model="$colorMode.preference" 
      class="theme-select" 
      :placeholder="$t('Theme')"
      size="default"
    >
      <template #prefix>
        <div class="flex items-center h-full ml-1">
          <Sun v-if="$colorMode.preference === 'light'" class="w-4 h-4 text-amber-500" />
          <Moon v-else-if="$colorMode.preference === 'dark'" class="w-4 h-4 text-indigo-400" />
          <Monitor v-else class="w-4 h-4 text-gray-500" />
        </div>
      </template>
      
      <el-option value="light" :label="$t('Light')">
        <div class="flex items-center gap-2">
          <Sun class="w-4 h-4 text-amber-500" />
          <span class="font-semibold">{{ $t('Light') }}</span>
        </div>
      </el-option>
      <el-option value="dark" :label="$t('Dark')">
        <div class="flex items-center gap-2">
          <Moon class="w-4 h-4 text-indigo-400" />
          <span class="font-semibold">{{ $t('Dark') }}</span>
        </div>
      </el-option>
      <el-option value="system" :label="$t('System')">
        <div class="flex items-center gap-2">
          <Monitor class="w-4 h-4 text-gray-500" />
          <span class="font-semibold">{{ $t('System') }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next'

const colorMode = useColorMode()
</script>

<style scoped>
@reference "@/assets/styles/main.css";
</style>
