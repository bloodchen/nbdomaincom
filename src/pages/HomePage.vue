<template>
  <q-page>
    <div
      class="row justify-center no-wrap text-white bg-image"
      style="width: 100%; margin-top: -110px; background: url('bg1.png')"
    >
      <div
        class="row col-12 col-sm-12 col-md-12 justify-center"
        style="margin-top: 200px; margin-bottom: 200px"
      >
        <div class="col-11 col-sm-11 col-md-8">
          <div
            :class="` ${
              isMobile ? 'font-t26' : 'font-t40'
            } text-weight-bold text-center`"
          >
            {{ t("message.slogan") }}
          </div>
          <div class="font-t16 text-center text-grey-5 q-mt-sm">
            {{ t("message.slogan1") }}
          </div>
          <q-form
            @submit="submitSearch"
            :style="{
              marginTop: isMobile ? '32px' : '40px',
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
                  no-caps
                />
              </template>
            </q-input>
          </q-form>
          <!--------新注册域名------------>
          <div
            class="tc-4 font-t16 q-mt-md"
            style="white-space: nowrap; overflow: hidden"
          >
            <span class="text-white q-my-sm">
              <q-icon name="flash_on" />
              {{ t("message.newdomain") }}:
            </span>
            <span
              class="text-body q-my-sm q-px-sm"
              style="display: inline-block"
              v-for="(domain, index) in new_domains"
              :key="index"
              >{{ domain }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Part 2 --->
    <div class="row justify-center no-wrap" style="width: 100%">
      <div
        class="col-12 row justify-center font-t24 q-gutter-lg"
        style="margin-top: 80px"
      >
        <div class="col-12 col-md-3 column text-center">
          <div>
            <img
              src="../assets/feature_pic_1.png"
              srcset="../assets/feature_pic_1@2x.png 2x"
              style="object-fit: none"
            />
          </div>
          <div class="font-t40 text-weight-bold">
            {{ t("message.feature1") }}
          </div>
          <div class="q-ma-md">{{ t("message.detail1") }}</div>
        </div>
        <div class="col-12 col-md-3 column text-center">
          <div>
            <img
              src="../assets/feature_pic_2.png"
              srcset="../assets/feature_pic_2@2x.png 2x"
              style="object-fit: none"
            />
          </div>
          <div class="font-t40 text-weight-bold">
            {{ t("message.feature2") }}
          </div>
          <div class="q-ma-md">{{ t("message.detail2") }}</div>
        </div>
        <div class="col-12 col-md-3 column text-center">
          <div>
            <img
              src="../assets/feature_pic_3.png"
              srcset="../assets/feature_pic_3@2x.png 2x"
              style="object-fit: none"
            />
          </div>
          <div class="font-t40 text-weight-bold">
            {{ t("message.feature3") }}
          </div>
          <div class="q-ma-md">{{ t("message.detail3") }}</div>
        </div>
      </div>
    </div>
    <!-- Part 3 --->
    <div class="row justify-center no-wrap" style="width: 100%">
      <div
        class="col-10 row justify-center font-t24 q-gutter-lg"
        style="margin-top: 80px"
      >
        <div class="col-12 col-md-7">
          <div class="font-t40 text-weight-bold q-ma-lg">
            {{ t("message.feature4") }}
          </div>
          <div class="q-ma-lg">{{ t("message.detail4") }}</div>
          <q-btn
            dense
            no-caps
            class="q-px-md q-mx-md bg-primary tc-2"
            :label="t('message.learnmore')"
            @click="onLearnmore"
          />
        </div>
        <div class="col">
          <img
            src="../assets/group322.png"
            srcset="../assets/group322@2x.png 2x"
          />
        </div>
      </div>
    </div>
    <!-- FAQ --->
    <div
      class="row justify-center no-wrap"
      style="width: 100%; background: #edfdef"
    >
      <div
        class="col-12 col-md-8 text-center font-t24 no-wrap q-gutter-lg"
        style="margin-top: 80px"
      >
        <div class="text-center font-t36">FAQ</div>
        <div class="q-pa-md">
          <q-list>
            <div v-for="index in 5" :key="index">
              <q-expansion-item
                group="somegroup"
                :label="t(`message.faq_q${index}`)"
                header-class="font-t22 text-weight-bold"
              >
                <q-card>
                  <q-card-section
                    class="font-t20"
                    v-html="t(`message.faq_a${index}`)"
                  >
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />
            </div>
          </q-list>
        </div>
      </div>
    </div>
    <pageFooter />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { tools } from "../utils/tools";
import { useRouter, useRoute } from "vue-router";
import pageFooter from "src/components/pageFooter.vue";
const { t } = useI18n();
const isMobile = useQuasar().platform.is.mobile;
const queryNid = ref("");
let new_domains = ref([]);
let router = useRouter();
tools.new_domains().then((domains) => {
  new_domains.value = domains;
  console.log(domains);
});
function onLearnmore() {
  window.open("https://doc.nbdomain.com/#/nbnode");
}
function submitSearch() {
  router.push("/search?nid=" + queryNid.value);
}
</script>
<style></style>
