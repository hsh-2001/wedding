<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">

    <div class="flex items-center gap-3">
      <Building2 class="w-6 h-6 text-primary" />
      <h1 class="text-2xl font-semibold">Company Settings</h1>
    </div>

    <el-card shadow="never" class="rounded-xl">
      <template #header>
        <div class="flex items-center gap-2">
          <Building class="w-5 h-5 text-blue-500" />
          <span class="font-medium">Company Information</span>
        </div>
      </template>

      <div class="grid md:grid-cols-2 gap-4">
        <el-input v-model="form.company_name" placeholder="Company Name" />

        <el-input v-model="form.company_email" placeholder="Company Email" />

        <el-input v-model="form.phone" placeholder="Phone Number" />

        <el-input v-model="form.website" placeholder="Website" />

        <el-input
          v-model="form.address"
          type="textarea"
          placeholder="Company Address"
          class="md:col-span-2"
        />
      </div>
    </el-card>

    <!-- Branding -->
    <el-card shadow="never" class="rounded-xl">
      <template #header>
        <div class="flex items-center gap-2">
          <Palette class="w-5 h-5 text-pink-500" />
          <span class="font-medium">Branding</span>
        </div>
      </template>

      <div class="grid md:grid-cols-2 gap-4">

        <el-input v-model="form.brand_color" placeholder="Primary Color" />

        <el-select v-model="form.theme" placeholder="Theme">
          <el-option label="Light" value="light" />
          <el-option label="Dark" value="dark" />
        </el-select>

        <div class="md:col-span-2">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
          >
            <Upload class="w-6 h-6 mx-auto mb-2" />
            <div class="text-sm text-gray-500">
              Upload Company Logo
            </div>
          </el-upload>
        </div>

      </div>
    </el-card>

    <!-- Notification Settings -->
    <el-card shadow="never" class="rounded-xl">
      <template #header>
        <div class="flex items-center gap-2">
          <Bell class="w-5 h-5 text-yellow-500" />
          <span class="font-medium">Notifications</span>
        </div>
      </template>

      <div class="flex items-center gap-2">
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

    <el-card shadow="never" class="rounded-xl">
      <template #header>
        <div class="flex items-center gap-2">
          <Settings class="w-5 h-5 text-gray-600" />
          <span class="font-medium">System Settings</span>
        </div>
      </template>

      <div class="flex items-center gap-2">
        <el-switch
          v-model="form.allow_multiple_events"
          active-text="Allow Multiple Weddings"
        />

        <el-switch
          v-model="form.enable_guest_rsvp"
          active-text="Enable Guest RSVP"
        />
      </div>
    </el-card>

    <div class="flex justify-end">
      <el-button type="danger" plain @click="logout">
        <LogOut class="w-4 h-4 mr-1" />
        Logout
      </el-button>
      <el-button type="primary" @click="saveSettings">
        Save Settings
      </el-button>
    </div>

  </div>
</template>

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