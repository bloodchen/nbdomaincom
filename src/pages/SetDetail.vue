<template>
  <q-page>
    <div
      class="row justify-center q-mb-lg"
      v-if="showLogin"
      style="margin-top: 100px"
    >
      <LoginForm @closeLoginForm="closeLoginForm" />
    </div>

    <div v-else class="row justify-center no-wrap" style="width: 100%">
      <div
        class="colum col-8 col-sm-11 col-md-8 justify-center q-gutter-y-md"
        style="margin-top: 100px"
      >
        <div class="row justify-between">
          <div class="text-weight-bold font-t32">{{ CurDomain?.domain }}</div>
          <div>
            <q-btn
              outline
              no-caps
              class="q-px-sm tc-1 q-mx-sm"
              :label="t('message.refresh')"
              style="width: 100px"
              @click="onRefresh"
            />
            <q-btn
              no-caps
              class="tc-2 bg-primary"
              :label="t('message.logout')"
              style="width: 100px"
              @click="logOut"
            />
          </div>
        </div>
        <!-- Owner and sell -->
        <div class="q-pa-sm font-t14 bg-c6 tc-7 row justify-between col-12">
          <div>
            <span class="tc-1 text-weight-bold q-mx-md">
              {{ t("message.owner") }}
            </span>
            <span class="q-mx-sm">
              {{ CurDomain?.obj != undefined ? CurDomain?.obj.owner : "" }}
            </span>
          </div>
          <div class="row">
            <div>
              <a
                href=""
                class="tc-8 text-weight-bold q-mx-sm"
                @click.prevent="onMakePublic"
                >{{ t("message.makePublic") }}
              </a>
              <img
                src="..\assets\help.png"
                @click="onHelp('makePublic')"
                style="cursor: help"
              />
            </div>

            <a
              href=""
              class="tc-8 text-weight-bold q-mx-md"
              @click.prevent="onSell"
              >{{ t("message.sell") }}</a
            >
          </div>
        </div>
        <!--paymail plus--
        <div>
          <q-expansion-item class="q-mb-sm bg-c6 nb-rounded">
            <template v-slot:header>
              <q-item-section>
                <span class="q-mx-sm tc-1 text-weight-bold">
                  {{ t("message.paymail") }} &nbsp;&nbsp;&nbsp;&nbsp;
                  {{ paymails.length }}
                </span>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  class="bg-primary tc-2 q-px-md"
                  no-caps
                  style="width: 120px"
                  :label="t('message.add')"
                  @click.stop="onAddPaymail"
                />
              </q-item-section>
            </template>
            <div
              class="col-12 bg-white q-pa-sm q-mb-sm text-subtitle2"
              v-for="(obj, index) in paymails"
              :key="index"
              @click="
                handlePaymailClick(Object.keys(obj)[0], Object.values(obj)[0])
              "
            >
              <div class="row">
                <div class="text-primary text-weight-bold q-pa-sm col-12">
                  {{ Object.keys(obj)[0] }}@{{ CurDomain?.domain }}
                </div>
                <div class="text-grey-6 q-px-md ellipsis col-12">
                  {{ genPaymailDetail(Object.values(obj)[0]) }}
                </div>
              </div>
            </div>
          </q-expansion-item>
        </div>-->

        <!---------Subdomains---------->
        <div>
          <q-expansion-item class="q-mb-sm bg-c6 nb-rounded">
            <template v-slot:header>
              <q-item-section>
                <span class="q-mx-sm tc-1 text-weight-bold">
                  {{ t("message.subDomain") }} &nbsp;&nbsp;&nbsp;&nbsp;
                  {{ num_of_keys }}
                </span>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  class="bg-primary tc-2 q-px-md"
                  no-caps
                  style="width: 120px"
                  :label="t('message.add')"
                  @click.stop="handleChildDomainUpdate('', '')"
                />
              </q-item-section>
            </template>

            <div
              class="bg-white q-pa-sm q-my-sm"
              style="border: 1px solid #d3d8d4; opacity: 1; border-radius: 8px"
              v-for="(value, name, index) in keys_of_domain"
              :key="index"
              @click="handleChildDomainUpdate(value.v, name)"
            >
              <div class="row">
                <div
                  class="text-weight-bold q-pa-md col-12"
                  style="border-bottom: 1px solid gainsboro"
                >
                  {{ name }}
                </div>

                <div
                  class="q-px-md q-my-md ellipsis col-12"
                  style="max-width: 1000px"
                >
                  {{ value.v }}
                </div>
              </div>
            </div>
          </q-expansion-item>
        </div>
        <!---------Accounts---------->
        <div>
          <q-expansion-item class="q-mb-sm bg-c6 nb-rounded">
            <template v-slot:header>
              <q-item-section>
                <span class="q-mx-sm tc-1 text-weight-bold">
                  {{ t("message.account") }} &nbsp;&nbsp;&nbsp;&nbsp;
                  {{ Object.keys(userNames).length + 1 }}
                </span>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  class="bg-primary tc-2 q-px-md"
                  no-caps
                  style="width: 120px"
                  :label="t('message.add')"
                  @click.stop="handleUserUpdate('', '')"
                />
              </q-item-section>
            </template>
            <div class="text-weight-bold q-pa-md col-12">
              root@{{ CurDomain?.domain }} - default
            </div>

            <div
              class="bg-white q-pa-sm q-my-sm"
              style="border: 1px solid #d3d8d4; opacity: 1; border-radius: 8px"
              v-for="(value, name, index) in userNames"
              :key="index"
              @click="handleUserUpdate(value, name)"
            >
              <div class="row">
                <div
                  class="text-weight-bold q-pa-md col-12"
                  style="border-bottom: 1px solid gainsboro"
                >
                  {{ name }}@{{ CurDomain?.domain }}
                </div>

                <div
                  class="q-px-md q-my-md ellipsis col-12"
                  style="max-width: 1000px"
                >
                  {{ value }}
                </div>
              </div>
            </div>
          </q-expansion-item>
        </div>
      </div>
    </div>

    <div class="row q-gutter-y-md" v-if="showLogin == false"></div>

    <!--    域名转让-->
    <q-dialog v-model="showTransferForm" persistent>
      <div class="row">
        <SellForm
          @transferDataComplete="transferDataComplete"
          @acceptDataComplete="acceptDataComplete"
        />
      </div>
    </q-dialog>

    <!--    子域名 -->
    <q-dialog v-model="showChildDomainUpdate" persistent>
      <ChildDomainUpdate
        :childDomainName="childDomainName"
        :childDomainValue="childDomainValue"
        @hideChildDomainUpdate="hideChildDomainUpdate"
      />
    </q-dialog>
    <!--    用户账户 -->
    <q-dialog v-model="showUserUpdate" persistent>
      <AddUser
        :userName="userName"
        :value="userNameValue"
        @hideUserUpdate="hideUserUpdate"
      />
    </q-dialog>
    <pageFooter />
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { tools, Updater } from "../utils/tools";
import SellForm from "src/components/SellForm.vue";
import ChildDomainUpdate from "src/components/ChildDomainUpdate.vue";
import AddUser from "src/components/addUser.vue";
import LoginForm from "src/components/LoginForm.vue";
import pageFooter from "src/components/pageFooter.vue";

