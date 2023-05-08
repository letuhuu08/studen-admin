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
          @click:append="getListMotelInforFilter('')"
          @keyup.enter="getListMotelInforFilter('')"
          @click:clear="getListMotelInforFilter('clear')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="7">
        <div class="d-flex justify-end">

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
          :items="listMotelInfor"
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
          <template v-slot:item.thaotac="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="handleShowMotel(item)"
                >
                  <v-icon size="18">mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Xem phòng trọ</span>
            </v-tooltip>
            <v-tooltip top v-if="checkActionAddAndUpdate">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="editMotelInfor(item)"
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
                  @click.stop="deleteMotelInfor(item)"
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

          <FormMotelInfor
            ref="formMotelInforRef"
            :dataEdit="dataEdit"
            :listMotelInforData="listMotelInfor"
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
import FormMotelInfor from "@/views/FormMotelInfor";
import { actionAuthor } from "../constant/actionAuthor";
import { textAuthor } from "../constant/textAuthorView";
import { useAccountAuthorization } from "../mixin";

export default {
  components: {
    Pagination,
    FormMotelInfor,
  },

    mixins: [useAccountAuthorization],

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
          value: "TenChuNha",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Số điện thoại",
          align: "left",
          value: "SoDienThoai",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Địa chỉ",
          align: "center",
          value: "DiaChi",
          class: "th-center",
          width: 450,
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
      listMotelInfor: [],
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
      // idMotelInfor: "",
      dialogFormAnswer: false,
      listProvince: [],
      listDistrict: [],
      listWards: [],
      provinceValue: "",
      districtValue: "",
      wardsValue: "",
    };
  },
  created() {

    const vm = this;

    vm.unitId = vm.$cookies.get("UserInfo", "").MaDonVi;

    vm.checkAuthorView = vm.handleCheckAuthor(
      actionAuthor.ALL_NHATRO_XEM,
      actionAuthor.NHATRO_XEM
    );

    vm.checkActionAddAndUpdate = vm.handleCheckAuthor(
      actionAuthor.ALL_NHATRO_XEM,
      actionAuthor.ALL_NHATRO_XEM
    );


    if (vm.checkAuthorView === textAuthor.ALL) {
      vm.getListData();
    } else {
     vm.getListData({MaDonVi: vm.unitId });
    }
 

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
      vm.getListData({ params: { keyword: vm.textSearch } });
      console.log(
        "params search: ",
        vm.textSearch,
        vm.provinceValue,
        vm.districtValue,
        vm.wardsValue
      );
    },
    getListData(dataParams) {
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
        collectionName: dataParams?.type ? dataParams?.type : "nhatro",
        data: !dataParams?.params
          ? dataPayload
          : { ...dataPayload, ...dataParams?.params },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          console.log("responseMotel: ", response.content);
          vm.listMotelInfor = response.content;
          vm.total = vm.listMotelInfor.length;
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
    //   vm.idMotelInfor = item.PrimKey;
    // },
    deleteMotelInfor(item) {
            const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "nhatro",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa nhà trọ",
        message: "Bạn có chắc chắn muốn xóa nhà trọ này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
          vm.listMotelInfor = vm.listMotelInfor.reduce(function (res, cur) {
            if (item.PrimKey !== cur.PrimKey) res.push(cur);
            return res;
          }, []);
          vm.total = vm.listMotelInfor.length;

          console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    handleShowMotel(item) {
      const vm = this;
      vm.$router.push({
        name: "ManageListMotel",
        params: { name: item.TenChuNha },
      });
    },
    editMotelInfor(item) {
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
    closeModalForm() {
      const vm = this;
      vm.dialogForm = false;
      vm.dataEdit = {};
    },
    closeModal() {
      const vm = this;
      vm.dialogForm = false;
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formMotelInforRef.validateForm()) {
        const formData = vm.$refs.formMotelInforRef.formData;

        if (!vm.edittingForm) {
          const payload = {
            payload: formData,
            type: "nhatro",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listMotelInfor.length < vm.itemsPerPage) {
                const data = [...vm.listMotelInfor];
                data.push({
                  ...formData,
                  MaDinhDanh: response.data.resp.MaDinhDanh,
                  PrimKey: response.data.resp.PrimKey,
                });
                vm.listMotelInfor = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listMotelInfor.length;
            })
            .catch(function (err) {
              console.log("error: ", err)
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
              vm.loadingData = false;
            });
        } else {
          const payload = {
            payload: formData,
            type: "nhatro",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.listMotelInfor = vm.listMotelInfor.reduce(function (res, cur) {
                if (vm.dataEdit.PrimKey === cur.PrimKey) {
                  return [
                    ...res,
                    {
                      ...cur,
                      ...formData,
                    },
                  ];
                } else {
                  return [...res, cur];
                }
              }, []);
              vm.dataEdit = {};
            })
            .catch(function (err) {
              vm.loadingData = false;
               console.log("error: ", err)
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log("submit", formData);
      }
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
};
</script>

<style lang="scss" scoped>
</style>
