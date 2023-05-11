<template>
  <v-form
    class="dialog-body"
    ref="formUnPublicDateHandBookRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="d-flex custom-checkbox">
          <div class="titleText custom-title">Hủy xuất bản luôn:</div>
        <v-checkbox class="m-0 p-0" v-model="status"></v-checkbox>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="!status">
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Ngày hủy xuất bản:</div>
        <v-flex class="">
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
                :rules="[rules.date]"
                clearable
                class="flex input-form"
                v-model="textDate"
                placeholder="Đến ngày..."
                persistent-hint
                prepend-icon=""
                v-bind="attrs"
                @blur="dateUnPublic = parseDate(textDate)"
                v-on="on"
                solo
                dense
                hide-details="auto"
                hide-no-data
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateUnPublic"
              no-title
              :min="dateMinSelect"
              @input="toggleShowMenuDate = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
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
      validForm: false,
      status: false,
      toggleShowMenuDate: false,
      textDate: "",
      dateUnPublic: "",

      rules: {
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
    };
  },

  mounted() {
  
  },
  created() {
    
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formUnPublicDateHandBookRef.validate();
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
    dateMinSelect() {
      const vm = this;
      return moment(vm.dataItem.NgayXuatBan).format("YYYY-MM-DD");
    },
  },
  watch: {
    dateUnPublic() {
      const vm = this;
      vm.textDate = vm.formatDate(vm.dateUnPublic);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-checkbox .v-input--selection-controls{
margin: 0 0 0 10px;
padding: 0;
}
.custom-title{
  margin-top: 2px;
}
</style>