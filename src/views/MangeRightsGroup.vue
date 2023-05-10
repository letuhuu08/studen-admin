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
          @click:append="getListRightsGroupFilter('')"
          @keyup.enter="getListRightsGroupFilter('')"
          @click:clear="getListRightsGroupFilter('clear')"
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" sm="7">
        <div style="float: right">
          <v-btn  small color="primary" class="btn-form mx-0 text-white" @click="showModalForm">
            <v-icon size="18">mdi-plus</v-icon>&nbsp;
            Thêm mới
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="my-0 mb-3">
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listRightsGroup"
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
                  @click.stop="editGroup(item)"
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
      <v-dialog max-width="800px" v-model="dialogForm" persistent>
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

          <FormNhomQuyen :dataEdit="dataEdit" ref="formNhomQuyenRef" @emitDataUses="emitDataListUses"/>

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
import FormNhomQuyen from "./FormNhomQuyen.vue";
import toastr from "toastr";
export default {
  components: {
    Pagination,
    FormNhomQuyen
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
          text: "Tên nhóm quyền",
          align: "left",
          value: "TenNhomQuyen",
          class: "th-center",
          width: 220,
        },
        {
          sortable: false,
          text: "Chức năng",
          align: "left",
          value: "tenChucNang",
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
      listRightsGroup: [],
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
      emitDataGetListUses: [],
      responseListGroup: []
    };
  },
  created() {
    const vm = this;
    vm.getListRightsGroup();
  },

  mounted() {},

  methods: {
    getListRightsGroupFilter(type) {
      const vm = this;
      console.log("tim kiếm");
      vm.getListRightsGroup({ TenNhomQuyen: !type ? vm.textSearch : ""});
    },
    getListRightsGroup(dataParam) {
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
        collectionName: "nhomquyen",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
            const responseData = response.content
            vm.responseListGroup = responseData
            vm.listRightsGroup = responseData.map(item=>({...item, tenChucNang: item.ChucNang.map(item=>item.TenMuc).join(', ')}))
          
          vm.total = vm.listRightsGroup.length;
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
    //   vm.idGroup = item.PrimKey;
    // },
    deleteGroup(item) {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "nhomquyen",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa nhóm quyền",
        message: "Bạn có chắc chắn muốn xóa nhóm quyền này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
               vm.listRightsGroup = vm.listRightsGroup.reduce(function (res, cur) {
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
    editGroup(item) {
      const vm = this;
      vm.edittingForm = true;
      const itemEdit = vm.responseListGroup.filter(el=>el.PrimKey === item.PrimKey)
      console.log("item: ", itemEdit)
      vm.dataEdit = { ...item, ChucNang: itemEdit[0].ChucNang.map(item=>item.MaMuc)};
      console.log("item edit: ", item, itemEdit[0].ChucNang.map(item=>item.MaMuc), vm.dataEdit);
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListRightsGroup(pageCurent);
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
        const vm = this
        vm.emitDataGetListUses = data
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formNhomQuyenRef.validateForm()) {
        const formData = vm.$refs.formNhomQuyenRef.formData;
        let listUsesPayload = []
        vm.emitDataGetListUses.forEach(item=>{
            formData.ChucNang.forEach(el=>{
                if(el===item.maMuc){
                  listUsesPayload.push( {
                      MaMuc: item.maMuc,
                      TenMuc: item.tenMuc
                  })
                }
            })
        })
        formData.ChucNang = listUsesPayload

        if (!vm.edittingForm) {
          const payload = {
            payload: formData,
            type: "nhomquyen",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
                toastr.success("Thêm mới thành công");
              vm.getListRightsGroup()
              vm.dialogForm = false;
              console.log("res post: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error(
                  "Vui lòng kiểm tra lại dữ liệu nhập vào các trường"
                );
            });
        } else {
          const payload = {
            payload: formData,
            type: "nhomquyen",
            id: vm.dataEdit.PrimKey,
          };
          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;
              vm.getListRightsGroup()
              console.log(
                "res edit: ",
                response,
                vm.dataEdit.PrimKey
              );
               vm.dataEdit = {}
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error(
                  "Vui lòng kiểm tra lại dữ liệu nhập vào các trường"
                );
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