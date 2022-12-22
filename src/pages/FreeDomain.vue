<template>
  <q-page>
    <div class="row justify-center no-wrap" style="width: 100%">
      <div
        class="colum col-11 col-sm-11 col-md-8 justify-center"
        style="margin-top: 100px"
      >
        <div class="text-weight-bold font-t32">
          {{ t("message.freeDomain") }}
        </div>
        <div class="q-my-md font-t20">
          {{ t("message.freeTitle") }}
        </div>
        <div class="row" style="margin-top: 50px">
          <div class="col-12 col-sm-3">
            <div class="text-center">
              <div class="circle_bg">
                <img
                  src="../assets/m6_logo.png"
                  srcset="../assets/m6_logo@2x.png 2x"
                  alt=""
                />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">1</div>
                <div class="text-grey-8">{{ t("message.freestep1") }}</div>
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-3">
            <div>
              <div class="circle_bg">
                <img
                  src="../assets/vbox.png"
                  srcset="../assets/vbox@2x.png 2x"
                  alt=""
                />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">2</div>
                <div class="text-grey-8">
                  {{ t("message.freestep2") }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div>
              <div class="circle_bg">
                <img
                  src="../assets/register.png"
                  srcset="../assets/register@2x.png 2x"
                  alt=""
                />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">3</div>
                <div class="text-grey-8">
                  {{ t("message.freestep3") }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div>
              <div class="circle_bg">
                <img
                  src="../assets/freedomain.png"
                  srcset="../assets/freedomain@2x.png 2x"
                  alt=""
                />
              </div>
              <div class="text-center">
                <div class="font-t36 q-mt-sm">4</div>
                <div class="text-grey-8">
                  {{ t("message.freestep4") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pageFooter />

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
import pageFooter from "src/components/pageFooter.vue";

const { t } = useI18n();
const isMobile = useQuasar().platform.is.mobile;
const route = useRoute();
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
