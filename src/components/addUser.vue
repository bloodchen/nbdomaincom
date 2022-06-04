<template>
  <q-card style="min-width: 400px">
    <div class="q-ma-md">
      <div class="row q-ma-md justify-between col-12">
        <div class="text-left tc-1 text-weight-bold font-t18">
          {{ t("message.account") }}
        </div>
        <q-btn flat v-close-popup round dense icon="close" />
      </div>
      <q-card-section class="q-pb-none">
        <div class="self-center q-my-sm tc-1 text-weight-bold">
          {{ t("message.name") }}
        </div>
        <q-input
          class="col-9"
          outlined
          dense
          v-model="key"
          input-style="text-align:right;font-size:24px;"
          :disable="userName != ''"
          :rules="[(val) => !!val || 'Field is required']"
        >
          <template v-slot:after>
            <div>@{{ curDomain.domain }}</div>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-py-none">
        <div class="tc-1 q-my-sm text-weight-bold">
          {{ t("message.pubKey") }}
        </div>
        <q-input
          outlined
          v-model="val"
          input-style="font-size:24px;"
          type="text"
          :rules="[(val) => !!val || 'Field is required']"
        />
      </q-card-section>

      <q-card-actions class="text-primary" align="stretch">
        <q-btn
          :label="t('message.save')"
          class="text-white bg-primary text-weight-bold"
          style="width: 100%"
          unelevated
          @click="handleUpdate"
        />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { tools } from "../utils/tools";
import { useI18n } from "vue-i18n";
const props = defineProps({
  userName: String,
  value: String,
});
const emit = defineEmits(["hideUserUpdate"]);
const { t } = useI18n();
let key = ref(props.userName);

let val = props.value ? ref(JSON.parse(props.value).publicKey) : ref("");
const curDomain = tools.getKV("CurDomain");

function handleUpdate() {
  if (key.value.trim() == "") reutrn;
  tools.callPayAction({
    domain: curDomain.domain,
    cmd: "user",
    kv: { name: key.value, publicKey: val.value },
  });
  emit("hideUserUpdate");
}
</script>
