<template>
  <div>
   

    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <div style="float: right">
          <v-btn
            v-if="checkActionAddAndUpdate"
            small
            color="primary"
            class="btn-form mx-4 text-white"
            @click="toggleAdvanceSearch = !toggleAdvanceSearch"
          >
            <v-icon size="18" v-if="!toggleAdvanceSearch"
              >mdi-filter-variant-plus</v-icon
            >
            <v-icon size="18" v-else>mdi-filter-variant</v-icon>&nbsp; Tìm kiếm
          </v-btn>
          <v-btn
            v-if="checkActionAddAndUpdate"
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

    <v-card outlined elevation="0" class="mt-5 py-4" v-if="toggleAdvanceSearch">
       <v-form ref="formSearchRef" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <div class="mb-2">Tên bài viết</div>
            <v-text-field
              class="input-form"
              v-model="textSearch"
              solo
              dense
              clearable
              @input="handleChangeText"
              hide-details="auto"
              placeholder="Nhập từ khóa tìm kiếm"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="px-2" sm="4">
            <div class="mb-2">Chuyên mục bài viết</div>
            <div>
              <v-autocomplete
                class="flex input-form"
                hide-no-data
                :items="optionCategoryNews"
                v-model="chuyenMucSearch"
                item-text="text"
                item-value="value"
                dense
                solo
                multiple
                hide-details="auto"
                clearable
                return-object
                @change="getListNewsFilter('CM')"
                placeholder="Chuyên mục"
              >
              </v-autocomplete>
            </div>
          </v-col>

          <v-col cols="12" sm="4">
            <div class="mb-2">Tình trạng bài viết</div>
            <div>
              <v-autocomplete
                class="flex input-form"
                hide-no-data
                :items="listTinhTrang"
                v-model="tinhTrangSearch"
                item-text="name"
                item-value="value"
                dense
                solo
                hide-details="auto"
                clearable
                return-object
                @change="getListNewsFilter('TT')"
                placeholder="Tình trạng"
              >
              </v-autocomplete>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="mb-2">Ngày tạo bài viết</div>
            <div class="d-flex justify-end">
              <v-flex class="mr-4">
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
                      @input="handleChangeDate"
                      v-model="textDateStartSend"
                      placeholder="Từ ngày..."
                      persistent-hint
                      prepend-icon=""
                      v-bind="attrs"
                      @blur="dateStartSend = parseDate(textDateStartSend)"
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
              <v-flex class="">
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
                      @input="handleChangeDate"
                      clearable
                      class="flex input-form"
                      v-model="textDateEndSend"
                      placeholder="Đến ngày..."
                      persistent-hint
                      prepend-icon=""
                      v-bind="attrs"
                      @blur="dateEndSend = parseDate(textDateEndSend)"
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
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="d-flex justify-end">
              <v-btn
                v-if="checkActionAddAndUpdate"
                small
                color="primary"
                class="btn-form mx-0 text-white"
                @click="getListNewsFilter"
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
          :items="listNews"
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
            {{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>
          <template v-slot:item.TinhTrang="{ item, index }">
            {{ item.TinhTrang | TenTinhTrang }}
          </template>
          <template v-slot:item.thaotac="{ item }" >
            <v-tooltip top v-if="item.TinhTrang == '0'">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="editNews(item)"
                  class="mr-2"
                >
                  <v-icon size="18">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Sửa</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="checkActionPublish || checkActionUnPublish || isAdmin"
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openDialogPublicDate(item)"
                >
                  <v-icon size="18" v-if="item.TinhTrang == 2" color="orange"
                    >mdi-close-octagon-outline</v-icon
                  >
                  <v-icon size="18" v-else>mdi-file-export-outline</v-icon>
                </v-btn>
              </template>
              <span>{{
                item.TinhTrang === "2" ? "Ngừng xuất bản" : "Xuất bản"
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
                  @click.stop="handleShowNews(item)"
                >
                  <v-icon size="18">mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Xem bài viết</span>
            </v-tooltip>

            <v-tooltip top v-if="item.TinhTrang !== '2'">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openDialogDeleteItem(item)"
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
        />
      </v-col>
    </v-row>
    <div v-if="dialogForm">
      <v-dialog max-width="1200" v-model="dialogForm" persistent fullscreen>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật bài viết tin tức</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới bài viết tin tức</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormBaiVietTinTuc
            ref="formBaiVietTinTucRef"
            :dataEdit="dataEdit"
            @emitDataAgencies="handleEmitDataAgencies"
            @emitDataCategoryNews="handleEmitDataCategoryNews"
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
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

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
                  <FormPublicDate
                    :dataItem="dataItem"
                    ref="formPublicDateRef"
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
                  <FormUnPublicDate
                    :dataItem="dataItem"
                    ref="formUnPublicDateRef"
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
import toastr from "toastr";
import moment from "moment";
import FormBaiVietTinTuc from "@/views/FormBaiVietTinTuc";
import FormPublicDate from "@/views/FormPublicDate";
import { actionAuthor } from "../constant/actionAuthor";
import { useAccountAuthorization } from "../mixin";
import { textAuthor } from "../constant/textAuthorView";
import { mapState } from "vuex";
import FormUnPublicDate from "@/views/FormUnPublicDate";

export default {
  components: {
    Pagination,
    FormBaiVietTinTuc,
    FormPublicDate,
    FormUnPublicDate,
  },

  mixins: [useAccountAuthorization],

  data() {
    return {
      switch1: true,
      timeOut: null,
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
          text: "Tên bài viết",
          align: "left",
          value: "TenBaiViet",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Tình trạng",
          align: "left",
          value: "TinhTrang",
          class: "th-center",
          width: 200,
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
      listNews: [],
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
      dialogDelete: false,
      idNews: "",
      dialogDecentralization: false,
      dataEditNews: [],
      emitDataAgencies: [],
      emitDataCategoryNews: [],
      dialogPublicDate: false,
      dataItem: {},
      checkViewNews: "",
      checkActionAddAndUpdate: "",
      checkActionPublish: "",
      checkActionUnPublish: "",
      inforAccount: "",
      donViSearch: "",
      listTinhTrang: [
        { name: "Bản nháp", value: "0" },
        { name: "Ngừng xuất bản", value: "1" },
        { name: "Xuất bản", value: "2" },
      ],
      tinhTrangSearch: "",
      chuyenMucSearch: "",
      optionCategoryNews: [],
      toggleAdvanceSearch: false,
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
          return (
            status ||
            `Ngày nhập không được sau ngày ${moment(
              new Date(),
              "DD/MM/YYYY"
            ).format("DD/MM/YYYY")}`
          );
        },
        checkDateInputStartSend: (value) => {
          if (this.textDateEndSend) {
            const getDate = moment(
              this.textDateEndSend,
              "DD/MM/YYYY"
            ).valueOf();
            const getDateInput = moment(value, "DD/MM/YYYY").valueOf();
            const status = getDate - getDateInput > 0 ? true : false;
            return (
              status ||
              `Ngày nhập không được sau ngày ${moment(
                this.textDateEndSend,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY")}`
            );
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
      toggleShowMenuStartDateSend: false,
      dateStartSend: "",
      toggleShowMenuEndDateSend: false,
      dateEndSend: "",
      textDateStartSend: "",
      textDateEndSend: "",
      openDialogUnPublic: false,
    };
  },
  created() {
    const vm = this;

    vm.inforAccount = vm.$cookies.get("UserInfo", "");

    vm.checkActionPublish = vm.handleCheckActionAuthor(
      actionAuthor.XUAT_BAN_TIN_BAI
    );

    vm.checkActionUnPublish = vm.handleCheckActionAuthor(
      actionAuthor.HUY_XUAT_BAN_TIN_BAI
    );

    vm.checkViewNews = vm.handleCheckAuthor(
      actionAuthor.XEM_TIN_BAI_ALL,
      actionAuthor.XEM_TIN_BAI_DV
    );

    vm.checkActionAddAndUpdate = vm.handleCheckAuthor(
      actionAuthor.CAP_NHAT_TIN_BAI_ALL,
      actionAuthor.CAP_NHAT_TIN_BAI_DV
    );

    console.log(vm.checkViewNews, vm.checkActionAddAndUpdate);

    if (vm.checkViewNews === textAuthor.ALL) {
      vm.getListNews();
    } else {
      vm.getListNews({ MaHanhChinhDonViSearch: vm.inforAccount.MaDonVi });
    }
    vm.getList("chuyenmuctintuc", {NgayTaoFrom: 0, 
        NgayTaoTo: 0});
  },

  mounted() {
    console.log("select: ");
  },
  computed: {
    ...mapState(["listAgencies"]),
    optionAgencies() {
      const vm = this;
      const result = vm.listAgencies.map((item) => ({
        text: item.tenGoi,
        value: item.maHanhChinh,
      }));
      if (vm.listAgencies.length) return result;
      return [];
    },
  },
  methods: {
    getListNewsFilter(type) {
      const vm = this;
      switch (type) {
        case "TT":
          vm.getListNews({
            MaHanhChinhDonViSearch: vm.donViSearch
              ? vm.donViSearch.maHanhChinh
              : "",
          });
          break;

        case "CM":
          const stringListStatusSearch = vm.chuyenMucSearch
            .map((item) => item.value)
            .join(",");
          vm.getListNews({
            ListMaDinhDanhChuyenMucSearch: stringListStatusSearch,
          });
          break;

        default:
            if (vm.$refs.formSearchRef.validate()){
              vm.getListNews({
                keyword: vm.textSearch,
                NgayTaoFrom: vm.textDateStartSend
                  ? moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf()
                  : "",
                NgayTaoTo: vm.textDateEndSend
                  ? moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf()
                  : "",
              });
            }
          break;
      }
    },
    getListNews(dataParam) {
      let vm = this;
      vm.loadingData = true;
      const dataPayload = {
        page: 0,
        size: 20,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        TinhTrang: vm.tinhTrangSearch ? vm.tinhTrangSearch.value : "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName: "baiviettintuc",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.listNews = response.content;
          console.log("res: ", vm.listNews);
          vm.total = vm.listNews.length;
          vm.pageCount = response.totalPages;
           vm.page = response.pageable.pageNumber
          vm.loadingData = false;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    getList(collectionName, data) {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 200,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName,
        data: !data ? dataPayload : {...dataPayload, ...data},
      };
      vm.$store.dispatch("collectionFilter", filter).then(function (response) {
        const responseData = response.content;
        vm.$emit("emitDataCategoryNews", responseData);
        vm.optionCategoryNews = responseData.map((item) => ({
          text: item.TenChuyenMuc,
          value: item.MaDinhDanh,
        }));
      });
    },
    openDialogDeleteItem(item) {
      const vm = this;
      vm.idNews = item.PrimKey;
      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa bài viết tin tức",
        message: "Bạn có chắc chắn muốn xóa bài viết này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          const payload = {
            payload: vm.idNews,
            type: "baiviettintuc",
          };
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
              vm.listNews = vm.listNews.reduce(function (res, cur) {
                if (vm.idNews !== cur.PrimKey) res.push(cur);
                return res;
              }, []);
              vm.total = vm.listNews.length;

              console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editNews(item) {
      const vm = this;
      const dataEdit = {
        ...item,
        CoQuanDonVi: {
          MaHanhChinh: item.CoQuanDonVi.MaHanhChinh,
          TenGoi: item.CoQuanDonVi.TenGoi,
        },
      };
      vm.edittingForm = true;
      console.log("item edit: ", item);
      vm.dataEdit = dataEdit;
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListNews(pageCurent);
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
    handleEmitDataAgencies(data) {
      const vm = this;
      vm.emitDataAgencies = data;
    },
    handleEmitDataCategoryNews(data) {
      const vm = this;
      vm.emitDataCategoryNews = data;
    },
    openDialogPublicDate(item) {
      const vm = this;
      vm.dataItem = item;
      if (item.TinhTrang !== "2") {
        vm.dialogPublicDate = true;
      } else {
        vm.openDialogUnPublic = true;

        // item.TinhTrang = "1";

        //   const payload = {
        //     payload: item,
        //     type: "baiviettintuc",
        //     id: item.PrimKey,
        //   };

        //   vm.$store
        //     .dispatch("editItemData", payload)
        //     .then(function (response) {
        //       toastr.success("Cập nhật thành công");
        //       vm.dialogForm = false;
        //       vm.listNews = vm.listNews.reduce(function (res, cur) {
        //         if (item.PrimKey === cur.PrimKey) {
        //           return [
        //             ...res,
        //             {
        //               ...cur,
        //               ...response.data.resp,
        //             },
        //           ];
        //         } else {
        //           return [...res, cur];
        //         }
        //       }, []);
        //       console.log(vm.listNews);
        //     })
        //     .catch(function () {
        //       vm.loadingData = false;
        //       toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
        //     });
      }
    },
    handlePublicDate() {
      const vm = this;
      if (vm.$refs.formPublicDateRef.validateForm()) {
        const formData = vm.$refs.formPublicDateRef.formData;
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
          type: "baiviettintuc",
          id: vm.dataItem.PrimKey,
        };

        vm.$store
          .dispatch("editItemData", payload)
          .then(function (response) {
            toastr.success("Cập nhật thành công");
            vm.dialogPublicDate = false;
            vm.listNews = vm.listNews.reduce(function (res, cur) {
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
            console.log(
              "res edit: ",
              response,
              dataPayload,
              vm.dataEdit.PrimKey,
              vm.listNews,
              formData
            );
          })
          .catch(function () {
            vm.loadingData = false;
            toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
          });
      }
    },
    handleShowNews(item) {
       window.open(`${item.DuongDanRutGon}`, "_blank")
      // window.location.href = `${item.DuongDanRutGon}`;
    },
    viewActionPublish(item) {
      const vm = this;
      let str = "";
      if (item.TinhTrang === "2" && vm.checkActionPublish) {
        str = "mdi-calendar-blank";
      } else if (item.TinhTrang === "1" && vm.checkActionUnPublish) {
        str = "mdi mdi-calendar-check";
      }
      return str;
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
    submitForm() {
      const vm = this;

      if (vm.$refs.formBaiVietTinTucRef.validateForm()) {
        const formData = vm.$refs.formBaiVietTinTucRef.formData;
        const regex =
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const dataPayload = {
          ...formData,
          NgayXuatBan:
            formData.TinhTrang === "2"
              ? moment.utc(new Date(), "DD/MM/YYYY").valueOf()
              : "",
          NgayHuyXuatBan: formData.NgayHuyXuatBan
            ? moment.utc(formData.NgayHuyXuatBan, "DD/MM/YYYY").valueOf()
            : "",
        };

        if (vm.inforAccount.hasOwnProperty("MaDonVi")) {
          dataPayload.CoQuanDonVi = {
            MaHanhChinh: vm.inforAccount.MaDonVi,
          };
        }

        dataPayload.ChuyenMuc = vm.emitDataCategoryNews.reduce((res, cur) => {
          if (formData.ChuyenMuc.includes(cur.MaDinhDanh)) {
            return [...res, { MaDinhDanhChuyenMuc: cur.MaDinhDanh }];
          } else {
            return res;
          }
        }, []);

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "baiviettintuc",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (!regex.test(formData.DuongDanRutGon)) {
                const payload = {
                  payload: {
                    DuongDanRutGon: `/#/tin-tuc/${response.data.resp.PrimKey}`,
                  },
                  type: "baiviettintuc",
                  id: response.data.resp.PrimKey,
                };

                vm.$store
                  .dispatch("editItemData", payload)
                  .then(function (response) {
                    vm.getListNews();
                    console.log(
                      "res edit:... ",
                      response,
                      dataPayload,
                      vm.dataEdit.PrimKey,
                      vm.listNews
                    );
                  })
                  .catch(function () {
                    vm.loadingData = false;
                    toastr.error("Lỗi cập nhật id");
                  });
              } else {
                vm.getListNews();
              }

              vm.dialogForm = false;
              console.log("res post: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        } else {
          if (!regex.test(dataPayload.DuongDanRutGon))
            dataPayload.DuongDanRutGon = `/#/tin-tuc/${vm.dataEdit.PrimKey}`;

          const payload = {
            payload: dataPayload,
            type: "baiviettintuc",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.listNews = vm.listNews.reduce(function (res, cur) {
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
              }, []);

              vm.dataEdit = {};
              console.log(
                "res edit: ",
                response,
                dataPayload,
                vm.dataEdit.PrimKey,
                vm.listNews
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
    handleChangeText(value) {
      const vm = this;
      if (vm.timeOut) clearTimeout(vm.timeOut);
      if (!value) {
        vm.timeOut = setTimeout(() => {
          vm.getListNews();
        }, 200);
      }
    },
    handleChangeDate() {
      const vm = this;
      if (!vm.textDateStartSend && !vm.textDateEndSend) vm.getListNews();
    },
    handleUnPublicDate() {
      const vm = this;
      if (vm.$refs.formUnPublicDateRef.validateForm()) {
        console.log("formdata: ", vm.$refs.formUnPublicDateRef, vm.dataItem);

        const dataPayload = { ...vm.dataItem };

        if (vm.$refs.formUnPublicDateRef.status) {
          dataPayload.TinhTrang = "1";
        } else {
          dataPayload.NgayHuyXuatBan = moment(
            vm.$refs.formUnPublicDateRef.textDate,
            "DD/MM/YYYY"
          ).valueOf();
        }
        const payload = {
          payload: dataPayload,
          type: "baiviettintuc",
          id: dataPayload.PrimKey,
        };
        vm.$store
          .dispatch("editItemData", payload)
          .then(function (response) {
            toastr.success("Cập nhật thành công");
            vm.openDialogUnPublic = false;
            vm.listNews = vm.listNews.reduce(function (res, cur) {
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
            console.log(vm.listNews);
          })
          .catch(function () {
            vm.loadingData = false;
            toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
          });
      }
    },
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
  filters: {
    TenTinhTrang: function (value) {
      if (!value) return "";
      switch (value) {
        case "0":
          return "Bản nháp";
        case "1":
          return "Ngừng xuất bản";
        case "2":
          return "Xuất bản";
        default:
          return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
