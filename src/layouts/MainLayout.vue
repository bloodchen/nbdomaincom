<template>
  <q-layout view="hHh lpR fFf" class="bg-layout">
    <q-header :class="shallTransparent" style="height: 100px" height-hint="100">
      <q-toolbar class="text-white q-pa-lg">
        <div class="row justify-between no-wrap col-12">
          <div class="col-2">
            <a href="./"
              ><img
                src="../assets/logo_white.png"
                srcset="../assets/logo_white@2x.png 2x"
            /></a>
          </div>
          <div class="row justify-center col items-center gt-sm">
            <router-link
              to="/search"
              class="text-white q-mx-lg"
              style="text-decoration: none; margin-left: 100px"
              >{{ t("message.nav1") }}</router-link
            >

            <router-link
              to="/detail"
              class="text-white q-mx-lg"
              style="text-decoration: none"
              @mouseover="hello = true"
              >{{ t("message.nav2") }}
              <!-- <q-menu v-model="hello" @mouseleave="hello = false" fit>
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>New tab</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>History</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Downloads</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Help &amp; Feedback</q-item-section>
                  </q-item>
                </q-list>
              </q-menu> -->
            </router-link>
            <router-link
              to="/play"
              class="text-white q-mx-lg"
              style="text-decoration: none"
              >{{ t("message.nav4") }}</router-link
            >
            <a
              href="https://doc.nbdomain.com"
              target="_blank"
              class="text-white q-mx-lg"
              style="text-decoration: none"
              >{{ t("message.nav3") }}</a
            >
          </div>
          <div class="col-auto row justify-round items-center">
            <SelectLanuage class="gt-sm" />
            <WalletWidget />
            <div class="lt-md">
              <q-btn
                flat
                @click="leftDrawer = !leftDrawer"
                round
                dense
                :icon="matMenu"
              />
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawer"
      :width="280"
      :breakpoint="800"
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
        <SelectLanuage />
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
import SelectLanuage from "src/components/SelectLanuage.vue";
import WalletWidget from "src/components/walletWidget.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { tools, Updater } from "../utils/tools";
import { useQuasar } from "quasar";
import { onMounted } from "vue";
import {
  matMenu,
  matWallet,
  matPermIdentity,
  matShoppingBasket,
  matFace,
  matAttachMoney,
  matHelp,
  matForum,
} from "@quasar/extras/material-icons";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const activePage = -1;
const leftDrawer = ref(false);
const link = "home";
const hello = ref(false);
const menuList = [
  {
    icon: "matShoppingBasket",
    label: "message.searchDomain",
    to: "/search",
  },
  {
    icon: "matFace",
    label: "message.nav2",
    to: "/detail",
    // separator: true
  },
  {
    icon: "matAttachMoney",
    label: "message.freeDomain",
    to: "/free",
  },
  {
    icon: "matHelp",
    label: "message.help",
    url: "https://doc.nbdomain.com/",
  },
  {
    icon: "matForum",
    label: "message.community",
    url: "https://discord.gg/UhNwTVZ5R6",
  },
];
let currentDomain;
onMounted(() => {
  currentDomain = ref(tools.getKV("CurDomain"));
  if (route.path === "/") {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
});
Updater.sub((event, data) => {
  if (event === "domain_update") {
    currentDomain.value = tools.getKV("CurDomain");
  }
});
function onclick(index) {
  console.log("onclick:", index);
  const item = menuList[index];
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
</script>
<style lang="scss">
.bg-layout {
  background: #fff;
}
.testm {
  margin: 80px 30px;
}
</style>
