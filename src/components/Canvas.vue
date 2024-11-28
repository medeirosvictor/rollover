<script setup lang="ts">
defineProps<{
  msg: string
}>()
import { DiceRollerTailwind } from '@dice-roller/vue'

</script>

<template>
    <div class="canvas">
        Canvas.vue
        <DiceRollerTailwind />
    </div>
</template>

<style scoped>
.canvas {
    border: 1px solid #000000;
}
</style>
