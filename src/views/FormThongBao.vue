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
          Tiêu đề thông báo: <span style="color: red">*</span>
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
          Nội dung thông báo: <span style="color: red">*</span>
        </div>
        <v-textarea
          :rules="[rules.required]"
          v-model="formData.NoiDung"
          solo
          label="Nội dung thông báo"
          dense
          hide-details="auto"
          required
          class="input-form"
          rows="5"
        ></v-textarea>
      </v-col>
      <v-col cols="12" class="py-0 mb-2">
          <div class="titleText mb-2">Sinh viên nhận thông báo: <span style="color: red">*</span></div>
          <v-autocomplete
            class="flex input-form"
            hide-no-data
            :items="itemsSinhVienNhanThongBao"
            v-model="sinhVienNhanThongBao"
            item-text="HoVaTen"
            item-value="MaSinhVien"
            dense
            solo
            hide-details="auto"
            placeholder=""
            return-object
            clearable
            :rules="[rules.required]"
            required
          >
            <template v-slot:selection="data">
              <span>{{data.item.HoVaTen}}</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{{data.item.MaSinhVien}}</span>
            </template>
            <template v-slot:item="data">
              <span>{{data.item.HoVaTen}}</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{{data.item.MaSinhVien}}</span>
            </template>
          </v-autocomplete>
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
        MaThongBao: '',
        TinhTrang: '0',
        TieuDe: this.dataEdit.TieuDe || "",
        NoiDung: this.dataEdit.NoiDung || "",
        NhanThongBao: {
          "TypeNguoiNhan" : "T_SinhVien",
          "MaDinhDanhNguoiNhan" : this.sinhVienNhanThongBao ? this.sinhVienNhanThongBao.MaDinhDanh : '',
          "TenSinhVien": this.sinhVienNhanThongBao ? this.sinhVienNhanThongBao.HoVaTen : '',
          "MaSinhVien": this.sinhVienNhanThongBao ? this.sinhVienNhanThongBao.MaSinhVien : '',
          "TypeDoiTuongThongBao" : "",
          "MaDinhDanhDoiTuong" : "",
          "NguoiGuiThongBao" : ""
        }
      },
      itemsSinhVienNhanThongBao: [],
      sinhVienNhanThongBao: '',
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
    console.log("moun");
  },
  created() {
    const vm = this;
    vm.getGroup();
    console.log("cretate", this.dataEdit);
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
    // getGroup() {
    //   let vm = this;
    //   const dataPayload = {
    //     page: 0,
    //     size: 20,
    //     keyword: "",
    //     orderFields: "",
    //     orderTypes: "",
    //     tinhTrang: "1",
    //     thamChieu_maMuc: "",
    //   };
    //   const filter = {
    //     collectionName: "mauthongbao",
    //     data: dataPayload,
    //   };
    //   vm.$store.dispatch("collectionFilter", filter).then(function (response) {
    //     const responseData = response.content;
    //     vm.$emit("emitDataGroup", responseData);
    //     vm.optionGroups = responseData.map((item) => ({
    //       text: item.TenNhomQuyen,
    //       value: item.MaDinhDanh,
    //     }));
    //   });
    // },
    getGroup(dataParam) {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 50,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName: "sinhvien",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.itemsSinhVienNhanThongBao = response.content;
        })
        .catch(function () {
        });
    },
    getFormData () {
      let vm = this
      let data = {
        MaThongBao: '',
        TinhTrang: '0',
        TieuDe: vm.formData.TieuDe || "",
        NoiDung: vm.formData.NoiDung || "",
        NhanThongBao: {
          "TypeNguoiNhan" : "T_SinhVien",
          "MaDinhDanhNguoiNhan" : vm.sinhVienNhanThongBao ? vm.sinhVienNhanThongBao.MaDinhDanh : '',
          "TenSinhVien": vm.sinhVienNhanThongBao ? vm.sinhVienNhanThongBao.HoVaTen : '',
          "MaSinhVien": vm.sinhVienNhanThongBao ? vm.sinhVienNhanThongBao.MaSinhVien : '',
          "TypeDoiTuongThongBao" : "",
          "MaDinhDanhDoiTuong" : "",
          "NguoiGuiThongBao" : ""
        }
      }
      return data
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
      console.log("dis", vm.optionDistrict);
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