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
        <q-tabs
          v-model="selected_tab"
          class="text-black"
          align="left"
          no-caps
          indicator-color="primary"
        >
          <q-tab
            v-for="[index, result] of ['.b', '.a'].entries()"
            :name="result"
            :label="result"
            :key="index"
          />
        </q-tabs>
        <q-tab-panels v-model="selected_tab" animated>
          <q-tab-panel
            v-for="[index, result] of ['.b', '.a'].entries()"
            :name="result"
            :key="index"
          >
            <div
              v-for="item of onSaleDomains[result]"
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
          </q-tab-panel>
        </q-tab-panels>
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
import { onMounted } from "vue";
const { t } = useI18n();
const q = useQuasar();
const onSaleDomains = ref({});
const showBuyDomain = ref(false);
let note = ref(""),
  selected_tab = ref(".b");

onMounted(async () => {
  console.log("onsale onMounted...");
  (await tools.inst()).get_onSale().then((res) => {
    //onSaleDomains.value = res;
    const all = onSaleDomains.value;
    for (const item of res) {
      const tld = "." + item.domain.split(".")[1];
      if (!all[tld]) all[tld] = [];
      all[tld].push(item);
    }
  });
});


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
function buyDomain(item) {
  const regResult = function (ret) {
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
  console.log("buyDomain");
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
  tools.callPayAction({
    cmd: "buy",
    price: item.sell_info.price,
    domain: obj.domain,
    option: { domain: item.domain },
    callback: regResult,
  });
}
</script>
