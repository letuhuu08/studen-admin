<template>
  <v-form
    class="pa-4"
    ref="formGopyRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12" class="pb-0">
        <div class="mb-2">
          <span class="titleText">Nội dung góp ý: </span>
          <span>{{formData.NoiDung}}</span>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="titleText mb-2">
          Tình trạng công khai: <span style="color: red">*</span>
        </div>
        <v-select
          :rules="[rules.required]"
          v-model="formData.CongKhai"
          :items="optionStatus"
          label="Chọn"
          dense
          solo
          hide-details="auto"
          required
          class="flex input-form"
        ></v-select>
      </v-col>
      <v-col cols="12" class="pb-0">
        <div class="titleText mb-2">Nội dung trả lời:</div>
        <v-textarea
          v-model="formData.TraLoi"
          solo
          label="Nhập câu trả lời..."
          hide-details="auto"
          required
          class="flex input-form"
          rows="7"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <div class="titleText mb-2">Tệp đính kèm câu trả lời:</div>
        <div v-if="formData.fileAnswerUrl" class="mb-2">
          <span @click="handleViewFile" style="color: #2161b1; text-decoration: underline; cursor: pointer;">
            {{formData.fileAnswerUrl | fileName}}
          </span>
          <v-tooltip top class="ml-2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click.stop="handleDeleteFile(item)" color="red" text icon class="" v-bind="attrs" v-on="on">
                <v-icon size="18">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Xóa</span>
          </v-tooltip>
        </div>
        <v-file-input
         class="flex input-form"
          prepend-icon=""
          prepend-inner-icon="mdi-cloud-upload-outline"
          @change="handleChangeFile"
          label="Chọn tệp đính kèm..."
          solo
          dense
        ></v-file-input>
      </v-col>
    </v-row>
    <v-dialog v-model="showDiglogFile" persistent fullscreen>
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
                  <img :src="formData.fileAnswerUrl" alt="" class="style-img" />
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
import toastr from "toastr";
export default {
  props: ["dataEdit"],
  data() {
    return {
      formData: {
        TinhTrang: this.dataEdit.TinhTrang || "",
        SinhVien: this.dataEdit.SinhVienMdd || "",
        NguoiTraLoi: this.dataEdit.TraLoi?.NguoiTraLoi || "",
        TraLoi: this.dataEdit.TraLoi?.NoiDung || "",
        NoiDung: this.dataEdit.NoiDung || "",
        fileFeedbackName: this.dataEdit.Attachment?.FileName || "",
        fileFeedbackUrl: this.dataEdit.Attachment?.FileUrl || "",
        fileAnswerUrl: this.dataEdit.TraLoi.Attachment?.FileUrl || "",
        CongKhai: this.dataEdit.CongKhai || ""
      },
      optionStatus: [
        { text: "Công khai", value: "1" },
        { text: "Không công khai", value: "0" },
      ],
      showDiglogFile: false,
      optionCadres: [],
      optionStudnets: [],
      validForm: false,
      checkFileImgAnswer: true,
      typeFile: "",
      hideBtnDeleteFile: true,
      rules: {
        required: (value) => !!value || "Không được để trống.",
        file: (value) =>
          !value || value.size < 2000000 || "Kich thước fle nhỏ hơn 2MB",
      },
    };
  },

  mounted() {
   
  },
  created() {
    const vm = this;
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    vm.checkFileImgAnswer = regex.test(vm.dataEdit.TraLoi.Attachment?.FileName);
    vm.hideBtnDeleteFile = vm.dataEdit.TraLoi.Attachment?.FileName
      ? true
      : false;
   
  },
  methods: {
    getList(collectionName) {
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
      const filter = {
        collectionName,
        data: dataPayload,
      };
      vm.$store.dispatch("collectionFilter", filter).then(function (response) {
        const responseData = response.content;
        if (collectionName === "canbo") {
          vm.optionCadres = responseData.map((item) => ({
            text: item.HoVaTen,
            value: item.MaDinhDanh,
          }));
        } else {
          vm.optionStudnets = responseData.map((item) => ({
            text: item.HoVaTen,
            value: item.MaDinhDanh,
          }));
        }
      });
    },
    validateForm() {
      let vm = this;
      return vm.$refs.formGopyRef.validate();
    },
    handleChangeFile(value) {
      const vm = this;
      vm.$emit("emitDataFile", value);
    },
    handleViewFile(type) {
      const vm = this;
      vm.showDiglogFile = true;
      vm.typeFile = type;
    },
    handleDeleteFile() {
      const vm = this;
      toastr.success("Xóa thành công");
      vm.$emit("emitDataFile", "delete file");
      vm.hideBtnDeleteFile = false;
    },
  },
  filters: {
    fileName: function (value) {
      if (!value) return ''
      let val = value.toString().split('/')
      return val[val.length -1]
    }
  }
};
</script>

<style>
.style-img {
  max-width: 100%;
}
.style-tag-link {
  color: #fff !important;
  text-decoration: none;
}
.pointer {
  cursor: pointer;
}
</style>
