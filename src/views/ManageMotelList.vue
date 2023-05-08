<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn
        depressed
        class="mx-3"
        small
        color="primary"
        @click="showAdvanceSearch()"
      >
        <v-icon size="18" v-if="!advanceSearch">mdi-filter-variant-plus</v-icon>
        <v-icon size="18" v-else>mdi-filter-variant</v-icon>
        &nbsp; Tìm kiếm
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

    <v-card outlined elevation="0" class="mt-5" v-if="advanceSearch">
      <v-container>
       

        <v-row>
          <v-col cols="12" sm="4">
            <div class="mb-2">Tên chủ phòng trọ:</div>
            <div>
              <v-text-field
                v-model="textSearch"
                solo
                placeholder="Nhập nội dung..."
                dense
                hide-details="auto"
                class="input-form"
                hide-no-data
                clearable
              ></v-text-field>
            </div>
          
          </v-col>
          <v-col cols="12" sm="4">
            <div class="mb-2">Giá tiền:</div>
            <v-layout wrap>
              <v-flex xs6 class="pr-2">
                <v-text-field
                  v-model="priceValueFrom"
                  solo
                  placeholder="Từ..."
                  dense
                  hide-details="auto"
                  class="input-form"
                  hide-no-data
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs6 class="">
                <v-text-field
                  v-model="priceValueTo"
                  solo
                  placeholder="Đến..."
                  dense
                  hide-details="auto"
                  class="input-form"
                  hide-no-data
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="mb-2">Ngày đăng:</div>
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
          <v-col cols="12" class="flex" style="text-align: right">
            <v-btn
              depressed
              class="mx-0"
              small
              color="primary"
              @click="getListMotelInforFilter()"
            >
              <v-icon size="18">mdi-magnify</v-icon>
              &nbsp; Tìm kiếm
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-row class="my-0 mb-3">
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listMotel"
          :items-per-page="itemsPerPage"
          item-key="PrimKey"
          hide-default-footer
          class="table-base mt-0 pt-0"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
        >
          <template v-slot:item.stt="{ index }">
            {{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>
          <template v-slot:item.thaotac="{ item }" v-if="isAdmin">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="editMotel(item)"
                >
                  <v-icon size="18">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Sửa</span>
            </v-tooltip>
            <!-- <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="deleteMotelInfor(item)"
                >
                  <v-icon size="18">mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Xóa</span>
            </v-tooltip> -->
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
    <!-- <div v-if="dialogForm">
      <v-dialog v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Chi tiết góp ý, trả lời</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <DetailsFeedback :dataEdit="dataEdit" />

          <v-card-text class="px-2 py-2" style="background: #eee">
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
                @click.native="dialogFormAnswer = true"
              >
                <v-icon left dark size="18">
                  mdi-file-document-plus-outline
                </v-icon>
                <span v-if="edittingForm">Cập nhật câu trả lời</span>
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div> -->

    <div v-if="dialogForm">
      <v-dialog max-width="1000" v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật thông tin nhà trọ</v-toolbar-title
            >
            <v-toolbar-title v-else>Thêm mới thông tin nhà trọ</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormNhaTro
            ref="formMotelRef"
            :dataEdit="dataEdit"
            :listMotelInforData="listMotelInforData"
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
                @click="closeModal"
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
    <!-- <v-dialog v-model="dialogDelete" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Bạn có muốn xóa không? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogDelete = false">
            Từ chối
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteMotelInfor">
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import toastr from "toastr";
import FormNhaTro from "@/views/FormNhaTro";
import moment from "moment";

export default {
  components: {
    Pagination,
    FormNhaTro,
  },

  data() {
    return {
      advanceSearch: false,
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
          text: "Tên chủ nhà",
          align: "left",
          value: "NhaTro.TenChuNha",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Giá tiền (Đơn vị: VNĐ)",
          align: "left",
          value: "GiaTien",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Diện tích phòng (Đơn vị: m2)",
          align: "center",
          value: "DienTichPhong",
          class: "th-center",
        },
        // {
        //   sortable: false,
        //   text: "Thiết bị trong phòng",
        //   align: "center",
        //   value: "",
        //   class: "th-center",
        // },
        {
          sortable: false,
          text: "Thao tác",
          align: "center",
          value: "thaotac",
          class: "th-center",
          width: 150,
        },
      ],
      listMotel: [],
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
      idMotel: "",
      emitDataFile: null,
      dialogFormAnswer: false,
      listProvince: [],
      listDistrict: [],
      listWards: [],
      provinceValue: "",
      districtValue: "",
      wardsValue: "",
      priceValueTo: "",
      priceValueFrom: "",
      acreageValue: 20,
      listMotelInforData: [],
      toggleShowMenuStartDateSend: false,
      dateStartSend: "",
      toggleShowMenuEndDateSend: false,
      dateEndSend: "",
      textDateStartSend: "",
      textDateEndSend: "",
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
          if(!value) return true
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
             if(!value) return true
            return (
              status ||
              `Ngày nhập không được sau ngày ${moment(
                this.textDateEndSend,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY")}`
            );
          }
        },
        checkDateInputEndSend: (value) => {
          if (this.textDateStartSend) {
            const getDate = moment(
              this.textDateStartSend,
              "DD/MM/YYYY"
            ).valueOf();
            const getDateInput = moment(value, "DD/MM/YYYY").valueOf();
            const status = getDate - getDateInput > 0 ? false : true;
             if(!value) return true
            return (
              status ||
              `Ngày nhập không được sau ngày ${moment(
                this.textDateStartSend,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY")}`
            );
          }
        },
      },
    };
  },
  created() {
    const vm = this;
    console.log("route", vm.$router.currentRoute.params.name);
    if (vm.$router.currentRoute.params.name)
      vm.getListData({
        type: "phongtro",
        params: { keyword: vm.$router.currentRoute.params.name },
      });
    else vm.getListData({ type: "phongtro" });

    vm.getListData({ type: "nhatro" });
  },

  mounted() {
    // console.log("select: ", this.selected);
  },

  methods: {
    showAdvanceSearch() {
      let vm = this;
      vm.advanceSearch = !vm.advanceSearch;
    },
    getListMotelInforFilter() {
      const vm = this;

const params = {}

if(vm.textSearch) {
params.keyword = vm.textSearch
}
if(vm.priceValueFrom) {
params.GiaTienFrom = vm.priceValueFrom
}
if(vm.priceValueTo) {
params.GiaTienTo = vm.priceValueTo
}
if(vm.textDateStartSend) {

params.NgayUpdateFrom = moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf()
}
if(vm.textDateEndSend) {
params.NgayUpdateTo = moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf()
}

      vm.getListData({
        params,
        type: "phongtro"
      });
      console.log("params search: ", vm.textSearch, vm.acreageValue);
    },
    getListData(dataParams) {
      let vm = this;
      vm.loadingData = true;
      const dataPayload = {
        page: 0,
        size: 15,
      };
      const filter = {
        collectionName: dataParams?.type ? dataParams?.type : "phongtro",
        data: !dataParams?.params
          ? dataPayload
          : { ...dataPayload, ...dataParams?.params },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          console.log("responseMotel: ", response.content);

          if (dataParams?.type === "phongtro") vm.listMotel = response.content;
          else vm.listMotelInforData = response.content;
           vm.total = vm.listMotelInforData.length;
          vm.pageCount = response.totalPages;
          vm.page = response.pageable.pageNumber
          vm.loadingData = false;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    openDialogDeleteItem(item) {
      const vm = this;
      console.log("id delete: ", item.PrimKey);
      vm.dialogDelete = true;
      vm.idMotel = item.PrimKey;
    },
    deleteMotelInfor(item) {
             const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "phongtro",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa phòng trọ",
        message: "Bạn có chắc chắn muốn xóa phòng trọ này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
          vm.listMotel = vm.listMotel.reduce(function (res, cur) {
            if (item.PrimKey !== cur.PrimKey) res.push(cur);
            return res;
          }, []);
          vm.total = vm.listMotel.length;

          console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editMotel(item) {
      const vm = this;
      vm.dataEdit = {
        ...item,
      };
      vm.edittingForm = true;
      // console.log("item edit: ", item);
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListData({
        param: { ...pageCurent },
      });
    },
    showModalForm() {
      const vm = this;
      vm.dialogForm = true;
      vm.edittingForm = false;
    },
    // closeModalForm() {
    //   const vm = this;
    //   vm.dialogForm = false;
    //   vm.dataEdit = {};
    // },
    closeModal() {
      const vm = this;
      vm.dialogForm = false;
      vm.dataEdit = {};
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formMotelRef.validateForm()) {
        const formData = vm.$refs.formMotelRef.formData;
        const listDevice = vm.$refs.formMotelRef.arrData;

        const dataPayload = {
          ...formData,
          NgayDang: formData.NgayDang
            ? moment(formData.NgayDang, "DD/MM/YYYY").valueOf()
            : "",
          SoDienThoai: vm.listMotelInforData.filter(
            (item) => item.MaDinhDanh === formData.MddNhaTro
          )[0].SoDienThoai,
          ThietBi: JSON.stringify(listDevice),
        };

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "phongtro",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listMotel.length < vm.itemsPerPage) {
                const data = [...vm.listMotel];
                data.push({
                  ...dataPayload,
                  MaDinhDanh: response.data.resp.MaDinhDanh,
                  PrimKey: response.data.resp.PrimKey,
                  NhaTro: response.data.resp.NhaTro,
                });
                vm.listMotel = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listMotel.length;
            })
            .catch(function (err) {
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
              vm.loadingData = false;
            });
        } else {
          const payload = {
            payload: dataPayload,
            type: "phongtro",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.listMotel = vm.listMotel.reduce(function (res, cur) {
                if (vm.dataEdit.PrimKey === cur.PrimKey) {
                  return [
                    ...res,
                    {
                      ...cur,
                      ...dataPayload,
                      NhaTro: response.data.resp.NhaTro,
                      MainImage: response.data.resp.MainImage,
                    },
                  ];
                } else {
                  return [...res, cur];
                }
              }, []);
              vm.dataEdit = {};
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log("submit", formData, listDevice, dataPayload);
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
  computed: {
    getListProvince() {
      const vm = this;
      const options = vm.listProvince.map((item) => ({
        text: item.tenMuc,
        value: item.PrimKey,
      }));
      return options;
    },
    getListDistrict() {
      const vm = this;
      const options = vm.listDistrict.map((item) => ({
        text: item.tenMuc,
        value: item.PrimKey,
      }));
      return options;
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

<style lang="scss" scoped>
</style>
