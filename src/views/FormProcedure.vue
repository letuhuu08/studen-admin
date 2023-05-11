<template>
  <v-form
    class="dialog-body"
    ref="formThuTucRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên thủ tục: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TenThuTuc"
          solo
          :disabled="dataEdit.MaSoCanBo ? true : false"
          label="Nhập tên thủ tục..."
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
          Mô tả: <span style="color: red">*</span>
        </div>
        <VueEditor
          v-model="formData.MoTa"
          useCustomImageHandler
          @image-added="imageHandler"
          :height="300"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: ["dataEdit"],
  components: {
    VueEditor,
  },
  data() {
    return {
      formData: {
        TenThuTuc: this.dataEdit.TenThuTuc || "",
        MoTa: this.dataEdit.MoTa || "",
      },
      listUses: [],
      validForm: false,
      optionStatus: [
        { text: "Hoạt động", value: "2" },
        { text: "Không hoạt động", value: "1" },
      ],
      rules: {
        required: (value) => !!value || "Không được để trống.",
      },
    };
  },

  mounted() {
    const vm = this;
    
  },
  created() {
    const vm = this;
    vm.getUeses();
    
  },
  computed: {},
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formThuTucRef.validate();
    },
    getUeses() {
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
        collectionName: "vaitrosudung",
        data: dataPayload,
      };
      vm.$store.dispatch("collectionFilter", filter).then(function (response) {
        const responseData = response.content;
        vm.$emit("emitDataUses", responseData);
        vm.listUses = responseData.map((item) => ({
          text: item.tenMuc,
          value: item.maMuc,
        }));
      });
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
           
          })
          .catch(function () {});
      }
    },
  },
};
</script>

<style>
.custom-set-height-tag-select > .v-input__control > div {
  max-height: 200px !important;
  overflow-y: scroll;
}
.custom-set-height-tag-select
  > .v-input__control
  > div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.custom-set-height-tag-select > .v-input__control > div::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

.custom-set-height-tag-select
  > .v-input__control
  > div::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #555555;
}
</style>