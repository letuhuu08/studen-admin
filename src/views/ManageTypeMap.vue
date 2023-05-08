<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" v-if="checkActionAddAndUpdate">
        <div class="d-flex justify-end">
          <v-btn
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
            @click.stop="showModalForm"
          >
            <v-icon left dark size="22">mdi-file-plus</v-icon>&nbsp; Thêm mới
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-card outlined elevation="0" class="mt-5" v-if="toggleAdvanceSearch">
      <v-container>
        <v-row>
          <!-- <v-col cols="12" sm="4">
            <div class="mb-2">Nhập từ khóa tìm kiếm:</div>
            <v-text-field
              class="input-form"
              v-model="textSearch"
              solo
              dense
              clearable
              hide-details="auto"
              placeholder="Số thứ tự, mã icon"
              
            ></v-text-field>
          </v-col> -->
          <v-col cols="12" class="px-2" sm="6">
            <div class="mb-2">Nhập tên loại bản đồ:</div>
            <div>
              <v-text-field
                class="input-form"
                v-model="textNameSearch"
                solo
                dense
                clearable
                hide-details="auto"
                placeholder="Nhập tên loại bản đồ"
                

              ></v-text-field>
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <div class="mb-2">Trạng thái hoạt động:</div>
            <div>
              <v-select
                class="input-form"
                :items="optionStatus"
                v-model="statusValue"
                placeholder="Chọn..."
                dense
                clearable
                solo
              ></v-select>
            </div>
          </v-col>
          <v-col cols="12" class="flex" style="text-align: right">
            <v-btn
              depressed
              class="mx-0"
              small
              color="primary"
              @click="getListMapFilter()"
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
          :items="listTypeMap"
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
            <v-tooltip top v-if="checkActionAddAndUpdate || isAdmin">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#2161b1"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="editTypeMap(item)"
                >
                  <v-icon size="18">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Sửa</span>
            </v-tooltip>

            <v-tooltip top v-if="checkActionDelete || isAdmin">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  text
                  icon
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="deleteTypeMap(item)"
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
              >Cập nhật loại bản đồ</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới loại bản đồ</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormLoaiBanDoSo ref="formLoaiBanDoRef" :dataEdit="dataEdit" />

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
          <v-btn color="primary" text @click="deleteTypeMap"> Xác nhận </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import FormLoaiBanDoSo from "./FormLoaiBanDoSo.vue";
import toastr from "toastr";
import { actionAuthor } from "../constant/actionAuthor";
import { useAccountAuthorization } from "../mixin";

export default {
  components: {
    Pagination,
    FormLoaiBanDoSo,
  },

  mixins: [useAccountAuthorization],

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
          text: "Tên loại bản đồ",
          align: "left",
          value: "TenLoaiBanDo",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Tình trạng",
          align: "left",
          value: "TinhTrang.MaMuc",
          class: "th-center",
          width: 200,
        },
        {
          sortable: false,
          text: "Thao tác",
          align: "left",
          value: "thaotac",
          class: "th-center",
          width: 120,
        },
      ],
      listTypeMap: [],
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
      idTypeMap: "",
      checkActionAddAndUpdate: "",
      checkActionDelete: "",
      textNameSearch: "",
      toggleAdvanceSearch: false,
      optionStatus: [
        { text: "Hoạt động", value: "1" },
        { text: "Không hoạt động", value: "2" },
      ],
      statusValue: "",
    };
  },
  created() {
    const vm = this;

    vm.checkActionAddAndUpdate = vm.handleCheckActionAuthor(
      actionAuthor.CAP_NHAT_VA_THEM_LOAI_BAN_DO
    );

    vm.checkActionDelete = vm.handleCheckActionAuthor(
      actionAuthor.XOA_LOAI_BAN_DO
    );

    vm.getListTypeMap();
  },

  mounted() {
    console.log("select: ", this.selected);
  },

  methods: {
    getListMapFilter() {
      const vm = this;
      const params = { keyword: '', SoThuTu: '', TenLoaiBanDo: vm.textNameSearch }
      const regexCheckNumber = /^\d+$/;
      const regexCheckNumberDecimal = /^\d+(\.\d{1,2})?$/;
      if (regexCheckNumber.test(vm.textSearch)) {
        console.log("đây là số");
        params.SoThuTu = vm.textSearch
      } else if (!regexCheckNumberDecimal.test(vm.textSearch)) {
        console.log("đây là string");
         params.keyword = vm.textSearch
      } else {
        toastr.error("Từ khóa tìm kiếm không hợp lệ");
      }

      console.log("params: ", params)

 vm.getListTypeMap(params);

    },
    getListTypeMap(dataParam) {
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
        collectionName: "loaibando",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.listTypeMap = response.content;

          console.log("res: ", vm.listTypeMap);
          vm.total = vm.listTypeMap.length;
          vm.page = response.pageable.pageNumber
          vm.pageCount = response.totalPages;
          vm.loadingData = false;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    // deleteTypeMap(item) {
    //   const vm = this;
    //   console.log("id delete: ", item.PrimKey);
    //   vm.dialogDelete = true;
    //   vm.idTypeMap = item.PrimKey;
    // },
    deleteTypeMap(item) {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "loaibando",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa loại bản đồ",
        message: "Bạn có chắc chắn muốn xóa loại bản đồ này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
              vm.listTypeMap = vm.listTypeMap.reduce(function (res, cur) {
                if (item.PrimKey !== cur.PrimKey) res.push(cur);
                return res;
              }, []);
              vm.total = vm.listTypeMap.length;

              console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editTypeMap(item) {
      const vm = this;
      vm.edittingForm = true;
      console.log("item edit: ", item);
      vm.dataEdit = item;
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListTypeMap(pageCurent);
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
    handleChangeStatus() {
      // console.log("change")
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formLoaiBanDoRef.validateForm()) {
        const formData = vm.$refs.formLoaiBanDoRef.formData;
        const dataPayload = {
          ...formData,
        };

        dataPayload.TinhTrang = {
          TenMuc: formData.TinhTrang,
          MaMuc: "Hoạt Động",
        };

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "loaibando",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listTypeMap.length < vm.itemsPerPage) {
                const data = [...vm.listTypeMap];
                data.push({
                  ...response.data.resp,
                });
                vm.listTypeMap = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listTypeMap.length;
              console.log("res post: ", response);
            })
            .catch(function (err) {
              vm.loadingData = false;
            });
        } else {
          const payload = {
            payload: dataPayload,
            type: "loaibando",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;

              vm.listTypeMap = vm.listTypeMap.reduce((res, cur) => {
                if (vm.dataEdit.PrimKey === cur.PrimKey)
                  return [...res, { ...cur, ...response.data.resp }];
                else return [...res, cur];
              }, []);

              console.log(
                "res edit: ",
                response,
                dataPayload,
                vm.dataEdit.PrimKey,
                vm.listTypeMap
              );
              vm.dataEdit = {};
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
  watch: {
    statusValue: function (newVal) {
      const vm = this;
      switch (newVal) {
        case "1":
          vm.getListTypeMap();
          break;

        case "2":
          vm.listTypeMap = [];
          break;

        default:
          vm.getListTypeMap();
          break;
      }
    },
    textSearch: function (newVal) {
console.log("newval", this.textSearch, this.textNameSearch)
if(!this.textSearch && !this.textNameSearch) this.getListTypeMap()
    },
      textNameSearch: function (newVal) {
console.log("newval1", this.textSearch, this.textNameSearch)
if(!this.textSearch && !this.textNameSearch) this.getListTypeMap()
    }
  },
};
</script>

<style lang="scss" scoped>
</style>