import { useI18n } from "vue-i18n";
import { useQuasar, useMeta } from "quasar";
import { onMounted } from "vue";
const { t } = useI18n();
const metaData = {
  title: "Manage Domain - NBdomain",
  script: {
    coinfly: {
      src: "https://unpkg.com/coinfly@latest/dist/coinfly.min.js",
    },
  },
};
useMeta(metaData);
const q = useQuasar();
let showAddPaymail = false,
  showLogin = ref(false),
  showTransferForm = ref(false),
  showChildDomainUpdate = ref(false),
  childDomainName = ref(null),
  childDomainValue = ref(null),
  showUserUpdate = ref(false),
  userName = ref(null),
  userNameValue = ref(null);

let CurDomain = ref({});

if (!CurDomain.value?.obj) {
  showLogin.value = true;
}

const userNames = computed(() => {
  if (CurDomain.value.obj === undefined || CurDomain.value.obj == null) {
    return {};
  }
  console.log("users", CurDomain.value.obj.users);
  return CurDomain.value.obj.users;
});
const keys_of_domain = computed(() => {
  if (CurDomain.value.obj === undefined || CurDomain.value.obj == null) {
    return [];
  }
  console.log("computed");
  return CurDomain.value.obj.keys;
});
const num_of_keys = computed(() => {
  if (CurDomain.value.obj === undefined || CurDomain.value.obj == null) {
    return 0;
  }
  console.log("get num of keys");
  return Object.keys(CurDomain.value.obj.keys).length;
});
onMounted(() => {
  CurDomain.value = tools.getKV("CurDomain");
});
function onHelp() {
  window.open("https://nbdomain.com");
}

