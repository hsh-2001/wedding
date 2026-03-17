<template>
    <el-dialog
        :model-value="visible"
        :title="$t(props.isEdit ? 'Edit Guest' : 'Add Guest')"
        width="500px"
        @update:model-value="emit('update:visible', $event)"
        @close="onCloseDialog"
    >
        <div>
            <el-form :model="model" ref="formRef" label-position="top" class="space-y-6">
                <el-form-item :label="$t('Guest Name')" prop="name">
                    <el-input v-model="model.name" :placeholder="$t('Guest Name')" />
                </el-form-item>
                <el-form-item :label="$t('Invite Title')" prop="title">
                    <el-input v-model="model.title" :placeholder="$t('Invite Title')" />
                </el-form-item>
                <el-form-item :label="$t('Phone')" prop="phone">
                    <el-input v-model="model.phone" :placeholder="$t('Phone')" />
                </el-form-item>
                <el-form-item :label="$t('Email')" prop="email">
                    <el-input v-model="model.email" :placeholder="$t('Email')" />
                </el-form-item>
                <el-form-item :label="$t('Remark')" prop="remark">
                    <el-input v-model="model.remark" :placeholder="$t('Remark')" />
                </el-form-item>
                <el-form-item label-position="left" :label="$t('Is Invited')" prop="is_invited">
                    <el-switch v-model="model.is_invited" />
                </el-form-item>
                <el-form-item>
                    <div class="w-full flex justify-end">
                        <el-button type="primary" @click="$emit('submit')">{{ $t(props.isEdit ? 'Update' : 'Add') }}</el-button>
                    </div>
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
    isEdit?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'update:formModel', value: IUpsertGuestRequest): void
    (e: 'submit'): void
    (e: 'close'): void
}>()

const model = computed({
    get: () => props.formModel,
    set: (value: IUpsertGuestRequest) => emit('update:formModel', value)
})

const onCloseDialog = async () => {
    emit('update:visible', false);
    emit('close');
};

const formRef = ref<FormInstance>()
</script>
