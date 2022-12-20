<template>
  <div class="h-screen flex flex-col">
    <TheHeader />
    <div class="flex-1 overflow-y-scroll">
      <slot />
    </div>
  </div>
</template>
