<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12">
        <div style="float: right">
       
          <v-btn
            small
            color="primary"
            class="btn-form mr-3 text-white"
            @click="toggleAdvanceSearch = !toggleAdvanceSearch"
          >
            <v-icon size="18" v-if="!toggleAdvanceSearch"
              >mdi-filter-variant-plus</v-icon
            >
            <v-icon size="18" v-else>mdi-filter-variant</v-icon>&nbsp; Tìm kiếm
          </v-btn>
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

    <v-card outlined elevation="0" class="mt-5" v-if="toggleAdvanceSearch">
      <v-form ref="formSearchRef" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="mb-2">Nhập tên chuyên mục:</div>
              <v-text-field
                class="input-form"
                v-model="textNameSearch"
                solo
                dense
                clearable
                hide-details="auto"
                placeholder="Nhập từ khóa tìm kiếm"
                @click:clear="getListCategoryHandBookFilter('clear')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="mb-2">Nhập mã chuyên mục:</div>
              <v-text-field
                class="input-form"
                v-model="textSearch"
                solo
                dense
                clearable
                hide-details="auto"
                placeholder="Nhập từ khóa tìm kiếm"
                @click:clear="getListCategoryHandBookFilter('clear')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="px-2" sm="12">
              <div class="mb-2">Ngày tạo:</div>
              <div>
                <v-layout wrap>
                  <v-flex xs6 class="pr-2">
                    <v-menu
                      v-model="toggleShowMenuStartDateSend"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="flex input-form"
                          :rules="[
                            rules.date,
                            rules.checkDateNow,
                            rules.checkDateInputStartSend,
                          ]"
                          clearable
                          v-model="textDateStartSend"
                          placeholder="Từ ngày..."
                          persistent-hint
                          prepend-icon=""
                          v-bind="attrs"
                          @blur="dateStartSend = parseDate(textDateStartSend)"
                          @input="handleChangeDate()"
                          v-on="on"
                          solo
                          dense
                          hide-details="auto"
                          hide-no-data
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateStartSend"
                        no-title
                        @input="toggleShowMenuStartDateSend = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs6 class="">
                    <v-menu
                      v-model="toggleShowMenuEndDateSend"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="[
                            rules.date,
                            rules.checkDateNow,
                            rules.checkDateInputEndSend,
                          ]"
                          clearable
                          class="flex input-form"
                          v-model="textDateEndSend"
                          placeholder="Đến ngày..."
                          persistent-hint
                          prepend-icon=""
                          v-bind="attrs"
                          @blur="dateEndSend = parseDate(textDateEndSend)"
                          @input="handleChangeDate()"
                          v-on="on"
                          solo
                          dense
                          hide-details="auto"
                          hide-no-data
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateEndSend"
                        no-title
                        @input="toggleShowMenuEndDateSend = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <div class="d-flex justify-end">
                <v-btn
                  small
                  color="primary"
                  class="btn-form mx-0 text-white"
                  @click="getListCategoryHandBookFilter('')"
                >
                  <v-icon size="18">mdi-magnify</v-icon>&nbsp; Tìm kiếm
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <v-row class="my-0 mb-3">
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listCategoryHandBook"
          :items-per-page="itemsPerPage"
          item-key="PrimKey"
          hide-default-footer
          class="table-base mt-2"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
        >
          <template v-slot:item.stt="{ index }">
            {{(page+1) * itemsPerPage - itemsPerPage + index + 1 }}
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
                  @click.stop="editCategoryHandBook(item)"
                >
                  <v-icon size="18">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Sửa</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="deleteCategoryHandBook(item)"
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
      <v-dialog max-width="1000" v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật chuyên mục cẩm nang Hòa Lạc</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới chuyên mục cẩm nang Hòa Lạc</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormTypeHandBook
            ref="formChuyenMucCamNangRef"
            :dataEdit="dataEdit"
          />

          <v-card-text class="px-2 py-2">
            <v-card-actions class="justify-center my-4">
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
                Thoát
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
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <!-- <v-dialog v-model="dialogDelete" persistent max-width="286">
      <v-card>
        <v-toolbar dark color="primary">
          <v-card-title class="text-h7 text-center">
            Bạn có muốn xóa không?
          </v-card-title>
        </v-toolbar>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogDelete = false">
            Từ chối
          </v-btn>
          <v-btn color="primary" text @click="deleteCategoryHandBook">
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-dialog
      v-if="dialogMenu"
      v-model="dialogMenu"
      persistent
      max-width="700px"
    >
      <v-card>
        <v-toolbar dark color="primary" class="px-3">
          <span class="text-h5">Phân quyền chuyên mục tin tức</span>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="px-0">
                <FormPhanQuyenChuyenMucCamNang
                  ref="formPhanQuyenChuyenMucCamNangRef"
                  :dataTypeHandBook="listCategoryHandBook"
                  :dataSelectEditCategoryHandBook="
                    dataSelectEditCategoryHandBook
                  "
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
            @click="dialogMenu = false"
          >
            <v-icon left> mdi-close </v-icon>
            Thoát
          </v-btn>
          <v-btn
            v-if="!readonlyForm"
            small
            depressed
            class="mr-2"
            color="primary"
            :loading="loadingAction"
            :disabled="loadingAction"
            @click="handleDecentralization"
          >
            <v-icon left dark size="18">
              mdi-file-document-plus-outline
            </v-icon>
            <span>Phân quyền</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import toastr from "toastr";
