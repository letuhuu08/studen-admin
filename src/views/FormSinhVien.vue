<template>
  <v-form
    class="dialog-body"
    ref="formSinhVienRef"
    lazy-validation
    v-model="validForm"
  >
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
        <div class="titleText mb-2">Số CCCD:</div>
        <v-text-field
          :rules="[rules.idCard]"
          v-model="formData.ChungMinhThu"
          solo
          label="Nhập CCCD..."
          dense
          hide-details="auto"
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Số điện thoại:</div>
        <v-text-field
          :rules="[rules.phone]"
          v-model="formData.SoDienThoai"
          solo
          label="Nhập số điện thoại..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Email VNU:</div>
        <v-text-field
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
        <div class="titleText mb-2">
          Ngày sinh: <span style="color: red">*</span>
        </div>

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
              label="Ngày sinh ..."
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

    <v-row v-if="dataEdit.PrimKey">
      <v-col cols="12" sm="12" v-if="checkActionUpload">
        <div class="d-flex align-center">
          <div class="titleText mr-2">
            {{ showAddImg ? "Thêm ảnh :" : "Thêm thư mục ảnh:" }}
          </div>
          <v-btn
            small
            color="primary"
            class="btn-form mx-0 text-white"
            @click="handleOpenDialogAddFile"
          >
            <v-icon size="18">mdi-plus</v-icon>&nbsp;
            {{ showAddImg ? "Thêm ảnh" : "Thêm thư mục" }}
          </v-btn>
        </div>

        <v-btn
          depressed
          x-small
          color="primary"
          v-if="checkFile"
          @click="handleViewFile"
          >Nhấn để xem tệp</v-btn
        >

        <v-btn
          v-if="checkFile"
          class="mx-2"
          depressed
          x-small
          color="error"
          @click="handleDeleteFile"
          >Xóa tệp đính kèm
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Địa chỉ: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.DiaChiThuongTru"
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
        <div class="titleText mb-2">
          Tỉnh/thành: <span style="color: red">*</span>
        </div>
        <v-select
          :rules="[rules.required]"
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
        <div class="titleText mb-2">
          Quận/huyện: <span style="color: red">*</span>
        </div>
        <v-select
          :rules="[rules.required]"
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
        <div class="titleText mb-2">
          Phường/xã: <span style="color: red">*</span>
        </div>
        <v-select
          :rules="[rules.required]"
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
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Mã sinh viên:</div>
        <v-text-field
          v-model="formData.MaSinhVien"
          solo
          :disabled="checkCondition"
          label="Nhập mã sinh viên..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Số báo danh:</div>
        <v-text-field
          v-model="formData.SoBaoDanh"
          :disabled="dataEdit.SoBaoDanh ? true : false"
          solo
          label="Nhập số báo danh..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Mã nhập học:</div>
        <v-text-field
          :disabled="dataEdit.MaNhapHoc ? true : false"
          v-model="formData.MaNhapHoc"
          solo
          label="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Số hồ sơ:</div>
        <v-text-field
          v-model="formData.SoHoSo"
          solo
          label="Nhập số hồ sơ..."
          dense
          hide-details="auto"
          :disabled="dataEdit.SoHoSo ? true : false"
          class="input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" :sm="dataEdit.PrimKey ? 6 : 12">
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
      <v-col cols="12" sm="6" v-if="dataEdit.PrimKey">
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

    <!-- <v-dialog v-model="showDiglogFile" persistent fullscreen>
      <v-card>
        <v-toolbar class="px-3">
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="showDiglogFile = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <div class="d-flex justify-center">
                  <img :src="formData.MainImageUrl" alt="" class="style-img" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog> -->

    <v-dialog v-model="showDialogFolder" persistent max-width="1000">
      <v-card>
        <v-toolbar class="px-3">
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="handleCloseDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row v-if="!showAddImg">
              <v-col cols="12" sm="12">
                <div class="d-flex align-center">
                  <div class="titleText mr-2">Tên thư mục:</div>
                  <v-text-field
                    v-model="nameFolder"
                    solo
                    label="Nhập..."
                    dense
                    hide-details="auto"
                    class="input-form"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col class="test" cols="12" sm="12">
                <div class="wrap-img-file flex-wrap d-flex"></div>
                <div class="d-flex align-center">
                  <div class="titleText mr-2">Thêm ảnh:</div>
                  <v-btn
                    small
                    color="primary"
                    class="btn-form mx-0 text-white"
                    @click="handleClickMultipeFile"
                  >
                    <v-icon size="18">mdi-plus</v-icon>&nbsp; Thêm ảnh
                  </v-btn>
                </div>

                <input
                  type="file"
                  ref="inputMultifilesRef"
                  class="hide-input-file"
                  accept="image/*"
                  @change="handleChangeFile"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions v-if="!showAddImg">
          <v-spacer></v-spacer>
          <v-btn
            small
            depressed
            class="mr-2"
            color="primary"
            @click="handleAddFolder"
          >
            <v-icon left dark size="18">
              mdi-file-document-plus-outline
            </v-icon>
            <span>Xác nhận</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import toastr from "toastr";
