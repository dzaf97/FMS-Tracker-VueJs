<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown"></div>
</template>
<script>
import { BaseSwitch } from "src/components";

export default {
  name: "sidebar-share",
  components: {
    BaseSwitch,
  },
  props: {
    backgroundColor: String,
  },
  data() {
    return {
      sidebarMini: true,
      darkMode: true,
      isOpen: false,
      sidebarColors: [
        { color: "primary", active: false, value: "primary" },
        { color: "vue", active: true, value: "vue" },
        { color: "info", active: false, value: "blue" },
        { color: "success", active: false, value: "green" },
        { color: "warning", active: false, value: "orange" },
        { color: "danger", active: false, value: "red" },
      ],
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach((listItem) => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    changeSidebarBackground(item) {
      this.$emit("update:backgroundColor", item.value);
      this.toggleList(this.sidebarColors, item);
    },
    toggleMode(type) {
      let docClasses = document.body.classList;
      if (type) {
        docClasses.remove("white-content");
      } else {
        docClasses.add("white-content");
      }
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/assets/sass/dashboard/custom/variables";

.settings-icon {
  cursor: pointer;
}

.badge-vue {
  background-color: $vue;
}
</style>
