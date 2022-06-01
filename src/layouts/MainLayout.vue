<template>
  <q-layout view="hHh lpR fFf" class="bg-layout">
    <q-header :class="shallTransparent">
      <q-toolbar class="text-white q-mx-lg" style="height: 110px">
        <div class="row justify-between no-wrap col-12">
          <div class="col-2">
            <a href="./"
              ><img
                src="../assets/logo_white.png"
                srcset="../assets/logo_white@2x.png 2x"
            /></a>
          </div>
          <div
            class="row justify-center col items-center"
            v-if="!$q.platform.is.mobile"
          >
            <a
              href="#/search"
              class="text-white q-mx-lg"
              style="text-decoration: none; margin-left: 100px"
              >{{ t("message.nav1") }}</a
            >
            <a
              href="#/free"
              class="text-white q-mx-lg"
              style="text-decoration: none"
              >{{ t("message.nav2") }}</a
            >
            <a
              href="https://doc.nbdomain.com"
              target="_blank"
              class="text-white q-mx-lg"
              style="text-decoration: none"
              >{{ t("message.nav3") }}</a
            >
          </div>
          <div class="col-3 row justify-round items-center">
            <lanuage v-if="!$q.platform.is.mobile" />
            <div v-if="!$q.platform.is.mobile">
              <q-btn
                dense
                no-caps
                class="q-px-md bg-primary"
                text-color="tc-2"
                icon="perm_identity"
                :label="t('message.login')"
                @click="$router.push('detail')"
                v-if="!currentDomain?.domain"
              />
              <q-btn
                class="tc-4 q-px-md"
                text-color="tc-2"
                no-caps
                unelevated
                dense
                flat
                icon="perm_identity"
                @click="$router.push('detail')"
                :label="currentDomain.domain"
                v-else
              />
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-btn
                flat
                @click="leftDrawer = !leftDrawer"
                round
                dense
                icon="menu"
              />
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawer"
      :width="280"
      :breakpoint="500"
      side="right"
      overlay
      elevated
      content-class="bg-c1"
    >
      <q-scroll-area class="fit q-py-lg font-t16">
        <img
          src="../assets/logo_black.png"
          srcset="../assets/logo_black@2x.png 2x"
          class="q-ma-md"
        />
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            no-swipe-open
            no-swipe-close
            no-swipe-backdrop
            :active="index == activePage"
            @click="onclick(index)"
          >
            <!-- <q-item-section avatar v-if="menuItem.icon" class="tc-4">
              <q-icon :name="menuItem.icon" />
            </q-item-section>-->
            <q-item-section class="font-t16 text-black">{{
              t(menuItem.label)
            }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" class="q-my-md" />
        </q-list>
        <lanuage />
        <div>
          <q-btn
            dense
            no-caps
            class="q-ml-md q-px-md q-mt-md bg-primary"
            text-color="tc-2"
            icon="perm_identity"
            :label="t('message.login')"
            @click="$router.push('detail')"
            v-if="!currentDomain?.domain"
          />
          <q-btn
            class="text-black q-px-sm q-mt-md"
            no-caps
            unelevated
            dense
            flat
            icon="perm_identity"
            @click="$router.push('detail')"
            :label="currentDomain.domain"
            v-else
          />
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
//import { mapState } from "vuex";
import Lanuage from "src/components/Lanuage.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { tools, Updater } from "../utils/tools";
import { useQuasar } from "quasar";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const activePage = -1;
const leftDrawer = ref(false);
const link = "home";
const currentDomain = ref(tools.getKV("CurDomain"));
const menuList = [
  {
    icon: "shopping_basket",
    label: "message.searchDomain",
    to: "/search",
  },
  {
    icon: "face",
    label: "message.myDomain",
    to: "/detail",
    // separator: true
  },
  {
    icon: "attach_money",
    label: "message.freeDomain",
    to: "/free",
  },
  {
    icon: "help",
    label: "message.help",
    url: "https://doc.nbdomain.com/",
  },
  {
    icon: "forum",
    label: "message.community",
    url: "https://discord.gg/EZPUsgFR",
  },
];
Updater.sub((event, data) => {
  if (event === "domain_update") {
    currentDomain.value = tools.getKV("CurDomain");
  }
});
function onclick(index) {
  console.log("onclick:", index);
  const item = this.menuList[index];
  if (item.to) {
    console.log("1");
    router.push(item.to);
  } else if (item.url) {
    console.log("2");
    window.open(item.url);
  }
}
let shallTransparent =
  route.path === "/" ? ref("bg-transparent") : ref("bg-black");

watch(route, (old, newVal) => {
  console.log(`route.name changed to ${newVal}`);
  shallTransparent.value = route.path === "/" ? "bg-transparent" : "bg-black";
});

function handleScroll(_) {
  shallTransparent.value =
    window.scrollY < 10 && route.path === "/" ? "bg-transparent" : "bg-black";
}
if (route.path === "/") {
  window.addEventListener("scroll", handleScroll, { passive: true });
}
</script>
<style lang="scss">
.bg-layout {
  background: #fff;
}
</style>
