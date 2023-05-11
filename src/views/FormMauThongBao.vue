<template>
  <v-form
    class="dialog-body"
    ref="formCanBoRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Mã mẫu thông báo: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.MaThongBao"
          solo
          label="Nhập mã mẫu thông báo"
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tiêu đề mẫu thông báo: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TieuDe"
          solo
          label="Nhập tiêu đề mẫu thông báo"
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="titleText mb-2">
          Nội dung mẫu thông báo: <span style="color: red">*</span>
        </div>
        <v-textarea
          :rules="[rules.required]"
          v-model="formData.NoiDung"
          solo
          label="Nội dung mẫu thông báo"
          dense
          hide-details="auto"
          required
          class="input-form"
          rows="5"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["dataEdit", "getListFunctionProps"],
  data() {
    return {
      formData: {
        MaThongBao: this.dataEdit.MaThongBao || "",
        TieuDe: this.dataEdit.TieuDe || "",
        NoiDung: this.dataEdit.NoiDung || "",
      },
      validForm: false,
      optionPosition: [],
      optionDistrict: [],
      optionWard: [],
      optionGroups: [],
      rules: {
        required: (value) => !!value || "Không được để trống.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Đây không phải là email";
        },
        birthday: (value) => {
          const pattern =
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          let status;
          if (!value) {
            status = true;
          } else {
            status =
              pattern.test(value) || "Định dạng ngày sinh là: ngày/tháng/năm";
          }
          return status;
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
  computed: {
    ...mapState(["listAgencies", "listProvince", "listGender", "listWork"]),
    optionGender() {
      const vm = this;
      const options = vm.listGender.map((item) => ({
        text: item.tenMuc,
        value: { maMuc: item.maMuc, tenMuc: item.tenMuc },
      }));
      return options;
    },
    optionWrok() {
      const vm = this;
      const options = vm.listWork.map((item) => ({
        text: item.tenMuc,
        value: {
          MaMuc: item.maMuc,
          TenMuc: item.tenMuc,
        },
      }));
      return options;
    },
    optionAgencies() {
      const vm = this;

      const options = vm.listAgencies.map((item) => ({
        text: item.tenGoi,
        value: {
          MaHanhChinh: item.MaDinhDanh,
          TenGoi: item.tenGoi,
        },
      }));
      return options;
    },
    optionProvince() {
      const vm = this;

      const options = vm.listProvince.map((item) => ({
        text: item.tenMuc,
        value: item.PrimKey,
      }));
      return options;
    },
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
        collectionName: "mauthongbao",
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
      return vm.$refs.formCanBoRef.validate();
    },
    handleChangeProvince(item) {
      const vm = this;
      vm.optionDistrict = [];
      vm.optionWard = [];
      const provinceCode = vm.listProvince.filter(
        (province) => province.PrimKey === item
      )[0].maMuc;
      if (provinceCode) {
        let filter = {
          collectionName: "quanhuyen",
          data: {
            page: 0,
            size: 20,
            keyword: "",
            orderFields: "",
            orderTypes: "",
            thamChieu_maMuc: provinceCode,
            tinhTrang: "1",
          },
        };
        vm.$store
          .dispatch("collectionFilter", filter)
          .then(function (response) {
            const data = response.content;
            vm.optionDistrict = data.map((item) => ({
              text: item.tenMuc,
              value: item.PrimKey,
              districtCode: item.maMuc,
            }));
          })
          .catch(function () {});
      }
    },
    hanldeChangeDistrict(item) {
      const vm = this;
   
      const districtCode = vm.optionDistrict.filter(
        (district) => district.value === item
      )[0].districtCode;
      if (districtCode) {
        let filter = {
          collectionName: "phuongxa",
          data: {
            page: 0,
            size: 20,
            keyword: "",
            orderFields: "",
            orderTypes: "",
            thamChieu_maMuc: districtCode,
            tinhTrang: "1",
          },
        };
        vm.$store
          .dispatch("collectionFilter", filter)
          .then(function (response) {
            const data = response.content;
            vm.optionWard = data.map((item) => ({
              text: item.tenMuc,
              value: item.PrimKey,
            }));
          })
          .catch(function () {});
      }
    },
  },
};
</script>

<style>
.custom-height-select > .v-input__control > .v-input__slot {
  height: 38px !important;
}
</style>