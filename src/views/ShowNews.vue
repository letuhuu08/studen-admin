<template>
  <v-container class="container-news">
    <v-row>
      <v-col cols="12" sm="12">
        <div>
          <div class="header-news">
            {{ data.TenBaiViet }}
          </div>
          <div class="content-news">
            <div v-html="data.NoiDungBaiViet"></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },

  created() {
    const vm = this;
    vm.getDetailsNews();
    console.log(vm.$route.params.id);
  },

  mounted() {},

  methods: {
    getDetailsNews() {
      let vm = this;
      const filter = {
        id: vm.$route.params.id,
      };
      vm.$store
        .dispatch("getDetailsItemDataPublic", filter)
        .then(function (response) {
          console.log("res: ", response);
          vm.data = { ...response.resp };
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
.header-news {
  font-size: 28px;
  font-weight: bold;
  color: #007f48;
  padding-bottom: 10px;
  line-height: 1.25;
}
.content-news img {
  max-width: 100% !important;
}

</style>
