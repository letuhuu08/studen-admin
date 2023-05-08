<template>
    <div>
        <v-row no-gutters>
            <v-col cols="12" sm="5">
                <input v-model=tieuDeSearch class="form-control" type="text" placeholder="Nhập tiêu đề tin tức..." autocomplete="off">
            </v-col>
            <v-col cols="12" sm="1">
                <button class="btn btn-search" @click.stop="getDanhSachTinTuc">
                    <v-icon left dark size="22">mdi mdi-magnify-minus-outline</v-icon>
                </button>
            </v-col>
            <v-col cols="12" sm="6">
                <div style="float:right;">
                    <button @click.stop="showAddForm" class="btn btn-add">   
                        <v-icon left dark size="22">mdi-file-plus</v-icon>
                        Thêm mới
                    </button>
                </div>
            </v-col>
        </v-row>
        <!-- data table -->
        <v-row class="my-0 mb-3">
            <v-col cols="12" class="pt-0">
              <v-data-table
                :headers="headers"
                :items="danhSachTinTuc"
                :items-per-page="itemsPerPage"
                item-key="primKey"
                hide-default-footer
                class="table-base mt-2"
                no-data-text="Không có"
                :loading="loadingData"
                loading-text="Đang tải... "
                item-text="name"
              >
                <template v-slot:item.thaoTac="{ item }">
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
            fullscreen
        >
            <v-card>
                <v-toolbar
                  dark
                  color="primary"
                  class="px-3"
                >
                  <v-toolbar-title v-if="readonlyForm && edittingForm === null">Thông tin tin tức</v-toolbar-title>
                  <v-toolbar-title v-if="edittingForm === true && !readonlyForm">Cập nhật tin tức</v-toolbar-title>
                  <v-toolbar-title v-if="edittingForm === false && !readonlyForm">Thêm mới tin tức</v-toolbar-title>
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
                <form-tin-tuc 
                ref="formTinTucRef"
                :editingContent="editContent"
                :dataInput="dataInput"
                :readonly="readonlyForm"
                ></form-tin-tuc>
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
import FormTinTuc from './FormTinTuc.vue'
import axios from 'axios'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}
export default {
  components: {
    Pagination, 
    'form-tin-tuc': FormTinTuc
  },
  data() {
      return {
          headers: [
              {
                  sortable: false,
                  text: 'STT',
                  align: 'center',
                  value: 'stt',
                  width: 15
              },
              {
                  sortable: false,
                  text:  'Chuyên mục' ,
                  align: 'left',
                  value: 'chuyenMuc.name',
                  class: 'th-center',
                  width: 120
              },
              {
                  sortable: false,
                  text: 'Tiêu đề' ,
                  align: 'left',
                  value: 'tieuDe',
                  class: 'th-center'
              },
              {
                  sortable: false,
                  text: 'Trạng thái' ,
                  align: 'center',
                  value: 'trangThaiName',
                  class: 'th-center',
                  width: 130
              },
              {
                  sortable: false,
                  text: 'Thao tác' ,
                  align: 'center',
                  value: 'thaoTac',
                  class: 'th-center',
                  width: 150
              }
          ],
          danhSachTinTuc: [],
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
          tieuDeSearch: ''
      }
  },
  created() {
    let vm = this
    vm.getDanhSachTinTuc()
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
      vm.readonlyForm = false
      vm.editContent = item
      try {
        vm.dataInput = Object.assign({}, item)
      } catch (error) {
        vm.dataInput = {}
      }
      vm.dialogForm = true
      vm.edittingForm = true
      setTimeout(function () {
        vm.$refs.formTinTucRef.initForm('update')
      }, 200)
    },
    showAddForm() {
      let vm = this
      vm.dialogForm = true
      vm.edittingForm = false
      vm.readonlyForm = false
      setTimeout(function () {
        vm.$refs.formTinTucRef.resetForm()
      }, 200)
    },
    showFormDetail(item) {
      let vm = this
      vm.dialogForm = true
      vm.edittingForm = null
      vm.readonlyForm = true
      vm.dataInput = Object.assign({}, item)
      setTimeout(function () {
        vm.$refs.formTinTucRef.initForm('update')
      }, 200)
    },
    submitForm() {
      let vm = this
      if (vm.$refs.formTinTucRef.validateForm()) {
        vm.$refs.formTinTucRef.submitForm()
        let formData = vm.$store.getters.getFormData
        vm.loadingAction = true
        if (!vm.edittingForm) { 
          formData.id = vm.getMaxNumber('id')
          formData.stt = vm.getMaxNumber('stt')
          vm.danhSachTinTuc.push(formData)
          vm.loadingAction = false
          vm.dialogForm = false
          vm.total += 1
          toastr.remove()
          toastr.success('Thêm mới thành công') 
        } else {
          let editedContent = (vm.danhSachTinTuc.filter(item => item.id !== vm.editContent.id))
          editedContent.push(formData)
          vm.danhSachTinTuc = editedContent
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
      vm.$refs.formTinTucRef.resetForm()
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
          vm.danhSachTinTuc = vm.danhSachTinTuc.filter(i => i.id !== item.id)
          vm.loading = false
          vm.total -= 1
          toastr.remove()
          toastr.success('Xóa loại bản đồ thành công')
        }
      }
      vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
    },
    getDanhSachTinTuc () {
      let vm = this
      vm.loadingData = true
      let filter = {
        collectionName: 'canbo',
        data: {
          tieuDe : (vm.tieuDeSearch!=='') ? vm.tieuDeSearch : null
        }
      }
      vm.$store.dispatch('collectionFilter', filter).then(function (response) {
        vm.danhSachTinTuc = response
        vm.total = vm.danhSachTinTuc.length
        vm.loadingData = false
      }).catch(function () {
        vm.loadingData = false
      })
    },
    getMaxNumber(typenumber) {
      let vm = this
      let max = 0
      max = Math.max(...vm.danhSachTinTuc.map(item => item[typenumber]))
      return (max+1)
    },
    // handleSearchButton() {
    //   let vm = this
    //   vm.tieuDeSearch = document.getElementById("tieuDeSearch").value
    //   if (vm.tieuDeSearch == '') {
    //     vm.tieuDeSearch = null
    //   } 
    //   vm.getDanhSachTinTuc()
    // }

  }
}
</script>
<style>
</style>