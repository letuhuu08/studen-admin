<template>
  <div>
    <v-row>
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
          @click:append="getListNotifyFilter('')"
          @keyup.enter="getListNotifyFilter('')"
          @click:clear="getListNotifyFilter('clear')"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-autocomplete
          v-model="statusNotify"
          :items="optionStatus"
          item-title="name"
          item-value="value"
          label="Chọn trạng thái"
          solo
          hide-details="auto"
          required
          class="flex input-form"
          clearable
        ></v-autocomplete>
      </v-col>
      <!-- <v-col cols="8">
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
      </v-col> -->
    </v-row>

    <v-row class="my-0 mb-3">
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listNotify"
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
          <template v-slot:item.chon="{ index }"></template>
          <template v-slot:item.stt="{ index }">
            {{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>
          <template v-slot:item.TrangThai="{ index, item }">
            {{ handleRenderTextStatus(item) }}
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
                  @click.stop="editNotify(item)"
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
                  @click.stop="deleteNotify(item)"
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
    <!-- <div v-if="dialogForm">
      <v-dialog max-width="1000" v-model="dialogForm" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm"
              >Cập nhật thông báo</v-toolbar-title
            >
            <v-toolbar-title v-if="!edittingForm"
              >Thêm mới thông báo</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormSendNotify ref="formNotifyRef" :dataEdit="dataEdit" />

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
    </div> -->
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";

export default {
  components: {
    Pagination,
    // FormSendNotify,
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
          text: "Tiêu đề",
          align: "left",
          value: "TieuDe",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Tên người gửi",
          align: "left",
          value: "TenNguoiGui",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Số điện thoại người gửi",
          align: "left",
          value: "SdtNguoiGui",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Tình trạng",
          align: "left",
          value: "TrangThai",
          class: "th-center",
        },
        // {
        //   sortable: false,
        //   text: "Thao tác",
        //   align: "left",
        //   value: "thaotac",
        //   class: "th-center",
        // },
      ],
      listNotify: [],
      itemsPerPage: 20,
      loadingData: false,
      pageCount: 1,
      page: 0,
      // edittingForm: false,
      // dialogForm: false,
      // readonlyForm: false,
      loadingAction: false,
      total: 1,
      // dataEdit: {},
      // dialogDelete: false,
      // idNotify: "",
      statusNotify: "",
      optionStatus: [
        { text: "Chưa được gửi", value: "1" },
        { text: "Đã gửi", value: "3" },
        { text: "Gửi lỗi", value: "4" },
      ],
    };
  },
  created() {
    const vm = this;

    vm.getListNotify();
  },

  mounted() {
    console.log("select: ", this.selected);
  },

  methods: {
    getListNotifyFilter(type) {
      const vm = this;
      console.log("tim kiếm");
      vm.getListNotify({ keyword: !type ? vm.textSearch : "" });
    },
    getListNotify(dataParam) {
      let vm = this;
      vm.loadingData = true;
      const dataPayload = {
        page: 0,
        size: 20,

        // TinhTrang: "1",
      };
      const filter = {
        collectionName: "hangdoithongbao",
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          vm.listNotify = response.content;

          console.log("res: ", vm.listNotify);
          vm.total = vm.listNotify.length;
          vm.pageCount = response.totalPages;
          vm.loadingData = false;
          vm.page = response.pageable.pageNumber
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    handleRenderTextStatus(item) {
      let textRender;
      const numberSttus = item.TinhTrang;
      switch (numberSttus) {
        case "1":
          textRender = "Chưa được gửi";
          break;
        case "3":
          textRender = "Đã gửi";
          break;
        default:
          textRender = "Gửi lỗi";
          break;
      }
      return textRender;
    },
    // deleteNotify(item) {
    //   const vm = this;
    //   const payload = {
    //     payload: item.PrimKey,
    //     type: "khuvuc",
    //   };

    //   vm.$store.commit("SET_SHOWCONFIRM", true);
    //   let confirm = {
    //     auth: false,
    //     title: "Xóa thông báo",
    //     message: "Bạn có chắc chắn muốn thông báo này",
    //     button: {
    //       yes: "Có",
    //       no: "Không",
    //     },
    //     callback: () => {
    //       vm.$store
    //         .dispatch("deleteItemData", payload)
    //         .then(function (response) {
    //           toastr.success("Xóa thành công");
    //           vm.listNotify = vm.listNotify.reduce(function (res, cur) {
    //             if (item.PrimKey !== cur.PrimKey) res.push(cur);
    //             return res;
    //           }, []);
    //           vm.total = vm.listNotify.length;

    //           console.log("res dele: ", response);
    //         })
    //         .catch(function () {
    //           vm.loadingData = false;
    //         });
    //     },
    //   };
    //   vm.$store.commit("SET_CONFIG_CONFIRM_DIALOG", confirm);
    // },
    // editNotify(item) {
    //   const vm = this;
    //   vm.edittingForm = true;
    //   console.log("item edit: ", item);
    //   vm.dataEdit = item;
    //   vm.dialogForm = true;
    // },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListNotify(pageCurent);
    },
    // showModalForm() {
    //   const vm = this;
    //   vm.dialogForm = true;
    //   vm.edittingForm = false;
    // },
    // closeModalForm() {
    //   const vm = this;
    //   vm.dialogForm = false;
    //   vm.dataEdit = {};
    // },
    // submitForm() {
    //   const vm = this;
    //   if (vm.$refs.formNotifyRef.validateForm()) {
    //     const formData = vm.$refs.formNotifyRef.formData;
    //     const dataPayload = {
    //       ...formData,
    //       HenGioGui: moment(
    //         vm.$refs.formNotifyRef._data.textDateSend,
    //         "DD/MM/YYYY"
    //       ).valueOf(),
    //     };

    //     if (!vm.edittingForm) {
    //       const payload = {
    //         payload: dataPayload,
    //         type: "hangdoithongbao",
    //       };
    //       vm.$store
    //         .dispatch("createItemData", payload)
    //         .then(function (response) {
    //           toastr.success("Thêm mới thành công");
    //           if (vm.listNotify.length < vm.itemsPerPage) {
    //             const data = [...vm.listNotify];
    //             data.push({
    //               ...response.data.resp,
    //             });
    //             vm.listNotify = data;
    //           }
    //           vm.dialogForm = false;
    //           vm.total = vm.listNotify.length;
    //           console.log("res post: ", response);
    //         })
    //         .catch(function (err) {
    //           vm.loadingData = false;
    //         });
    //     } else {
    //       const payload = {
    //         payload: dataPayload,
    //         type: "hangdoithongbao",
    //         id: vm.dataEdit.PrimKey,
    //       };

    //       vm.$store
    //         .dispatch("editItemData", payload)
    //         .then(function (response) {
    //           toastr.success("Cập nhật thành công");
    //           vm.dialogForm = false;

    //           vm.listNotify = vm.listNotify.reduce((res, cur) => {
    //             if (vm.dataEdit.PrimKey === cur.PrimKey)
    //               return [...res, { ...cur, ...response.data.resp }];
    //             else return [...res, cur];
    //           }, []);

    //           console.log(
    //             "res edit: ",
    //             response,
    //             dataPayload,
    //             vm.dataEdit.PrimKey,
    //             vm.listNotify
    //           );
    //           vm.dataEdit = {};
    //         })
    //         .catch(function () {
    //           vm.loadingData = false;
    //           toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
    //         });
    //     }

    //     console.log("submit", dataPayload);
    //   }
    // },
  },
  watch: {
    statusNotify() {
      const vm = this;
      vm.getListNotify({ TinhTrang: vm.statusNotify });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>