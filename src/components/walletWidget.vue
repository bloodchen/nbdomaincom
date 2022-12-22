<template>
  <div>
    <q-btn
      no-caps
      outline
      rounded
      :color="isConnected ? 'white' : 'primary'"
      :label="isConnected ? 'Disconnect Wallet' : 'Connect Wallet'"
      class=""
      @click="connectWallet"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { tools } from "../utils/tools";
let isConnected = ref(false);

onMounted(async () => {
  await tools.inst();
  await tools.dpay.connectLastWallet();
  setInterval(async () => {
    isConnected.value = await tools.dpay.isConnected();
    console.log(isConnected.value);
  }, 3000);
});

async function connectWallet() {
  if (!isConnected.value) (await tools.inst()).connectWallet();
  else tools.dpay.disconnect();
}
</script>
