<template>
  <i class="loader"></i>
</template>
<style lang="scss" scoped>
.loader {
  --color: white;
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;

  display: block;
  position: relative;
  width: 50%;
  display: grid;
  place-items: center;

  &::before {
    left: calc(50% - var(--size-dot) - 1.6vmin);
  }
  &::after {
    left: calc(50% + 1.6vmin);
    animation-delay: 0.12s;
  }
  &::before,
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    width: var(--size-dot);
    height: var(--size-dot);
    border-radius: 50%;
    background-color: var(--color);
    animation: loader 0.42s cubic-bezier(0.39, 0.31, 0, 1.11) infinite;
  }
}

@keyframes loader {
  0%,
  100% {
    opacity: 0;
  }

  0% {
    transform: translate(-4vmin, -4vmin);
  }

  66% {
    opacity: 1;
  }

  66%,
  100% {
    transform: none;
  }
}
</style>
