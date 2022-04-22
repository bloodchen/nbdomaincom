<template>
  <!-- On sell Domains -->
  <div class="row justify-center no-wrap">
    <div
      class="col-11 col-sm-11 col-md-8 justify-center"
      style="margin-top: 30px"
    >
      <q-card class="my-card q-pa-md" flat bordered>
        <q-card-section class="text-weight-bold font-t16">
          Domains For Sale
        </q-card-section>
        <div
          v-for="item of onSaleDomains"
          :key="item"
          class="row justify-between q-mt-md"
        >
          <div class="col-9 font-t16 text-primary">
            <div class="row justify-start">
              <div class="col-1">
                <img :src="getIcon(item.domain)" style="width: 16px" />
              </div>
              <div class="col">
                <div class="font-t16">{{ item.domain }}</div>
                <div class="font-t12 text-grey-6">
                  {{ item.sell_info.note }}
                </div>
              </div>
              <div>
                {{ getPrice(item) }}
              </div>
            </div>
          </div>

          <div>
            <q-btn
              :label="t('message.buy')"
              outline
              color="primary"
              class="q-px-lg"
              size="md"
              @click="buyDomain(item)"
              no-caps
            />
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="showBuyDomain" persistent>
      <PayForm :note="note" @closePayForm="closePayForm" />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { tools } from "../utils/tools";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import PayForm from "src/components/PayForm.vue";
const { t } = useI18n();
const q = useQuasar();
const onSaleDomains = ref([]);
const showBuyDomain = ref(false);
let note = ref("");
start();
tools.get_onSale().then((res) => {
  onSaleDomains.value = res;
});
async function start() {
  console.log("start...");
}

function getPrice(item) {
  const domain = item.domain;
  const dd = domain.split(".");
  return item.sell_info.price / 100000000 + (dd[1] === "a" ? " AR" : " BSV");
}
function getIcon(domain) {
  const dd = domain.split(".");
  if (dd[1] == "a") return "./icons/ar_48.png";
  return "./icons/bsv_48.png";
}
async function buyDomain(item) {
  const regResult = async function (ret) {
    console.log("Register result:", ret);
    if (ret.code === 0) {
      q.dialog({
        title: t("message.congrat"),
        message: item.domain + ": " + t("message.regSucess"),
      });
    } else {
      q.dialog({
        title: t("message.error"),
        message: item.domain + ": " + ret.message,
      });
    }
  };
  const obj = tools.getKV("CurDomain");
  if (!obj.domain) {
    alert("You must login to a ." + item.domain.split(".")[1] + " NBdomain ");
    return;
  }
  if (obj.domain == item.domain) {
    alert("You can not buy yourself");
    return;
  }
  if (obj.domain.split(".")[1] != item.domain.split(".")[1]) {
    alert("You must login to a ." + item.domain.split(".")[1] + " NBdomain ");
    return;
  }
  console.log(obj, item.domain);

  tools.setKV("paycmd", {
    cmd: "buy",
    price: item.sell_info.price,
    domain: obj.domain,
    option: { domain: item.domain },
    callback: regResult,
  });
  showBuyDomain.value = true;
}
function closePayForm() {
  showBuyDomain.value = false;
}
</script>
