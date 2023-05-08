<template>
  <v-form
    class="dialog-body"
    ref="formBanDoRef"
    lazy-validation
    v-model="validForm"
  >
    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Tên địa điểm: <span style="color: red">*</span>
        </div>
        <v-text-field
          class="flex input-form"
          :rules="[rules.required]"
          v-model="formData.TenDiaDiem"
          solo
          label="Nhập tên đầy đủ..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Trạng thái hiển thị</div>
        <v-autocomplete
          class="flex input-form"
          :items="optionDisplayStatus"
          v-model="formData.TrangThaiHienThi"
          label="Chọn"
          dense
          solo
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="titleText mb-2">Mô tả:</div>
        <v-textarea
          class="flex input-form"
          v-model="formData.MoTa"
          solo
          dense
          hide-details="auto"
          required
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Kinh độ:</div>
        <v-text-field
          :rules="[rules.number]"
          class="flex input-form"
          solo
          v-model="formData.kinhDo"
          label="Nhập kinh độ..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Vĩ độ:</div>
        <v-text-field
          :rules="[rules.number]"
          class="flex input-form"
          solo
          v-model="formData.viDo"
          label="Nhập vĩ độ..."
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">Loại bản đồ:</div>
        <v-autocomplete
          class="flex input-form"
          :items="listTypeMap"
          v-model="formData.LoaiBanDo"
          label="Chọn"
          dense
          solo
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="titleText mb-2">
          Khu vực: <span style="color: red">*</span>
        </div>
        <v-autocomplete
          :rules="[rules.required]"
          class="flex input-form"
          :items="listArea"
          v-model="formData.KhuVuc"
          label="Chọn"
          dense
          solo
        ></v-autocomplete>
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
        TenDiaDiem: this.dataEdit?.TenDiaDiem || "",
        LoaiBanDo: this.dataEdit?.LoaiBanDo?.MddLoaiBanDo || "",
        kinhDo: this.dataEdit?.ToaDo?.Longitude || "",
        viDo: this.dataEdit?.ToaDo?.Latitude || "",
        KhuVuc: this.dataEdit?.KhuVuc?.MddKhuVuc || "",
        MoTa: this.dataEdit?.MoTa || "",
        TrangThaiHienThi: this.dataEdit.TrangThaiHienThi || "",
      },
      validForm: false,
      listArea: [],
      listTypeMap: [],
      rules: {
        required: (value) => !!value || "Không được để trống.",
        number: (value) => {
          const pattern = /^\d+(\.\d{1,22})?$/;
          if (!value) return true;
          return pattern.test(value) || "Trường này phải nhập số";
        },
      },
      optionDisplayStatus: [
        {
          text: "Không hiển thị",
          value: "1",
        },
        {
          text: "Hiển thị",
          value: "2",
        },
      ],
    };
  },

  mounted() {
    console.log("moun");
  },
  created() {
    const vm = this;

    vm.getListArea();
    vm.getListTypeMap();

    console.log("cretate", this.dataEdit, vm.unitId, vm.checkActionUpload);
  },
  computed: {
   
  },
  methods: {
    validateForm() {
      let vm = this;
      return vm.$refs.formBanDoRef.validate();
    },
    getListArea() {
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
        collectionName: "khuvuc",
        data: dataPayload,
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.$emit("emitDataArea", response.content);
          vm.listArea = response.content.map((item) => ({
            text: item.TenKhuVuc,
            value: item.MaDinhDanh,
          }));

          console.log("res: ", vm.listArea);
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    getListTypeMap() {
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
        data: dataPayload,
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.$emit("emitDataTypeMap", response.content);

          vm.listTypeMap = response.content.map((item) => ({
            text: item.TenLoaiBanDo,
            value: item.MaDinhDanh,
          }));

          console.log("res: ", response.content);
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
  },
};
</script>

<style></style>
