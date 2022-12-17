<script>
import { computed, ref } from 'vue';

export const initial = (username) => {
  if (!username) return '';
  let parts = username.split(/[ -]/);
  let initials = '';
  for (var i = 0; i < parts.length; i++) {
    initials += parts[i].charAt(0);
  }
  if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
    initials = initials.replace(/[a-z]+/g, '');
  }
  initials = initials.substr(0, 3).toUpperCase();
  return initials;
};

const randomcolors = (seed, colors) => seed % colors;

export default {
  name: 'Avatar',

  props: {
    username: {
      type: String,
      required: true,
    },

    src: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const isLoaded = ref(false);
    const isImageError = ref(false);

    const isImageVisible = computed(() => {
      return Boolean(props.src) && !isImageError.value;
    });

    return {
      id: Math.floor(Math.random() * 100),
      isLoaded,
      isImageVisible,
      initial: computed(() => initial(props.username)),
      bgColor: computed(() => randomcolors(props.username?.length ?? 0, 8)),
      onLoaded: () => {
        isLoaded.value = true;
      },
      onError: () => {
        isImageError.value = true;
      },
    };
  },
};
</script>
<template>
  <svg
    role="none"
    viewBox="0 0 36 36"
    :class="{
      'text-gray-500': bgColor === 0,
      'text-red-500': bgColor === 1,
      'text-yellow-500': bgColor === 2,
      'text-green-500': bgColor === 3,
      'text-blue-500': bgColor === 4,
      'text-indigo-500': bgColor === 5,
      'text-purple-500': bgColor === 6,
      'text-pink-500': bgColor === 7,
    }"
  >
    <defs>
      <mask :id="id">
        <circle cx="18" cy="18" fill="white" r="18"></circle>
      </mask>
    </defs>
    <g :mask="`url(#${id})`">
      <circle cx="18" cy="18" r="18" fill="currentcolor"></circle>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="white" class="avatar-text">
        {{ initial }}
      </text>
      <image
        v-if="isImageVisible"
        x="0"
        y="0"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        :xlink:href="src"
        @load="onLoaded"
        @error="onError"
      >
        <animate attributeName="opacity" dur="0.3s" keyTimes="0;1" values="0;1" />
      </image>
      <circle cx="18" cy="18" r="18" class="avatar-shadow"></circle>
    </g>
  </svg>
</template>

<style scoped>
.avatar-shadow {
  stroke-width: 2;
  stroke: rgba(0, 0, 0, 0.1);
  fill: none;
}

.avatar-text {
  font-weight: 700;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