import moment from "moment";
import FormTypeHandBook from "@/views/FormTypeHandBook";
import FormPhanQuyenChuyenMucCamNang from "@/views/FormPhanQuyenChuyenMucCamNang";
export default {
  components: {
    Pagination,
    FormTypeHandBook,
    FormPhanQuyenChuyenMucCamNang,
  },

  data() {
    return {
      selected: [],
      textSearch: "",
      headers: [
        {
          sortable: false,
          text: "STT",
          align: "center",
          value: "stt",
          width: 70,
        },
        {
          sortable: false,
          text: "Mã chuyên mục",
          align: "left",
          value: "MaMuc",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Tên chuyên mục",
          align: "left",
          value: "TenMuc",
          class: "th-center",
        },
         {
          sortable: false,
          text: "Tên nhóm quyền",
          align: "left",
          value: "TenNhomQuyen",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Thao tác",
          align: "center",
          value: "thaotac",
          class: "th-center",
          width: 150,
        },
      ],
      toggleAdvanceSearch: false,
      listCategoryHandBook: [],
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
      // idCategoryHandBook: "",
      dialogMenu: false,
      dataSelectEditCategoryHandBook: "",
      emitDataGroup: [],
      textDateStartSend: "",
      textDateEndSend: "",
      textNameSearch: "",
      toggleShowMenuStartDateSend: false,
      dateStartSend: "",
      toggleShowMenuEndDateSend: false,
      dateEndSend: "",
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
        checkDateNow: (value) => {
          const getDatePresent = moment(new Date(), "DD/MM/YYYY").valueOf();
          const getDateInput = moment(value, "DD/MM/YYYY").valueOf();
          const status = getDatePresent - getDateInput > 0 ? true : false;

          if (!value) {
            return true;
          } else {
            return (
              status ||
              `Ngày nhập không được sau ngày ${moment(
                new Date(),
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY")}`
            );
          }
        },
        checkDateInputStartSend: (value) => {
          if (this.textDateEndSend) {
            const getDate = moment(
              this.textDateEndSend,
              "DD/MM/YYYY"
            ).valueOf();
            const getDateInput = moment(value, "DD/MM/YYYY").valueOf();
            const status = getDate - getDateInput > 0 ? true : false;

            if (!value) {
              return true;
            } else {
              return (
                status ||
                `Ngày nhập không được sau ngày ${moment(
                  this.textDateEndSend,
                  "DD/MM/YYYY"
                ).format("DD/MM/YYYY")}`
              );
            }
          }
          return true;
        },
        checkDateInputEndSend: (value) => {
          if (this.textDateStartSend) {
            const getDate = moment(
              this.textDateStartSend,
              "DD/MM/YYYY"
            ).valueOf();
            const getDateInput = moment(value, "DD/MM/YYYY").valueOf();
            const status = getDate - getDateInput > 0 ? false : true;

            if (!status) {
              return `Ngày nhập không được sau ngày ${moment(
                this.textDateStartSend,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY")}`;
            } else {
              return status;
            }
          }
          return true;
        },
      },
    };
  },
  created() {
    const vm = this;
    vm.getLisCategoryHandBook({ danhMuc_maDanhMuc: "CHUYENMUCCAMNANG" });
  },

  mounted() {
    console.log("mom: ");
  },

  watch: {
    dateStartSend() {
      const vm = this;
      vm.textDateStartSend = vm.formatDate(vm.dateStartSend);
    },
    dateEndSend() {
      const vm = this;
      vm.textDateEndSend = vm.formatDate(vm.dateEndSend);
    },
  },

  methods: {
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
    getListCategoryHandBookFilter(type) {
      const vm = this;
      console.log("search", {
        keyword: !type ? vm.textSearch : "",
        NgayTaoFrom: vm.textDateStartSend
          ? moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf()
          : "",
        NgayTaoTo: vm.textDateEndSend
          ? moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf()
          : "",
      });

      const params = {
        keyword: !type ? (vm.textNameSearch || vm.textSearch) : "",
        NgayTaoFrom: vm.textDateStartSend
          ? moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf()
          : "",
        NgayTaoTo: vm.textDateEndSend
          ? moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf()
          : "",
        danhMuc_maDanhMuc: "CHUYENMUCCAMNANG",
      };

      if (vm.textNameSearch && vm.textSearch) {
         params.keyword = "";
      }

      if (vm.$refs.formSearchRef.validate())
        vm.getLisCategoryHandBook(params);
    },
    getLisCategoryHandBook(dataParam) {
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
          console.log("res: ", response);
          vm.listCategoryHandBook = response.content;
          vm.total = vm.listCategoryHandBook.length;
          vm.pageCount = response.totalPages;
          vm.loadingData = false;
           vm.page = response.pageable.pageNumber
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    // openDialogDeleteItem(item) {
    //   const vm = this;
    //   console.log("id delete: ", item.PrimKey);
    //   vm.dialogDelete = true;
    //   vm.idCategoryHandBook = item.PrimKey;
    // },
    deleteCategoryHandBook(item) {
     const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "loaibando",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa chuyên mục cẩm nang Hòa Lac",
        message: "Bạn có chắc chắn muốn xóa chuyên mục cẩm nang Hòa Lạc này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
             toastr.success("Xóa thành công");
          vm.listCategoryHandBook = vm.listCategoryHandBook.reduce(function (
            res,
            cur
          ) {
            if (item.PrimKey !== cur.PrimKey) res.push(cur);
            return res;
          },
          []);
          vm.total = vm.listCategoryHandBook.length;

          console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editCategoryHandBook(item) {
      const vm = this;
      const dataEdit = {
        ...item,
      };
      vm.edittingForm = true;
      console.log("item edit: ", item);
      vm.dataEdit = dataEdit;
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListCadres(pageCurent);
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
    openDialogDecentralization() {
      const vm = this;
      vm.dialogMenu = true;
      vm.dataSelectEditCategoryHandBook = vm.selected.length
        ? vm.selected.map((item) => item.MaDinhDanh)
        : "";
    },
    handleDecentralization() {
      const vm = this;
      // console.log("handleCkick: ", vm.selected);

      if (vm.$refs.formPhanQuyenChuyenMucCamNangRef.validateForm()) {
        const formData = vm.$refs.formPhanQuyenChuyenMucCamNangRef.formData;

        const payloadData = vm.listCategoryHandBook.reduce((res, cur) => {
          if (formData.chuyenMuc.includes(cur.MaDinhDanh)) {
            return [
              ...res,
              {
                IdChuyenMuc: cur.PrimKey,
                PhanQuyenChuyenMuc: formData.TenNhomQuyen
                  ? formData.TenNhomQuyen.map((el) => ({
                      MaDinhDanhNhomQuyen: el,
                    }))
                  : [],
              },
            ];
          } else {
            return res;
          }
        }, []);

        // const payload = {
        //   payload: payloadData,
        //   type: "chuyenmuctintuc/many",
        // };
        // vm.$store
        //   .dispatch("createItemData", payload)
        //   .then(function (response) {
        //     toastr.success("Phân quyền thành công");
        //     vm.dialogMenu = false;
        //     vm.selected = [];
        //     vm.getLisCategoryHandBook({
        //       danhMuc_maDanhMuc: "CHUYENMUCCAMNANG",
        //     });
        //     console.log("res post: ", response);
        //   })
        //   .catch(function () {
        //     vm.loadingData = false;
        //   });

        console.log("submit", formData);
      }
    },
    handleEmitDataGroup(data) {
      const vm = this;
      vm.emitDataGroup = data;
    },
    handleChangeDate() {
      const vm = this;
      if (!vm.textDateStartSend && !vm.textDateEndSend)
        vm.getLisCategoryHandBook({ danhMuc_maDanhMuc: "CHUYENMUCCAMNANG" });
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formChuyenMucCamNangRef.validateForm()) {
        const formData = vm.$refs.formChuyenMucCamNangRef.formData;

        const dataPayload = {
          ...formData,
          DanhMuc: {
            type: "C_DanhMuc",
            MaDanhMuc: "CHUYENMUCCAMNANG",
            TenDanhMuc: "Chuyên mục cẩm nang",
          },
          TenNhomQuyen: formData.PhanQuyenChuyenMuc.text, 
          MddNhomQuyen: formData.PhanQuyenChuyenMuc.value
        };

        delete dataPayload.PhanQuyenChuyenMuc

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "dulieudanhmuc",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listCategoryHandBook.length < vm.itemsPerPage) {
                const data = [...vm.listCategoryHandBook];
                data.push({
                  ...dataPayload,
                  PrimKey: response.data.resp.PrimKey,
                });
                vm.listCategoryHandBook = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listCategoryHandBook.length;
              console.log("res post: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        } else {
          const payload = {
            payload: dataPayload,
            type: "dulieudanhmuc",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.listCategoryHandBook = vm.listCategoryHandBook.reduce(
                function (res, cur) {
                  if (vm.dataEdit.PrimKey === cur.PrimKey) {
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
                },
                []
              );
              vm.dataEdit = {};
              console.log(
                "res edit: ",
                response,
                vm.dataEdit.PrimKey,
                vm.listCategoryHandBook
              );
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log("submit", formData, dataPayload);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
