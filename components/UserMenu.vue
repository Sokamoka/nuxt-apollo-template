<script setup lang="ts">
const userStore = useUserStore();

userStore.queryUser();
</script>

<template>
  <div class="text-white inline-flex items-center space-x-2">
    <Avatar :username="userStore.getUser?.username" class="w-8 h-8" />
    <span>{{ userStore.getUser?.username }}</span>
  </div>
</template>
