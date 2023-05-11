<template>
  <v-form class="pa-5" ref="formCanBoRef" lazy-validation v-model="validForm">
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Mã cán bộ: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.MaSoCanBo"
          solo
          :disabled="dataEdit.MaSoCanBo ? true : false"
          label="Nhập mã cán bộ..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Họ và tên: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.HoVaTen"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Email VNU: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.email]"
          v-model="formData.EmailVNU"
          solo
          label="Nhập email..."
          dense
          hide-details="auto"
          :disabled="dataEdit.EmailVNU ? true : false"
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Ngày sinh:</div>
        <v-menu
          v-model="toggleShowMenuDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="flex input-form"
              :rules="[rules.birthday]"
              clearable
              v-model="formData.NgaySinh"
              label="Nhập ngày sinh dd/mm/yyyy ..."
              persistent-hint
              prepend-icon=""
              v-bind="attrs"
              @blur="date = parseDate(formData.NgaySinh)"
              @input="handleChangeDate()"
              v-on="on"
              solo
              dense
              hide-details="auto"
              hide-no-data
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="toggleShowMenuDate = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Giới tính:</div>
        <v-select
          v-model="formData.GioiTinh"
          :items="optionGender"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Địa chỉ:</div>
        <v-text-field
          v-model="formData.diaChiThuongTru"
          solo
          label="Nhập địa chỉ..."
          dense
          hide-details="auto"
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <div class="titleText mb-2">Tỉnh/thành:</div>
        <v-select
          @change="handleChangeProvince"
          v-model="formData.TinhThanh"
          :items="optionProvince"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="titleText mb-2">Quận/huyện:</div>
        <v-select
          @change="hanldeChangeDistrict"
          v-model="formData.QuanHuyen"
          :items="optionDistrict"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="titleText mb-2">Phường/xã:</div>
        <v-select
          v-model="formData.PhuongXa"
          :items="optionWard"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Cơ quan, đơn vị: <span style="color: red">*</span>
        </div>
        <v-select
          :rules="[rules.required]"
          v-model="formData.CoQuanDonVi"
          :items="optionAgencies"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" v-if="dataEdit.MaSoCanBo">
        <div class="titleText mb-2">Nhóm quyền:</div>
        <v-autocomplete
          class="input-form custom-height-select"
          v-model="formData.ListQuyenCanBo"
          :items="optionGroups"
          label="Chọn nhóm quyền"
          multiple
          solo
          :disabled="checkActionAuthor ? false : true"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="6" v-if="dataEdit.MaSoCanBo">
        <div class="titleText mb-2">Trạng thái tài khoản:</div>
        <v-autocomplete
          v-model="formData.TrangThaiTaiKhoan"
          :items="optionStatusAccount"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: ["dataEdit", "getListFunctionProps", "checkActionAuthor", "unitId"],
  data() {
    return {
      formData: {
        MaSoCanBo: this.dataEdit.MaSoCanBo || "",
        GioiTinh: this.dataEdit.GioiTinh || "",
        HoVaTen: this.dataEdit.HoVaTen || "",
        NgaySinh: this.dataEdit.NgaySinh
          ? moment(this.dataEdit.NgaySinh).add(1, "d").format("DD/MM/YYYY")
          : "",
        ListQuyenCanBo: this.dataEdit.ListQuyenCanBo?.length
          ? this.dataEdit.ListQuyenCanBo.map((item) => item.MaDinhDanh)
          : [],
        EmailVNU: this.dataEdit.EmailVNU || "",
        CoQuanDonVi: this.dataEdit.CoQuanDonVi || "",
        diaChiThuongTru: this.dataEdit.diaChiThuongTru?.SoNhaChiTiet || "",
        TinhThanh: this.dataEdit.diaChiThuongTru?.TinhThanh || "",
        QuanHuyen: this.dataEdit.diaChiThuongTru?.QuanHuyen || "",
        PhuongXa: this.dataEdit.diaChiThuongTru?.PhuongXa || "",
        TrangThaiTaiKhoan: this.dataEdit.TrangThaiTaiKhoan || "",
        TinhTrangCongTac: this.dataEdit.TinhTrangCongTac || "",
      },
      validForm: false,
      optionPosition: [],
      optionDistrict: [],
      optionWard: [],
      optionGroups: [],
      optionStatusAccount: [
        { text: "Hoạt động", value: "2" },
        { text: "Không hoạt động", value: "1" },
      ],
      rules: {
        required: (value) => !!value || "Không được để trống.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email VNU sai chính tả";
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
      toggleShowMenuDate: false,
      date: "",
    };
  },

  mounted() {
   
  },
  created() {
    const vm = this;
    vm.getGroup();
    

    if (vm.dataEdit.PrimKey){
      if (vm.dataEdit?.diaChiThuongTru?.TinhThanh.MaMuc)
        vm.getDistrict(vm.dataEdit.diaChiThuongTru.TinhThanh.MaMuc);
      if (vm.dataEdit?.diaChiThuongTru?.QuanHuyen.MaMuc)
        vm.getWard(vm.dataEdit.diaChiThuongTru.QuanHuyen.MaMuc);
    }

  },
  computed: {
    ...mapState(["listAgencies", "listProvince", "listGender", "listWork"]),
    optionGender() {
      const vm = this;
      const options = vm.listGender.map((item) => ({
        text: item.tenMuc,
        value: { MaMuc: item.maMuc, TenMuc: item.tenMuc, type: "C_GioiTinh" },
      }));
      return options;
    },
    optionAgencies() {
      const vm = this;
      // console.log("computed: ", vm.listAgencies)
      let data = vm.listAgencies;
      if (vm.unitId) {
        data = vm.listAgencies.filter((item) => item.maHanhChinh === vm.unitId);
      }
      const options = data.map((item) => ({
        text: item.tenGoi,
        value: {
          MaHanhChinh: item.maHanhChinh,
          TenGoi: item.tenGoi,
        },
      }));

      return options;
    },
    optionProvince() {
      const vm = this;
      const options = vm.listProvince.map((item) => ({
        text: item.tenMuc,
        value: { MaMuc: item.maMuc, TenMuc: item.tenMuc, type: "C_TinhThanh" },
      }));
      return options;
    },
  },
  methods: {
    getDistrict(id) {
      const vm = this;
      let filter = {
        collectionName: "quanhuyen",
        data: {
          page: 0,
          size: 20,
          keyword: "",
          orderFields: "",
          orderTypes: "",
          thamChieu_maMuc: id,
          tinhTrang: "1",
        },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          const data = response.content;
          vm.optionDistrict = data.map((item) => ({
            text: item.tenMuc,
            value: {
              MaMuc: item.maMuc,
              TenMuc: item.tenMuc,
              type: "C_QuanHuyen",
            },
            districtCode: item.maMuc,
          }));
        })
        .catch(function () {});
    },
    getWard(id) {
      const vm = this;
      let filter = {
        collectionName: "phuongxa",
        data: {
          page: 0,
          size: 20,
          keyword: "",
          orderFields: "",
          orderTypes: "",
          thamChieu_maMuc: id,
          tinhTrang: "1",
        },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          const data = response.content;
          vm.optionWard = data.map((item) => ({
            text: item.tenMuc,
            value: {
              MaMuc: item.maMuc,
              TenMuc: item.tenMuc,
              type: "C_PhuongXa",
            },
          }));
        })
        .catch(function () {});
    },
    getGroup() {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 100,
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
      return vm.$refs.formCanBoRef.validate();
    },
    handleChangeProvince(item) {
      const vm = this;
      vm.optionDistrict = [];
      vm.optionWard = [];

      let filter = {
        collectionName: "quanhuyen",
        data: {
          page: 0,
          size: 20,
          keyword: "",
          orderFields: "",
          orderTypes: "",
          thamChieu_maMuc: item.MaMuc,
          tinhTrang: "1",
        },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          const data = response.content;
          vm.optionDistrict = data.map((item) => ({
            text: item.tenMuc,
            value: {
              MaMuc: item.maMuc,
              TenMuc: item.tenMuc,
              type: "C_QuanHuyen",
            },
            districtCode: item.maMuc,
          }));
        })
        .catch(function () {});
    },
    hanldeChangeDistrict(item) {
      const vm = this;
     
      const districtCode = vm.optionDistrict.filter(
        (district) => district.districtCode === item.MaMuc
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
              value: {
                MaMuc: item.maMuc,
                TenMuc: item.tenMuc,
                type: "C_PhuongXa",
              },
            }));
          })
          .catch(function () {});
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  watch: {
    date() {
      const vm = this;
      vm.formData.NgaySinh = vm.formatDate(vm.date);
    },
  },
};
</script>

<style scoped>
.custom-height-select > .v-input__control > .v-input__slot {
  height: 26px !important;
}
</style>
