

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/shares')) {
    return;
  };

  const allowGuestPaths = ['/admin/login', '/service', '/', '/contact', '/about'];
  let token = null;
  if (import.meta.server) {
    const cookieHeader = useRequestHeaders()['cookie'] || '';
    token = cookieHeader.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  } else {
    try {
      const Cookies = require('js-cookie');
      token = Cookies.get('token');
    } catch (e) {
      token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    }
  }
  if (!token && !allowGuestPaths.includes(to.path)) {
    return navigateTo('/admin/login');
  }
  if (token && to.path === '/admin/login') {
    return navigateTo('/');
  }
})