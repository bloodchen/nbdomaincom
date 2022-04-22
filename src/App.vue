<template>
  <router-view />
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
import { tools } from 'src/utils/tools'
console.log("app start...")
onBeforeMount( async () => {
  console.log("app onBeforeMount")
    await tools.init()
})
</script>
