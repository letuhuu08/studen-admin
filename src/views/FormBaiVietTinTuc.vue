<template>
  <v-form
    class="dialog-body"
    ref="formBaiVietTinTucRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row class="mt-0">
      <v-col cols="12" sm="12" class="py-0">
        <div class="titleText mb-2">Chuyên mục:</div>
        <v-select
          v-model="formData.ChuyenMuc"
          :items="optionCategoryNews"
          label="Chọn chuyên mục..."
          dense
          solo
          multiple
          class="flex input-form"
          hide-details="auto"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên bài viết: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TenBaiViet"
          solo
          label="Nhập tên bài viết..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" class="pb-0">
        <div class="titleText mb-2">Ảnh đại diện:</div>

        <v-flex>
          <img
            style="height: 200px"
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

        <!-- <div
          class="note italic pointer"
          @click="handleViewAvatar"
          v-if="formData.AnhDaiDien"
        >
          Nhấn để xem ảnh
        </div> -->
      </v-col>
    </v-row>

    <v-row
      class="mt-0"
      v-if="formData.DuongDanRutGon && formData.DuongDanRutGon !== 'default'"
    >
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Đường dẫn bài viết: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.DuongDanRutGon"
          solo
          label="Nhập tên bài viết..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Mô tả:</div>
        <v-textarea rows="4" class="flex input-form"></v-textarea>
        <!-- <v-text-field
          v-model="formData.MoTa"
          solo
          label="Nhập mô tả..."
          dense
          hide-details="auto"
          class="flex input-form"
        ></v-text-field> -->
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Nội dung bài viết: <span style="color: red">*</span>
        </div>
        <VueEditor
          v-model="formData.NoiDungBaiViet"
          useCustomImageHandler
          @image-added="imageHandler"
          :height="300"
        />
      </v-col>
      <v-col cols="12">
        <div class="titleText mb-2">
          Tình trạng: <span style="color: red">*</span>
        </div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          :items="listTinhTrang"
          v-model="formData.TinhTrang"
          item-text="name"
          item-value="value"
          dense
          solo
          hide-details="auto"
          clearable
          placeholder="Tình trạng"
          required
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="12" v-if="formData.TinhTrang == 2">
        <div class="titleText mb-2">Ngày hủy xuất bản:</div>
        <v-text-field
          v-model="formData.NgayHuyXuatBan"
          solo
          label="Nhập ngày hủy xuất bản..."
          dense
          hide-details="auto"
          required
          class="flex input-form"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- 
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Cơ quan, đơn vị:</div>
        <v-select
          v-model="formData.CoQuanDonVi"
          :items="optionAgencies"
          label="Chọn"
          dense
          solo
        ></v-select>
      </v-col>
    </v-row> -->

    <v-dialog v-model="showAvatar" persistent fullscreen>
      <v-card>
        <v-toolbar class="px-3">
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="showAvatar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <div>
                  <img class="style-img" :src="formData.AnhDaiDien" alt="" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import moment from "moment";
import toastr from "toastr";
import { slug } from "../constant/convertSlug";
import { VueEditor } from "vue2-editor";
export default {
  props: ["dataEdit"],
  components: {
    VueEditor,
  },
  data() {
    return {
      formData: {
        DuongDanRutGon: this.dataEdit.DuongDanRutGon || "default",
        TenBaiViet: this.dataEdit.TenBaiViet || "",
        AnhDaiDien: this.dataEdit.AnhDaiDien || "",
        NgayXuatBan: this.dataEdit.NgayXuatBan
          ? moment(this.dataEdit.NgayXuatBan).format("DD/MM/YYYY")
          : "",
        // CoQuanDonVi: this.dataEdit.CoQuanDonVi?.MaHanhChinh || "",
        NoiDungBaiViet: this.dataEdit.NoiDungBaiViet || "",
        MoTa: this.dataEdit.MoTa || "",
        TinhTrang: this.dataEdit.TinhTrang || "0",
        ChuyenMuc: this.dataEdit.ChuyenMuc?.length
          ? this.dataEdit.ChuyenMuc.map((item) => item.MaDinhDanhChuyenMuc)
          : [],
      },
      showAvatar: false,
      optionAgencies: [],
      optionCategoryNews: [],
      validForm: false,
      linkImg: "",
      rules: {
        required: (value) => !!value || "Không được để trống.",
        date: (value) => {
          const pattern =
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          return pattern.test(value) || "Định dạng ngày là: dd/mm/yyyy";
        },
        file: (value) =>
          !value || value.size < 2000000 || "Kich thước fle nhỏ hơn 2MB",
      },
      listTinhTrang: [
        { name: "Bản nháp", value: "0" },
        { name: "Ngừng xuất bản", value: "1" },
        { name: "Xuất bản", value: "2" },
      ],
    };
  },

  mounted() {
    // console.log("moun");
  },
  created() {
    const vm = this;
    vm.getList("coquandonvi");
    vm.getList("chuyenmuctintuc", { NgayTaoFrom: 0, NgayTaoTo: 0 });
    // console.log("cretate", this.dataEdit);
  },
  methods: {
    getList(collectionName, data) {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 200,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName,
        data: !data ? dataPayload : { ...dataPayload, ...data },
      };
      vm.$store.dispatch("collectionFilter", filter).then(function (response) {
        const responseData = response.content;
        if (collectionName === "coquandonvi") {
          vm.$emit("emitDataAgencies", responseData);
          vm.optionAgencies = responseData.map((item) => ({
            text: item.tenGoi,
            value: item.maHanhChinh,
          }));
        } else {
          vm.$emit("emitDataCategoryNews", responseData);
          vm.optionCategoryNews = responseData.map((item) => ({
            text: item.TenChuyenMuc,
            value: item.MaDinhDanh,
          }));
        }
      });
    },
    validateForm() {
      let vm = this;
      return vm.$refs.formBaiVietTinTucRef.validate();
    },
    handleChangeFile(value) {
      const vm = this;

      if (value) {
        let formData = new FormData();
        formData.append("file", value);
        const payload = {
          type: "baiviettintuc/upload",
          payload: formData,
        };

        vm.$store
          .dispatch("uploadFile", payload)
          .then(function (response) {
            const url = response.data.resp.fullPath;
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
    handleChangeTitle(value) {
      const vm = this;
      const slugString = slug(value);
      vm.formData.DuongDanRutGon = slugString;
    },
    handleViewAvatar() {
      const vm = this;
      vm.showAvatar = true;
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const vm = this;

      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        const payload = {
          type: "baiviettintuc/upload",
          payload: formData,
        };

        vm.$store
          .dispatch("uploadFile", payload)
          .then(function (response) {
            const url = response.data.resp.fullPath;
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
            console.log("res: ", response);
          })
          .catch(function () {});
      }
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>