<template>
  <v-form
    class="dialog-body"
    ref="formKhuVucRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên khu vực: <span style="color: red">*</span>
        </div>
        <v-text-field
          class="flex input-form"
          :rules="[rules.required]"
          v-model="formData.TenKhuVuc"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Kinh độ: <span style="color: red">*</span>
        </div>
        <v-text-field
          class="flex input-form"
          :rules="[rules.required, rules.number]"
          v-model="formData.KinhDo"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Vĩ độ: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required, rules.number]"
          class="flex input-form"
          solo
          v-model="formData.ViDo"
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
export default {
  props: ["dataEdit"],

  data() {
    return {
      formData: {
        TenKhuVuc: this.dataEdit?.TenKhuVuc || "",
        KinhDo: this.dataEdit?.ToaDo?.Longitude || "",
        ViDo: this.dataEdit?.ToaDo?.Latitude || "",
      },
      validForm: false,
      optionStatus: [{ text: "Hoạt động", value: "01" }],
      rules: {
        required: (value) => !!value || "Không được để trống.",
        number: (value) => {
          const pattern = /^\d+(\.\d{1,20})?$/;
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

    console.log("cretate", this.dataEdit);
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formKhuVucRef.validate();
    },
  },
};
</script>

<style>
</style>