<template>
  <v-form
    class="dialog-body"
    ref="formPublicDateHandBookRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Ngày xuất bản: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.birthday, rules.checkDatePresent, rules.required]"
          v-model="formData.NgayXuatBan"
          solo
          label="Nhập ngày xuất bản..."
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
         Ngày hủy xuất bản:
        </div>
       <v-text-field
          :rules="[rules.birthday]"
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

  </v-form>
</template>

<script>
import moment from "moment";
export default {
  props: ["dataItem"],
  data() {
    return {
      formData: {
      NgayXuatBan: this.dataItem.NgayXuatBan ? moment(this.dataItem.NgayXuatBan).format("DD/MM/YYYY") : moment(new Date).format('DD/MM/YYYY'),
      NgayHuyXuatBan: this.dataItem.NgayHuyXuatBan ? moment(this.dataItem.NgayHuyXuatBan).format("DD/MM/YYYY") : "",
      TrangThai: "2"
      },
      validForm: false,
      rules: {
        required: (value) => !!value || "Không được để trống.",
            birthday: (value) => {
          const pattern =
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            if(!value) return true 
          return  pattern.test(value) || "Định dạng ngày sinh là: ngày/tháng/năm";
        },
        checkDatePresent: (value) =>{
          let status = true
          const getDatePresent = moment(moment(new Date()).format('DD/MM/YYYY'), "DD/MM/YYYY").valueOf();
          const getDateInput = moment(value, "DD/MM/YYYY").valueOf();
          const result = getDatePresent - getDateInput
          if (result > 0) status = false
          return status || `Ngày xuất bản không được trước ngày ${moment(new Date(), "DD/MM/YYYY").format("DD/MM/YYYY")}`
        }
      },
    };
  },

  mounted() {
  
  },
  created() {
    
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formPublicDateHandBookRef.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>