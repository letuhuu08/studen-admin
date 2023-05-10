<template>
  <div>
    <v-card class="mx-auto pa-2 mb-2" outlined flat>
      <div>
        <div class="flex mx-3 mb-3 mt-2">
          <span style="font-size: 16px; font-weight: bold; color: #2161b1"
            >THÔNG TIN CẨM NANG</span
          >
          <div>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="titleText mb-2">
                  Tên cẩm nang: <span style="color: red">*</span>
                </div>
                <v-text-field
                  solo
                  v-model="nameHandBook"
                  label="Nhập tên cẩm nang..."
                  dense
                  hide-details="auto"
                  required
                  class="flex input-form"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="titleText mb-2">
                  Tiêu đề cẩm nang: <span style="color: red">*</span>
                </div>
                <v-text-field
                  solo
                  v-model="titleHandBook"
                  label="Nhập tiêu đề cẩm nang..."
                  dense
                  hide-details="auto"
                  required
                  class="flex input-form"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
                <div class="titleText mb-2">Chuyên mục cẩm nang:</div>
                <v-autocomplete
                  v-model="typeHandBook"
                  class="flex input-form"
                  hide-no-data
                  :items="getOptionTypeHandBook"
                  item-text="name"
                  item-value="value"
                  placeholder="Chọn chuyên mục"
                  dense
                  solo
                  hide-details="auto"
                  return-object
                  clearable
                >
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
                <div class="titleText mb-2">
                  Tóm tắt cẩm nang: <span style="color: red">*</span>
                </div>
                <v-textarea
                  solo
                  v-model="summaryHandBook"
                  label="Nhập tóm tắt..."
                  hide-details="auto"
                  required
                  class="flex input-form"
                  rows="5"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
                <div class="titleText mb-2">Ảnh đại diện:</div>
                <v-flex v-if="file">
                  <img
                    style="height: 200px; max-width: 100%"
                    alt=""
                    :src="file"
                  />
                </v-flex>
                <v-flex class="mt-2">
                  <v-file-input
                    class="flex input-form"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon=""
                    prepend-inner-icon="mdi-cloud-upload-outline"
                    @change="handleChangeFile"
                    label="Chọn ảnh đại diện"
                    solo
                    dense
                  ></v-file-input>
                </v-flex>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-card>

    <v-card class="mx-auto pa-2" outlined flat>
      <div>
        <v-layout wrap class="mt-0">
          <v-flex class="xs12 sm4">
            <div style="width: 100%">
              <div class="flex mx-3 mb-3 mt-2" style="max-width: 40rem">
                <span style="font-size: 16px; font-weight: bold; color: #2161b1"
                  >MỤC LỤC CẨM NANG</span
                >
                <v-btn
                  small
                  depressed
                  class="ml-3"
                  color="primary"
                  @click.native="addMucLuc"
                  style="float: right"
                >
                  <v-icon left dark size="18">
                    mdi-file-document-plus-outline
                  </v-icon>
                  <span>Thêm mục</span>
                </v-btn>
              </div>

              <nested-test
                class="mx-3"
                v-model="elements"
                @tiny:change-mucluc="capNhatCamNang"
              />
            </div>
          </v-flex>
          <v-flex class="align-center xs12 sm8">
            <div style="width: 100%; border: 1px dotted #dedede">
              <v-btn
                class="btn-form my-2 mx-2 mr-2 left"
                small
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click.stop="pickFileUpload()"
              >
                <v-icon size="18">mdi-file-pdf-box</v-icon>&nbsp;
                <span v-if="urlAttack">Cập nhật file cẩm nang</span>
                <span v-else>Tải lên file cẩm nang</span>
              </v-btn>
              <v-row
                class="fill-height"
                align-content="center"
                justify="center"
                v-if="loadingPdf"
              >
                <v-col class="text-subtitle-1 text-center" cols="12">
                  Đang tải file cẩm nang
                </v-col>
                <v-col cols="6">
                  <v-progress-linear
                    color="deep-purple accent-4"
                    indeterminate
                    rounded
                    height="6"
                  ></v-progress-linear>
                </v-col>
                <v-col
                  v-if="!loadingPdf && urlAttack"
                  class="text-subtitle-1 text-center"
                  cols="12"
                >
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="itemSelectPage"
                    v-model="pageSelected"
                    item-text="name"
                    item-value="value"
                    dense
                    solo
                    hide-details="auto"
                    placeholder=""
                    return-object
                    clearable
                    @change="changePage"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row
                class="fill-height my-0"
                align-content="center"
                justify="center"
                v-if="!loadingPdf && urlAttack"
              >
                <v-col
                  class="text-subtitle-1 text-center"
                  style="max-width: 180px"
                >
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="itemSelectPage"
                    v-model="pageSelected"
                    item-text="name"
                    item-value="value"
                    dense
                    solo
                    hide-details="auto"
                    placeholder=""
                    return-object
                    @change="changePage"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <pdf
                :src="urlAttack"
                :page="pagePdf"
                @num-pages="numPagesPdf = $event"
                @progress="loadingPdf = true"
                @loaded="loadingPdf = false"
              ></pdf>
            </div>
            <input
              type="file"
              id="file_upload"
              :multiple="false"
              @input="uploadFile()"
              style="display: none"
            />
          </v-flex>
        </v-layout>
      </div>
      <v-dialog max-width="600" v-model="dialogThemMucLuc" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title>Thêm mục lục</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="dialogThemMucLuc = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-5 px-2">
            <v-form ref="formAddMucLuc" v-model="validFormAdd" lazy-validation>
              <v-layout wrap>
                <v-col cols="12" class="py-0 mb-2">
                  <label>Tên đầu mục <span class="red--text">(*)</span></label>
                  <v-textarea
                    class="flex input-form"
                    v-model="tenDauMuc"
                    solo
                    dense
                    :rules="required"
                    required
                    hide-details="auto"
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="py-0 my-2">
                  <label>Trang số<span class="red--text"> (*)</span></label>
                  <v-text-field
                    class="flex input-form"
                    v-model="trangDauMuc"
                    solo
                    dense
                    :rules="required"
                    required
                    hide-details="auto"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end pb-3">
            <v-btn
              small
              color="red"
              class="white--text mr-2"
              :loading="loading"
              :disabled="loading"
              @click="dialogThemMucLuc = false"
            >
              <v-icon left> mdi-close </v-icon>
              Thoát
            </v-btn>
            <v-btn
              small
              class="mr-0"
              color="primary"
              :loading="loading"
              :disabled="loading"
              @click="submitThemMucLuc"
            >
              <v-icon left> mdi-content-save </v-icon>
              <span>Thêm mục lục</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

    <div class="my-4 d-flex justify-end">
      <v-btn
        small
        depressed
        color="red"
        class="white--text mr-2"
        :loading="loadingAction"
        :disabled="loadingAction"
        @click="handleBackPage"
      >
        <v-icon left> mdi-close </v-icon>
        {{ $t("basic.thoat") }}
      </v-btn>
      <v-btn
        v-if="!readonlyForm"
        small
        depressed
        class="mr-2"
        color="primary"
        :loading="loadingAction"
        :disabled="loadingAction"
        @click="handleUpdateHandBook"
      >
        <v-icon left dark size="18"> mdi-file-document-plus-outline </v-icon>
        <span>Cập nhật</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import toastr from "toastr";
