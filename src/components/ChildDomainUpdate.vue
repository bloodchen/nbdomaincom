<template>
  <q-card style="min-width: 350px">
    <div class="q-ma-md">
      <div class="row q-ma-md justify-between col-12">
        <div class="text-left tc-1 text-weight-bold font-t18">
          {{ t("message.subDomain") }}
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
        <q-input
          outlined
          v-model="val"
          type="textarea"
          :rules="[(val) => !!val || 'Field is required']"
        />
      </q-card-section>

      <q-card-section class="q-py-none">
        <q-icon name="warning" class="text-red" /><span
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
const props = defineProps({
  childDomainName: String,
  childDomainValue: String,
});
const emit = defineEmits(["hideChildDomainUpdate"]);
const { t } = useI18n();
let key = ref(props.childDomainName),
  val = ref(props.childDomainValue);
const curDomain = tools.getKV("CurDomain");

function handleUpdate() {
  if (key.value.trim() == "") reutrn;
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
