<template>
  <v-form
    class="dialog-body"
    ref="formCamNangHoaLacRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Tên cẩm nang: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TenCamNang"
          solo
          label="Nhập tên cẩm nang..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Tiêu đề cẩm nang: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TieuDe"
          solo
          label="Nhập tiêu đề cẩm nang..."
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
          Chuyên mục cẩm nang: <span style="color: red">*</span>
        </div>
        <v-autocomplete
          v-model="formData.MddChuyenMuc"
          class="flex input-form"
          hide-no-data
          :items="getOptionTypeHandBook"
          @change="handleChange"
          item-text="name"
          item-value="value"
          placeholder="Chọn chuyên mục"
          dense
          solo
          hide-details="auto"
          return-object
          clearable
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Tóm tắt:</div>
        <v-textarea
          solo
          v-model="formData.TomTat"
          label="Nhập tóm tắt..."
          hide-details="auto"
          required
          class="flex input-form"
          rows="5"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Ảnh đại diện:</div>
        <v-flex>
          <img
            style="height: 200px; max-width: 100%"
            v-if="formData.AnhDaiDien"
            :src="formData.AnhDaiDien"
            alt=""
          />
        </v-flex>
        <v-flex class="mt-2">
          <v-file-input
            class="flex input-form"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon=""
            prepend-inner-icon="mdi-cloud-upload-outline"
            @change="handleChangeFile"
            label="Chọn ảnh đại diện"
            solo
            dense
          ></v-file-input>
        </v-flex>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Mục lục: <span style="color: red">*</span>
        </div>
        <v-row class="mb-2" v-for="(item, index) of arrData" :key="index">
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item['SoThuTu']"
              :rules="[rules.required, rules.number]"
              solo
              label="Nhập số thứ tự..."
              dense
              hide-details="auto"
              required
              class="flex input-form"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item['SoTrang']"
              :rules="[rules.required, rules.number]"
              solo
              label="Nhập số trang..."
              dense
              hide-details="auto"
              required
              class="flex input-form"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="item['TenDauMuc']"
              :rules="[rules.required]"
              solo
              label="Nhập tên đầu mục..."
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
          <v-icon size="18">mdi-plus</v-icon>&nbsp; Thêm mục lục
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Nội dung: <span style="color: red">*</span>
        </div>
        <v-row
          class="mb-2"
          v-for="(item, index) of arrDataContent"
          :key="index"
        >
          <v-col
            cols="12"
            sm="3"
            class="mx-0 my-0"
            v-if="arrUrl[index] || item.Attachment"
          ></v-col>
          <v-col cols="12" sm="9" v-if="arrUrl[index] || item.Attachment">
            <v-flex>
              <img
                style="height: 100px; max-width: 100%"
                :src="arrUrl[index] || item.Attachment"
                alt=""
              />
            </v-flex>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item['SoTrang']"
              :rules="[rules.required]"
              solo
              label="Nhập số thứ tự..."
              dense
              hide-details="auto"
              required
              class="flex input-form"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="8">
            <v-file-input
              class="flex input-form"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon=""
              prepend-inner-icon="mdi-cloud-upload-outline"
              @change="handleChangeFileContent"
              label="Chọn ảnh đại diện"
              solo
              dense
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="1" class="d-flex align-center">
            <span
              class="titleText btn-close"
              @click="handleRemoveItem(item, 'content')"
              >X</span
            >
          </v-col>
        </v-row>
        <v-btn
          small
          color="primary"
          class="btn-form mx-0 margin-bottom-86 text-white"
          @click="addField('content')"
        >
          <v-icon size="18">mdi-plus</v-icon>&nbsp; Thêm nội dung
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import toastr from "toastr";
export default {
  props: ["dataEdit"],
  data() {
    return {
      formData: {
        TenCamNang: "",
        AnhDaiDien: "",
        MucLuc: "",
        NoiDung: "",
        TieuDe: "",
        TomTat: "",
        MaChuyenMuc: "",
        TenChuyenMuc: "",
        MddChuyenMuc: "",
      },
      arrUrl: [],
      validForm: false,
      arrRender: [],
      arrData: [
        {
          SoThuTu: "",
          TenDauMuc: "",
          SoTrang: "",
        },
      ],
      arrDataContent: [{ id: Math.random(), SoTrang: "", Attachment: "" }],
      rules: {
        required: (value) => !!value || "Không được để trống.",
        number: (value) => {
          const pattern = /^(?:[1-9]\d*|\d)$/;
          return pattern.test(value) || "Trường này phải nhập số";
        },
      },
      listTypeHandBook: [],
    };
  },

  mounted() {},
  created() {
    const vm = this;

    console.log("cretate", this.dataEdit);

    vm.getTypeHandBook({ danhMuc_maDanhMuc: "CHUYENMUCCAMNANG" });

    if (vm.dataEdit?.MucLuc) vm.arrData = vm.dataEdit?.MucLuc;
    if (vm.dataEdit?.NoiDung) {
      vm.arrDataContent = vm.dataEdit?.NoiDung;
      vm.arrUrl = vm.dataEdit?.NoiDung.map((item) => item.Attachment);
      console.log("create1: ", vm.arrUrl);
    }
  },
  computed: {
    getOptionTypeHandBook() {
      const vm = this;
      const option = vm.listTypeHandBook.map((item) => ({
        name: item.TenMuc,
        value: item.MaDinhDanh,
      }));
      return option;
    },
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formCamNangHoaLacRef.validate();
    },
    getTypeHandBook(dataParam) {
      let vm = this;
      vm.loadingData = true;
      const dataPayload = {
        page: 0,
        size: 20,
      };
      const filter = {
        collectionName: "dulieudanhmuc",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          console.log("res: ", response);
          vm.listTypeHandBook = response.content;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    handleChangeFile(value) {
      const vm = this;

      console.log("value: ", value);

      if (value) {
        let formData = new FormData();
        formData.append("files", value);
        const payload = {
          type: "camnang/upload",
          payload: formData,
        };

        vm.$store
          .dispatch("uploadFile", payload)
          .then(function (response) {
            const url = response.data.fullPath;
            vm.formData.AnhDaiDien = url;
            console.log("res: ", response);
          })
          .catch(function () {
            toastr.error("Upload không thành công");
          });
      } else {
        vm.formData.AnhDaiDien = "";
        toastr.error("Upload không thành công");
      }
    },
    handleChangeFileContent(value) {
      const vm = this;
      if (value) {
        let formData = new FormData();
        formData.append("files", value);
        const payload = {
          type: "camnang/upload",
          payload: formData,
        };

        vm.$store
          .dispatch("uploadFile", payload)
          .then(function (response) {
            const url = response.data.fullPath;
            vm.arrUrl = [...vm.arrUrl, url];
            console.log("res: ", response, vm.arrUrl);
          })
          .catch(function () {
            toastr.error("Upload không thành công");
          });
      } else {
        vm.formData.AnhDaiDien = "";
        toastr.error("Upload không thành công");
      }
    },
    handleRemoveItem(param, type) {
      const vm = this;
      if (!type) {
        vm.arrData = vm.arrData.filter((_, idx) => idx !== param);
      } else {
        let index;
        vm.arrDataContent = vm.arrDataContent.filter((el, idx) => {
          if (param.id === el.id) index = idx;
          return param.id !== el.id;
        });
        vm.arrUrl = vm.arrUrl.filter((_, idx) => idx !== index);
        console.log("remove", index, param, vm.arrUrl);
      }
    },
    addField(type) {
      const vm = this;
      if (type !== "content") {
        vm.arrData.push({
          SoThuTu: "",
          TenDauMuc: "",
          SoTrang: "",
        });
      } else {
        const idItem = Math.random();
        vm.arrDataContent.push({ id: idItem, SoTrang: "", Attachment: "" });
      }
    },
    handleChange(value) {
      const vm = this;
      const data = vm.listTypeHandBook.filter(
        (item) => item.MaDinhDanh === value.value
      );
      vm.formData.TenChuyenMuc = data[0].TenMuc;
      vm.formData.MaChuyenMuc = data[0].PrimKey;
      console.log("value: ", vm.listTypeHandBook, value);
    },
  },
};
</script>

<style scoped>
.btn-close {
  cursor: pointer;
}
.margin-bottom-86 {
  margin-bottom: 86px;
}
</style>