function logOut() {
  tools.setKV("CurDomain", {});
  CurDomain.value = {};
  showLogin.value = true;
}
function genPaymailDetail(objPaymail) {
  let ret = "BSV:%bsv ____, BTC:%btc ____ , ETH:%eth ____";
  ret = ret.replace("%bsv", objPaymail.bsv);
  if (objPaymail.btc == undefined) objPaymail.btc = "";
  if (objPaymail.eth == undefined) objPaymail.eth = "";

  ret = ret.replace("%btc", objPaymail.btc);

  ret = ret.replace("%eth", objPaymail.eth);
  return ret;
}
function closePaymail() {
  showAddPaymail = false;
}
function closeLoginForm() {
  console.log("got closeLoginForm");
  showLogin.value = false;
  CurDomain.value = tools.getKV("CurDomain");
  Updater.fire("domain_update");
}
function handlePaymailClick(name, value) {
  console.log(name);
  currentPaymailUserName = name;
  currentPaymailValue = value;
  showAddPaymail = true;
}
function handleChildDomainUpdate(value, name) {
  console.log(value);
  childDomainName.value = name;
  childDomainValue.value = value;
  showChildDomainUpdate.value = true;
}
function handleUserUpdate(value, name) {
  console.log(value);
  userName.value = name;
  userNameValue.value = value;
  showUserUpdate.value = true;
}
function onMakePublic() {
  q.dialog({
    title: t("message.confirm"),
    message: t("message.makePublicWarning"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    tools.callPayAction({
      domain: CurDomain.value.domain,
      cmd: "makePublic",
    });
  });
}
// 转让相关
function onSell() {
  console.log("on Sell");
  showTransferForm.value = true;
}

// 刷新
async function onRefresh() {
  CurDomain.value = tools.getKV("CurDomain");
  let result = await tools.get_domain(CurDomain.value.domain, true);
  const code = result.code;
  console.log("readDomain result:", CurDomain.value.domain, result);
  if (code == 0) {
    tools.setKV("CurDomain", result);
    CurDomain.value = result;
  } else {
  }
}

function transferDataComplete() {
  showTransferForm.value = false;
}

/**
 * 接收域名的验证
 */
function acceptDataComplete() {
  showTransferForm.value = false;
}
/**
 * 更新子域名的验证
 */
function hideChildDomainUpdate() {
  showChildDomainUpdate.value = false;
  setTimeout(onRefresh, 30000);
}

/**
 * 更新子域名的验证
 */
function hideUserUpdate() {
  showUserUpdate.value = false;
  setTimeout(onRefresh, 30000);
}
</script>
<style lang="sass">
.q-expansion-item__content
  background: white

.detail-action-btn
  width: 68px
  height: 36px

.transfer-card
  border-radius: 4px

.transfer-card-action
  transform: translateY(50%)

.transfer-card-action-btn
  width: 136px
  height: 44px
  background: $primary
  font-size: 18px

.line
  color: #A9F2F0

.line svg
  fill: currentColor
</style>
