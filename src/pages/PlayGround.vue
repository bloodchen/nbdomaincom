<template>
  <q-page padding>
    <div class="q-ma-lg" style="height: 100%">
      <div class="q-my-md">
        <q-input
          outlined
          v-model="querys"
          hide-bottom-space
          placeholder="domain or tag search json"
          bg-color="white"
          input-style="font-size:20px;"
        >
          <template v-slot:after>
            <q-btn-dropdown color="primary" label="Examples" size="lg" no-caps>
              <q-list>
                <q-item
                  v-for="(item, index) of examples"
                  :key="index"
                  clickable
                  v-close-popup
                  @click="onExampleClick(index)"
                >
                  <q-item-section>
                    <q-item-label>{{ item.title }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn
              :icon="matSearch"
              class="bg-primary tc-2"
              size="lg"
              @click="onGo()"
              :loading="loading"
              no-caps
            />
          </template>
        </q-input>
      </div>
      <div class="bg-grey-2" style="overflow-wrap: anywhere">
        curl "{{ queryUrl }}"
      </div>
      <div
        class="bg-black text-yellow q-pa-md q-my-sm font-t20"
        style="height: 100%; overflow-wrap: anywhere"
      >
        {{ result }}
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { matSearch } from "@quasar/extras/material-icons";
import { ref } from "vue";
import { CONFIG } from "../utils/tools";
import { onMounted } from "vue";

const querys = ref(""),
  queryUrl = ref(""),
  loading = ref(false),
  result = ref("");
const examples = [
  { title: "Root Domain", input: "nbdomain.a", api: 1 },
  { title: "Sub Domain", input: "app1.nbdomain.a", api: 1 },
  { title: "Multiple Domains", input: "app1.nbdomain.a,nbdomain.b", api: 1 },
  { title: "tag", input: '{"tagname":"appname"}', api: 2 },
  {
    title: "tags",
    input: '{"$or":[{"tagname":"appname"},{"tagname":"appid"}]}',
    api: 2,
  },
  {
    title: "tags of domain",
    input: '{"tagname":"appname","domain":"108114.b"}',
    api: 2,
  },
  {
    title: "tags of subdomain",
    input: '{"tagname":"appname","key":"test998.108114.b"}',
    api: 2,
  },
  {
    title: "tags with time",
    input: '{"tagname":"appname","ts":{"$gt":"1234"}}',
    api: 2,
  },
  {
    title: "tags with $and $in",
    input:
      '{"$and":[{"tagvalue":"12211"},{"tagname":{"$in":["appname","appid"]}}]}',
    api: 2,
  },
];
let apiUrl = "";
onMounted(() => {
  console.log("mounted:", CONFIG);
  apiUrl = CONFIG.nbNode + "/api"; //"http://localhost:9001/api";
});
function onExampleClick(id) {
  const api = examples[id].api === 1 ? apiUrl + "/q/" : apiUrl + "/qt/";
  queryUrl.value = api + encodeURIComponent(examples[id].input);
  querys.value = examples[id].input;
}
async function onGo() {
  let value = null,
    api = 1;
  try {
    value = JSON.parse(querys.value);
  } catch (e) {
    api = 2;
  }
  console.log(api);
  const url = api === 2 ? apiUrl + "/q/" : apiUrl + "/qt/";
  queryUrl.value = url + encodeURIComponent(querys.value);

  const res = await fetch(queryUrl.value);
  result.value = await res.text();
}
</script>
