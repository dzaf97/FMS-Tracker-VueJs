<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      :short-title="'FMS'"
      :title="'FMS'"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Home',
            img: require('../../../public/img/Side panel - Home.png'),
            path: '/dashboard',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="this.$isPremium"
          :link="{
            name: 'Trip Overview',
            img: require('../../../public/img/Side panel - Trip Overview.png'),
            path: '/trip-overview',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Truck List',
            img: require('../../../public/img/Side bar - Truck List.png'),
            path: '/truck-list',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="!this.$isPremium"
          v-on:click.native="$isPremium = !$isPremium"
          :link="{
            name: 'Premium',
            img: require('../../../public/img/Side panel - Premium.png'),
            path: '/dashboard',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="this.$isPremium"
          :link="{
            name: 'Trailer Management',
            img: require('../../../public/img/trailer management.png'),
            path: '/trailer',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="this.$isPremium"
          :link="{
            name: 'Driver Management',
            img: require('../../../public/img/Driver Management.png'),
            path: '/driver-management',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="this.$isPremium"
          :link="{
            name: 'Warehouse Management',
            img: require('../../../public/img/warehouse management.png'),
            path: '/warehouse',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="this.$isPremium"
          :link="{
            name: 'Customer Management',
            img: require('../../../public/img/warehouse management.png'),
            path: '/customer',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="this.$isPremium"
          :link="{
            name: 'Schedule Management',
            img: require('../../../public/img/Schedule.png'),
            path: '/schedule',
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { SlideYDownTransition, ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    SlideYDownTransition,
    ZoomCenterTransition,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("sidebar");
        initScrollbar("main-panel");
        initScrollbar("sidebar-wrapper");

        docClasses.add("perfect-scrollbar-on");
      } else {
        docClasses.add("perfect-scrollbar-off");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
  watch: {
    $isPremium() {
      console.log(this.$isPremium);
    },
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
