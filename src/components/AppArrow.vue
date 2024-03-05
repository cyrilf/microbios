<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="arrow" viewBox="0 0 35 40" role="presentation">
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width=".5"
    >
      <path
        stroke-dasharray="5"
        d="M10.34 7.74c-.23 7.73-.185 20.344 4.537 26.833 5.306 7.29 11.102.634 16.463-3.833"
      />
      <path
        stroke-linejoin="round"
        d="M3.66 11.665c3.721-2.325 4.35-6.603 7.404-9.481 1.045 3.027 3.441 9.07 6.125 11.113"
      />
    </g>
  </svg>
</template>
<style scoped>
.arrow {
  display: none;
  position: fixed;
  top: 50px;
  right: 100px;
  transform: scaleX(-1);
  animation: zoomIn 2s ease-in-out 2s;
  transition: all 100ms;
  width: 150px;
  color: var(--arrow-color);

  @media (min-width: 1260px) {
    & {
      display: block;
    }
    &:hover {
      transform: scaleX(-1) scale(1.2);
    }
  }
}

@keyframes zoomIn {
  0% {
    transform: scaleX(-1) scale(1);
  }
  30% {
    transform: scaleX(-1) scale(1.2);
  }
  60% {
    transform: scaleX(-1) scale(0.7);
  }
  100% {
    transform: scaleX(-1) scale(1);
  }
}
</style>
