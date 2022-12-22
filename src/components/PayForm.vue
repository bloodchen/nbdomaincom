<template>
  <q-card style="min-width: 400px">
    <q-card-section class="row items-center q-pb-none q-my-sm">
      <div class="text-h6 text-weight-bold text-left text-uppercase">
        {{ title }}
      </div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup @click="onCancel" />
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div id="pay" style="height: 230px"></div>
      <div v-if="note">
        {{ note }}
      </div>
      <div class="text-positive">{{ message }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { tools } from "../utils/tools";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps({
  note: String,
});
const emit = defineEmits(["closePayForm"]);
const { t } = useI18n();

let isPwd = true,
  sendCmdRes = {},
  message = null,
  loading = ref(false),
  cmdFee = { total: 0 },
  payCmd = tools.getKV("paycmd");
console.log(payCmd);
const dpay = tools.dpay;
const title = payCmd.cmd == "sign" ? "Verification" : t("message.payment");

onMounted(() => {
  initCMD();
});
async function initCMD() {
  const cmd = payCmd;
  console.log("cmd=", payCmd);
  if (cmd.cmd == "key") {
    const domain = await tools.nblib.getDomain(cmd.domain);
    if (domain) {
      const res =
        cmd.cmd == "key"
          ? await domain.updateKey2({ kv: cmd.kv })
          : await domain.updateUser(cmd.kv);
      console.log("key cmd result:", res);
      handleReply(res);
    }
  }
  if (cmd.cmd == "user") {
    const domain = await tools.nblib.getDomain(cmd.domain);
    if (domain) {
      const res = await domain.updateUser({
        name: cmd.kv.name,
        publicKey: cmd.kv.publicKey,
      });
      console.log("user cmd result:", res);
      handleReply(res);
    }
  }
  if (cmd.cmd == "sell") {
    const domain = await tools.nblib.getDomain(cmd.domain);
    if (domain) {
      const res = await domain.sell(cmd.sell_info);
      console.log("key cmd result:", res);
      handleReply(res);
    }
  }
  if (cmd.cmd == "buy") {
    const buyOption = cmd.option;
    const domain = await tools.nblib.getDomain(cmd.domain);
    if (domain) {
      const res = await domain.buy(buyOption);
      console.log("buy cmd result:", res);
      handleReply(res);
    }
  }
  if (cmd.cmd == "reg") {
    const res = await tools.nblib.registerDomain(cmd.domain);
    handleReply(res);
  }
  if (cmd.cmd == "pay") {
    const res = await dpay.sendTransaction({ data: cmd });
    handleReply(res);
  }
  if (cmd.cmd == "makePublic") {
    const domain = await tools.nblib.getDomain(cmd.domain);
    if (domain) {
      const res = await domain.makePublic(cmd.domain);
      console.log("makePublic result:", res);
      handleReply(res);
    } else {
      console.error("Failed to get domain:", cmd.domain);
    }
  }

  if (cmd.cmd == "sign") {
    const body = {
      data_hash: cmd.data_hash,
      signer: cmd.signer,
      app_data: cmd.app_data,
    };
    opay.request({ sign_request: { data: body } }, (ret) => {
      handleReply(ret);
      return { code: 0, id: ret.id };
    });
  }
}
function onCancel() {
  console.log("oncancel payCmd:", payCmd);
  if (payCmd && payCmd.callback) {
    payCmd.callback({ code: -1, message: "Cancelled" });
  }
  
}
function onOK() {
  closePayForm();
}
function handleReply(res) {
  console.log("in handleReply");
  const self = this;
  console.log(res);
  console.log(payCmd);
  loading = false;
  if (res.code == 0) {
    message = "transaction Succeeded";
  } else {
    message = JSON.stringify(res);
  }
  if (payCmd && payCmd.callback) {
    payCmd.callback(res);
  }

  closePayForm();
}

function closePayForm() {
  emit("closePayForm");
}
</script>
