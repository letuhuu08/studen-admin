<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="12" v-if="checkActionAddAndUpdate">
        <div style="float: right">
          <v-btn
            v-if="checkActionAddAndUpdate"
            small
            color="primary"
            class="btn-form mx-3 text-white"
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

    <v-card outlined elevation="0" class="mt-5 py-4" v-if="toggleAdvanceSearch">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <div class="mb-2">Nhập từ khóa tìm kiếm:</div>
            <v-text-field
              class="input-form"
              v-model="textSearch"
              solo
              dense
              clearable
              hide-details="auto"
              placeholder="Nhập từ khóa tìm kiếm"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="px-2" sm="4">
            <div class="mb-2">Chọn trạng thái hiển thị:</div>
            <div>
              <v-autocomplete
                class="input-form"
                :items="optionDisplayStatus"
                placeholder="Trạng thái hiển thị"
                @change="getListMapFilter('TT')"
                v-model="statusSearch"
                dense
                clearable
                solo
              ></v-autocomplete>
            </div>
          </v-col>

          <v-col cols="12" sm="4">
            <div class="mb-2">Chọn khu vực:</div>
            <div>
              <v-autocomplete
                class="input-form"
                :items="listArea"
                placeholder="Khu vực"
                @change="getListMapFilter('KV')"
                v-model="areaSearch"
                dense
                clearable
                solo
              >
              </v-autocomplete>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="mb-2">Nhập tọa độ tìm kiếm:</div>
            <div class="d-flex justify-end">
              <v-flex class="mr-4">
                <v-text-field
                  class="input-form"
                  v-model="longitudeSearch"
                  solo
                  dense
                  clearable
                  hide-details="auto"
                  placeholder="Kinh độ..."
                ></v-text-field>
              </v-flex>
              <v-flex class="">
                <v-text-field
                  class="input-form"
                  v-model="latitudeSearch"
                  solo
                  dense
                  clearable
                  hide-details="auto"
                  placeholder="Vĩ độ..."
                ></v-text-field>
              </v-flex>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="mb-2">Chọn khoảng trả lời:</div>
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
                @click="getListMapFilter"
              >
                <v-icon size="18">mdi-magnify</v-icon>&nbsp; Tìm kiếm
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-row class="my-0 mb-3">
      <v-col cols="7" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listMap"
          :items-per-page="itemsPerPage"
          item-key="PrimKey"
          hide-default-footer
          class="table-base custom-table mt-2"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
          @click:row="handleDisplayMap"
          single-select
        >
          <template v-slot:item.stt="{ index }">
            {{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>
          <template v-slot:item.trangthai="{ item }">
            {{ item.TrangThaiHienThi | displayStatusMap }}
          </template>
          <template v-slot:item.thaotac="{ item }" >
            <v-tooltip top v-if="checkActionAddAndUpdate">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="editMap(item)"
                >
                  <v-icon size="18">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Sửa</span>
            </v-tooltip>

            <v-tooltip top v-if="item.TrangThaiHienThi === '1'">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#6fc750"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="handleOpenDilogConfirmDisplayStautus(item)"
                >
                  <v-icon size="18">mdi-checkbox-marked-circle</v-icon>
                </v-btn>
              </template>
              <span>Xác nhận địa điểm</span>
            </v-tooltip>

            <v-tooltip top v-if="checkActionDelete">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="deleteMap(item)"
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
      <v-col cols="5" class="pt-5">
        <MapPosition :dataProps="dataPropsMap" :listMap="listMap" />
      </v-col>
    </v-row>
    <div v-if="dialogForm">
      <v-dialog max-width="1000" v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật bản đồ</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới bản đồ</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormBanDo
            ref="formBanDoRef"
            :dataEdit="dataEdit"
            @emitDataArea="handleEmitDataArea"
            @emitDataTypeMap="handleEmitDataTypeMap"
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

    <div v-if="confirmMap">
      <v-dialog v-model="confirmMap" persistent max-width="700px">
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <span class="text-h5">Xác nhận hiển thị địa điểm bản đồ</span>
          </v-toolbar>
          <v-card-text class="px-0">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <FormConfirmMap
                    :dataItem="dataEdit"
                    ref="FormConfirmMapRef"
                    @emitDataListTypeMap="handleEmitDataListTypeMap"
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
              @click="closeDialogConfirmDisplayStatus"
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
              @click="handleComfirmMap"
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
          <v-btn color="primary" text @click="deleteMap"> Xác nhận </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import moment from "moment";
import Pagination from "./Pagination.vue";
import FormBanDo from "./FormBanDo.vue";
import FormConfirmMap from "./FormConfirmMap.vue";
import toastr from "toastr";
import { actionAuthor } from "../constant/actionAuthor";
import { useAccountAuthorization } from "../mixin";
import MapPosition from "./MapPosition.vue";

export default {
  components: {
    Pagination,
    FormBanDo,
    FormConfirmMap,
    MapPosition,
  },

  mixins: [useAccountAuthorization],

  data() {
    return {
      longitudeSearch: "",
      latitudeSearch: "",
      areaSearch: "",
      statusSearch: "",
      selected: [],
      textSearch: "",
      headers: [
        {
          sortable: false,
          text: "STT",
          align: "center",
          value: "stt",
        },
        {
          sortable: false,
          text: "Tên địa điểm",
          align: "left",
          value: "TenDiaDiem",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Khu vực",
          align: "left",
          value: "KhuVuc.TenKhuVuc",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Trạng thái hiển thị",
          align: "left",
          value: "trangthai",
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
      listMap: [],
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
      idMap: "",
      emitDataArea: [],
      emitDataTypeMap: "",
      checkActionAuthor: false,
      checkActionAddAndUpdate: "",
      checkActionDelete: "",
      optionDisplayStatus: [
        { text: "Chưa xác nhận địa điểm bản đồ", value: "1" },
        { text: "Đã xác nhận địa điểm bản đồ", value: "2" },
      ],
      confirmMap: false,
      emitDataListTypeMap: [],
      dataPropsMap: null,
      toggleAdvanceSearch: false,
      listArea: [],
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
      textDateStartSend: "",
      textDateEndSend: "",
      toggleShowMenuStartDateSend: false,
      dateStartSend: "",
      toggleShowMenuEndDateSend: false,
      dateEndSend: "",
    };
  },
  created() {
    const vm = this;

    vm.checkActionAddAndUpdate = vm.handleCheckActionAuthor(
      actionAuthor.CAP_NHAT_VA_THEM_BAN_DO
    );

    vm.checkActionDelete = vm.handleCheckActionAuthor(actionAuthor.XOA_BAN_DO);

    vm.getListData("", "BD");
    vm.getListData();

    console.log("add and update: ", vm.checkActionAddAndUpdate, actionAuthor);
  },

  mounted() {
    console.log("select: ", this.selected);
  },

  methods: {
    getListMapFilter(type) {
      const vm = this;
      console.log("tim kiếm");
      switch (type) {
        case "TT":
          vm.getListData({ TrangThaiHienThi: vm.statusSearch }, "BD");
          vm.textDateStartSend = "";
          vm.textDateEndSend = "";
          vm.textSearch = "";
          vm.longitudeSearch = "";
          vm.latitudeSearch = "";
          vm.areaSearch = "";
          break;

        case "KV":
          vm.getListData({ MddKhuVuc: vm.areaSearch }, "BD");
          vm.textDateStartSend = "";
          vm.textDateEndSend = "";
          vm.textSearch = "";
          vm.longitudeSearch = "";
          vm.latitudeSearch = "";
          vm.statusSearch = "";
          break;

        default:
          const param = {
            TenBanDoSo: vm.textSearch,
            Longitude: vm.longitudeSearch,
            Latitude: vm.latitudeSearch,
            NgayTraLoiFrom: moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf(),
            NgayTraLoiTo: moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf(),
          };
          if (!param.NgayTraLoiFrom) {
            delete param.NgayTraLoiFrom;
          }
          if (!param.NgayTraLoiTo) {
            delete param.NgayTraLoiTo;
          }
          console.log("param: ", param);
          vm.getListData(param, "BD");
          vm.areaSearch = "";
          vm.statusSearch = "";
          break;
      }
    },
    getListData(dataParam, type) {
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
        collectionName: type === "BD" ? "bandoso" : "khuvuc",
        data: !dataParam ? dataPayload : { ...dataParam, ...dataPayload },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          if (!type) {
            vm.listArea = response.content.map((item) => ({
              text: item.TenKhuVuc,
              value: item.MaDinhDanh,
            }));
          } else {
            vm.listMap = response.content.map((item) => ({
              ...item,
            }));

            console.log("res: ", vm.listMap);
            vm.total = vm.listMap.length;
            vm.page = response.pageable.pageNumber
            vm.pageCount = response.totalPages;
            vm.loadingData = false;
          }
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    // openDialogDeleteItem(item) {
    //   const vm = this;
    //   console.log("id delete: ", item.PrimKey);
    //   vm.dialogDelete = true;
    //   vm.idMap = item.PrimKey;
    // },
    deleteMap(item) {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "bandoso",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa địa điểm bản đồ",
        message: "Bạn có chắc chắn muốn xóa địa điểm này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
              vm.listMap = vm.listMap.reduce(function (res, cur) {
                if (item.PrimKey !== cur.PrimKey) res.push(cur);
                return res;
              }, []);
              vm.total = vm.listMap.length;

              console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editMap(item) {
      const vm = this;
      vm.edittingForm = true;
      console.log("item edit: ", item);
      vm.dataEdit = item;
      vm.dialogForm = true;
    },
    handleOpenDilogConfirmDisplayStautus(item) {
      const vm = this;
      vm.confirmMap = true;
      vm.dataEdit = { ...item };
    },
    handleComfirmMap() {
      const vm = this;
      if (vm.$refs.FormConfirmMapRef.validateForm()) {
        const formData = vm.$refs.FormConfirmMapRef.formData;
        const dataPayload = { ...vm.dataEdit, ...formData };

        dataPayload.LoaiBanDo = vm.emitDataListTypeMap.reduce((res, cur) => {
          if (formData.LoaiBanDo === cur.MaDinhDanh) {
            return {
              ...res,
              MddLoaiBanDo: cur.MaDinhDanh,
              TenLoaiBanDo: cur.TenLoaiBanDo,
              MaIcon: cur.MaIcon,
            };
          } else {
            return { ...res };
          }
        }, {});

        const payload = {
          payload: dataPayload,
          type: "bandoso",
          id: vm.dataEdit.PrimKey,
        };

        vm.$store
          .dispatch("editItemData", payload)
          .then(function (response) {
            toastr.success("Cập nhật thành công");
            vm.confirmMap = false;
            vm.listMap = vm.listMap.reduce(function (res, cur) {
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
    handleEmitDataListTypeMap(data) {
      const vm = this;
      vm.listTypeMap = data;
    },
    handleDisplayMap(item, row) {
      const vm = this;
      row.select(true);
      console.log("item props: ", item);
      vm.dataPropsMap = item;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListMap(pageCurent);
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
    closeDialogConfirmDisplayStatus() {
      const vm = this;
      vm.confirmMap = false;
      vm.dataEdit = {};
    },
    handleEmitDataArea(data) {
      const vm = this;
      vm.emitDataArea = data;
    },
    handleEmitDataTypeMap(data) {
      const vm = this;
      vm.emitDataTypeMap = data;
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formBanDoRef.validateForm()) {
        const formData = vm.$refs.formBanDoRef.formData;
        const dataPayload = {
          ...formData,
          ToaDo: {
            Latitude: formData.viDo,
            Longitude: formData.kinhDo,
          },
        };
        console.log("emit: ", vm.emitDataTypeMap);
        dataPayload.LoaiBanDo = vm.emitDataTypeMap.reduce((res, cur) => {
          if (formData.LoaiBanDo === cur.MaDinhDanh) {
            return {
              ...res,
              MddLoaiBanDo: cur.MaDinhDanh,
              TenLoaiBanDo: cur.TenLoaiBanDo,
              MaIcon: cur.MaIcon,
            };
          } else {
            return res;
          }
        }, {});

        dataPayload.KhuVuc = vm.emitDataArea.reduce((res, cur) => {
          if (formData.KhuVuc === cur.MaDinhDanh) {
            return {
              ...res,
              TenKhuVuc: cur.TenKhuVuc,
              ToaDo: cur.ToaDo,
              MddKhuVuc: cur.MaDinhDanh,
            };
          } else {
            return res;
          }
        }, {});

        delete dataPayload.kinhDo;
        delete dataPayload.viDo;

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "bandoso",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listMap.length < vm.itemsPerPage) {
                const data = [...vm.listMap];
                data.push({
                  ...response.data.resp,
                });
                vm.listMap = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listMap.length;
              console.log("res post: ", response);
            })
            .catch(function (err) {
              vm.loadingData = false;
            });
        } else {
          const payload = {
            payload: dataPayload,
            type: "bandoso",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;

              vm.listMap = vm.listMap.reduce((res, cur) => {
                if (vm.dataEdit.PrimKey === cur.PrimKey)
                  return [...res, { ...cur, ...response.data.resp }];
                else return [...res, cur];
              }, []);

              console.log(
                "res edit: ",
                response,
                dataPayload,
                vm.dataEdit.PrimKey,
                vm.listMap
              );
              vm.dataEdit = {};
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log(
          "submit",
          formData,
          vm.emitDataArea,
          vm.emitDataTypeMap,
          dataPayload
        );
      }
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
  filters: {
    displayStatusMap: function (value) {
      if (!value) return "";
      if (value === "2") {
        return "Đã xác nhận địa điểm";
      } else {
        return "Chưa xác nhận địa điểm";
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
};
</script>

<style>
tr.v-data-table__selected {
  background: #d5e5ec !important;
}
.custom-table table tr:not(.custom-table .v-data-table-header tr) {
  cursor: pointer;
}
</style>
