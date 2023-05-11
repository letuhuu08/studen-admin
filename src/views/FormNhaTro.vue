<template>
  <v-form
    class="dialog-body"
    ref="formNhaTroRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên chủ nhà: <span style="color: red">*</span>
        </div>

        <v-autocomplete
          :rules="[rules.required]"
          v-model="formData.MddNhaTro"
          :items="options"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Giá tiền (Đơn vị: VNĐ): <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required, rules.decimal]"
          solo
          v-model="formData.GiaTien"
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form custom-input-number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Diện tích (Đơn vị: m2): <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required, rules.acreage]"
          solo
          v-model="formData.DienTichPhong"
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form custom-input-number"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Thiết bị trong phòng: <span style="color: red">*</span>
        </div>
        <v-row class="mb-2" v-for="(item, index) of arrData" :key="index">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="item['TenThietBi']"
              :rules="[rules.required]"
              solo
              label="Nhập tên thiết bị..."
              dense
              hide-details="auto"
              required
              class="flex input-form"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item['SoLuong']"
              :rules="[rules.required, rules.number]"
              solo
              label="Số thiết bị..."
              dense
              hide-details="auto"
              required
              class="flex input-form"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="1" class="d-flex align-center">
            <span class="titleText btn-close" @click="handleRemoveItem(index)"
              >X</span
            >
          </v-col>
        </v-row>
        <v-btn
          small
          color="primary"
          class="btn-form mx-0 margin-bottom-86 text-white"
          @click="addField"
        >
          <v-icon size="18">mdi-plus</v-icon>&nbsp; Thêm thiết bị
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Ngày đăng: <span style="color: red">*</span>
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
              :rules="[rules.required, rules.date]"
              clearable
              v-model="formData.NgayDang"
              label="Nhập ngày đăng dd/mm/yyyy ..."
              persistent-hint
              prepend-icon=""
              v-bind="attrs"
              @blur="date = parseDate(formData.NgayDang)"
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
    </v-row>

    <v-row v-if="dataEdit.PrimKey">
      <v-col cols="12" sm="12">
        <div class="wrap-image d-flex flex-wrap"></div>
        <div class="d-flex align-center">
          <div class="titleText mr-2">
            Hình ảnh: <span style="color: red">*</span>
          </div>
          <v-btn
            small
            color="primary"
            class="btn-form mx-0 text-white"
            @click="handleClickMultipeFile"
          >
            <v-icon size="18">mdi-note</v-icon>&nbsp; Chọn files
          </v-btn>
        </div>

        <input
          type="file"
          multiple
          ref="inputMultifilesRef"
          class="hide-input-file"
          accept="image/*"
          @change="handleChangeMultipeFile"
        />
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Địa chỉ: <span style="color: red">*</span>
        </div>
        <v-text-field
          v-model="formData.DiaChi"
          :rules="[rules.required, rules.checkDoubleDataAddress]"
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
      <v-col cols="12" sm="4">
        <div class="titleText mb-2">Tỉnh/thành:</div>
        <v-select
          @change="handleChangeProvince"
          :items="getListProvince"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="titleText mb-2">Quận/huyện:</div>
        <v-select
          :items="getListDistrict"
          @change="handleChangeDistrict"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="titleText mb-2">Phường/xã:</div>
        <v-select
          :items="listWards"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
      </v-col>
    </v-row> -->
  </v-form>
</template>

<script>
import toastr from "toastr";
import moment from "moment";

