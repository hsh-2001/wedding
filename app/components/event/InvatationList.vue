<template>
    <div class="mt-2 w-full">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div class="flex items-center justify-between mb-4 p-2">
                <el-form class="w-1/2 mt-2">
                    <el-form-item>
                        <div class="flex items-end gap-2 w-full">
                            <el-input placeholder="Enter guest name or phone number" prefix-icon="Search" />
                            <el-button type="primary" class="mt-2">
                                {{ $t('Search') }}
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="openAddGuestDialog">
                    {{ $t('Add Guest') }}
                </el-button>
            </div>

            <div class="w-full overflow-auto rounded-md">
                <el-table border :data="guestList" class="w-full rounded-lg min-w-200 overflow-hidden">
                    <el-table-column label="No." prop="row_number" width="100" />
                    <el-table-column prop="name" label="Guest Name" />

                    <el-table-column prop="phone" label="Phone" width="150" />

                    <el-table-column label="Remark" prop="remark" />

                    <el-table-column label="Invitation Code" prop="invitation_code" />

                    <el-table-column label="Actions">
                        <template #default="{ row }">
                            <div class="flex">
                                <el-button size="small" type="info">
                                    Edit
                                </el-button>
                                <el-button size="small" type="primary" @click="handleShareEvent(row)">
                                     <share class="w-4 h-4 mr-1" />
                                     <span>{{ $t('Invite') }}</span>
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>
    <event-add-guest-dialog
        v-model:visible="dialogVisible"
        v-model:form-model="upsertGuestModel"
        @submit="upsertGuest()"
    />
</template>
<script setup lang="ts">
import { Share } from 'lucide-vue-next';

const props = defineProps<{
    weddingData: any;
}>();

const route = useRoute();
const {
    upsertGuest,
    upsertGuestModel,
    getGuestsByWeddingId,
    guestList,
    dialogVisible,
    handleShareEvent,
} = useGuest();

const openAddGuestDialog = () => {
    dialogVisible.value = true
}

onMounted(() => {
    const weddingId = route.params.id as string
    getGuestsByWeddingId(weddingId)
});
</script>

<style scoped></style>