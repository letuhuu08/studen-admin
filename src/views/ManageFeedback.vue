<template>
  <div>
    <v-btn
      depressed
      class="mx-0"
      small
      color="primary"
      @click="showAdvanceSearch()"
      style="position: absolute; top: 30px; right: 20px"
    >
      <v-icon size="18" v-if="!advanceSearch">mdi-filter-variant-plus</v-icon>
      <v-icon size="18" v-else>mdi-filter-variant</v-icon>
      &nbsp; Tìm kiếm
    </v-btn>
    <v-btn
      depressed
      class="mx-0"
      small
      color="primary"
      @click="handleClickAnswerFeedbacks"
      :disabled="selected.length ? false : true"
      style="position: absolute; top: 30px; right: 140px"
    >
      <v-icon size="18">mdi-comment-check-outline</v-icon>
      &nbsp; Trả lời
    </v-btn>
    <v-btn
      depressed
      class="mx-0"
      small
      color="primary"
      @click="handleClickExportFile"
      style="position: absolute; top: 30px; right: 254px"
    >
      <v-icon size="18">mdi-file-export</v-icon>
      &nbsp; Xuất tệp
    </v-btn>
    <v-card outlined elevation="0" v-if="advanceSearch">
        <v-form ref="formSearchRef" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <div class="mb-2">Trạng thái trả lời:</div>
            <v-select
              :items="optionStatus"
              dense
              solo
              v-model="selectedStatus"
              @change="handleChangeSelected('ST')"
              clearable
              class="input-form"
              hide-details="auto"
              hide-no-data
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="mb-2">Tình trạng công khai:</div>
            <v-select
              :items="optionStatusPublic"
              dense
              solo
              v-model="selectedStatusPublic"
              @change="handleChangeSelected('SP')"
              clearable
              class="input-form"
              hide-details="auto"
              hide-no-data
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="mb-2">Chủ đề góp ý:</div>
            <v-select
              :items="optionTheme"
              @change="handleChangeSelected()"
              dense
              solo
              v-model="selectedTheme"
              clearable
              class="input-form"
              hide-details="auto"
              hide-no-data
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-layout wrap>
              <v-flex xs6 class="pr-2">
                <div class="mb-2">Nội dung góp ý</div>
                <v-text-field
                  v-model="textSearch"
                  solo
                  placeholder="Nhập nội dung..."
                  dense
                  hide-details="auto"
                  class="input-form"
                  hide-no-data
                  clearable
                  @input="handleChangeText"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 class="">
                <div class="mb-2">Người góp ý</div>
                <v-text-field
                  v-model="textNameSearch"
                  solo
                  placeholder="Nhập nội dung..."
                  dense
                  hide-details="auto"
                  class="input-form"
                  hide-no-data
                  clearable
                  @input="handleChangeText"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-col>

          <v-col cols="12" sm="6">
            <div class="mb-2">Ngày gửi góp ý</div>
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
          </v-col>



             <v-col cols="12" sm="12">
            <div class="mb-2">Ngày trả lời góp ý</div>
            <v-layout wrap>
              <v-flex xs6 class="pr-2">
                <v-menu
                  v-model="toggleShowMenuStartDateAnswerSend"
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
                      v-model="textDateStartAnswerSend"
                      placeholder="Từ ngày..."
                      persistent-hint
                      prepend-icon=""
                      v-bind="attrs"
                      @blur="dateStartAnswerSend = parseDate(textDateStartAnswerSend)"
                      @input="handleChangeDate()"
                      v-on="on"
                      solo
                      dense
                      hide-details="auto"
                      hide-no-data
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateStartAnswerSend"
                    no-title
                    @input="toggleShowMenuStartDateAnswerSend = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6 class="">
                <v-menu
                  v-model="toggleShowMenuEndDateAnswerSend"
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
                      v-model="textDateEndAnswerSend"
                      placeholder="Đến ngày..."
                      persistent-hint
                      prepend-icon=""
                      v-bind="attrs"
                      @blur="dateEndAnswerSend = parseDate(textDateEndAnswerSend)"
                      @input="handleChangeDate()"
                      v-on="on"
                      solo
                      dense
                      hide-details="auto"
                      hide-no-data
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateEndAnswerSend"
                    no-title
                    @input="toggleShowMenuEndDateAnswerSend = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-col>
          <v-col cols="12" class="flex" style="text-align: right">
            <v-btn
              depressed
              class="mx-0"
              small
              color="primary"
              @click="getListFeedbackFilter()"
            >
              <v-icon size="18">mdi-magnify</v-icon>
              &nbsp; Tìm kiếm
            </v-btn>
          </v-col>
        </v-row>



      </v-container>
      </v-form>
    </v-card>

    <v-row class="my-0 mb-3">
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="headers"
          :items="listFeedback"
          :items-per-page="itemsPerPage"
          item-key="PrimKey"
          hide-default-footer
          class="table-base mt-0 pt-0"
          no-data-text="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          item-text="name"
          v-model="selected"
          @toggle-select-all="selectAllToggle"
        >
          <template
            v-slot:item.data-table-select="{ item, isSelected, select }"
          >
            <v-simple-checkbox
              v-if="item.TinhTrang.TenMuc !== 'Đã trả lời'"
              :value="isSelected"
              :ripple="false"
              @input="select($event)"
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.stt="{ index }">
            {{(page+1) * itemsPerPage - itemsPerPage + index + 1 }}
          </template>
          <template v-slot:item.ChuDe="{ item }">
            <span>{{ item.ChuDe.TenMuc }}</span>
          </template>
          <template v-slot:item.TinhTrang="{ item }">
            <span :style="item.TinhTrang.MaMuc == '2' ? 'color: red' : ''">{{
              item.TinhTrang.TenMuc
            }}</span>
          </template>
          <template v-slot:item.CongKhai="{ item }">
            <span
              :style="item.CongKhai == '0' ? 'color: red' : 'color: green'"
              >{{
                item.CongKhai == "0" ? "Không công khai" : "Công khai"
              }}</span
            >
          </template>
          <template v-slot:item.TimeCreate="{ item }">
            {{ dateLocale(item.TimeCreate) }}
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
                  @click.stop="editFeedback(item)"
                >
                  <v-icon size="18">mdi-clipboard-text</v-icon>
                </v-btn>
              </template>
              <span>Chi tiết góp ý, trả lời</span>
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
    </div>

    <div v-if="dialogFormAnswer">
      <v-dialog max-width="1000" v-model="dialogFormAnswer" persistent>
        <v-card>
          <v-toolbar dark color="primary" class="px-3">
            <v-toolbar-title v-if="edittingForm">Trả lời góp ý</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeModalAnswer">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <FormGopY
            ref="formGopYRef"
            :dataEdit="dataEdit"
            @emitDataFile="handleEmitDataFile"
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
                @click="closeModalAnswer"
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
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog
      v-if="dialogAnswerFeedBacks"
      v-model="dialogAnswerFeedBacks"
      persistent
      max-width="700px"
    >
      <v-card>
        <v-toolbar dark color="primary" class="px-3">
          <v-toolbar-title>Trả lời góp ý</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn small icon dark @click="dialogAnswerFeedBacks = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <FormAnswerFeedbacks
                  :dataProps="selected"
                  ref="formAnswerFeedbacksRef"
                  @emitDataFile="handleEmitDataFile"
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
            @click="handleCloseDialogAnswersFeedBack"
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
            @click="handleAnswerFeedbacks"
          >
            <v-icon left dark size="18">
              mdi-file-document-plus-outline
            </v-icon>
            <span>Trả lời</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import toastr from "toastr";
