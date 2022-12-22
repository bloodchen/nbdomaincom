<template>
  <q-card style="min-width: 350px">
    <div class="q-ma-md">
      <div class="row q-ma-md justify-between col-12">
        <div class="text-left tc-1 text-weight-bold font-t18">
          {{ t("message.subDomain") }}
        </div>
        <q-btn flat v-close-popup round dense :icon="matClose" />
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
          :disable="childDomainName != ''"
          :rules="[(val) => !!val || 'Field is required']"
        >
          <template v-slot:after>
            <div>.{{ curDomain.domain }}</div>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-py-none">
        <div class="tc-1 q-my-sm text-weight-bold">
          {{ t("message.value") }}
        </div>
        <!--<q-input
          outlined
          v-model="val"
          type="textarea"
          :rules="[(val) => !!val || 'Field is required']"
        />-->
        <div style="height: 300px" id="jsoneditor"></div>
      </q-card-section>

      <q-card-section class="q-py-none">
        <q-icon :name="matWarning" class="text-red" /><span
          class="text-bold tc-7 q-mx-sm"
          >{{ t("message.noteDetail") }}</span
        >
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
////import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.js";
import "jsoneditor/dist/jsoneditor.min.css";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { matClose, matWarning } from "@quasar/extras/material-icons";

const props = defineProps({
  childDomainName: String,
  childDomainValue: String,
});
const q = useQuasar();
const emit = defineEmits(["hideChildDomainUpdate"]);
const { t } = useI18n();
let key = ref(props.childDomainName),
  val = ref(props.childDomainValue);
let curDomain = { domain: "" };
let jsonEditor = null;

onMounted(async () => {
  console.log("mounted");
  await tools.inst();
  const JSONEditor = (await import("jsoneditor/dist/jsoneditor-minimalist.js"))
    .default;
  curDomain = tools.getKV("CurDomain");
  var container = document.getElementById("jsoneditor");
  const options = {
    mode: "code",
  };
  if (!jsonEditor) jsonEditor = new JSONEditor(container, options);
  console.log(val.value);
  if (val.value) jsonEditor.setText(val.value);
});
async function alert() {
  return new Promise((resolve) => {
    q.dialog({
      title: t("message.confirm"),
      message: t("message.jsonNotValid"),
      cancel: true,
      persistent: true,
    })
      .onOk(() => resolve("ok"))
      .onCancel(() => resolve("cancel"));
  });
}
async function handleUpdate() {
  const text = jsonEditor.getText();
  const validate = await jsonEditor.validate();
  let cancel = false;
  if (validate.length > 0) {
    if ((await alert()) === "cancel") return;
  }
  if (key.value.trim() == "" || cancel) return;
  val.value = text;
  tools.callPayAction({
    domain: curDomain.domain,
    cmd: "key",
    kv: { [key.value]: val.value },
  });
  emit("hideChildDomainUpdate");
}
</script>
<style lang="sass">
.add-child-domain-card
  border-radius: 4px

.add-child-domain-card-action-btn
  background: $primary
  font-size: 18px
  left: 50%
  transform: translate(-50%, 50%)
</style>
