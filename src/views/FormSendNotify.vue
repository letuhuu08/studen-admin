<template>
  <v-form
    class="dialog-body"
    ref="formSendNotifyRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tiêu đề: <span style="color: red">*</span>
        </div>
        <v-text-field
          :rules="[rules.required]"
          v-model="formData.TieuDe"
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
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Nội dung:</div>
        <v-textarea
          v-model="formData.NoiDung"
          solo
          placeholder="Nhập nội dung..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Tên người gửi thông báo:</div>
        <v-text-field
          v-model="formData.NguoiGuiThongBao"
          solo
          placeholder="Nhập..."
          dense
          hide-details="auto"
          required
          class="input-form"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Số điện thoại:</div>
        <v-text-field
          :rules="[rules.phone]"
          v-model="formData.SdtNguoiGui"
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
      <v-col cols="12" :sm="isAdmin ? 6 : 12">
        <div class="titleText mb-2">Hẹn lịch gửi thông báo:</div>
        <v-menu
          v-model="toggleShowMenuDateSend"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="flex input-form"
              v-model="textDateSend"
              placeholder="Chọn ngày..."
              persistent-hint
              prepend-icon=""
              v-bind="attrs"
              @blur="dateSend = parseDate(textDateSend)"
              v-on="on"
              solo
              dense
              hide-details="auto"
              hide-no-data
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateSend"
            no-title
            @input="toggleShowMenuDateSend = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

    <v-col cols="12" sm="6" v-if="isAdmin">
 <div class="titleText mb-2">Cơ quan đơn vị:</div>
         <v-select
         v-model="formData.MaDonVi"
          :items="optionAgencies"
          label="Chọn"
          dense
          solo
          class="input-form"
        ></v-select>
    </v-col>
    </v-row>
  </v-form>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  props: [],

  data() {
    return {
      formData: {
        TieuDe: "",
        NoiDung: "",
        NguoiGuiThongBao: "",
        SdtNguoiGui: "",
        TinhTrang: "3",
        MaDonVi: ""
      },
      rules: {
        required: (value) => !!value || "Không được để trống.",
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
      },
      toggleShowMenuDateSend: false,
      dateSend: "",
      textDateSend: "",
      validForm: false,
    };
  },

  mounted() {
    console.log("moun");
  },
  created() {
    const vm = this;
    // console.log("props: ", vm.dataEdit);
    // if (vm.dataEdit.PrimKey)
    //   vm.textDateSend = moment(vm.dataEdit.HenGioGui).format("DD/MM/YYYY");
  },

  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formSendNotifyRef.validate();
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
  computed:{
     ...mapState(["listAgencies"]),
        optionAgencies() {
      const vm = this;
      let data = vm.listAgencies;
      // console.log("Data: ", data, vm.unitId);

      // if (vm.checkActionAddAndUpdate === textAuthor.ALONE && vm.unitId) {
      //   data.filter((item) => item.maHanhChinh === vm.unitId);
      // }
      const options = data.map((item) => ({
        text: item.tenGoi,
        value: {
          MaHanhChinh: item.maHanhChinh,
          TenGoi: item.tenGoi,
        },
      }));
      return options;
    },
  },
  watch: {
    dateSend() {
      const vm = this;
      vm.textDateSend = vm.formatDate(vm.dateSend);
    },
  },
};
</script>
