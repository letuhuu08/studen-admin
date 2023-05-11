<template>
  <v-container class="container-profile">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="2" style="width: 100%; height: 100%">
          <div class="title-card">Thông tin cơ bản</div>
          <div class="px-5 py-5">
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Họ và tên:</div>
              <div style="flex: 2" class="text-answer">
                {{ student.HoVaTen }}
              </div>
            </div>
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Ngày sinh:</div>
              <div class="text-answer" style="flex: 2">
                {{ student.NgaySinh }}
              </div>
            </div>
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Số CCCD:</div>
              <div class="text-answer" style="flex: 2">
                {{ student.ChungMinhThu }}
              </div>
            </div>
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Giới tính:</div>
              <div class="text-answer" style="flex: 2">
                {{ student.GioiTinh }}
              </div>
            </div>
            <!-- <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">File ảnh:</div>
              <div class="text-answer" style="flex: 2">
                <a target="_blank" :href="student.MainImage">{{
                  student.MainImageName
                }}</a>
              </div>
            </div> -->
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="2" style="width: 100%; height: 100%">
          <div class="title-card">Thông tin hành chính</div>
          <div class="px-5 py-5">
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Mã sinh viên:</div>
              <div style="flex: 2" class="text-answer">
                {{ student.MaSinhVien }}
              </div>
            </div>
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Email:</div>
              <div class="text-answer" style="flex: 2">
                {{ student.EmailVNU }}
              </div>
            </div>
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Mã nhập học:</div>
              <div class="text-answer" style="flex: 2">
                {{ student.MaNhapHoc }}
              </div>
            </div>
            <div class="d-flex px-4 py-4 wrap-content-item">
              <div style="flex: 1">Số báo danh:</div>
              <div class="text-answer" style="flex: 2">
                {{ student.SoBaoDanh }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  props: ["dataStudent"],

  data() {
    return {
      student: {
        HoVaTen: this.dataStudent.HoVaTen || "",
        ChungMinhThu: this.dataStudent.ChungMinhThu || "",
        NgaySinh: this.dataStudent.NgaySinh
          ? moment(this.dataStudent.NgaySinh).format("DD/MM/YYYY")
          : "",
        MainImage: this.dataStudent.MainImage.FileUrl || "",
        MainImageName: this.dataStudent.MainImage.FileName || "",
        GioiTinh: this.dataStudent.GioiTinh.TenMuc || "",
        MaSinhVien: this.dataStudent.MaSinhVien || "",
        SoBaoDanh: this.dataStudent.SoBaoDanh || "",
        MaNhapHoc: this.dataStudent.MaNhapHoc || "",
        EmailVNU: this.dataStudent.EmailVNU || "",
      },
    };
  },

  created() {
 
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 20px;
  font-weight: 500;
  padding: 10px 10px 0 10px;
}
.text-answer {
  font-weight: 500;
  font-size: 16px;
}
.text-subject {
  font-size: 16px;
}
.container-profile {
  background-color: #eee;
}
.wrap-content-item {
  border-bottom: 1px solid rgba(51, 51, 51, 0.25);
  align-items: center;
}
</style>