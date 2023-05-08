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
            <div class="mb-2">Nhập từ khóa tìm kiếm:</div>
            <v-text-field
              class="input-form"
              v-model="textSearch"
              solo
              dense
              clearable
              hide-details="auto"
              placeholder="Nhập từ khóa tìm kiếm"
              @click:clear="getListCategoryNewsFilter('clear')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="px-2" sm="6">
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
                @click="getListCategoryNewsFilter('')"
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
          :items="listCategoryNews"
          :items-per-page="itemsPerPage"
          item-key="PrimKey"
          hide-default-footer
          class="table-base mt-2"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
        >
          <!-- <template v-slot:item.chon="{ index }"></template> -->
          <template v-slot:item.stt="{ index }">
            {{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>
          <template v-slot:item.tinhTrang="{ item, index }">
            {{ item.TinhTrang === "2" ? "Hoạt động" : "Không hoạt động" }}
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
                  @click.stop="editCategoryNews(item)"
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
                  @click.stop="deleteCategoryNews(item)"
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
      <v-dialog max-width="1200" v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật chuyên mục tin tức</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới chuyên mục tin tức</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormchuyenMucTinTuc
            ref="formChuyenMucTinTucRef"
            :dataEdit="dataEdit"
            :listCategoryNews="listCategoryNews"
            @emitDataGroup="handleEmitDataGroup"
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
          <v-btn color="primary" text @click="deleteCategoryNews">
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
                <FormPhanQuyenChuyenMucTinTuc
                  ref="formPhanQuyenChuyenMucTinTucRef"
                  :dataCategoryNews="listCategoryNews"
                  :dataSelectEditCategoryNews="dataSelectEditCategoryNews"
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
import FormchuyenMucTinTuc from "@/views/FormchuyenMucTinTuc";
import FormPhanQuyenChuyenMucTinTuc from "@/views/FormPhanQuyenChuyenMucTinTuc";
export default {
  components: {
    Pagination,
    FormchuyenMucTinTuc,
    FormPhanQuyenChuyenMucTinTuc,
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
          value: "MaChuyenMuc",
          class: "th-center",
          width: 200,
        },
        {
          sortable: false,
          text: "Tên chuyên mục",
          align: "left",
          value: "TenChuyenMuc",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Tên nhóm quyền",
          align: "left",
          value: "tenNhomQuyen",
          class: "th-center",
          width: 250,
        },
        {
          sortable: false,
          text: "Tình trạng",
          align: "left",
          value: "tinhTrang",
          class: "th-center",
          width: 120,
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
      listCategoryNews: [],
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
      // idCategoryNews: "",
      dialogMenu: false,
      dataSelectEditCategoryNews: "",
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
            return (
              status ||
              `Ngày nhập không được sau ngày ${moment(
                this.textDateStartSend,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY")}`
            );
          }
          return true;
        },
      },
    };
  },
  created() {
    const vm = this;
    vm.getLisCategoryNews();
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
    getListCategoryNewsFilter(type) {
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

       if (vm.$refs.formSearchRef.validate()){
         vm.getLisCategoryNews({
           keyword: !type ? vm.textSearch : "",
           NgayTaoFrom: vm.textDateStartSend
             ? moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf()
             : 0,
           NgayTaoTo: vm.textDateEndSend
             ? moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf()
             : 0,
         });

       }

    },
    getLisCategoryNews(dataParam) {
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
        NgayTaoFrom: 0, 
        NgayTaoTo: 0
      };
      const filter = {
        collectionName: "chuyenmuctintuc",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.listCategoryNews = response.content.map((item) => ({
            ...item,
            tenNhomQuyen: item.ListQuyenChuyenMuc.map(
              (el) => el.TenNhomQuyen
            ).join(", "),
          }));

          // console.log("res: ", vm.listCategoryNews);
          vm.total = vm.listCategoryNews.length;
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
    //   vm.idCategoryNews = item.PrimKey;
    // },
    deleteCategoryNews(item) {
       const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "chuyenmuctintuc",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa loại chuyên mục tin tức",
        message: "Bạn có chắc chắn muốn xóa chuyên mục tin tức này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
          vm.listCategoryNews = vm.listCategoryNews.reduce(function (res, cur) {
            if (item.PrimKey !== cur.PrimKey) res.push(cur);
            return res;
          }, []);
          vm.total = vm.listCategoryNews.length;

          console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);

    },
    editCategoryNews(item) {
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
      vm.dataSelectEditCategoryNews = vm.selected.length
        ? vm.selected.map((item) => item.MaDinhDanh)
        : "";
    },
    handleDecentralization() {
      const vm = this;
      // console.log("handleCkick: ", vm.selected);

      if (vm.$refs.formPhanQuyenChuyenMucTinTucRef.validateForm()) {
        const formData = vm.$refs.formPhanQuyenChuyenMucTinTucRef.formData;

        const payloadData = vm.listCategoryNews.reduce((res, cur) => {
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

        const payload = {
          payload: payloadData,
          type: "chuyenmuctintuc/many",
        };
        vm.$store
          .dispatch("createItemData", payload)
          .then(function (response) {
            toastr.success("Phân quyền thành công");
            vm.dialogMenu = false;
            vm.selected = [];
            vm.getLisCategoryNews();
            console.log("res post: ", response);
          })
          .catch(function () {
            vm.loadingData = false;
          });

        console.log("submit", formData, payload);
      }
    },
    handleEmitDataGroup(data) {
      const vm = this;
      vm.emitDataGroup = data;
    },
    handleChangeDate() {
      const vm = this;
      if (!vm.textDateStartSend && !vm.textDateEndSend) vm.getLisCategoryNews();
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formChuyenMucTinTucRef.validateForm()) {
        const formData = vm.$refs.formChuyenMucTinTucRef.formData;
        formData.MaChuyenMuc = formData.MaChuyenMuc.replace(/ +/g, "");

        formData.PhanQuyenChuyenMuc = vm.emitDataGroup.reduce((res, cur) => {
          if (formData.PhanQuyenChuyenMuc.includes(cur.MaDinhDanh)) {
            return [...res, { MaDinhDanhNhomQuyen: cur.MaDinhDanh }];
          } else {
            return res;
          }
        }, []);

        if (!vm.edittingForm) {
          const payload = {
            payload: formData,
            type: "chuyenmuctintuc",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listCategoryNews.length < vm.itemsPerPage) {
                const data = [...vm.listCategoryNews];
                data.push({
                  ...formData,
                  PrimKey: response.data.resp.PrimKey,
                  tenNhomQuyen: response.data.resp.ListQuyenChuyenMuc.map(
                    (el) => el.TenNhomQuyen
                  ).join(", "),
                  ListQuyenChuyenMuc: response.data.resp.ListQuyenChuyenMuc,
                });
                vm.listCategoryNews = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listCategoryNews.length;
              console.log("res post: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        } else {
          const payload = {
            payload: formData,
            type: "chuyenmuctintuc",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.listCategoryNews = vm.listCategoryNews.reduce(function (
                res,
                cur
              ) {
                if (vm.dataEdit.PrimKey === cur.PrimKey) {
                  return [
                    ...res,
                    {
                      ...cur,
                      ...formData,
                      tenNhomQuyen: response.data.resp.ListQuyenChuyenMuc.map(
                        (el) => el.TenNhomQuyen
                      ).join(", "),
                      ListQuyenChuyenMuc: response.data.resp.ListQuyenChuyenMuc,
                    },
                  ];
                } else {
                  return [...res, cur];
                }
              },
              []);
              vm.dataEdit = {};
              console.log(
                "res edit: ",
                response,
                vm.dataEdit.PrimKey,
                vm.listCategoryNews
              );
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log("submit", formData);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
