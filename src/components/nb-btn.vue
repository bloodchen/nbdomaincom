<template>
  <q-btn v-bind="attribs" v-on="$listeners" ref="qbutton"></q-btn>
</template>

<script>
export default {
  name: "nb-btn",
  //props:["disable"],
  data() {
    return {};
  },
  mounted() {
    var child = this.$refs.qbutton;
    if ("nb-rounded" in this.$attrs) {
      child.classList.add("nb-rounded");
    }
  },
  computed: {
    attribs() {
      const attrs = this.$attrs;
      const def = {
        color: "primary",
        unelevated: true,
        "no-caps": true,
      };
      return {
        ...def,
        ...attrs,
      };
    },
  },
};
</script>
