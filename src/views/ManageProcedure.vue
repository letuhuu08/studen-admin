<template>
  <div>
    <v-row no-gutters>
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
          @click:append="getListProcedureFilter('')"
          @keyup.enter="getListProcedureFilter('')"
          @click:clear="getListProcedureFilter('clear')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="7">
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
          :items="listProcedure"
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
                  @click.stop="editProcedure(item)"
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
      <v-dialog max-width="1200px" v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật nhóm quyền</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới nhóm quyền</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormProcedure
            :dataEdit="dataEdit"
            ref="formThuTucRef"
            @emitDataUses="emitDataListUses"
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
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import FormProcedure from "@/views/FormProcedure";
import toastr from "toastr";
export default {
  components: {
    Pagination,
    FormProcedure,
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
          text: "Tên thủ tục",
          align: "left",
          value: "TenThuTuc",
          class: "th-center",
          width: 220,
        },
        {
          sortable: false,
          text: "Tên đơn vị",
          align: "left",
          value: "TenDonVi",
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
      listProcedure: [],
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
      // idGroup: "",
    };
  },
  created() {
    const vm = this;
    vm.getListProcedure();
  },

  mounted() {},

  methods: {
    getListProcedureFilter(type) {
      const vm = this;
      console.log("tim kiếm");
      vm.getListProcedure({ keyword: !type ? vm.textSearch : "" });
    },
    getListProcedure(dataParam) {
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
        collectionName: "chitietquytrinh",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          const responseData = response.content;
          vm.listProcedure = responseData;
          console.log("res group: ", vm.listProcedure);
          vm.total = vm.listProcedure.length;
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
    //   vm.idGroup = item.PrimKey;
    // },
    deleteGroup(item) {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "chitietquytrinh",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa thủ tục",
        message: "Bạn có chắc chắn muốn xóa thủ tục này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
               vm.listProcedure = vm.listProcedure.reduce(function (res, cur) {
            if (item.PrimKey !== cur.PrimKey) res.push(cur);
            return res;
          }, []);
          vm.total = vm.listProcedure.length;
          console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editProcedure(item) {
      const vm = this;
      vm.edittingForm = true;
      vm.dataEdit = { ...item };
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListProcedure(pageCurent);
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
    emitDataListUses(data) {
      const vm = this;
      vm.emitDataGetListUses = data;
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formThuTucRef.validateForm()) {
        const formData = vm.$refs.formThuTucRef.formData;

        if (!vm.edittingForm) {
          const payload = {
            payload: formData,
            type: "chitietquytrinh",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              vm.getListProcedure();
              vm.dialogForm = false;
              console.log("res post: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        } else {
          const payload = {
            payload: formData,
            type: "chitietquytrinh",
            id: vm.dataEdit.PrimKey,
          };
          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.getListProcedure();
              console.log("res edit: ", response, vm.dataEdit.PrimKey);
              vm.dataEdit = {};
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

<style lang="scss" scoped>
</style>