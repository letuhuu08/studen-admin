<template>
  <v-form
    class="dialog-body"
    ref="formMotelInforRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Tên chủ nhà: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          solo
          v-model="formData.TenChuNha"
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Số điện thoại: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.phone]"
          solo
          v-model="formData.SoDienThoai"
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Địa chỉ: <span style="color: red">*</span>
        </div>
        <v-text-field
          v-model="formData.DiaChi"
          :rules="[rules.required]"
          solo
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Số lượng phòng:</div>
        <v-text-field
          v-model="formData.SoLuongPhong"
          :rules="[rules.number]"
          solo
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: ["dataEdit", "listMotelInforData"],

  data() {
    return {
      formData: {
        TenChuNha: this.dataEdit.TenChuNha || "",
        SoDienThoai: this.dataEdit.SoDienThoai || "",
        DiaChi: this.dataEdit.DiaChi || "",
        SoLuongPhong: this.dataEdit.SoLuongPhong || "",
      },
      rules: {
        required: (value) => !!value || "Không được để trống.",
        phone: (value) => {
          const pattern =
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
          let status;
          if (!value) {
            status = true;
          } else {
            status = pattern.test(value) || "Sai định dạng số điện thoại";
          }
          return status;
        },
        checkDoubleDataName: (value) => {
          console.log("checking!!!", value, this.listMotelInforData);
          return true;
        },
        checkDoubleDataAddress: (value) => {
          console.log("checking!!!", value, this.listMotelInforData);
          return true;
        },
        number: (value) => {
          const pattern = /^\d+(\.\d{1,2})?$/;
          return pattern.test(value) || "Trường này phải nhập số";
        },
      },
      validForm: false,
      listProvince: [],
      listDistrict: [],
      listWards: [],
    };
  },

  mounted() {
    console.log("moun");
  },
  created() {
    const vm = this;
    vm.getListDataAddress("tinhthanh", { tinhTrang: "1" });
  },

  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formMotelInforRef.validate();
    },
    getListDataAddress(collectionName, dataParam) {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 20,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      let filter = {
        collectionName,
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          switch (collectionName) {
            case "quanhuyen":
              vm.listDistrict = response.content;
              break;

            case "phuongxa":
              vm.listWards = response.content.map((item) => ({
                text: item.tenMuc,
                value: item.PrimKey,
              }));
              break;

            default:
              vm.listProvince = response.content;
              break;
          }
        })
        .catch(function () {
          console.log("Error");
        });
    },
    handleChangeProvince(item) {
      const vm = this;
      vm.listDistrict = [];
      vm.listWards = [];
      const provinceCode = vm.listProvince.filter(
        (province) => province.PrimKey === item
      )[0]?.maMuc;
      console.log("item: ", item, provinceCode);
      if (provinceCode)
        vm.getListDataAddress("quanhuyen", {
          tinhTrang: "1",
          thamChieu_maMuc: provinceCode,
        });
    },
    handleChangeDistrict(item) {
      const vm = this;
      const provinceCode = vm.listDistrict.filter(
        (province) => province.PrimKey === item
      )[0]?.maMuc;
      if (provinceCode)
        vm.getListDataAddress("phuongxa", {
          tinhTrang: "1",
          thamChieu_maMuc: provinceCode,
        });
    },
  },
  computed: {
    getListProvince() {
      const vm = this;
      const options = vm.listProvince.map((item) => ({
        text: item.tenMuc,
        value: item.PrimKey,
      }));
      return options;
    },
    getListDistrict() {
      const vm = this;
      const options = vm.listDistrict.map((item) => ({
        text: item.tenMuc,
        value: item.PrimKey,
      }));
      return options;
    },
  },
};
</script>
