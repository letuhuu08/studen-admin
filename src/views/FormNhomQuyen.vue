<template>
  <v-form
    class="dialog-body"
    ref="formPhanQuyenCanBoRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên nhóm Quyền: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TenNhomQuyen"
          solo
          :disabled="dataEdit.MaSoCanBo ? true : false"
          label="Nhập tên nhóm quyền..."
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
          Chức năng: <span style="color: red">*</span>
        </div>
        <v-autocomplete
          v-model="formData.ChucNang"
          :items="listUses"
          chips
          label="Chọn nhóm quyền"
          multiple
          solo
          hide-details="auto"
          required
          class="flex input-form custom-set-height-tag-select"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tình trạng: <span style="color: red">*</span>
        </div>
        <v-select
          v-model="formData.TinhTrang"
          :items="optionStatus"
          label="Chọn"
          dense
          solo
          hide-details="auto"
          required
          class="flex input-form"
        ></v-select>
      </v-col>
    </v-row> -->
  </v-form>
</template>

<script>
export default {
  props: ["dataEdit"],
  data() {
    return {
      formData: {
        TenNhomQuyen: this.dataEdit.TenNhomQuyen || "",
        TinhTrang: "2",
        ChucNang: this.dataEdit.ChucNang || [],
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
    console.log("moun", vm);

    const getSelected = vm.$el.querySelector(
      ".custom-set-height-tag-select > .v-input__control > div"
    );

    if (getSelected.offsetHeight < 200) {
      console.log("run here");
      Object.assign(getSelected.style, {
        maxHeight: "none",
        overflowY: "auto",
      });
    }

  },
  created() {
    const vm = this;
    vm.getUeses();
    console.log("cretate", this.dataEdit);
  },
  computed: {},
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formPhanQuyenCanBoRef.validate();
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