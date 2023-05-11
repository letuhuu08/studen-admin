<template>
  <v-container class="container-profile"> 
    <v-row>
      <v-col cols="12" sm="6">
        <v-card flat style="width: 100%; height: 100%;">
          <div class="title-card pl-5">Nội dung thắc mắc, góp ý:</div>
          <div class="px-3 py-3">
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Nội dung:</div>
              <div style="flex: 2" class="text-answer">
                {{ dataDetailsFeedback.NoiDung }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Tệp đính kèm:</div>
              <div class="text-answer" style="flex: 2">
                <span @click="showAttack(dataDetailsFeedback.fileFeedbackUrl)" 
                  style="color: #2161b1; text-decoration: underline; cursor: pointer;">
                  {{dataDetailsFeedback.fileFeedbackName}}
                </span>
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Chủ đề:</div>
              <div class="text-answer" style="flex: 2">
                {{ dataDetailsFeedback.ChuDe }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Ngày gửi:</div>
              <div class="text-answer" style="flex: 2">
               {{ dateLocale(dataDetailsFeedback.TimeCreate) }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Người gửi:</div>
              <div class="text-answer" style="flex: 2">
                {{ getStudent }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Trạng thái trả lời:</div>
              <div class="text-answer" style="flex: 2">
               {{ dataDetailsFeedback.TinhTrang }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Tình trạng công khai:</div>
              <div class="text-answer" style="flex: 2">
                {{ getStatusPublic }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card flat style="width: 100%; height: 100%">
          <div class="title-card pl-4">Nội dung trả lời:</div>
          <div class="px-2 py-2">
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Người trả lời:</div>
              <div style="flex: 2" class="text-answer">
                {{ dataDetailsFeedback.NguoiTraLoi }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Ngày trả lời:</div>
              <div class="text-answer" style="flex: 2">
                {{ dateLocale(dataDetailsFeedback.NgayTraLoi) }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Nội dung trả lời:</div>
              <div class="text-answer" style="flex: 2">
               {{ dataDetailsFeedback.NoiDungTraLoi }}
              </div>
            </div>
            <div class="d-flex px-2 py-2 wrap-content-item">
              <div style="flex: 1; max-width: 150px; font-weight: 500">Tệp đính kèm:</div>
              <div class="text-answer" style="flex: 2">
                <span v-if="dataDetailsFeedback.fileAnswerUrl" @click="showAttack(dataDetailsFeedback.fileAnswerUrl)" 
                  style="color: #2161b1; text-decoration: underline; cursor: pointer;">
                  {{dataDetailsFeedback.fileAnswerUrl | fileName}}
                </span>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogAttack" persistent max-width="1000">
      <v-card>
        <v-toolbar dark color="primary" class="px-3">
          <v-toolbar-title >Tệp đính kèm</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialogAttack = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="px-2 py-2" style="background: #eee">
          <img class="style-img" :src="urlAttack" alt="" />
          <v-card-actions class="justify-center my-4">
            <v-btn
              small
              depressed
              color="red"
              class="white--text mr-2"
              @click="dialogAttack = false"
            >
              <v-icon left> mdi-close </v-icon>
              Thoát
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  props: ["dataEdit"],
  data() {
    return {
      dataDetailsFeedback: {
        ChuDe: this.dataEdit.ChuDe.TenMuc || "",
        fileFeedbackName: this.dataEdit.Attachment?.FileName || "",
        fileFeedbackUrl: this.dataEdit.Attachment?.FileUrl || "",
        fileAnswerUrl: this.dataEdit.TraLoi.Attachment?.FileUrl || "",
        TinhTrang: this.dataEdit.TinhTrang.TenMuc || "",
        CongKhai: this.dataEdit.CongKhai || "",
        NoiDung: this.dataEdit.NoiDung || "",
        NoiDungTraLoi: this.dataEdit.TraLoi.NoiDung || "",
        NguoiTraLoi: this.dataEdit.TraLoi.NguoiTraLoi || "",
        TimeCreate: this.dataEdit.TimeCreate || "",
        NgayTraLoi: this.dataEdit.TraLoi.NgayTraLoi || "",
      },
      listStudent: [],
      dialogAttack: false,
      urlAttack: ''
    };
  },

  mounted() {
    
  },
  created() {
    const vm = this;
    vm.getListData();
    
  },
  methods: {
    getListData() {
      let vm = this;
      vm.loadingData = true;
      const dataPayload = {
        page: 0,
        size: 1,
        SinhVienMdd: vm.dataEdit.SinhVienMdd,
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName: "sinhvien",
        data: dataPayload,
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
        
          vm.listStudent = response.content;
        })
        .catch(function () {});
    },
    showAttack (url) {
      let vm = this
      vm.urlAttack = url
      vm.dialogAttack = true
    },
    dateLocale (payload) {
      if (!payload) {
        return ''
      }
      let date = new Date(payload)
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
    },
  },
  computed: {
    getDateAnswer() {
      const vm = this;
      if (vm.dataEdit.TraLoi.NgayTraLoi) {
        const date = moment(vm.dataEdit.TraLoi.NgayTraLoi).format("DD/MM/YYYY");
        return date;
      }
      return null;
    },
    getStudent() {
      const vm = this;
      const result = vm.listStudent.filter(
        (item) => item.MaDinhDanh === vm.dataEdit.SinhVienMdd
      );
      if (result.length) return result[0].HoVaTen;
      return "";
    },
    getStatusPublic() {
      const vm = this;
      let result = "Không công khai";
      if (vm.dataEdit.CongKhai) {
        return (result = "Công khai");
      }
      return result;
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

<style scoped>

.title-card {
  font-size: 20px;
  font-weight: 500;
  padding: 10px 10px 0 10px;
  color: #2161b1;
}
.text-answer {
  font-weight: normal;
  font-size: 16px;
}
.text-subject {
  font-size: 16px;
}
.container-profile {
  background-color: rgb(238, 238, 238);
}
.wrap-content-item {
  border-bottom: 1px solid rgba(51, 51, 51, 0.25);
  align-items: center;
}
</style>
