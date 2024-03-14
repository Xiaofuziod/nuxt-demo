<template>
  <div>
    <add-coin v-if="addCoinShow"/>
    <add-monitoring v-if="addMonitorShow"/>
  </div>
</template>
<script>
import AddCoin from "~/components/report/addCoin.vue";
import AddMonitoring from "~/components/monitor/addMonitoring.vue";

export default {
  components: {
    AddMonitoring,
    AddCoin,
  },
  computed:{
    addMonitorShow() {
      return this.$store.state.monitor.addMonitorShow
    },
    addCoinShow() {
      return this.$store.state.coin.addCoinShow
    },
  },
  data() {
    return {};
  },
  methods: {}
}
</script>
