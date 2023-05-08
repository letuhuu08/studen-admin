<template>
  <v-form
    class="dialog-body"
    ref="formBanDoRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên loại bản đồ: <span style="color: red">*</span>
        </div>
        <v-text-field
         class="flex input-form"
          :rules="[rules.required]"
          v-model="formData.TenLoaiBanDo"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Mã icon:</div>
         <v-autocomplete
          v-model="formData.MaIcon"
          :items="optionListIdIcon"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Tình trạng:</div>
        <v-autocomplete
         class="flex input-form"
          :items="optionStatus"
          v-model="formData.TinhTrang"
          label="Chọn"
          dense
          solo
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Số thứ tự:</div>
        <v-text-field
         class="flex input-form"
          solo
          v-model="formData.SoThuTu"
          label="Nhập số thứ tự..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {listIdIcon} from "../constant/listIconId"
export default {
  props: ["dataEdit"],

  data() {
    return {
      formData: {
        TenLoaiBanDo: this.dataEdit?.TenLoaiBanDo || "",
        MaIcon: this.dataEdit?.MaIcon || "",
        SoThuTu: this.dataEdit?.SoThuTu || "",
        TinhTrang: this.dataEdit?.TinhTrang?.TenMuc || "",
      },
      validForm: false,
      optionStatus: [{ text: "Hoạt động", value: "01" }],
      rules: {
        required: (value) => !!value || "Không được để trống.",
      },
    };
  },

  mounted() {
    console.log("moun");
  },
  created() {
    const vm = this;

    console.log("cretate", this.dataEdit);
  },
  computed: {
     optionListIdIcon() {
      const option = listIdIcon.map(item=>({text: item, value: item}))
      return option
    }
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formBanDoRef.validate();
    },
  },
};
</script>

<style>
</style>