import FormGopY from "@/views/FormGopY";
import moment from "moment";
import DetailsFeedback from "@/views/DetailsFeedback";
import FormAnswerFeedbacks from "@/views/FormAnswerFeedbacks";

export default {
  components: {
    Pagination,
    FormGopY,
    DetailsFeedback,
    FormAnswerFeedbacks,
  },

  data() {
    return {
      dialogAnswerFeedBacks: false,
      advanceSearch: false,
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
          text: "Chủ đề",
          align: "left",
          value: "ChuDe",
          class: "th-center",
          width: 150,
        },
        {
          sortable: false,
          text: "Nội dung",
          align: "left",
          value: "NoiDung",
          class: "th-center",
        },
        {
          sortable: false,
          text: "Ngày gửi",
          align: "center",
          value: "TimeCreate",
          class: "th-center",
          width: 150,
        },
        {
          sortable: false,
          text: "Trạng thái trả lời",
          align: "left",
          value: "TinhTrang",
          class: "th-center",
          width: 150,
        },
        {
          sortable: false,
          text: "Công khai",
          align: "left",
          value: "CongKhai",
          class: "th-center",
          width: 150,
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
      listFeedback: [],
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
      idFeedback: "",
      emitDataFile: null,
      optionStatus: [
        { text: "Chưa trả lời", value: "2" },
        { text: "Đã trả lời", value: "3" },
      ],
      optionStatusPublic: [
        { text: "Công khai", value: "1" },
        { text: "Không công khai", value: "0" },
      ],
      optionTheme: [],
      textDateStartSend: "",
      textDateEndSend: "",
      // textDateStartRep: "",
      // textDateEndRep: "",
      selectedStatus: "",
      selectedStatusPublic: "",
      selectedTheme: "",
      dialogFormAnswer: false,
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
            if(!value) return true
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
      textNameSearch: "",
      toggleShowMenuStartDateSend: false,
      dateStartSend: "",
      toggleShowMenuEndDateSend: false,
      dateEndSend: "",
      timeOut: null,
toggleShowMenuStartDateAnswerSend: "",
textDateStartAnswerSend: "",
dateStartAnswerSend:"",

toggleShowMenuEndDateAnswerSend: "",
textDateEndAnswerSend: "",
dateEndAnswerSend:""


      
    };
  },
  created() {
    const vm = this;
    vm.getListData();

    vm.getListData({
      param: { size: 1000, danhMuc_maDanhMuc: "CHUDEGOPY" },
      type: "dulieudanhmuc",
    });
  },

  mounted() {
    // console.log("select: ", this.selected);
  },

  methods: {
    showAdvanceSearch() {
      let vm = this;
      vm.advanceSearch = !vm.advanceSearch;
    },
    getListFeedbackFilter() {
      const vm = this;
      console.log("date: ", vm.textDateStartSend, vm.textDateEndSend);
      let param = {};
      if (vm.textDateStartSend && vm.textDateEndSend) {
        param = {
          NgayGuiFrom: moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf(),
          NgayGuiTo: moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf(),
        };
      } else if (vm.textDateStartSend) {
        param = {
          NgayGuiFrom: moment(vm.textDateStartSend, "DD/MM/YYYY").valueOf(),
        };
      } else if (vm.textDateEndSend) {
        param = {
          NgayGuiTo: moment(vm.textDateEndSend, "DD/MM/YYYY").valueOf(),
        };
      }

      if (vm.textDateStartAnswerSend && vm.textDateEndAnswerSend) {
        param = {
          NgayTraLoiFrom: moment(vm.textDateStartAnswerSend, "DD/MM/YYYY").valueOf(),
          NgayTraLoiTo: moment(vm.textDateEndAnswerSend, "DD/MM/YYYY").valueOf(),
        };
      } else if (vm.textDateStartAnswerSend) {
        param = {
          NgayTraLoiFrom: moment(vm.textDateStartAnswerSend, "DD/MM/YYYY").valueOf(),
        };
      } else if (vm.textDateEndAnswerSend) {
        param = {
          NgayTraLoiTo: moment(vm.textDateEndAnswerSend, "DD/MM/YYYY").valueOf(),
        };
      }

      if (vm.$refs.formSearchRef.validate()){
        vm.getListData({
          param: {
            keyword: vm.textSearch,
            ...param,
            SinhVienHoTen: vm.textNameSearch,
          },
        });
      }
      vm.selectedStatus = "";
      vm.selectedStatusPublic = "";
      vm.selectedTheme = "";
    },
    getListData(dataParam) {
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
        collectionName: dataParam?.type ? dataParam?.type : "gopy",
        data: !dataParam?.param
          ? dataPayload
          : { ...dataPayload, ...dataParam?.param },
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
          if (!dataParam?.type) {
            const listFeedbackAnswed = response.content.filter(
              (item) => item.TraLoi.NoiDung
            );
            const listFeedbackNotAnswer = response.content.filter(
              (item) => !item.TraLoi.NoiDung
            );
            vm.listFeedback = [...listFeedbackNotAnswer, ...listFeedbackAnswed];
            console.log("res: ", vm.listFeedback);
            vm.total = vm.listFeedback.length;
             vm.page = response.pageable.pageNumber
            vm.pageCount = response.totalPages;
            vm.loadingData = false;
          } else {
            vm.optionTheme = response.content.map((item) => ({
              text: item.tenMuc,
              value: item.maMuc,
            }));
          }
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    openDialogDeleteItem(item) {
      const vm = this;
      console.log("id delete: ", item.PrimKey);
      vm.dialogDelete = true;
      vm.idFeedback = item.PrimKey;
    },
    deleteFeedback() {
      const vm = this;
      vm.dialogDelete = false;
      const payload = {
        payload: vm.idFeedback,
        type: "baiviettintuc",
      };
      vm.$store
        .dispatch("deleteItemData", payload)
        .then(function (response) {
          toastr.success("Xóa thành công");
          vm.listFeedback = vm.listFeedback.reduce(function (res, cur) {
            if (vm.idFeedback !== cur.PrimKey) res.push(cur);
            return res;
          }, []);
          vm.total = vm.listFeedback.length;

          console.log("res dele: ", response);
        })
        .catch(function () {
          vm.loadingData = false;
        });
    },
    editFeedback(item) {
      const vm = this;
      const dataEdit = {
        ...item,
      };
      vm.edittingForm = true;
      // console.log("item edit: ", item);
      vm.dataEdit = dataEdit;
      vm.dialogForm = true;
    },
    handlechangePage(pageCurent) {
      const vm = this;
      vm.getListData({
        param: {...pageCurent}})
    },
    handleClickAnswerFeedbacks() {
      const vm = this;
      vm.dialogAnswerFeedBacks = true;
      console.log("selected: ", vm.selected);
    },
    handleAnswerFeedbacks() {
      const vm = this;
      if (vm.$refs.formAnswerFeedbacksRef.validateForm()) {
        const formData = vm.$refs.formAnswerFeedbacksRef.formData;
        const stringListId = vm.selected.map((item) => item.PrimKey).join(",");

        if (formData.TraLoi) {
          const dataPayload = {
            CongKhai: formData.CongKhai,
            TraLoi: {
              NoiDung: formData.TraLoi,
            },
            IdsGopY: stringListId,
            TinhTrang: {
              TenMuc: "Đã trả lời",
              MaMuc: 3,
            },
          };

          const payload = {
            payload: dataPayload,
            type: "gopy/response",
          };

          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogAnswerFeedBacks = false;
              if (vm.emitDataFile) {
                let formData = new FormData();
                formData.append("files", vm.emitDataFile);
                formData.append("idsGopY", stringListId);
                formData.append("typeUpload", 1);

                const payload = {
                  type: "gopy/upload",
                  payload: formData,
                };

                vm.$store
                  .dispatch("uploadFile", payload)
                  .then(function (response) {
                    vm.getListData();
                    console.log("res: ", response);
                  })
                  .catch(function () {});
              }
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        } else if (!formData.TraLoi && vm.emitDataFile) {
          let formData = new FormData();
          formData.append("files", vm.emitDataFile);
          formData.append("idsGopY", stringListId);
          formData.append("typeUpload", 2);

          const payload = {
            type: "gopy/upload",
            payload: formData,
          };

          vm.$store
            .dispatch("uploadFile", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              vm.dialogAnswerFeedBacks = false;
              vm.emitDataFile = null;
              vm.getListData();
              console.log("res: ", response);
            })
            .catch(function () {});
        } else {
          toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
        }

        console.log(
          "formdata: ",
          formData,
          vm.emitDataFile,
          // dataPayload,
          vm.selected
        );
      }
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
    closeModalAnswer() {
      const vm = this;
      vm.dialogFormAnswer = false;
    },
    handleEmitDataFile(value) {
      const vm = this;
      vm.emitDataFile = value;
    },
    submitForm() {
      const vm = this;
      if (vm.$refs.formGopYRef.validateForm()) {
        const formData = vm.$refs.formGopYRef.formData;

        const dataPayload = {
          CongKhai: formData.CongKhai,
          TraLoi: {
            NoiDung: formData.TraLoi,
          },
          IdsGopY: vm.dataEdit.PrimKey,
          TinhTrang: {
            TenMuc: "Đã trả lời",
            MaMuc: 3,
          },
        };

        if (!vm.emitDataFile && vm.dataEdit.TraLoi.Attachment?.Id) {
          dataPayload.TraLoi = {
            ...dataPayload.TraLoi,
            Attachment: {
              Id: vm.dataEdit.TraLoi.Attachment.Id,
              FileName: vm.dataEdit.TraLoi.Attachment.FileName,
              FileUrl: vm.dataEdit.TraLoi.Attachment.FileUrl,
              type: "T_Attachment",
            },
          };
        }

        if (vm.edittingForm) {
          const payload = {
            payload: dataPayload,
            type: "gopy/response",
          };
          vm.$store
            .dispatch("createItemData", payload)
            .then(function (response) {
              toastr.success("Cập nhật thành công");
              if (vm.emitDataFile && !vm.dataEdit?.TraLoi?.Attachment) {
                let formData = new FormData();
                formData.append("files", vm.emitDataFile);
                formData.append("idsGopY", vm.dataEdit.PrimKey);
                formData.append("typeUpload", 2);

                const payload = {
                  type: "gopy/upload",
                  payload: formData,
                };

                vm.$store
                  .dispatch("uploadFile", payload)
                  .then(function (response) {
                    vm.getListData();
                    console.log("res: ", response);
                  })
                  .catch(function () {});
              } else if (
                vm.emitDataFile &&
                vm.dataEdit?.TraLoi?.Attachment &&
                typeof vm.emitDataFile !== "string"
              ) {
                let formData = new FormData();
                formData.append("files", vm.emitDataFile);
                formData.append("idsGopY", vm.dataEdit.PrimKey);
                formData.append("typeUpload", 2);

                const payload = {
                  type: "gopy/upload",
                  payload: formData,
                };

                vm.$store
                  .dispatch("uploadFile", payload)
                  .then(function (response) {
                    vm.getListData();
                    console.log("res: ", response);
                  })
                  .catch(function () {});
              } else {
                vm.getListData();
              }
              vm.dialogFormAnswer = false;
              vm.dialogForm = false;
              vm.emitDataFile = null;
              console.log("res post: ", response);
            })
            .catch(function () {
              vm.loadingData = false;
              toastr.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường");
            });
        }

        console.log("submit", formData, dataPayload);
      }
    },
    dateLocale(dateInput) {
      let date = new Date(dateInput);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
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
    handleCloseDialogAnswersFeedBack() {
      const vm = this;
      vm.dialogAnswerFeedBacks = false;
    },
    handleClickExportFile() {
      const vm = this;
      const dataPayload = {
        table: "T_GopY",
        page: 0,
        size: 20,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName: "excel/export",
        typeFile: ".xls",
        nameFile: "DanhSachPhanHoiGopY",
        data: dataPayload,
      };
      vm.$store.dispatch("exportFile", filter).catch(function () {
        toastr.error("Lỗi tải file vui lòng thử lại");
      });
    },
    handleChangeSelected(type) {
      const vm = this;
      switch (type) {
        case "ST":
          vm.selectedTheme = "";
          vm.textSearch = "";
          vm.textDateStartSend = "";
          vm.textDateEndSend = "";
          vm.textNameSearch = "";
          vm.selectedStatusPublic = "";
          vm.getListData({ param: { TinhTrang: vm.selectedStatus } });
          break;

        case "SP":
          vm.selectedStatus = "";
          vm.selectedTheme = "";
          vm.textSearch = "";
          vm.textDateStartSend = "";
          vm.textDateEndSend = "";
          vm.textNameSearch = "";
          vm.getListData({ param: { CongKhai: vm.selectedStatusPublic } });
          break;

        default:
          vm.selectedStatus = "";
          vm.textSearch = "";
          vm.textDateEndSend = "";
          vm.textDateStartSend = "";
          vm.textNameSearch = "";
          vm.selectedStatusPublic = "";
          vm.getListData({ param: { ChuDeMaMuc: vm.selectedTheme } });
          break;
      }
    },
    handleChangeText(value) {
      const vm = this;
      if (vm.timeOut) clearTimeout(vm.timeOut);
      if (!value) {
        vm.timeOut = setTimeout(() => {
          vm.getListData();
        }, 200);
      }
    },
    handleChangeDate() {
      const vm = this;
      if (!vm.textDateStartSend && !vm.textDateEndSend) vm.getListData();
    },
      selectAllToggle({items}) {
      const vm = this;
      if(vm.selected.length) vm.selected = [];
      else{
        const result = items.filter(el=> el.TinhTrang.TenMuc !== 'Đã trả lời')
        vm.selected = result
      }
      console.log("toggle select: ", vm.selected, items);
    }
  },
  computed: {
    checkDisable() {
      const vm = this;
      console.log("computed list feedback", vm.listFeedback);
      const result = vm.listFeedback.filter(
        (item) => item.TinhTrang.TenMuc !== "Đã trả lời"
      );
      if (result.length) return true;
      return false;
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
    dateStartAnswerSend() {
       const vm = this;
      vm.textDateStartAnswerSend = vm.formatDate(vm.dateStartAnswerSend);
    },
    dateEndAnswerSend() {
       const vm = this;
      vm.textDateEndAnswerSend = vm.formatDate(vm.dateEndAnswerSend);
    }
  },
};
</script>

<style lang="scss" scoped>
.color-text-serach {
  color: #fff;
}
.custom-input {
  width: 48%;
  display: inline-block;
}
</style>
