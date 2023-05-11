<template>
  <v-form
    class="dialog-body"
    ref="formConfirmMapRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">
          Tên địa điểm:
        </div>
        <v-text-field
          v-model="formData.TenDiaDiem"
          solo
          label="Nhập tên địa điểm..."
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
         Loại bản đồ:
        </div>
       <v-autocomplete
          class="flex input-form"
          hide-no-data
          :items="listTypeMap"
          v-model="formData.LoaiBanDo"
          item-text="text"
          item-value="value"
          dense
          solo
          hide-details="auto"
          clearable
          placeholder="Loại bản đồ"
          required
        >
        </v-autocomplete>
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
      TenDiaDiem: this.dataItem.TenDiaDiem || "",
      LoaiBanDo:this.dataItem.LoaiBanDo?.MddLoaiBanDo || "",
      TrangThaiHienThi: "2"
      },
      listTypeMap: [],
      validForm: false,
      rules: {
        required: (value) => !!value || "Không được để trống.",
      },
    };
  },

  mounted() {
   
  },
  created() {
    const vm = this
     
     vm.getListTypeMap()
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formConfirmMapRef.validate();
    },
     getListTypeMap(dataParam) {
      let vm = this;
      vm.loadingData = true;
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
        collectionName: "loaibando",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
           vm.$emit("emitDataListTypeMap", response.content);
          vm.listTypeMap = response.content.map(el=>({text: el.TenLoaiBanDo, value: el.MaDinhDanh}));

        
        })
        .catch(function () {
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>