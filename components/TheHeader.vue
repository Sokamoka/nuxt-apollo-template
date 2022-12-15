<script setup>
const navigation = [
  { name: 'Dashboard', to: '/dashboard' },
  // { name: 'Pricing', href: '#' },
  // { name: 'Docs', href: '#' },
  // { name: 'Company', href: '#' },
];
</script>

<template>
  <header class="bg-indigo-600">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
        <div class="flex items-center">
          <NuxtLink to="/">
            <span class="sr-only">Workflow</span>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" />
          </NuxtLink>
          <div class="hidden ml-10 space-x-8 lg:block">
            <NuxtLink
              v-for="link in navigation"
              :key="link.name"
              :to="link.to"
              class="text-base font-medium text-white hover:text-indigo-50"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="ml-10 space-x-4">
          <NuxtLink
            to="/sign-in"
            class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
          >
            Sign in
          </NuxtLink>
          <NuxtLink
            to="/sign-up"
            class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
          >
            Sign up
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
          >
            Sign Out
          </NuxtLink>
        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <NuxtLink
          v-for="link in navigation"
          :key="link.name"
          :to="link.to"
          class="text-base font-medium text-white hover:text-indigo-50"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
