<template>
  <v-form
    class="pa-3"
    ref="formCategoryNewsRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Mã chuyên mục: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.MaChuyenMuc"
          solo
          :disabled="dataEdit.MaChuyenMuc ? true : false"
          label="Nhập mã chuyên mục..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Tên chuyên mục: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TenChuyenMuc"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Tên tiếng anh:</div>
        <v-text-field
          v-model="formData.TenTiengAnh"
          solo
          label="Nhập tên tiếng anh..."
          dense
          hide-details="auto"
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Số thứ tự: <span style="color: red">*</span></div>
        <v-text-field
          :rules="[rules.number, rules.required]"
          v-model="formData.SoThuTu"
          solo
          label="Nhập số thứ tự..."
          dense
          hide-details="auto"
          class="flex input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Nhóm quyền:</div>
        <v-select
          class="input-form"
          v-model="formData.PhanQuyenChuyenMuc"
          :items="optionGroups"
          label="Chọn"
          dense
          solo
          multiple
          hide-details="auto"
          hide-no-data
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Chuyên mục cha:</div>
        <v-select
          clearable
          v-model="formData.MaChuyenMucCha"
          :items="getListCategoryNews"
          label="Chọn"
          dense
          solo
          class="flex input-form"
          hide-details="auto"
          hide-no-data
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Tình trạng:</div>
        <v-select
          v-model="formData.TinhTrang"
          :items="optionStatus"
          label="Chọn"
          dense
          solo
          class="flex input-form"
          hide-details="auto"
          hide-no-data
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: ["dataEdit", "listCategoryNews"],
  data() {
    return {
      formData: {
        MaChuyenMuc: this.dataEdit.MaChuyenMuc || "",
        TenChuyenMuc: this.dataEdit.TenChuyenMuc || "",
        TenTiengAnh: this.dataEdit.TenTiengAnh || "",
        SoThuTu: this.dataEdit.SoThuTu || "",
        TinhTrang: this.dataEdit.TinhTrang || "",
        MaChuyenMucCha: this.dataEdit.MaChuyenMucCha || "",
        PhanQuyenChuyenMuc: this.dataEdit.ListQuyenChuyenMuc?.length
          ? this.dataEdit.ListQuyenChuyenMuc.map((item) => item.MaDinhDanh)
          : [],
      },
      validForm: false,
      optionStatus: [
        { text: "Hoạt động", value: "2" },
        { text: "Không hoạt động", value: "1" },
      ],
      optionGroups: [],
      rules: {
        required: (value) => !!value || "Không được để trống.",
        birthday: (value) => {
          const pattern =
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          return (
            pattern.test(value) || "Định dạng ngày sinh là: ngày/tháng/năm"
          );
        },
        number: (value) => {
          const pattern = /^(?:[1-9]\d*|\d)$/;
          return pattern.test(value) || "Trường này phải nhập số";
        },
      },
    };
  },

  mounted() {

  },
  created() {
    const vm = this;
    vm.getGroup();
   
  },
  methods: {
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
        vm.$emit("emitDataGroup", responseData);
        vm.optionGroups = responseData.map((item) => ({
          text: item.TenNhomQuyen,
          value: item.MaDinhDanh,
        }));
      });
    },
    validateForm() {
      let vm = this;
      return vm.$refs.formCategoryNewsRef.validate();
    },
  },
  computed: {
    getListCategoryNews() {
      const vm = this;
      let option = [];
      if (vm.dataEdit?.PrimKey) {
        option = vm.listCategoryNews.reduce(function (res, cur) {
          if (vm.dataEdit?.PrimKey !== cur.PrimKey)
            res.push({
              text: cur.TenChuyenMuc,
              value: cur.MaChuyenMuc,
            });
          return res;
        }, []);
      } else {
        option = vm.listCategoryNews.map((item) => ({
          text: item.TenChuyenMuc,
          value: item.MaChuyenMuc,
        }));
      }

      return option;
    },
  },
};
</script>

<style>
.custom-height-select > .v-input__control > .v-input__slot {
  height: 38px !important;
}
</style>