import axios from "axios";
import $ from "jquery";
import pdf from "vue-pdf";
import NestedTest from "./nested-test.vue";
toastr.options = {
  closeButton: true,
  timeOut: "5000",
  positionClass: "toast-top-center",
};
export default {
  name: "CoQuanDonVi",
  components: {
    pdf,
    NestedTest,
  },
  props: {},
  data: () => ({
    loading: false,
    loadingData: false,
    tenDauMuc: "",
    trangDauMuc: "",
    capDonViSearch: "",

    fileUpload: [],
    dialogThemMucLuc: false,
    validFormAdd: false,
    required: [
      (v) =>
        (v !== "" && v !== null && v !== undefined) || "Thông tin bắt buộc",
    ],
    thongTinCamNang: "",
    urlAttack: "",
    pagePdf: 1,
    loadingPdf: false,
    numPagesPdf: 0,
    itemSelectPage: [],
    pageSelected: {
      name: "Trang 1",
      value: 1,
    },
    elementUpdate: "",
    file: null,
    nameHandBook: "",
    listTypeHandBook: [],
    typeHandBook: "",
    titleHandBook: "",
    summaryHandBook: "",
  }),
  created() {
    let vm = this;
    vm.getCamNang();
    vm.getTypeHandBook({ danhMuc_maDanhMuc: "CHUYENMUCCAMNANG" });
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.elements;
      },
      set(value) {
        this.$store.dispatch("updateElements", value);
      },
    },
    GET_PAGE_PDF() {
      return this.$store.state.pagePdf;
    },
    getOptionTypeHandBook() {
      const vm = this;
      const option = vm.listTypeHandBook.map((item) => ({
        name: item.TenMuc,
        value: item.MaDinhDanh,
        id: item.PrimKey,
      }));
      return option;
    },
  },
  watch: {
    numPagesPdf(val) {
      let vm = this;
      // console.log('numPagesPdf', val)
      setTimeout(function () {
        vm.itemSelectPage = [];
        for (let index = 1; index <= val; index++) {
          let item = {
            name: "Trang " + index,
            value: index,
          };
          vm.itemSelectPage.push(item);
        }
      }, 100);
    },
    GET_PAGE_PDF(val) {
      let vm = this;
      vm.pageSelected = {
        name: "Trang " + val,
        value: val,
      };
      vm.goToPage(val);
    },
  },
  methods: {
    addMucLuc() {
      let vm = this;
      vm.dialogThemMucLuc = true;
    },
    submitThemMucLuc() {
      let vm = this;
      if (vm.$refs.formAddMucLuc.validate()) {
        let item = {
          id: new Date().getTime(),
          TenDauMuc: vm.tenDauMuc,
          MucLucCon: [],
          SoTrang: vm.trangDauMuc,
        };
        vm.elements.push(item);
        vm.dialogThemMucLuc = false;
        vm.capNhatCamNang(vm.elements);
      }
    },
    submitGuiDangKy() {
      let vm = this;
      toastr.remove();
      toastr.success("Gửi đăng ký thành công");
      vm.dialogThemMucLuc = false;
      return;
      vm.formatOutputData();
      if (vm.loading) {
        return;
      }
      vm.loading = true;
      if (vm.$refs.formAddMucLuc.validate()) {
        let filter = {
          collectionName: "coquandonvi",
          data: vm.thongTinToChuc,
        };
        vm.$store
          .dispatch("collectionCreate", filter)
          .then(function (result) {
            vm.loading = false;
            toastr.remove();
            toastr.success("Thêm mới thành công");
            let data = result.resp;
            vm.$router.push({ path: "/co-quan-don-vi/" + data.primKey });
          })
          .catch(function (response) {
            vm.loading = false;
            toastr.remove();
            // if (response && response.status == 409) {
            //   toastr.error('Mã danh mục đã tồn tại')
            //   return
            // }
            toastr.error("Thêm mới thất bại");
          });
      } else {
        vm.loading = false;
      }
    },
    getCamNang() {
      let vm = this;
      let config = {
        method: "get",
        url: "/v1/datasharing/camnang/filter",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {},
        params: {
          page: 0,
          size: 50,
          orderFields: "ThoiGianTao",
          orderTypes: "asc",
        },
      };
      axios(config)
        .then(function (response) {
          let serializable = response.data;
          if (
            serializable &&
            serializable.content &&
            serializable.content.length
          ) {
            let data = serializable.content;
            let camnang = data.filter(function (item) {
              return (
                JSON.parse(item.Content)["Type"] == "CamNangHoaLac" &&
                vm.$route.params.id === item.PrimKey
              );
            });
            console.log("respon", camnang, vm.$route.params.id);
            if (camnang && camnang.length) {
              let data = camnang[0];
              console.log("data: ", data);
              let mucLuc = JSON.parse(data.Content);
              vm.nameHandBook = mucLuc.TenCamNang;
              vm.file = mucLuc.AnhDaiDien;
              vm.summaryHandBook = data.TomTat;
              vm.titleHandBook = data.TieuDe;
              vm.typeHandBook = data.MddChuyenMuc;
              vm.thongTinCamNang = data;
              vm.$store.commit("SET_THONGTINCAMNANG", data);
              vm.urlAttack = mucLuc.Attachment ? mucLuc.Attachment : "";
              vm.elements = mucLuc.MucLuc ? mucLuc.MucLuc : [];
            } else {
              vm.taoCamNang();
            }
          }
        })
        .catch(function (error) {});
    },
    taoCamNang() {
      let vm = this;
      let dataCamNang = {
        Type: "CamNangHoaLac",
        TenCamNang: "Cẩm nang Hòa Lạc",
        MucLuc: [],
        Attachment: "",
      };
      let config = {
        method: "post",
        url: "/v1/datasharing/camnang",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Content: JSON.stringify(dataCamNang),
          TrangThai: "1",
        }),
        params: {},
      };
      axios(config)
        .then(function (response) {
          let vm = this;
          let config = {
            method: "get",
            url: "/v1/datasharing/camnang/filter",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            data: {},
            params: {
              page: 0,
              size: 10,
              orderFields: "ThoiGianTao",
              orderTypes: "asc",
            },
          };
          axios(config)
            .then(function (response) {
              let serializable = response.data;
              if (
                serializable &&
                serializable.content &&
                serializable.content.length
              ) {
                let data = serializable.content;
                let camnang = data.filter(function (item) {
                  return JSON.parse(item.Content)["Type"] == "CamNangHoaLac";
                });
                if (camnang && camnang.length) {
                  let data = camnang[0];
                  let mucLuc = JSON.parse(data.Content);
                  vm.thongTinCamNang = data;
                  vm.$store.commit("SET_THONGTINCAMNANG", data);
                  vm.urlAttack = mucLuc.Attachment ? mucLuc.Attachment : "";
                  vm.elements = mucLuc.MucLuc ? mucLuc.MucLuc : [];
                }
              }
            })
            .catch(function (error) {});
        })
        .catch(function (error) {});
    },
    capNhatCamNang(elements) {
      let vm = this;
      if (vm.loading) {
        return;
      }
      let contentMucLuc = JSON.parse(vm.thongTinCamNang.Content);
      let dataCamNang = Object.assign(contentMucLuc, {
        MucLuc: elements,
      });
      let config = {
        method: "post",
        url: "/v1/datasharing/camnang/" + vm.thongTinCamNang.PrimKey,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Content: JSON.stringify(dataCamNang),
          TrangThai: "1",
        }),
        params: {},
      };
      axios(config).then(function (response) {});
    },
    capNhatUrlAttack(urlAttack) {
      let vm = this;
      let contentMucLuc = JSON.parse(vm.thongTinCamNang.Content);
      let dataCamNang = Object.assign(contentMucLuc, {
        Attachment: urlAttack,
      });
      let config = {
        method: "post",
        url: "/v1/datasharing/camnang/" + vm.thongTinCamNang.PrimKey,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Content: JSON.stringify(dataCamNang),
          TrangThai: "1",
        }),
        params: {},
      };
      axios(config).then(function (response) {});
    },
    pickFileUpload() {
      document.getElementById("file_upload").value = "";
      document.getElementById("file_upload").click();
    },
    uploadFile() {
      let vm = this;
      let files = "";
      try {
        files = $("#file_upload")[0].files;
      } catch (error) {}
      let file = files[0];
      let fileName = file["name"];
      if (file["name"]) {
        fileName = file["name"].replace(/\%/g, "");
        fileName = fileName.replace(/\//g, "");
        fileName = fileName.replace(/\\/g, "");
      }
      let formData = new FormData();
      formData.append("files", file, fileName);

      axios
        .post("/v1/datasharing/camnang/upload", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
        })
        .then(function (response) {
          if (response && response.data && response.data.fullPath) {
            vm.urlAttack = response.data.fullPath;
            vm.capNhatUrlAttack(response.data.fullPath);
          }
        })
        .catch(function (xhr) {});
    },
    changePage() {
      let vm = this;
      setTimeout(function () {
        vm.pagePdf = vm.pageSelected.value;
      }, 100);
    },
    goToPage(page) {
      let vm = this;
      if (vm.urlAttack) {
        setTimeout(function () {
          vm.pagePdf = page;
        }, 100);
      }
    },
    deleteFileAttack(item, index) {
      let vm = this;
      if (!item.id) {
        vm.fileUpload.splice(index, 1);
        vm.$store.commit("SET_FILEUPLOADYET", false);
      } else {
        vm.$store.commit("SET_SHOWCONFIRM", true);
        let confirm = {
          auth: false,
          title: "Xóa tài liệu đính kèm",
          message: "Bạn có chắc chắn muốn xóa tài liệu này",
          button: {
            yes: "Có",
            no: "Không",
          },
          callback: () => {
            let filter = {
              idThanhPhan: vm.thongtinthanhphan.primKey,
              idFile: item.id,
            };
            vm.$store
              .dispatch("deleteFile", filter)
              .then(function (result) {
                vm.fileUpload.splice(index, 1);
                toastr.success("Xóa tài liệu đính kèm thành công");
                vm.$store.commit("SET_FILEUPLOADYET", false);
              })
              .catch(function () {
                toastr.success("Xóa tài liệu đính kèm thất bại");
              });
          },
        };
        vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
      }
    },
    translateDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    dateLocale(dateInput) {
      let date = new Date(dateInput);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    },
    convertDate(date) {
      if (!date) return "";
      const [day, month, year] = date.split("/");
      let ddd = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      return new Date(ddd).toISOString();
    },
    handleChangeFile(value) {
      const vm = this;

      console.log("value: ", value);

      if (value) {
        let formData = new FormData();
        formData.append("files", value);
        const payload = {
          type: "camnang/upload",
          payload: formData,
        };

        vm.$store
          .dispatch("uploadFile", payload)
          .then(function (response) {
            const url = response.data.fullPath;
            vm.file = url;
          })
          .catch(function () {
            toastr.error("Upload không thành công");
          });
      } else {
        vm.file = "";
        toastr.error("Upload không thành công");
      }
    },
    handleBackPage() {
      const vm = this;
      vm.$router.push({ name: "ManageHandBook" });
    },
    handleUpdateHandBook() {
      const vm = this;

      const dataPayload = {
        Content: JSON.stringify({
          ...JSON.parse(vm.thongTinCamNang.Content),
          TenCamNang: vm.nameHandBook,
          AnhDaiDien: vm.file,
          MucLuc: [...vm.elements],
        }),
        TieuDe: vm.titleHandBook,
        TomTat: vm.summaryHandBook,
        MddChuyenMuc: vm.typeHandBook,
        TrangThai: "1",
      };

      dataPayload.MddChuyenMuc = dataPayload.MddChuyenMuc.value;
      dataPayload.MaChuyenMuc = vm.typeHandBook.id;

      const payload = {
        payload: dataPayload,
        type: "camnang",
        id: vm.thongTinCamNang.PrimKey,
      };
      vm.$store
        .dispatch("editItemData", payload)
        .then(function (response) {
          toastr.success("Cập nhật thành công");
        })
        .catch(function () {
          toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
        });

      console.log(
        "update cán bộ",
        JSON.parse(vm.thongTinCamNang.Content),
        dataPayload,
        vm.elements
      );
    },
    getTypeHandBook(dataParam) {
      const vm = this;
      console.log("get type handbook");

      vm.loadingData = true;
      const dataPayload = {
        page: 0,
        size: 20,
      };
      const filter = {
        collectionName: "dulieudanhmuc",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.listTypeHandBook = response.content;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
  },
};
</script>
<style scoped>
</style>