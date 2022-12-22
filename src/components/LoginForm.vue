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
          autocomplete="on"
          :placeholder="t('message.nbdomain')"
      /></q-form>
      <div class="text-warning" v-if="status != ''">{{ status }}</div>
    </q-card-section>

    <q-card-actions class="text-primary" align="stretch">
      <q-btn
        :label="t('message.ok')"
        class="text-white bg-primary text-weight-bold"
        style="width: 100%"
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
  str_to_verify = "",
  curDomain = {},
  queryResult = {},
  siteConfig = {};

function signResult(res, para) {
  console.log("sign result===========");
  console.log(res, para);
  if (res.code == 0) {
    let signed = res.value;
    tools
      .verify(str_to_verify, signed, para.pubKey, para.chain)
      .then(verified => {
        if (verified) {
          console.log("verified:", curDomain);
          tools.setKV("CurDomain", queryResult);
          closeLoginForm();
          return;
        } else {
          console.log("verify failed:", curDomain);
        }
        if (res.code == 400) status.value = "user not found";
        else status.value = "verification failed";
      });
  }
}
function submitSearch() {
  getDomainInfo(domain.value);
}
async function getDomainInfo(domain) {
  if ((await tools.inst()).validate_domain(domain) == false) {
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
      tools.callPayAction(queryResult);
      closeLoginForm();
      return;
    }
    str_to_verify = Date.now().toString();
    await tools.callPayAction({
      cmd: "sign",
      action: "signin",
      message: str_to_verify,
      address: curDomain.address,
      chain: result.chain,
      para: { pubKey: result.obj.owner_key, chain: result.chain },
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
