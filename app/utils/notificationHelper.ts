import { ElNotification } from 'element-plus'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

function notify(
    type: NotificationType,
    message: string,
    title?: string,
    duration = 3000
) {
    ElNotification({
        title: title || type.charAt(0).toUpperCase() + type.slice(1),
        message,
        type,
        duration
    })
}

const success = (message: string, title?: string) =>
    notify('success', message, title)

const error = (message: string, title?: string) =>
    notify('error', message, title)

const info = (message: string, title?: string) =>
    notify('info', message, title)

const warning = (message: string, title?: string) =>
    notify('warning', message, title)

export default {
    notify, 
    success,
    error,
    info,
    warning
}