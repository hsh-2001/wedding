

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  if (!user && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (user && to.path === '/admin/login') {
    return navigateTo('/')
  }
})