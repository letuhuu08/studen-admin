<template>
  <div>
    <v-row no-gutters>
       <v-col cols="12" sm="4">
        <v-text-field
          class="input-form"
          v-model="textSearch"
          solo
          dense
          clearable
          hide-details="auto"
          placeholder="Nhập từ khóa tìm kiếm"
          append-icon="mdi-magnify"
          @click:append="getListAreaFilter('')"
          @keyup.enter="getListAreaFilter('')"
          @click:clear="getListAreaFilter('clear')"
        ></v-text-field>
      </v-col>
      <v-col cols="8">
        <div style="float: right">
           <v-btn
            small
            color="primary"
            class="btn-form mx-0 text-white"
           @click.stop="showModalForm"
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
          :items="listArea"
          :items-per-page="itemsPerPage"
          item-key="PrimKey"
          hide-default-footer
          class="table-base mt-2"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
          v-model="selected"
        >
          <template v-slot:item.chon="{ index }"> </template>
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
                  @click.stop="editArea(item)"
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
              >Cập nhật khu vực</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới khu vực</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormKhuVuc ref="formKhuVucRef" :dataEdit="dataEdit" />

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
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import FormKhuVuc from "./FormKhuVuc.vue";
import toastr from "toastr";

export default {
  components: {
    Pagination,
    FormKhuVuc,
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
          width: 15,
        },
        {
          sortable: false,
          text: "Tên khu vực",
          align: "left",
          value: "TenKhuVuc",
          class: "th-center",
          width: 120,
        },
        {
          sortable: false,
          text: "Kinh độ",
          align: "left",
          value: "ToaDo.Longitude",
          class: "th-center",
          width: 120,
        },
        {
          sortable: false,
          text: "Vĩ độ",
          align: "left",
          value: "ToaDo.Latitude",
          class: "th-center",
          width: 120,
        },
        {
          sortable: false,
          text: "Thao tác",
          align: "left",
          value: "thaotac",
          class: "th-center",
          width: 68,
        },
      ],
      listArea: [],
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
      idArea: "",
    };
  },
  created() {
    const vm = this;

    vm.getListArea();
  },

  mounted() {
    console.log("select: ", this.selected);
  },

  methods: {
    getListAreaFilter(type) {
      const vm = this;
      console.log("tim kiếm");
      vm.getListArea({ keyword: !type ? vm.textSearch : "" });
    },
    getListArea(dataParam) {
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
        collectionName: "khuvuc",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.listArea = response.content;

          console.log("res: ", vm.listArea);
          vm.total = vm.listArea.length;
          vm.pageCount = response.totalPages;
          vm.page = response.pageable.pageNumber
          vm.loadingData = false;
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    deleteTypeMap(item) {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: item.PrimKey,
        type: "khuvuc",
      };

      vm.$store.commit("SET_SHOWCONFIRM", true);
      let confirm = {
        auth: false,
        title: "Xóa khu vực bản đồ",
        message: "Bạn có chắc chắn muốn xóa khu vực này",
        button: {
          yes: "Có",
          no: "Không",
        },
        callback: () => {
          vm.$store
            .dispatch("deleteItemData", payload)
            .then(function (response) {
              toastr.success("Xóa thành công");
              vm.listArea = vm.listArea.reduce(function (res, cur) {
                if (item.PrimKey !== cur.PrimKey) res.push(cur);
                return res;
              }, []);
              vm.total = vm.listArea.length;

              console.log("res dele: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
            });
        },
      };
      vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    },
    editArea(item) {
      const vm = this;
      vm.edittingForm = true;
      console.log("item edit: ", item);
      vm.dataEdit = item;
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListArea(pageCurent);
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
    submitForm() {
      const vm = this;
      if (vm.$refs.formKhuVucRef.validateForm()) {
        const formData = vm.$refs.formKhuVucRef.formData;
        const dataPayload = {
          ...formData,
          ToaDo: {
            Latitude: formData.ViDo,
            Longitude: formData.KinhDo,
          },
        };

        delete dataPayload.KinhDo;
        delete dataPayload.ViDo;

        if (!vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "khuvuc",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Thêm mới thành công");
              if (vm.listArea.length < vm.itemsPerPage) {
                const data = [...vm.listArea];
                data.push({
                  ...response.data.resp,
                });
                vm.listArea = data;
              }
              vm.dialogForm = false;
              vm.total = vm.listArea.length;
              console.log("res post: ", response);
            })
            .catch(function (err) {
              vm.loadingData = false;
            });
        } else {
          const payload = {
            payload: dataPayload,
            type: "khuvuc",
            id: vm.dataEdit.PrimKey,
          };

          vm.$store
            .dispatch("editItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogForm = false;

              vm.listArea = vm.listArea.reduce((res, cur) => {
                if (vm.dataEdit.PrimKey === cur.PrimKey)
                  return [...res, { ...cur, ...response.data.resp }];
                else return [...res, cur];
              }, []);

              console.log(
                "res edit: ",
                response,
                dataPayload,
                vm.dataEdit.PrimKey,
                vm.listArea
              );
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