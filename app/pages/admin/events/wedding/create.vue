<template>
    <div>
        <el-form :model="eventModel" label-position="top" class="w-full max-w-2xl mx-auto">
            <el-form-item label="Bride Name">
                <el-input v-model="eventModel.bride_name" placeholder="Enter bride name" />
            </el-form-item>

            <el-form-item label="Groom Name">
                <el-input v-model="eventModel.groom_name" placeholder="Enter groom name" />
            </el-form-item>

            <el-form-item label="Wedding Date">
                <el-date-picker v-model="eventModel.wedding_date" type="date" placeholder="Select wedding date"
                    style="width: 100%;" />
            </el-form-item>

            <el-form-item label="Description">
                <el-input v-model="eventModel.description" type="textarea" placeholder="Enter event description" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleUpsertEvent">Create Event</el-button>
                <el-button @click="$router.back()">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const {
    eventModel,
    handleUpsertEvent,
} = useEvent();

</script>

<style scoped></style>