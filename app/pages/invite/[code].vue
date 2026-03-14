<template>
    <div class="min-h-screen w-full bg-gradient-to-b from-pink-50/80 dark:from-gray-900 to-white dark:to-gray-950 py-8 px-4">
        <div class="max-w-lg mx-auto">
            <!-- Wedding card -->
            <div class="text-center mb-8">
                <p class="text-sm uppercase tracking-[0.3em] text-(--text-muted) mb-2">
                    {{ $t('You\'re invited') }}
                </p>
                <h1 class="text-3xl md:text-4xl font-serif text-(--text-main) mb-2">
                    {{ wedding.bride_name }} & {{ wedding.groom_name }}
                </h1>
                <p class="text-(--text-muted) text-sm">
                    {{ formatDate(wedding.wedding_date) }}
                </p>
                <p class="text-(--text-muted) text-sm mt-1">
                    {{ wedding.venue_name }} · {{ wedding.venue_address }}
                </p>
            </div>

            <!-- RSVP form -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <h2 class="text-lg font-semibold text-(--text-main) mb-4">
                    {{ $t('RSVP') }}
                </h2>
                <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="space-y-4">
                    <el-form-item :label="$t('Your name')" prop="guest_name">
                        <el-input v-model="form.guest_name" :placeholder="$t('Full name')" />
                    </el-form-item>
                    <el-form-item :label="$t('Will you attend?')" prop="attendance">
                        <el-radio-group v-model="form.attendance">
                            <el-radio value="yes">{{ $t('Yes, I will attend') }}</el-radio>
                            <el-radio value="no">{{ $t('Sorry, I cannot attend') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="form.attendance === 'yes'" :label="$t('Number of guests')" prop="guest_count">
                        <el-input-number v-model="form.guest_count" :min="1" :max="10" />
                    </el-form-item>
                    <el-form-item :label="$t('Dietary requirements or message')" prop="message">
                        <el-input v-model="form.message" type="textarea" :rows="3" :placeholder="$t('e.g. Vegetarian, allergies, congratulations...')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="w-full" :loading="submitting" @click="onSubmit">
                            {{ $t('Send response') }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <p class="text-center text-xs text-(--text-muted) mt-6">
                {{ $t('Invitation code') }}: {{ code }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { format } from 'date-fns'

const route = useRoute()
const formRef = ref<FormInstance>()
const submitting = ref(false)
const code = computed(() => (route.params.code as string) || '')

// Fake wedding data for the invitation
const wedding = ref({
    bride_name: 'Sophea',
    groom_name: 'Rithy',
    wedding_date: '2026-06-15',
    venue_name: 'Garden Palace',
    venue_address: 'Phnom Penh'
})

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return format(new Date(dateStr), 'EEEE, MMMM d, yyyy')
}

// Guest response form (fake defaults for demo)
const form = ref({
    guest_name: 'Sok Dara',
    attendance: 'yes' as 'yes' | 'no',
    guest_count: 2,
    message: 'Looking forward to celebrating with you!'
})

const rules: FormRules = {
    guest_name: [
        { required: true, message: 'Please enter your name', trigger: 'blur' }
    ],
    attendance: [
        { required: true, message: 'Please select your response', trigger: 'change' }
    ]
}

const onSubmit = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid) => {
        if (valid) {
            submitting.value = true
            // TODO: call API to save guest RSVP
            setTimeout(() => {
                submitting.value = false
                // Could show success and redirect or show thank you message
                try {
                    notificationHelper.success('Thank you! Your response has been received.')
                } catch (error) {
                    console.error('Error showing success message:', error)
                }
            }, 800)
        }
    })
}
</script>

<style scoped></style>
