<template>
    <div>
        <v-row>
            <v-col cols="12" sm="5" style="display: inline-grid;">
                <v-row no-gutters>
                    <v-col cols="12" sm="2" style="display: flex">
                        <span class="font-weight-bold">Tên địa điểm:</span>
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-text-field
                            v-model="tenDiaDiemSearch"
                            class="flex input-form"
                            solo
                            dense
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="4" style="display: inline-grid;">
                <v-row no-gutters>
                    <v-col cols="12" sm="3" style="display: flex">
                        <span class="font-weight-bold">Tọa độ:</span>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-text-field
                            v-model="toaDoSearch"
                            class="flex input-form"
                            solo
                            dense
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="3">
                <v-row no-gutters>
                    <v-col cols="12" sm="4" style="display: flex">
                        <label class="font-weight-bold">Loại bản đồ: </label>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-autocomplete
                            v-model="loaiBanDoSearch"
                            class="flex input-form"
                            hide-no-data
                            :items="loaiBanDoItems"
                            item-text="name"
                            item-value="value"
                            placeholder="Chọn loại bản đồ"
                            dense
                            solo
                            hide-details="auto"
                            return-object
                            clearable
                        >
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="12" sm="5" style="display: inline-table;">
                <v-row no-gutters>
                    <v-col cols="12" sm="2" style="display: flex">
                        <span class="font-weight-bold">Mô tả:</span>
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-text-field
                            v-model="moTaSearch"
                            class="flex input-form"
                            solo
                            dense
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="4" >
                <v-row no-gutters>
                    <v-col cols="12" sm="3" style="display: flex">
                        <span class="font-weight-bold">Trạng thái:</span>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-checkbox 
                        v-model="trangThaiSearch"
                        style="display: contents;" 
                        label='Xuất bản'
                        >
                        </v-checkbox>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="3" style="display: inline-table;">
                <v-row no-gutters>
                    <v-col cols="12" sm="4" style="display: flex">
                        <span class="font-weight-bold">Focus:  </span>
                        <v-checkbox v-model="focusSearch" style="display: contents;"></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-autocomplete
                          v-model="khuVucSearch"
                          class="flex input-form"
                          hide-no-data
                          :items="khuVucItems"
                          item-text="name"
                          item-value="value"
                          placeholder="Chọn khu vực"
                          dense
                          solo
                          hide-details="auto"
                          return-object
                          clearable
                        >
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- btn: thêm mới, tìm kiếm -->
        <v-row>
            <v-col cols="12" sm="6"></v-col>
            <v-col cols="12" sm="6">
                <v-row no-gutters style="float: right;">
                    <div>
                        <button class="btn btn-add primary" @click="showAddForm">
                            <v-icon left dark size="22">mdi-file-plus</v-icon>
                            Thêm mới
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-add primary" @click="getDanhSachDiaDiemBds">
                            <v-icon left dark size="22">mdi mdi-magnify-minus-outline</v-icon>
                            Tìm kiếm
                        </button>
                    </div>
                </v-row>
            </v-col>
        </v-row>
        <!-- data table -->
        <v-row class="my-0 mb-3">
            <v-col cols="12" class="pt-0">
              <v-data-table
                :headers="headers"
                :items="danhSachDiaDiemBds"
                :items-per-page="itemsPerPage"
                item-key="primKey"
                hide-default-footer
                class="table-base mt-2"
                no-data-text="Không có"
                :loading="loadingData"
                loading-text="Đang tải... "
                item-text="name"
              >
                <template v-slot:item.thaoTac="{ item }" >
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" text icon class="" v-bind="attrs" v-on="on" @click.stop="showFormDetail(item)">
                        <v-icon size="20">mdi-arrow-right-bold-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Chi Tiết</span>
                  </v-tooltip>
        
                  <v-tooltip top v-if="isAdmin">
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn color="#2161b1" text icon class=" mr-2" v-bind="attrs" v-on="on" @click.stop="showUpdateForm(item)">
                          <v-icon size="18">mdi-pencil</v-icon>
                          </v-btn>
                      </template>
                      <span>Sửa</span>
                  </v-tooltip>
        
                  <v-tooltip top v-if="isAdmin">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="red" text icon class="ml-2" v-bind="attrs" v-on="on" @click.stop="deleteItem(item)">
                        <v-icon size="18">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </template> 
              </v-data-table>
              <pagination v-if="pageCount" :pageInput="page" :total="total" :pageCount="pageCount" @tiny:change-page=""></pagination>
            </v-col>
        </v-row>
        <!-- -->
        <v-dialog
            max-width="1200"
            v-model="dialogForm"
            persistent
        >
            <v-card>
                <v-toolbar
                  dark
                  color="primary"
                  class="px-3"
                >
                  <v-toolbar-title v-if="readonlyForm && edittingForm === null">Thông tin loại bản đồ</v-toolbar-title>
                  <v-toolbar-title v-if="edittingForm === true && !readonlyForm">Cập nhật loại bản đồ</v-toolbar-title>
                  <v-toolbar-title v-if="edittingForm === false && !readonlyForm">Thêm mới loại bản đồ</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn
                      icon
                      dark
                      @click="exitForm"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <!-- -->  
                <form-dia-diem-bds
                ref="formDiaDiemBdsRef"
                :editingContent="editContent"
                :dataInput="dataInput"
                :readonly="readonlyForm"
                ></form-dia-diem-bds>
                <!-- -->
                <v-card-text class="px-2 py-2">
                    <v-card-actions class="justify-center my-4">
                    <v-btn small depressed color="red" class="white--text mr-2" :loading="loadingAction" :disabled="loadingAction" @click="exitForm">
                      <v-icon left>
                        mdi-close
                      </v-icon>
                      {{ $t('basic.thoat')}}
                    </v-btn>
                    <v-btn v-if="!readonlyForm" small depressed class="mr-2" color="primary" :loading="loadingAction" :disabled="loadingAction" @click.native="submitForm">
                      <v-icon left dark size="18">
                        mdi-file-document-plus-outline
                      </v-icon>
                      <span v-if="edittingForm">Cập nhật</span>
                      <span v-else>Thêm vào</span>
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import FormDiaDiemBds from './FormDiaDiemBds.vue'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}
export default {
  components: {
    Pagination, 
    'form-dia-diem-bds': FormDiaDiemBds
  },
  data() {
      return {
          headers: [
            {
                sortable: true,
                text: 'Loại bản đồ',
                align: 'center',
                value: 'loaiBanDo',
                width: 160
            },
            {
                sortable: false,
                text:  'Tên địa điểm' ,
                align: 'left',
                value: 'tenDiaDiem',
                class: 'th-center'
                
            },
            {
                sortable: false,
                text: 'Khu vực' ,
                align: 'left',
                value: 'khuVuc',
                class: 'th-center',
                width: 80
            },
            // {
            //     sortable: false,
            //     text: 'Focus' ,
            //     align: 'center',
            //     value: 'focusName',
            //     class: 'th-center',
            //     width: 80
            // },
            // {
            //     sortable: false,
            //     text: 'Trạng thái' ,
            //     align: 'center',
            //     value: 'trangThaiName',
            //     class: 'th-center',
            //     width: 100
            // },
            {
                sortable: false,
                text: 'Thao tác' ,
                align: 'center',
                value: 'thaoTac',
                class: 'th-center',
                width: 150
            }
          ],
          khuVuc: '',
          khuVucItems: [
            { value: 1, name: "Hòa Lạc" },
            { value: 2, name: "Xuân Thủy" },
            { value: 3, name: "Khu vực khác" }
          ],
          loaiBanDo: '',
          loaiBanDoItems: [
            { value: 1, name: "Tòa nhà" },
            { value: 2, name: "Bãi đỗ xe" },
            { value: 3, name: "Ký túc xá" },
            { value: 4, name: "Check in" },
            { value: 5, name: "Ăn uống" },
            { value: 6, name: "Hiệu thuốc" }
          ],
          danhSachDiaDiemBds: [{
loaiBanDo: "Tòa nhà",
tenDiaDiem: "quán cà phê",
khuVuc: "Hòa Lạc" 
          }
          ],
          itemsPerPage: 10,
          loadingData: false,
          pageCount: 1,
          page: 0,
          edittingForm: false,
          dialogForm: false,
          readonlyForm: false,
          loadingAction: false,
          editContent: '',
          dataInput: '',
          total: 1,
          focusName: '',
          trangThai: '',
          tenDiaDiemSearch: null,
          moTaSearch: null,
          toaDoSearch: null,
          trangThaiSearch: null,
          loaiBanDoSearch: {value: null, name: null},
          loaiVanBanSearch: null,
          focusSearch: null,
          khuVucSearch: {value: null, name: null}
      }
  },
  created() {
    let vm = this
    vm.getDanhSachDiaDiemBds()
    if (!vm.isAdmin && !vm.checkRole('XEMBAOCAODONVI') && !vm.checkRole('XEMTATCABAOCAO')) {
      vm.$router.push({ path: '/login'})
      return
    }
  },
  watch: {
  },
  computed: {

  },
  methods: {
    showUpdateForm(item) {
      let vm = this
      vm.dialogForm = true
      vm.edittingForm = true
      vm.readonlyForm = false
      vm.editContent = item
      try {
        vm.dataInput = Object.assign({}, item)
      } catch (error) {
        vm.dataInput = {}
      }
      setTimeout(function () {
        vm.$refs.formDiaDiemBdsRef.initForm('update')
      }, 200)
    },
    showAddForm() {
      let vm = this
      vm.dialogForm = true
      vm.edittingForm = false
      vm.readonlyForm = false
      setTimeout(function () {
        vm.$refs.formDiaDiemBdsRef.resetForm()
      }, 200)
    },
    showFormDetail(item) {
      let vm = this
      vm.dialogForm = true
      vm.edittingForm = null
      vm.readonlyForm = true
      vm.dataInput = Object.assign({}, item)
      setTimeout(function () {
        vm.$refs.formDiaDiemBdsRef.initForm('update')
      }, 200)
    },
    submitForm() {
      let vm = this
      if (vm.$refs.formDiaDiemBdsRef.validateForm()) {
        vm.$refs.formDiaDiemBdsRef.submitForm()
        let formData = vm.$store.getters.getFormData
        vm.loadingAction = true
        if (!vm.edittingForm) { 
          formData.id = vm.getMaxNumber('id')
          formData.focusName = (formData.focusValue == true) ? "Có" : "Không"
          formData.trangThaiName = (formData.trangThaiValue == true) ? "Xuất bản" : "Không xuất bản"
          vm.danhSachDiaDiemBds.push(formData)
          vm.loadingAction = false
          vm.dialogForm = false
          vm.total += 1
          toastr.remove()
          toastr.success('Thêm mới thành công') 
        } else {
          let editedContent = (vm.danhSachDiaDiemBds.filter(item => item.id !== vm.editContent.id))
          formData.focusName = (formData.focusValue == true) ? "Có" : "Không"
          formData.trangThaiName = (formData.trangThaiValue == true) ? "Xuất bản" : "Không xuất bản"
          editedContent.push(formData)
          vm.danhSachDiaDiemBds = editedContent
          vm.loadingAction = false
          vm.dialogForm = false
          toastr.remove()
          toastr.success('Cập nhật thành công') 
        }
      }
    },
    exitForm() {
      let vm = this
      vm.dialogForm = false
      vm.$refs.formDiaDiemBdsRef.resetForm()
    },
    deleteItem(item) {
      let vm = this
      vm.$store.commit('SET_SHOWCONFIRM', true)
      let confirm = {
        auth: false,
        title: 'Xoá loại bản đồ',
        message: 'Bạn có chắc xóa loại bản đồ này?',
        button: {
          yes: 'Có',
          no: 'Không',
        },
        callback: () => {
          vm.loading = true
          vm.danhSachDiaDiemBds = vm.danhSachDiaDiemBds.filter(i => i.id !== item.id)
          vm.loading = false
          vm.total -= 1
          toastr.remove()
          toastr.success('Xóa loại bản đồ thành công')
        }
      }
      vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
    },
    getDanhSachDiaDiemBds () {
      let vm = this
      vm.loadingData = true
      let filter = {
        collectionName: 'quanlydiadiembandoso',
        data: {
            "tenDiaDiem": vm.tenDiaDiemSearch ? vm.tenDiaDiemSearch : null,
            "moTa": vm.moTaSearch ? vm.moTaSearch : null,
            "toaDo": vm.toaDoSearch ? vm.toaDoSearch : null,
            "loaiBanDo.value": vm.loaiBanDoSearch.value ? vm.loaiBanDoSearch.value : null ,
            "trangThaiValue": vm.trangThaiSearch,
            "focusValue": vm.focusSearch,
            "khuVuc.value": vm.khuVucSearch.value ? vm.khuVucSearch.value : null 
        }
      }
      vm.$store.dispatch('collectionFilter', filter).then(function (response) {
        vm.danhSachDiaDiemBds = response
        vm.total = vm.danhSachDiaDiemBds.length
        vm.loadingData = false
      }).catch(function () {
        vm.loadingData = false
      })
    },
    // onChangeTrangThaiSearch () {
    //   let vm = this
    //   setTimeout( function () {
    //     if (vm.trangThaiSearch1 == false) {
    //       vm.trangThaiSearch = 0
    //     } else { vm.trangThaiSearch = 1 }
    //   }, 200)
    // },
    getMaxNumber(typenumber) {
      let vm = this
      let max = 0
      max = Math.max(...vm.danhSachDiaDiemBds.map(item => item[typenumber]))
      return (max+1)
    },
  }
}
</script>
<style>
</style>