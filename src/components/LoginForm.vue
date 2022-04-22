<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6 text-weight-bold text-left text-uppercase">
        {{ t("message.login") }}
      </div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="submitSearch">
      <q-input
        outlined
        dense
        v-model="domain"
        type="text"
        :placeholder="t('message.nbdomain')"
      /></q-form>
      <div class="text-warning" v-if="status != ''">{{ status }}</div>
    </q-card-section>

    <q-card-actions class="text-primary" align="stretch">
        <q-btn
          :label="t('message.ok')"
          class="text-white bg-primary text-weight-bold" style="width:100%"
          unelevated
          @click="getDomainInfo(domain)"
        />
    </q-card-actions>

  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { tools } from "../utils/tools";
import { useI18n } from "vue-i18n";
const props = defineProps({
  note: String,
});
const emit = defineEmits(["closeLoginForm", "showPay"]);
const { t } = useI18n();

let success = false,
  loading = ref(false),
  status = ref(""),
  domain = ref(""),
  hash_to_verify = "",
  curDomain = {},
  queryResult = {},
  siteConfig = {};
init();
async function init() {
  const res = await fetch("site_config.json");
  const json = await res.json();
  siteConfig = json;
}

function signResult(res) {
  console.log("sign result===========");
  console.log(res);
  if (res.code == 0) {
    let signed = res.body;
    let verified = tools.verify(
      hash_to_verify,
      signed,
      curDomain.pubKey,
      curDomain.domain
    );
    if (verified) {
      console.log("verified:", curDomain);
      tools.setKV("CurDomain", queryResult);
      closeLoginForm();
      return;
    } else {
      console.log("verify failed:", curDomain);
    }
  }
  if (res.code == 400) status.value = "user not found";
  else status.value = "verification failed";
}
function submitSearch(){
  getDomainInfo(domain.value)
}
async function getDomainInfo(domain) {
  if (tools.validate_domain(domain) == false) {
    status.value = "not valid domain";
    return;
  }
  loading.value = true;
  let result = await tools.get_domain(domain, true);
  console.log(result);
  if (result.code == 0) {
    queryResult = result;
    [curDomain.nid, curDomain.tld] = domain.split(".");
    curDomain.domain = domain;
    curDomain.pubKey = result.obj.owner_key;
    curDomain.address = result.obj.owner;
    if (
      siteConfig &&
      siteConfig.noVerify &&
      siteConfig.noVerify.indexOf(domain) != -1
    ) {
      //no verify
      tools.setKV("CurDomain", queryResult);
      closeLoginForm();
      return;
    }
    let strSign = Date.now().toString();
    hash_to_verify = tools.sha256(strSign);
    tools.setKV("paycmd", {
      cmd: "sign",
      action: "signin",
      data_hash: hash_to_verify,
      signer: curDomain.address,
      app_data: { public_key: result.obj.owner_key },
      callback: signResult,
    });
    emit("showPay");
  } else {
    status.value = "Domain not registered !";
  }
  loading.value = false;
}

function closeLoginForm() {
  emit("closeLoginForm");
}
</script>
<style scoped lang="scss"></style>
