<template>
  <v-form
    class="dialog-body"
    ref="formPhanNhomQuyenRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Menu: <span style="color: red">*</span>
        </div>
        <v-select
         :rules="[rules.required]"
          :items="listMenu"
          label="Chọn Menu"
          v-model="formData.menu"
          chips
          multiple
          solo
          hide-details="auto"
          required
          class="flex input-form"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Nhóm quyền:
        </div>
        <v-select
          v-model="formData.TenNhomQuyen"
          :items="listGroup"
          chips
          label="Chọn nhóm quyền"
          multiple
          solo
          hide-details="auto"
          required
          class="flex input-form"
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: ["dataMenu", "dataSelectEditMenu"],
  data() {
    return {
      formData: {
        menu: this.dataSelectEditMenu || null,
        TenNhomQuyen: null,
      },
      listGroup: [],
      listMenu: [],
      validForm: false,
      rules: {
        required: (value) => !!value || "Không được để trống.",
      },
    };
  },

  mounted() {
  
    
  },
  created() {
    const vm = this;
     vm.listMenu = vm.dataMenu.map((item) => ({
          text: item.TenMenu,
          value: item.MaDinhDanh,
        }));
     vm.getGroup();
     
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formPhanNhomQuyenRef.validate();
    },
    getGroup() {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 20,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "1",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName: "nhomquyen",
        data: dataPayload,
      };
      vm.$store.dispatch("collectionFilter", filter).then(function (response) {
        const responseData = response.content;
        vm.listGroup = responseData.map((item) => ({
          text: item.TenNhomQuyen,
          value: item.MaDinhDanh,
        }));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>