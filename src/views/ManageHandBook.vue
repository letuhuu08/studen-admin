<template>
  <div>
    <v-row>
      <v-col cols="12" sm="5">
        <v-text-field
          class="input-form"
          v-model="textSearch"
          solo
          dense
          clearable
          hide-details="auto"
          placeholder="Nhập từ khóa tìm kiếm"
          append-icon="mdi-magnify"
          @click:append="getListHandBookFilter('')"
          @keyup.enter="getListHandBookFilter('')"
          @click:clear="getListHandBookFilter('clear')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="5">
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          :items="optionTypeHandBook"
          item-text="text"
          item-value="value"
          dense
          solo
          hide-details="auto"
          clearable
          placeholder="Chuyên mục"
          @change="handleChangeTypeHandBook"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" sm="2">
        <div style="float: right">
          <v-btn
            small
            color="primary"
            class="btn-form mx-0 text-white"
            @click="showModalForm"
          >
            <v-icon size="18">mdi-plus</v-icon>&nbsp; Thêm mới
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="my-0 mb-3">
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listHandBook"
          :items-per-page="itemsPerPage"
          item-key="primKey"
          hide-default-footer
          class="table-base mt-2"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
        >
          <template v-slot:item.stt="{ index }">
            {{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>

          <template v-slot:item.thaotac="{ item }" >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openDialogPublicDate(item)"
                >
                  <v-icon size="18" v-if="item.TrangThai == 2" color="orange"
                    >mdi-close-octagon-outline</v-icon
                  >
                  <v-icon size="18" v-else>mdi-file-export-outline</v-icon>
                </v-btn>
              </template>
              <span>{{
                item.TrangThai === "2" ? "Ngừng xuất bản" : "Xuất bản"
              }}</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <router-link
                    :to="`/chi-tiet-cam-nang-hoa-lac/${item.PrimKey}`"
                    class="text-decoration-none"
                  >
                    <v-icon size="18">mdi-clipboard-text</v-icon>
                  </router-link>
                </v-btn>
              </template>
              <span>xem chi tiết</span>
            </v-tooltip>

            <!-- <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="editGroup(item)"
                >
                  <v-icon size="18">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Sửa</span>
            </v-tooltip> -->

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="deleteGroup(item)"
                >
                  <v-icon size="18">mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Xóa</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <pagination
          v-if="pageCount"
          :pageInput="page"
          :total="total"
          :pageCount="pageCount"
          @tiny:change-page="handlechangePage"
        ></pagination>
      </v-col>
    </v-row>
    <div v-if="dialogForm">
      <v-dialog v-model="dialogForm" persistent max-width="1422" fullscreen>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật cẩm nang Hòa Lạc</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới cẩm nang Hòa Lạc</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormHandBook :dataEdit="dataEdit" ref="formHandBookRef" />

          <!-- <v-card-text class="px-2 py-2"> -->
          <v-card-actions class="d-inline-block custom-position">
            <v-btn
              small
              depressed
              color="red"
              class="white--text mr-2"
              :loading="loadingAction"
              :disabled="loadingAction"
              @click="closeModalForm"
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
              @click.native="submitForm"
            >
              <v-icon left dark size="18">
                mdi-file-document-plus-outline
              </v-icon>
              <span v-if="edittingForm">Cập nhật</span>
              <span v-else>Thêm mới</span>
            </v-btn>
          </v-card-actions>
          <!-- </v-card-text> -->
        </v-card>
      </v-dialog>
    </div>

    <!-- <v-dialog v-model="dialogDelete" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Bạn có muốn xóa không? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogDelete = false">
            Từ chối
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteGroup">
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <div v-if="dialogPublicDate">
      <v-dialog v-model="dialogPublicDate" persistent max-width="700px">
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <span class="text-h5">Ngày xuất bản</span>
          </v-toolbar>
          <v-card-text class="px-0">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <FormPublicDateHandBook
                    :dataItem="dataItem"
                    ref="formPublicDateHandBookRef"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              small
              depressed
              color="red"
              class="white--text mr-2"
              :loading="loadingAction"
              :disabled="loadingAction"
              @click="dialogPublicDate = false"
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
              @click="handlePublicDate"
            >
              <v-icon left dark size="18">
                mdi-file-document-plus-outline
              </v-icon>
              <span>Xác nhận</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div v-if="openDialogUnPublic">
      <v-dialog v-model="openDialogUnPublic" persistent max-width="700px">
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <span class="text-h5">Ngày hủy xuất bản</span>
          </v-toolbar>
          <v-card-text class="px-0">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <FormUnPublicDateHandBook
                    :dataItem="dataItem"
                    ref="formUnPublicDateHandBookRef"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              small
              depressed
              color="red"
              class="white--text mr-2"
              :loading="loadingAction"
              :disabled="loadingAction"
              @click="openDialogUnPublic = false"
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
              @click="handleUnPublicDate"
            >
              <v-icon left dark size="18">
                mdi-file-document-plus-outline
              </v-icon>
              <span>Xác nhận</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import FormHandBook from "./FormHandBook.vue";
import moment from "moment";
import toastr from "toastr";
import FormPublicDateHandBook from "@/views/FormPublicDateHandBook";
import FormUnPublicDateHandBook from "@/views/FormUnPublicDateHandBook";
export default {
  components: {
    Pagination,
    FormHandBook,
    FormPublicDateHandBook,
    FormUnPublicDateHandBook,
  },

  data() {
    return {
      textSearch: "",
      headers: [
        {
          sortable: false,
          text: "STT",
          align: "center",
          value: "stt",
          width: 50,
        },
        {
          sortable: false,
          text: "Tên cẩm nang",
          align: "left",
          value: "TenCamNang",
          class: "th-center",
          width: 222,
        },
        {
          sortable: false,
          text: "Mục lục",
          align: "left",
          value: "TenMucCon",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Thao tác",
          align: "left",
          value: "thaotac",
          class: "th-center",
          width: 200,
        },
      ],
      listHandBook: [],
      itemsPerPage: 20,
      loadingData: false,
      pageCount: 1,
      page: 0,
      edittingForm: false,
      dialogForm: false,
      readonlyForm: false,
      loadingAction: false,
      total: 1,
      dataEdit: {},
      // dialogDelete: false,
      // idHandBook: "",
      listCategoryHandBook: [],
      dialogPublicDate: false,
      openDialogUnPublic: false,
    };
  },
  created() {
    const vm = this;
    vm.getListHandBook();
    vm.getListTypeHandBook({ danhMuc_maDanhMuc: "CHUYENMUCCAMNANG" });
  },

  mounted() {},

  computed: {
    optionTypeHandBook() {
      const vm = this;
      const options = vm.listCategoryHandBook.map((item) => ({
        text: item.TenMuc,
        value: item.MaDinhDanh,
      }));
      return options;
    },
  },

  methods: {
    handleChangeTypeHandBook(value) {
      const vm = this;
      vm.getListHandBook({ MddChuyenMuc: value });
    },
    getListHandBookFilter(type) {
      const vm = this;
      console.log("tim kiếm");
      if (!type) {
        vm.getListHandBook({ keyword: vm.textSearch });
      } else {
        vm.getListHandBook({});
      }
    },
    getListHandBook(dataParam) {
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
        collectionName: "camnang",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          const responseData = response.content;
          let data = [];
          console.log("res group: ", responseData);

          responseData.forEach((el) => {
            const content = JSON.parse(el.Content);
            if (content.Type === "CamNangHoaLac") {
              console.log("run loop");

              data.push({ ...content, PrimKey: el.PrimKey });
            }
          });
          vm.listHandBook = data.map((el) => ({
            ...el,
            TenMucCon: el.MucLuc.map((item) => item.TenDauMuc).join(", "),
          }));

          console.log("for", vm.listHandBook);
          vm.total = vm.listHandBook.length;
          vm.pageCount = response.totalPages;
          vm.loadingData = false;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    getListTypeHandBook(dataParam) {
      let vm = this;
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
         
          vm.listCategoryHandBook = response.content;
           vm.total = vm.listCategoryHandBook.length;
          vm.pageCount = response.totalPages;
          vm.page = response.pageable.pageNumber
          vm.loadingData = false;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    // openDialogDeleteItem(item) {
    //   const vm = this;
    //   console.log("id delete: ", item.PrimKey);
    //   vm.dialogDelete = true;
    //   vm.idHandBook = item.PrimKey;
    // },
    deleteGroup(item) {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "camnang",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa loại cẩm nang Hòa Lạc",
        message: "Bạn có chắc chắn muốn xóa cẩm nang Hòa Lạc này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
              vm.listHandBook = vm.listHandBook.reduce(function (res, cur) {
                if (item.PrimKey !== cur.PrimKey) res.push(cur);
                return res;
              }, []);
              console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    // editGroup(item) {
    //   const vm = this;
    //   vm.edittingForm = true;
    //   vm.dialogForm = true;
    //   vm.dataEdit = item;
    //   console.log("item: ", item);
    // },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListHandBook(pageCurent);
    },
    showModalForm() {
      const vm = this;
      vm.dialogForm = true;
      vm.edittingForm = false;
    },
    closeModalForm() {
      const vm = this;
      vm.dialogForm = false;
      vm.dataEdit = {};
    },
    openDialogPublicDate(item) {
      const vm = this;
      vm.dataItem = item;
      if (item.TrangThai !== "2") {
        vm.dialogPublicDate = true;
      } else {
        vm.openDialogUnPublic = true;
      }
    },
    handlePublicDate() {
      const vm = this;
      if (vm.$refs.formPublicDateHandBookRef.validateForm()) {
        const formData = vm.$refs.formPublicDateHandBookRef.formData;
        const dataPayload = { ...vm.dataItem, ...formData };
        dataPayload.NgayXuatBan = !dataPayload.NgayXuatBan
          ? ""
          : moment(dataPayload.NgayXuatBan, "DD/MM/YYYY").valueOf();
        dataPayload.NgayHuyXuatBan = !dataPayload.NgayHuyXuatBan
          ? ""
          : moment(dataPayload.NgayHuyXuatBan, "DD/MM/YYYY").valueOf();
        console.log("dataPayload: ", dataPayload, formData);
        const payload = {
          payload: dataPayload,
          type: "camnang",
          id: vm.dataItem.PrimKey,
        };

        vm.$store
          .dispatch("editItemData", payload)
          .then(function (response) {
            toastr.success("Cập nhật thành công");
            vm.dialogPublicDate = false;
            vm.listHandBook = vm.listHandBook.reduce(function (res, cur) {
              if (vm.dataItem.PrimKey === cur.PrimKey) {
                return [
                  ...res,
                  {
                    ...cur,
                    ...dataPayload,
                  },
                ];
              } else {
                return [...res, cur];
              }
            }, []);
            vm.dataEdit = {};
            console.log("res edit: ", response, dataPayload, formData);
          })
          .catch(function () {
            vm.loadingData = false;
            toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
          });
      }
    },
    handleUnPublicDate() {
      const vm = this;
      if (vm.$refs.formUnPublicDateHandBookRef.validateForm()) {
        console.log(
          "formdata: ",
          vm.$refs.formUnPublicDateHandBookRef,
          vm.dataItem
        );

        const dataPayload = { ...vm.dataItem };

        if (vm.$refs.formUnPublicDateHandBookRef.status) {
          dataPayload.TrangThai = "1";
        } else {
          dataPayload.NgayHuyXuatBan = moment(
            vm.$refs.formUnPublicDateHandBookRef.textDate,
            "DD/MM/YYYY"
          ).valueOf();
        }
        const payload = {
          payload: dataPayload,
          type: "camnang",
          id: dataPayload.PrimKey,
        };
        vm.$store
          .dispatch("editItemData", payload)
          .then(function (response) {
            toastr.success("Cập nhật thành công");
            vm.openDialogUnPublic = false;
            vm.listHandBook = vm.listHandBook.reduce(function (res, cur) {
              if (vm.dataItem.PrimKey === cur.PrimKey) {
                return [
                  ...res,
                  {
                    ...cur,
                    ...response.data.resp,
                  },
                ];
              } else {
                return [...res, cur];
              }
            }, []);
            console.log(vm.listHandBook, dataPayload);
          })
          .catch(function () {
            vm.loadingData = false;
            toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
          });
      }
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formHandBookRef.validateForm()) {
        const formData = vm.$refs.formHandBookRef.formData;
        const arrData = vm.$refs.formHandBookRef.arrData;
        const arrDataContent = vm.$refs.formHandBookRef.arrDataContent;
        const arrUrl = vm.$refs.formHandBookRef.arrUrl;
        const obj = {
          TenCamNang: formData.TenCamNang || "",
          AnhDaiDien: formData.AnhDaiDien || "",
          MucLuc: arrData,
          NoiDung: arrDataContent.map((el, index) => ({
            SoTrang: el.SoTrang,
            Attachment: arrUrl[index],
            id: el.id,
          })),

          Type: "CamNangHoaLac",
        };
        const dataPayload = {
          ...formData,
          Content: JSON.stringify(obj),
          TrangThai: "1",
        };
        dataPayload.MddChuyenMuc = formData.MddChuyenMuc.value;
        delete dataPayload.AnhDaiDien;
        delete dataPayload.MucLuc;
        delete dataPayload.NoiDung;
        delete dataPayload.TenCamNang;

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "camnang",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              vm.dialogForm = false;
              console.log("res post: ", response);

              const data = [...vm.listHandBook];
              data.push({
                ...dataPayload,
                ...JSON.parse(dataPayload.Content),
                MaDinhDanh: response.data.resp.MaDinhDanh,
                PrimKey: response.data.resp.PrimKey,
                TenMucCon: obj.MucLuc.map((item) => item.TenDauMuc).join(", "),
              });
              console.log("DATA:", data);
              vm.listHandBook = data;
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        } else {
          const payload = {
            payload: dataPayload,
            type: "camnang",
            id: vm.dataEdit.PrimKey,
          };
          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.getListHandBook();
              console.log("res edit: ", response, vm.dataEdit.PrimKey);
              vm.dataEdit = {};
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log("submit", formData, dataPayload, obj);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-position {
  position: absolute;
  margin-left: 50%;
  bottom: 2%;
  transform: translateX(-50%);
}
</style>