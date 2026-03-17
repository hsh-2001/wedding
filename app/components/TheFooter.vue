<template>
  <footer class="w-full bg-(--color-surface) text-(--text-main) py-10 border-t border-(--color-border)">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-2">
      <div class="text-sm font-bold text-(--text-muted) text-center md:text-left">
        &copy; 2026 {{ $t('Wedding Store') }}. {{ $t('All rights reserved.') }}
      </div>
      <nav class="flex gap-2">
        <NuxtLink to="/home" class="hover:text-(--color-primary) font-bold transition-all text-sm tracking-tight">{{ $t('Home') }}</NuxtLink>
        <NuxtLink to="/admin/login" class="hover:text-(--color-primary) font-bold transition-all text-sm tracking-tight">{{ $t('Admin') }}</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-(--color-primary) font-bold transition-all text-sm tracking-tight">{{ $t('Contact') }}</NuxtLink>
      </nav>
      <div class="flex gap-2">
        <a href="#" aria-label="Instagram" class="text-(--text-light) hover:text-(--color-primary) transition-all transform hover:scale-110">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
        </a>
        <a href="#" aria-label="Facebook" class="text-(--text-light) hover:text-(--color-primary) transition-all transform hover:scale-110">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
