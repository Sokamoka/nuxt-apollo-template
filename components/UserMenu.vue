<script setup lang="ts">
const userStore = useUserStore();

</script>
<template>
  <button class="text-white">{{ userStore.getUser?.username }}</button>
</template>
