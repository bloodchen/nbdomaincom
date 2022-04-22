<template>
  <q-page>
    <div class="row justify-center no-wrap" style="width: 100%">
      <div
        class="colum col-11 col-sm-11 col-md-8 justify-center"
        style="margin-top: 100px"
      >
        <div class="text-weight-bold font-t32">{{ t("message.titleSearch") }}</div>
        <div>
          <q-form
            @submit="submitSearch"
            :style="{
              marginTop: isMobile ? '32px' : '20px',
            }"
          >
            <q-input
              outlined
              v-model="queryNid"
              hide-bottom-space
              placeholder="Domain Name"
              bg-color="white"
              input-style="font-size:20px;"
            >
              <template v-slot:after>
                <q-btn
                  icon="search"
                  class="bg-primary tc-2"
                  size="lg"
                  @click="submitSearch"
                  :loading="loading"
                  no-caps
                />
              </template>
            </q-input>
          </q-form>
        </div>
      </div>
    </div>

    <div
      v-if="result_items.length > 0"
      class="result row justify-center no-wrap"
      style="width: 100%"
    >
      <div
        class="colum col-11 col-sm-11 col-md-8 justify-center"
        style="margin-top: 30px"
      >
        <q-tabs
          v-model="selected_tab"
          class="text-black"
          align="left"
          no-caps
          indicator-color="primary"
        >
          <q-tab
            v-for="result of result_items"
            :name="result.name"
            :label="result.title"
            :key="result.name"
          />
        </q-tabs>
        <q-tab-panels v-model="selected_tab" animated>
          <q-tab-panel
            v-for="result of result_items"
            :name="result.name"
            :key="result.title"
          >
            <div v-for="item of result.items" :key="item">
              <div
                class="row justify-between q-gutter-md items-center q-my-sm"
              >
                <div class="col-12 col-sm-auto">
                  <img :src="result.icon" style="vertical-align: middle" />
                  <span class="font-t30 q-mx-md">{{ item.domain }}</span>
                </div>
                <div
                  v-if="item.code == 100 && item.price"
                  class="col-7 row justify-end items-center"
                >
                  <div class="col column q-mx-lg text-right">
                    <div class="text-primary font-t24">{{ getPrice(item) }}</div>
                    <div>
                      <q-checkbox
                        v-model="item.agree"
                        class="font-t16 text-grey-7"
                        >{{ t("message.agree1") }}</q-checkbox
                      ><a
                        href="https://www.nbdomain.com/files/Domain Registration and Issue Agreement.pdf"
                        >&nbsp;{{ t("message.agreement") }}</a
                      >
                    </div>
                  </div>
                  <div class="col-2">
                    <q-btn
                      :disable="!item.agree"
                      label="Register"
                      class="bg-primary tc-2 text-weight-bold"
                      size="md"
                      @click="regDomain(item)"
                      no-caps
                    />
                  </div>
                </div>
                <div
                  v-if="item.code == 100 && !item.price"
                  class="text-primary font-t24"
                >
                  {{ t("message.notOpen") }}
                </div>
                <div v-if="item.code == 0" class="text-primary font-t24">
                  {{ t("message.registered") }}
                </div>
              </div>
              <q-separator />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <OnSale/>
    <q-dialog v-model="showBuyDomain" persistent>
      <PayForm :note="note" @closePayForm="closePayForm" />
    </q-dialog>
     <pageFooter/>
  </q-page>
</template>

<script setup>
//import foot from "../components/footer";
//import nbFrame from "../components/nbFrame";
//import buyDomain from "../components/buyDomain";

import { tools } from "../utils/tools";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import PayForm from "src/components/PayForm.vue";
import OnSale from "src/components/onsale.vue"
import pageFooter from "src/components/pageFooter.vue"

const { t } = useI18n();
const q = useQuasar();
const isMobile = q.platform.is.mobile;
const route = useRoute();

let selected_tab = ref("ar");
let ar_items = [];
let bsv_items = [];

let result_items = ref([]);

let note = ref(""),
  showBuyDomain = ref(false);
let queryNid = ref(route.query.nid ? route.query.nid : null),
  email = "";
let notifies = new Set(),
  regType = 0; //0:can reg 1:already reg 2:not open 3:brand reserve
let searching = ref(false),
  loading = ref(false);

start();

async function start() {

}
function getIcon(domain) {
  const dd = domain.split(".");
  if (dd[1] == "a") return "./icons/ar_48.png";
  return "./icons/bsv_48.png";
}
function getPrice(item) {
  const domain = item.domain;
  const dd = domain.split(".");
  return item.price / 100000000 +(dd[1] === "a" ? " AR" : " BSV");
}

async function search(nid) {
  nid = nid.split(".")[0];
  loading.value = true;
  searching.value = true;
  const result = await tools.search_domain(nid);
  console.log(result);
  ar_items = result.ar.map((item) => {
    item.agree = ref(false);
    //item.price = item.price / 100000000;
    return item;
  });
  bsv_items = result.bsv.map((item) => {
    item.agree = ref(false);
    //item.price = item.price / 100000000;
    return item;
  });
  result_items.value = [
    {
      name: "ar",
      title: "AR chain",
      items: ar_items,
      icon: "./icons/ar_48.png",
    },
    {
      name: "bsv",
      title: "BSV chain",
      items: bsv_items,
      icon: "./icons/bsv_48.png",
    },
  ];
  loading.value = false;
}
function submitSearch() {
  search(queryNid.value);
}

function regDomain(item) {
  const regResult = async function (ret) {
    console.log("Register result:", ret);
    //const res = await tools.register_domain(ret);
    //console.log("reg result:", res);
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
  console.log(item);
  tools.setKV("paycmd", {
    cmd: "reg",
    price: item.price,
    domain: item.domain,
    callback: regResult,
  });
  showBuyDomain.value = true;
}
function closePayForm() {
  showBuyDomain.value = false;
}
if (queryNid.value != null) submitSearch();
</script>
<style lang="sass">
.q-tab__label
  font-size:32px
</style>
