<template>
  <v-form
    class=""
    ref="formPhanNhomQuyenRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12" class="">
        <div class="titleText mb-2">
          Chuyên mục cẩm nang: <span style="color: red">*</span>
        </div>
        <v-select
          :items="listCategoryNews"
          label="Chọn chuyên mục"
          v-model="formData.chuyenMuc"
          chips
          multiple
          solo
          :rules="[rules.required]"
          required
          class="flex input-form"
          hide-details="auto"
          hide-no-data
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
          class="flex input-form"
          required
          hide-details="auto"
          hide-no-data
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: ["dataTypeHandBook", "dataSelectEditCategoryHandBook"],
  data() {
    return {
      formData: {
        chuyenMuc: this.dataSelectEditCategoryHandBook || '',
        TenNhomQuyen: '',
      },
      listGroup: [],
      listCategoryNews: [],
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
   
    vm.listCategoryNews = vm.dataTypeHandBook.map((item) => ({
      text: item.TenMuc,
      value: item.MaDinhDanh,
    }));
    vm.getGroup();
    //  console.log("props: " , vm.dataTypeHandBook, vm.dataSelectEditCategoryHandBook)
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
        size: 200,
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