<template>
  <v-form
    class="dialog-body"
    ref="formMenuRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Chức năng: <span style="color: red">*</span>
        </div>
        <v-select
          :rules="[rules.required]"
          v-model="formData.MaMenu"
          :disabled="dataEdit.MaMenu ? true : false"
          :items="optionIdMenu"
          label="Chọn"
          dense
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
          Tên menu: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TenMenu"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Mã icon:</div>
        <v-text-field
          v-model="formData.MaIcon"
          solo
          label="Nhập mã icon..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Đường dẫn: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.DuongDan"
          solo
          label="Nhập đường dẫn..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
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
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Số thứ tự: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.number]"
          v-model="formData.SoThuTu"
          solo
          label="Nhập số thứ tự..."
          dense
          hide-details="auto"
          type="number"
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Menu cha:</div>
        <v-select
          v-model="formData.MaMenuCha"
          :items="getListMenu"
          label="Chọn"
          dense
          solo
          hide-details="auto"
          class="flex input-form"
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
          hide-details="auto"
          class="flex input-form"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Nhóm quyền:</div>
        <v-select
          v-model="formData.PhanQuyenMenu"
          :items="optionGroups"
          label="Chọn"
          dense
          solo
          multiple
          hide-details="auto"
          class="flex input-form"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Loại menu:</div>
        <v-select
          v-model="formData.LoaiMenu"
          :items="optionType"
          label="Chọn"
          dense
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
  props: ["dataEdit", "listMenu"],
  data() {
    return {
      formData: {
        MaMenuCha: this.dataEdit.MaMenuCha || "",
        MaMenu: this.dataEdit.MaMenu || "",
        TinhTrang: this.dataEdit.TinhTrang || "2",
        LoaiMenu: this.dataEdit.LoaiMenu || "",
        TenMenu: this.dataEdit.TenMenu || "",
        DuongDan: this.dataEdit.DuongDan || "",
        TenTiengAnh: this.dataEdit.TenTiengAnh || "",
        MaIcon: this.dataEdit.MaIcon || "",
        SoThuTu: this.dataEdit.SoThuTu || "",
        PhanQuyenMenu: this.dataEdit.ListQuyenMenu?.length
          ? this.dataEdit.ListQuyenMenu.map((item) => item.MaDinhDanh)
          : [],
      },
      validForm: false,
      optionStatus: [
        { text: "Hoạt động", value: "2" },
        { text: "Không hoạt động", value: "1" },
      ],
      optionGroups: [],
      optionType: [
        { text: "Web", value: "0" },
        { text: "Mobile", value: "1" },
      ],
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
    console.log("moun");
  },
  created() {
    const vm = this;
    vm.getGroup();
    console.log("cretate", this.dataEdit, this.listMenu);
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
      return vm.$refs.formMenuRef.validate();
    },
  },
  computed: {
    getListMenu() {
      const vm = this;
      let option = [];
      if (vm.dataEdit?.PrimKey) {
        option = vm.listMenu.reduce(function (res, cur) {
          if (vm.dataEdit?.PrimKey !== cur.PrimKey)
            res.push({
              text: cur.TenMenu,
              value: cur.MaMenu,
            });
          return res;
        }, []);
      } else {
        option = vm.listMenu.map((item) => ({
          text: item.TenMenu,
          value: item.MaMenu,
        }));
      }

      return option;
    },
    optionIdMenu() {
      const options = [
        {
          text: "Quản lý cán bộ",
          value: "ManageCadres",
        },
        {
          text: "Quản lý sinh viên",
          value: "ManageStudents",
        },
        {
          text: "Quản lý nhóm quyền",
          value: "MangeRightsGroup",
        },
        {
          text: "Quản lý bài viết tin tức",
          value: "ManageNews",
        },
        {
          text: "Quản lý menu",
          value: "ManageMenu",
        },
        {
          text: "Quản lý phản hồi góp ý",
          value: "ManageFeedback",
        },
        {
          text: "Quản lý khu vực bản đồ",
          value: "ManageArea",
        },
        {
          text: "Quản lý loại bản đồ",
          value: "ManageTypeMap",
        },
        {
          text: "Quản lý địa điểm bản đồ",
          value: "ManageMap",
        },
        {
          text: "Quản lý chuyên mục tin tức",
          value: "ManageCategoryNews",
        },
         {
          text: 'Quản lý chuyên mục cẩm nang Hòa Lạc',
          value: 'ManageTypeHandBook'
        },
         {
          text: 'Xem tất cả thông báo',
          value: 'ManageNotification'
        },
        {
          text: 'Quản lý cẩm nang Hòa Lạc',
          value: 'CamNangHoaLac'
        },
        {
          text: 'Tin tức - App',
          value: 'TinTuc_App'
        },
        {
          text: 'Góp ý - App',
          value: 'GopY_App'
        },
        {
          text: 'Thông báo - App',
          value: 'ThongBao_App'
        },
        {
          text: 'Bản đồ số - App',
          value: 'BanDo_App'
        },
        {
          text: 'Cẩm nang - App',
          value: 'CamNang_App'
        },
        {
          text: 'Đăng ký nội trú - App',
          value: 'DangKyNoiTru_App'
        },
        {
          text: 'Ảnh xác minh - App',
          value: 'AnhXacMinh_App'
        },
           {
          text: 'Quản lý thủ tục',
          value: 'ManageProcedure'
        },
             {
          text: 'Quản lý nhà trọ',
          value: 'ManageMotelInfor'
        },
             {
          text: 'Quản lý phòng trọ',
          value: 'ManageListMotel'
        },
      ];
      return options;
    },
  },
};
</script>

<style>
.custom-height-select > .v-input__control > .v-input__slot {
  height: 38px !important;
}
</style>