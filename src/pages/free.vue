<template>
  <q-page>
    <div class="row justify-center no-wrap" style="width: 100%">
      <div
        class="colum col-11 col-sm-11 col-md-8 justify-center"
        style="margin-top: 100px"
      >
        <div class="text-weight-bold font-t32">Free domain</div>
        <div class="q-my-md font-t20">
          4 steps to own a Free NBdomain forever
        </div>
        <div class="row" style="margin-top: 50px">
          <div class="col-12 col-sm-3">
            <div class="text-center">
              <div class="circle_bg">
                <img src="../assets/m6_logo.png" alt="" />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">1</div>
                <div class="text-grey-8">Download and open Maxthon Browser</div>
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-3">
            <div>
              <div class="circle_bg">
                <img src="../assets/vbox.png" alt="" />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">2</div>
                <div class="text-grey-8">
                  Open the Vbox applet in the Maxthon browser in the upper-right
                  corner
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div>
              <div class="circle_bg">
                <img src="../assets/register.png" alt="" />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">3</div>
                <div class="text-grey-8">
                  Register Vbox cloud account with your mobile phone number
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div>
              <div class="circle_bg">
                <img src="../assets/freedomain.png" alt="" />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">4</div>
                <div class="text-grey-8">
                  Get free NBdomains on every supported blockchains
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <pageFooter/>
  </q-page>
</template>

<script setup>
//import foot from "../components/footer";
//import nbFrame from "../components/nbFrame";
//import buyDomain from "../components/buyDomain";
//import PayForm from "../components/PayForm";
import { tools } from "../utils/tools";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import pageFooter from "src/components/pageFooter.vue"

const { t } = useI18n();
const isMobile = useQuasar().platform.is.mobile;
const route = useRoute();

let tab_result = ref("ar");
let ar_items = ref([]);
let bsv_items = ref([]);

let note = "",
  showBuyDomain = false;
let queryNid = ref(route.query.nid),
  email = "";
let notifies = new Set(),
  regType = 0; //0:can reg 1:already reg 2:not open 3:brand reserve
let searching = ref(false),
  loading = ref(false);
async function search(nid) {
  loading.value = true;
  searching.value = true;
  const result = await tools.search_domain(nid);
  console.log(result);
  ar_items.value = result.ar.map((item) => {
    item.agree = ref(false);
    item.price = item.price / 100000000;
    return item;
  });
  bsv_items.value = result.bsv.map((item) => {
    item.agree = ref(false);
    item.price = item.price / 100000000;
    return item;
  });
  loading.value = false;
}
function submitSearch() {
  search(queryNid.value);
}
if (queryNid.value != "") submitSearch();
</script>
<style lang="sass">
.q-tab__label
  font-size:32px
.circle_bg
  width: 100px
  height: 100px
  background: #FFFEFF
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16)
  border-radius: 50%
  opacity: 1
  text-align: center
  display: flex
  justify-content: center
  align-items: center
  margin: auto
</style>
