<template>
  <q-card style="min-width: 350px">
    <div class="q-ma-md">
      <div class="row q-ma-md justify-between col-12">
        <div class="text-left tc-1 text-weight-bold font-t18">
          {{ t("message.sellDomain") }}
        </div>
        <q-btn flat v-close-popup round dense icon="close" />
      </div>

      <q-card-section class="q-gutter-y-sm">
        <div>
          <div class="q-mb-sm">{{ t("message.price") }}:</div>
          <q-input
            dense
            v-model.number="askedPrice"
            type="number"
            :placeholder="t('message.priceInSat')"
            outlined
            @change="onPriceChange()"
            :rules="[(val) => !!val || 'Field is required']"
          >
            <template v-slot:hint>{{ USDPrice }}</template>
          </q-input>
        </div>
        <div>
          <div class="q-mb-sm">{{ t("message.expireDate") }}:</div>
          <q-input
            v-model="expireDate"
            outlined
            dense
            type="date"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div>
          <div class="q-mb-sm">{{ t("message.note") }}:</div>
          <q-input
            v-model="note"
            outlined
            dense
            :hint="t('message.noteTip')"
            :placeholder="t('message.optional')"
          />
        </div>
        <q-checkbox v-model="clear_data" :label="t('message.clearData')" />
        <div class="text-negative q-mb-md">{{ terr }}</div>
      </q-card-section>

      <q-card-actions class="text-primary" align="stretch">
        <q-btn
          :label="t('message.confirm')"
          class="text-white bg-primary text-weight-bold"
          style="width: 100%"
          unelevated
          @click="handleSubmit"
        />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { tools } from "../utils/tools";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
const q = useQuasar();
const emit = defineEmits(["transferDataComplete", "showPay"]);
const { t } = useI18n();

let tab = ref("sell"),
  askedPrice = ref(null),
  expireDate = ref(""),
  USDPrice = ref(null),
  note = ref(""),
  terr = ref(null),
  clear_data = ref(true);
const curDomain = tools.getKV("CurDomain");

async function payResult(res) {
  console.log("transfer result=");
  console.log(res);
  let msg = "Successfully Accepted";
  if (res.code == 0 || res.code == 100) {
  } else {
    msg = "Failed to accept:" + res.message;
  }
  q.dialog({
    title: "Result",
    message: msg,
  });
}
async function onPriceChange() {
  const rate = await tools.getExchangeRate();
  const price = (parseInt(rate.rate) * askedPrice.value) / 100000000;
  USDPrice.value = "≈ " + price + " USD , " + t("message.tradeFee");
}
async function handleSubmit() {
  if (tab.value === "sell") {
    const d1 = new Date(expireDate.value);
    let sell_info = {
      buyer: "any",
      price: askedPrice.value,
      expire: d1.getTime(),
    };
    if (clear_data.value == false) {
      sell_info.clear_data = false;
    }
    const nt = note.value.trim();
    if (nt != "") {
      sell_info.note = nt;
    }
    tools.callPayAction({
      cmd: "sell",
      product: "NBdomain",
      domain: curDomain.domain,
      detail: "Sell:" + curDomain.domain,
      broadcast: true,
      sell_info: sell_info,
      callback: payResult,
    });

    emit("transferDataComplete");
  }
}
</script>
<style lang="sass">
.transfer-card
  border-radius: 4px

.transfer-card-action
  transform: translateY(50%)

.transfer-card-action-btn
  width: 136px
  height: 44px
  background: $primary
  font-size: 18px
</style>