export default {
  props: ["dataEdit", "listMotelInforData"],

  data() {
    return {
      formData: {
        MddNhaTro: this.dataEdit?.NhaTro?.MddChuNha || "",
        GiaTien: this.dataEdit.GiaTien || "",
        NgayDang: this.dataEdit.NgayDang
          ? moment(this.dataEdit.NgayDang).format("DD/MM/YYYY")
          : "",
        DienTichPhong: this.dataEdit.DienTichPhong || "",
      },
      rules: {
        required: (value) => !!value || "Không được để trống.",
        number: (value) => {
          const pattern = /^(?:[1-9]\d*|\d)$/;
          return pattern.test(value) || "Trường này phải nhập số";
        },
        decimal: (value) => {
          const pattern = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
          return pattern.test(value) || "Dữ liệu không hợp lệ";
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
        acreage: (value) => {
           const pattern = /^(\d*([.,](?=\d{1}))?\d+)+((?!\2)[.,]\d\d)?$/;
          return pattern.test(value) || "Dữ liệu không hợp lệ";
        },
        date: (value) => {
          const pattern =
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          let status;
          if (!value) {
            status = true;
          } else {
            status = pattern.test(value) || "Định dạng ngày là: ngày/tháng/năm";
          }
          return status;
        },
      },
      validForm: false,
      listProvince: [],
      listDistrict: [],
      listWards: [],
      arrData: [
        {
          TenThietBi: "",
          SoLuong: "",
        },
      ],
      files: null,
      toggleShowMenuDate: false,
      date: "",
    };
  },

  mounted() {
    const vm = this;
  
    if (vm.dataEdit.PrimKey) vm.handleBindFiles();
  },
  created() {
    const vm = this;

    vm.getListDataAddress("tinhthanh", { tinhTrang: "1" });

    if (vm.dataEdit.PrimKey) {
      vm.arrData = JSON.parse(vm.dataEdit?.ThietBi);
      vm.files = vm.dataEdit.MainImage;
    }
  },

  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formNhaTroRef.validate();
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
       
        });
    },
    handleChangeProvince(item) {
      const vm = this;
      vm.listDistrict = [];
      vm.listWards = [];
      const provinceCode = vm.listProvince.filter(
        (province) => province.PrimKey === item
      )[0]?.maMuc;
    
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
    handleBindFiles() {
      const vm = this;

      const getWrapImage = vm.$el.querySelector(".wrap-image");

      const previews = vm.files.map((file) => {
        const span = document.createElement("span");
        span.append(
          Object.assign(new Image(), {
            src: !file?.FileUrl ? URL.createObjectURL(file) : file?.FileUrl,
            alt: file.name || "",
            className: "img__uploadedFile",
          })
        );

        span.classList.add("multipe-image");
        span.setAttribute("nameFile", file.name);

        return span;
      });
      getWrapImage.append(...previews);
    },
    handleChangeMultipeFile(e) {
      const vm = this;

      const files = e?.target.files;
      

      const totalFiles = vm.files.length + files?.length;

      if (totalFiles <= 4) {
        const getWrapImage = vm.$el.querySelector(".wrap-image");

        const listFile = [...files];

        // if (files && !vm.files) {
        //   listFile = [...files];
        // } else if (!files && vm.files) {
        //   listFile = vm.files;
        // } else {
        //   listFile = [...files, ...vm.files];
        // }

        const previews = listFile.map((file) => {
          const span = document.createElement("span");
          span.append(
            Object.assign(new Image(), {
              src: !file?.FileUrl ? URL.createObjectURL(file) : file?.FileUrl,
              alt: file.name || "",
              className: "img__uploadedFile",
            })
          );

          span.classList.add("multipe-image");
          span.setAttribute("nameFile", file.name);

          let formData = new FormData();
          formData.append("files", file);
          formData.append("id", vm.dataEdit.PrimKey);
          const payload = {
            type: "album/uploadPhongTro",
            payload: formData,
          };

          vm.$store
            .dispatch("uploadFile", payload)
            .then(function (response) {
             
            })
            .catch(function () {
              toastr.error("Upload không thành công");
            });

          return span;
        });
        getWrapImage.append(...previews);
      } else {
        toastr.error("Chỉ được chọn tối đa 4 ảnh");
      }
    },
    removeFile(file) {
      const vm = this;
      const getImgItem = vm.$el.querySelectorAll(".multipe-image");
      let cloneNodeListImgItemtoArray = [...getImgItem];

      for (const element of getImgItem) {
        if (file.name === element.getAttribute("namefile")) {
          element.remove();
          cloneNodeListImgItemtoArray = cloneNodeListImgItemtoArray.filter(
            (item) => file.name !== item.getAttribute("namefile")
          );
          break;
        }
      }

      vm.files = [...cloneNodeListImgItemtoArray];

      if (!cloneNodeListImgItemtoArray.length) vm.files = null;

   
    },
    handleClickMultipeFile() {
      const vm = this;
      vm.$refs.inputMultifilesRef.click();
    },
    addField() {
      const vm = this;

      vm.arrData.push({
        TenThietBi: "",
        SoLuong: "",
      });
    },
    handleRemoveItem(param) {
      const vm = this;
      vm.arrData = vm.arrData.filter((_, idx) => idx !== param);
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
    options() {
      const vm = this;
      const options = vm.listMotelInforData.map((item) => ({
        text: item.TenChuNha,
        value: item.MaDinhDanh,
      }));
      return options;
    },
  },
  watch: {
    date() {
      const vm = this;
      vm.formData.NgayDang = vm.formatDate(vm.date);
    },
  },
};
</script>

<style>
.custom-input-number input::-webkit-outer-spin-button,
.custom-input-number input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.custom-input-number input[type="number"] {
  -moz-appearance: textfield;
}
.multipe-image {
  display: inline-block;
  width: 220px;
  height: 220px;
  position: relative;
  margin: 0 8px 10px 8px;
}
.multipe-image:first-child {
  margin-left: 0;
}
.multipe-image:last-child {
  margin-right: 0;
}
.img__uploadedFile {
  width: 100%;
  object-fit: cover;
}
.hide-input-file {
  width: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  top: -1000px;
}
.btn-close {
  cursor: pointer;
}
</style>