import { baseUrl } from "../constant/baseURL";
import axios from "axios";
import { textAuthor } from "../constant/textAuthorView";
import { actionAuthor } from "../constant/actionAuthor";
import { useAccountAuthorization } from "../mixin";

export default {
  props: ["dataEdit", "unitId", "checkActionAddAndUpdate"],

  mixins: [useAccountAuthorization],

  data() {
    return {
      formData: {
        SoDienThoai: this.dataEdit.DanhBaLienLac?.SoDienThoai || "",
        ChungMinhThu: this.dataEdit.ChungMinhThu || "",
        MaSinhVien: this.dataEdit.MaSinhVien || "",
        SoBaoDanh: this.dataEdit.SoBaoDanh || "",
        GioiTinh: this.dataEdit.GioiTinh || "",
        HoVaTen: this.dataEdit.HoVaTen || "",
        MaNhapHoc: this.dataEdit.MaNhapHoc || "",
        SoHoSo: this.dataEdit.SoHoSo || "",
        NgaySinh: this.dataEdit.NgaySinh
          ? moment(this.dataEdit.NgaySinh).format("DD/MM/YYYY")
          : "",
        EmailVNU: this.dataEdit.EmailVNU || "",
        DiaChiThuongTru: this.dataEdit.DiaChiThuongTru?.SoNhaChiTiet || "",
        TinhThanh: this.dataEdit.DiaChiThuongTru?.TinhThanh || "",
        QuanHuyen: this.dataEdit.DiaChiThuongTru?.QuanHuyen || "",
        PhuongXa: this.dataEdit.DiaChiThuongTru?.PhuongXa || "",
        CoQuanDonVi: this.dataEdit.CoQuanDonVi?.MaHanhChinh
          ? {
              TenGoi: this.dataEdit.CoQuanDonVi.TenGoi,
              MaHanhChinh: this.dataEdit.CoQuanDonVi.MaHanhChinh,
            }
          : "",
        MainImageUrl: this.dataEdit?.MainImage?.FileUrl || "",
        TrangThaiTaiKhoan: this.dataEdit?.TrangThaiTaiKhoan || "",
        ThuMucAnh: this.dataEdit?.ThuMucAnh || "",
      },
      validForm: false,
      optionPosition: [],
      optionDistrict: [],
      optionWard: [],
      optionGroups: [],
      showDiglogFile: false,
      checkFile: false,
      idFile: "",
      filename: null,
      checkActionUpload: "",
      showDialogFolder: false,
      optionStatusAccount: [
        { text: "Hoạt động", value: "2" },
        { text: "Không hoạt động", value: "1" },
      ],
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
          return (
            pattern.test(value) || "Định dạng ngày sinh là: ngày/tháng/năm"
          );
        },
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
        idCard: (value) => {
          const pattern = /^[0-9]{9,12}$/;
          // const pattern = /^([0-9]{9})(X|V)$|^([0-9]{11})/gis;
          return pattern.test(value) || "Định dạng sai số CCCD";
        },
      },
      idFolder: "",
      nameFolder: "",
      showAddImg: false,
      toggleShowMenuDate: false,
      date: "",
      listImage: [],
    };
  },

  mounted() {
    console.log("moun");
  },
  created() {
    const vm = this;

    if (vm.dataEdit && vm.dataEdit.MainImage?.FileUrl) vm.checkFile = true;

    vm.checkActionUpload = vm.handleCheckAuthor(
      actionAuthor.CAP_NHAT_ANH_CHO_SV_ALL,
      actionAuthor.CAP_NHAT_ANH_CHO_SV_DV
    );

    if (
      vm.checkActionUpload === textAuthor.ALONE &&
      vm.unitId !== vm.dataEdit.CoQuanDonVi.MaHanhChinh
    ) {
      vm.checkActionUpload = "";
    }

    if (vm.dataEdit.PrimKey) {
      vm.listImage = vm.dataEdit.MainImage.map((item) => item.FileUrl);
      if (vm.dataEdit.DiaChiThuongTru?.TinhThanh.MaMuc)
        vm.getDistrict(vm.dataEdit.DiaChiThuongTru.TinhThanh.MaMuc);
      if (vm.dataEdit.DiaChiThuongTru?.QuanHuyen.MaMuc)
        vm.getWard(vm.dataEdit.DiaChiThuongTru.QuanHuyen.MaMuc);
      if (vm.dataEdit?.ThuMucAnh.length) vm.showAddImg = true;
    }

    console.log(
      "cretate",
      this.dataEdit,
      vm.unitId,
      vm.checkActionUpload,
      vm.dataEdit.PrimKey
    );
  },
  computed: {
    ...mapState(["listAgencies", "listProvince", "listGender"]),
    optionGender() {
      const vm = this;
      const options = vm.listGender.map((item) => ({
        text: item.tenMuc,
        value: { MaMuc: item.maMuc, TenMuc: item.tenMuc },
      }));
      return options;
    },
    optionAgencies() {
      const vm = this;
      let data = vm.listAgencies;
      console.log("Data: ", data, vm.unitId);

      if (vm.checkActionAddAndUpdate === textAuthor.ALONE && vm.unitId) {
        data.filter((item) => item.maHanhChinh === vm.unitId);
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
    checkCondition() {
      const vm = this;
      let status = false;
      if (vm.dataEdit.MaNhapHoc && vm.isAdmin) status = false;
      else if (vm.dataEdit.MaNhapHoc) status = true;
      return status;
    },
  },
  methods: {
    handleAddFolder() {
      const vm = this;
      console.log("props: ", vm.dataEdit);

      const dataPayload = {
        ...vm.dataEdit,
        ThuMucMoi: vm.nameFolder,
      };

      const payload = {
        payload: dataPayload,
        type: "sinhvien",
        id: vm.dataEdit.PrimKey,
      };
      vm.$store
        .dispatch("editItemData", payload)
        .then(function (response) {
          toastr.success("Thêm thư mục thành công");
          vm.showAddImg = true;
          console.log("reps forder", response);
          vm.idFolder = response.data.resp.ThuMucAnh[0].MaThuMuc;
          vm.formData.ThuMucAnh = response.data.resp.ThuMucAnh;
          vm.showAddImg = true;
        })
        .catch(function () {});
    },
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
    validateForm() {
      let vm = this;
      return vm.$refs.formSinhVienRef.validate();
    },
    handleChangeProvince(item) {
      const vm = this;
      vm.optionDistrict = [];
      vm.optionWard = [];
      vm.getDistrict(item.MaMuc);
    },
    hanldeChangeDistrict(item) {
      const vm = this;
      console.log("dis", vm.optionDistrict, item);
      vm.getWard(item.MaMuc);
    },
    handleCloseDialog() {
      const vm = this;
      vm.showDialogFolder = false;
      vm.listImage = [];
    },
    handleOpenDialogAddFile() {
      const vm = this;
      vm.showDialogFolder = true;
      vm.$nextTick(() => {
        const getWrapImgAddFile = vm.$el.querySelector(".wrap-img-file");
        console.log("run here", getWrapImgAddFile);
        if (vm.listImage.length) {
          vm.listImage.forEach((item) => {
            //       const span = document.createElement("span");
            //       const spanChild = document.createElement("span");
            //       span.append(spanChild)
            // span.append(
            //       Object.assign(new Image(), {
            //         src: item,
            //         alt: `${item}-${Math.random()}`,
            //         className: "multipe-image",
            //       })
            //     );

            // getWrapImgAddFile.append(
            //   span
            // )

            // spanChild.addEventListener("click", vm.handleClickRemoveImg)

            getWrapImgAddFile.append(
              Object.assign(new Image(), {
                src: item,
                alt: `${item}-${Math.random()}`,
                className: "multipe-image",
              })
            );
          });
        }
      });
    },

    handleClickRemoveImg() {
      console.log("click span");
    },

    handleChangeFile(e) {
      const vm = this;
      const file = e?.target.files[0];
      const idFileFolder = vm.idFolder || vm.dataEdit?.ThuMucAnh[0].MaThuMuc;
      console.log("file", file, idFileFolder);

      let formData = new FormData();
      formData.append("files", file);
      formData.append("id", vm.dataEdit.PrimKey);
      formData.append("maThuMuc", idFileFolder);

      const payload = {
        type: "album/upload",
        payload: formData,
      };

      vm.$store
        .dispatch("uploadFile", payload)
        .then(function (response) {
          toastr.success("Thêm ảnh thành công");
          // const start = response.data.fullPathUrl.lastIndexOf("/") + 1;
          // const end = response.data.fullPathUrl.lastIndexOf(".");
          // vm.formData.MainImageUrl = response.data.fullPathUrl;
          // vm.idFile = response.data.fullPathUrl.slice(start, end);
          // vm.checkFile = true;

          vm.listImage.push(response.data.fullPathUrl);

         
        })
        .catch(function () {});
    },
    handleViewFile() {
      const vm = this;
      vm.showDiglogFile = true;
    },
    async handleDeleteFile() {
      const vm = this;
      try {
        const config = {
          method: "delete",
          url: `${baseUrl}album/${vm.dataEdit.PrimKey}/attachment/${
            !vm.idFile ? vm.dataEdit.MainImage.Id : vm.idFile
          }`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: {},
          params: {},
        };
        await axios(config);
        vm.filename = null;
        toastr.success("Xóa thành công");
      } catch (error) {
        console.log(error);
      }
      vm.checkFile = false;
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
    handleClickMultipeFile() {
      const vm = this;
      vm.$refs.inputMultifilesRef.click();
    },
  },
  watch: {
    date() {
      const vm = this;
      vm.formData.NgaySinh = vm.formatDate(vm.date);
    },
    listImage(newVal) {
      const getWrapImgAddFileWatch = document.querySelector(".wrap-img-file");
      if (this.listImage.length && getWrapImgAddFileWatch) {
        //  const span = document.createElement("span");
        //     const spanChild = document.createElement("span");
        //       span.append(spanChild)
        // console.log("new watch", newVal, getWrapImgAddFileWatch);
        // span.append(
        //   Object.assign(new Image(), {
        //     src: newVal[newVal.length - 1],
        //     alt: `${newVal[newVal.length - 1]}-${Math.random()}`,
        //     className: "multipe-image",
        //   })
        // );

        // getWrapImgAddFileWatch.append(
        //   span
        // )

        //  spanChild.addEventListener("click", this.handleClickRemoveImg)

        getWrapImgAddFileWatch.append(
          Object.assign(new Image(), {
            src: newVal[newVal.length - 1],
            alt: `${newVal[newVal.length - 1]}-${Math.random()}`,
            className: "multipe-image",
          })
        );
      }
    },
  },
};
</script>

<style>
.style-selected .v-text-field__details {
  display: none;
}
.style-img {
  max-width: 100%;
}

.hide-input-file {
  width: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  top: -1000px;
}

.multipe-image {
  display: inline-block;
  width: 120px;
  height: 120px;
  position: relative;
  margin: 0 8px 10px 8px;
}
.multipe-image:first-child {
  margin-left: 0;
}
.multipe-image:last-child {
  margin-right: 0;
}
.wrap-img-file > span {
  position: relative;
}
.wrap-img-file > span > span {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 24px;
  z-index: 1;
  cursor: pointer;
}
.wrap-img-file > span > span::after {
  content: "\2716";
  font-size: 14px;
  color: white;
}
</style>