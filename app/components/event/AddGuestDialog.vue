<template>
    <el-dialog
        :model-value="visible"
        title="Add Guest"
        width="500px"
        @update:model-value="emit('update:visible', $event)"
        @close="emit('update:visible', false)"
    >
        <div>
            <el-form :model="model" ref="formRef" label-position="top" class="space-y-6">
                <el-form-item label="Guest Name" prop="name">
                    <el-input v-model="model.name" placeholder="Guest Name" />
                </el-form-item>
                <el-form-item label="Invite Title" prop="title">
                    <el-input v-model="model.title" placeholder="Invite Title" />
                </el-form-item>
                <el-form-item label="Phone" prop="phone">
                    <el-input v-model="model.phone" placeholder="Phone" />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="model.email" placeholder="Email" />
                </el-form-item>
                <el-form-item label="Remark" prop="remark">
                    <el-input v-model="model.remark" placeholder="Remark" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$emit('submit')">Submit</el-button>
                    <!-- <el-button type="primary" @click="onCancel">Cancel</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import type { IUpsertGuestRequest } from '~~/shared/types/guest';

const props = defineProps<{
    visible: boolean
    formModel: IUpsertGuestRequest
}>()

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'update:formModel', value: IUpsertGuestRequest): void
    (e: 'submit'): void
}>()

const model = computed({
    get: () => props.formModel,
    set: (value: IUpsertGuestRequest) => emit('update:formModel', value)
})

const formRef = ref<FormInstance>()
</script>