<template>
  <!-- <q-select
    class="col-2"
    v-model="lang"
    :options="langs"
    map-options
    label-color="white"
    dark
    color="teal"
    filled
    @update:model-value="onUpdate"
  />-->
  <q-btn-dropdown flat :label="curLang.label" no-caps>
    <q-list>
      <div v-for="item of langs" :key="item">
        <q-item clickable v-close-popup @click="onChangeLang(item)">
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
let { locale } = i18n;
const langs = [
  {
    label: "中文",
    value: "zh-cn",
  },
  {
    label: "English",
    value: "en-us",
  },
];

let curLang = ref(langs.find((item) => item.value === locale.value));
function onChangeLang(item) {
  locale.value = item.value;
  curLang.value = item;
}
</script>
