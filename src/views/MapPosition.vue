<template>
  <div class="wrap-map" :style="{ height: heightMap }">
    <GmapMap :center="center" :zoom="12" style="width: 100%; height: 100%">
      <GmapMarker :position="position" @click="center = position"></GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ["dataProps", "listMap"],
  data() {
    return {
      center: { lat: 21.0377211, lng: 105.7820087 },
      position: { lat: 0, lng: 0 },
      heightMap: "100%",
    };
  },

  mounted() {
    const vm = this;
    console.log("Data: ", this.dataProps);
  },

  watch: {
    dataProps: function (newVal) {
      const vm = this;
      vm.position = {
        lat: +newVal.ToaDo.Latitude,
        lng: +newVal.ToaDo.Longitude,
      };
    },
    listMap(newVal) {
      const vm = this;
      console.log("watch", newVal);
      if (newVal.length <= 8) vm.heightMap = "486px";
      else vm.heightMap = "100%";
    },
  },
};
</script>
