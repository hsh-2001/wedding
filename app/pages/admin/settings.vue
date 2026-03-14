<template>
  <div class="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

    <PageHeader 
      title="Company Settings" 
      description="Manage your store's information, branding, and notification preferences."
      :icon="Building2"
    />

    <el-card shadow="sm" class="rounded-xl border-(--color-border) bg-(--color-surface)">
      <template #header>
        <div class="flex items-center gap-2">
          <Building class="w-5 h-5 text-blue-500" />
          <span class="font-bold text-(--text-main)">Company Information</span>
        </div>
      </template>

      <div class="grid md:grid-cols-2 gap-2">
        <el-form-item label="Company Name" class="mb-0">
          <el-input v-model="form.company_name" placeholder="Company Name" />
        </el-form-item>

        <el-form-item label="Company Email" class="mb-0">
          <el-input v-model="form.company_email" placeholder="Company Email" />
        </el-form-item>

        <el-form-item label="Phone Number" class="mb-0">
          <el-input v-model="form.phone" placeholder="Phone Number" />
        </el-form-item>

        <el-form-item label="Website" class="mb-0">
          <el-input v-model="form.website" placeholder="Website" />
        </el-form-item>

        <el-form-item label="Company Address" class="md:col-span-2 mb-0">
          <el-input
            v-model="form.address"
            type="textarea"
            :rows="3"
            placeholder="Company Address"
          />
        </el-form-item>
      </div>
    </el-card>

    <!-- Branding -->
    <el-card shadow="sm" class="rounded-xl border-(--color-border) bg-(--color-surface)">
      <template #header>
        <div class="flex items-center gap-2">
          <Palette class="w-5 h-5 text-pink-500" />
          <span class="font-bold text-(--text-main)">Branding</span>
        </div>
      </template>

      <div class="grid md:grid-cols-2 gap-2">
        <el-form-item label="Primary Color" class="mb-0">
          <el-input v-model="form.brand_color" placeholder="Primary Color">
            <template #append>
              <el-color-picker v-model="form.brand_color" size="small" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Default Theme" class="mb-0">
          <el-select v-model="form.theme" placeholder="Theme" class="w-full">
            <el-option label="Light" value="light" />
            <el-option label="Dark" value="dark" />
          </el-select>
        </el-form-item>

        <div class="md:col-span-2">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
          >
            <Upload class="w-8 h-8 mx-auto mb-2 text-(--text-light)" />
            <div class="text-sm text-(--text-muted)">
              Drag logo here or <span class="text-(--color-primary)">click to upload</span>
            </div>
          </el-upload>
        </div>
      </div>
    </el-card>

    <!-- Notification Settings -->
    <el-card shadow="sm" class="rounded-xl border-(--color-border) bg-(--color-surface)">
      <template #header>
        <div class="flex items-center gap-2">
          <Bell class="w-5 h-5 text-amber-500" />
          <span class="font-bold text-(--text-main)">Notifications</span>
        </div>
      </template>

      <div class="flex flex-col sm:flex-row gap-2">
        <el-switch
          v-model="form.email_notification"
          active-text="Email Notification"
        />

        <el-switch
          v-model="form.sms_notification"
          active-text="SMS Notification"
        />
      </div>
    </el-card>

    <div class="flex justify-end gap-2 pt-4">
      <el-button @click="logout" class="!h-11">
        <LogOut class="w-4 h-4 mr-2" />
        Logout
      </el-button>
      <el-button type="primary" @click="saveSettings" class="!h-11 !px-8 font-bold">
        Save Settings
      </el-button>
    </div>

  </div>
</template>

<style scoped>
:deep(.el-card__header) {
  padding: 16px 20px;
}

:deep(.el-upload-dragger) {
  background-color: var(--color-background);
  border: 2px dashed var(--color-border);
  border-radius: 12px;
}

:deep(.el-upload-dragger:hover) {
  border-color: var(--color-primary);
}
</style>

<script setup lang="ts">
import {
  Building,
  Building2,
  Palette,
  Bell,
  Settings,
  Upload,
  LogOut
} from "lucide-vue-next"

const form = ref({
  company_name: '',
  company_email: '',
  phone: '',
  website: '',
  address: '',

  brand_color: '#ff4d6d',
  theme: 'light',

  email_notification: true,
  sms_notification: false,

  allow_multiple_events: true,
  enable_guest_rsvp: true
})

const saveSettings = () => {
  console.log("Save company settings", form.value)
}

const logout = () => {
  useCookie('token').value = null
  navigateTo('/admin/login')
}
</script>