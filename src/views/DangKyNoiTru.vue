<template>
  <v-card
    class="mx-auto pa-3 pb-6"
    outlined
    flat
  >
    <div>
      <v-row justify="end" class="mt-0">
        <v-col class="d-flex align-center ">
          <div style="width: 100%">
            <label>Số Căn cước công dân của sinh viên <span class="red--text">(*)</span></label>
            <v-text-field
                class="input-form mt-1"
                v-model="soCanCuocCongDan"
                solo
                dense
                clearable
                hide-details="auto"
                placeholder="Nhập số căn cước công dân của sinh viên"
            ></v-text-field>
          </div>
        </v-col>
        
        <v-col class="d-flex align-center justify-end" style="max-width: 220px; margin-top: 25px !important;">
          <v-btn small color="primary" class="mx-0 white--text" @click="traCuuThongTinDangKyNoiTru">
            <v-icon size="18">mdi-magnify</v-icon>&nbsp;
            Tra cứu đăng ký nội trú
          </v-btn>
        </v-col>
        <v-col class="d-flex align-center justify-end" style="max-width: 190px;    margin-top: 25px !important;">
          <v-btn small color="primary" class="mx-0 white--text" @click="showAddToChuc">
            <v-icon size="18">mdi-plus</v-icon>&nbsp;
            Gửi đăng ký nội trú
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      max-width="900"
      v-model="dialogGuiDangKy"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Gửi đăng ký nội trú</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogGuiDangKy = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formAddToChuc"
            v-model="validFormAdd"
            lazy-validation
          >
            <v-layout wrap>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Số Căn cước công dân của sinh viên <span class="red--text">(*)</span></label>
                  <v-text-field
                    class="flex input-form"
                    v-model="soCanCuocCongDan"
                    solo
                    dense
                    :rules="required"
                    required
                    hide-details="auto"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Đối tượng ưu tiên</label>
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="itemsDoiTuongUuTien"
                    v-model="doiTuongUuTien"
                    item-text="TenDoiTuongUuTien"
                    item-value="Id"
                    dense
                    solo
                    hide-details="auto"
                    placeholder=""
                    return-object
                    clearable
                  >
                  </v-autocomplete>
              </v-col>
              <v-col v-if="doiTuongUuTien" cols="12" class="py-0 mb-2">
                <label>Giấy tờ minh chứng đối tượng ưu tiên <span class="red--text">(*)</span></label>
                <input type="file" id="file_upload" :multiple="true" @input="uploadFile()" style="display:none">
                <div v-if="fileUpload && fileUpload.length">
                  <div class="pb-2" v-for="(item, key) in fileUpload" v-bind:key="key">
                    <v-icon size="18" color="blue">mdi-file-image</v-icon>
                    <a class="ml-2" style="font-size: 14px;text-decoration: underline;">{{item.name}}</a>
                    <v-btn @click="deleteFileAttack(item, key)" color="red" text icon class="mx-0">
                      <v-icon size="18">mdi-close-circle</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div>
                  <v-btn
                    class="btn-form my-2 mx-0 mr-2 left" small
                    color="primary"
                    @click.stop="pickFileUpload()"
                  >
                    <v-icon size="18">mdi-cloud-upload-outline</v-icon>&nbsp;
                    Tải lên giấy tờ minh chứng
                  </v-btn>
                </div>
                
              </v-col>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Đợt đăng ký nội trú <span class="red--text">(*)</span></label>
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="itemsDotDangKy"
                    v-model="tinhTrangHoatDongCreate"
                    item-text="TenDotDangKy"
                    item-value="Id"
                    dense
                    solo
                    hide-details="auto"
                    placeholder=""
                    return-object
                    :rules="required"
                    required
                  >
                  </v-autocomplete>
              </v-col>

              <v-col cols="12" class="py-0 mb-2">
                  <label>Danh sách ký túc xá nội trú <span class="red--text">(*)</span></label>
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="itemsKyTucXa"
                    v-model="kyTucXa"
                    item-text="TenTrungTamLuuTru"
                    item-value="Id"
                    dense
                    solo
                    hide-details="auto"
                    placeholder=""
                    return-object
                    :rules="required"
                    required
                  >
                  </v-autocomplete>
              </v-col>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Loại phòng nội trú <span class="red--text">(*)</span></label>
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="itemsLoaiPhong"
                    v-model="loaiPhongKyTucXa"
                    item-text="TenLoaiPhong"
                    item-value="Id"
                    dense
                    solo
                    hide-details="auto"
                    placeholder=""
                    return-object
                    :rules="required"
                    required
                  >
                  </v-autocomplete>
              </v-col>
              
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2" :loading="loading" :disabled="loading" @click="cancelCreate">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
          <v-btn small class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="submitGuiDangKy">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Gửi đăng ký</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      max-width="900"
      v-model="dialogThongTinNoiTru"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Thông tin đăng ký nội trú</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogThongTinNoiTru = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="mt-5 px-2">
          <v-row class="my-0 mx-0 mb-3" v-if="thongTinNoiTru">
            <v-col cols="12" md="6" class="py-2">
              <div class="d-inline-block font-weight-bold mr-2">Đối tượng ưu tiên: </div>
              <span class="d-inline-block">{{thongTinNoiTru.DanhSachDoiTuongUuTien.length ? thongTinNoiTru.DanhSachDoiTuongUuTien[0] : 'Không'}}</span>
            </v-col>
            <v-col cols="12" md="6" class="py-2">
              <div class="d-inline-block font-weight-bold mr-2">Đợt đăng ký: </div>
              <span class="d-inline-block">{{thongTinNoiTru.DotDangKy['TenDotDangKy']}}</span>
            </v-col>
            <v-col cols="12" md="6" class="py-2">
              <div class="d-inline-block font-weight-bold mr-2">Nơi nội trú: </div>
              <span class="d-inline-block">{{thongTinNoiTru.TrungTamLuuTru['TenTrungTamLuuTru']}}</span>
            </v-col>
            <v-col cols="12" md="6" class="py-2">
              <div class="d-inline-block font-weight-bold mr-2">Loại phòng nội trú: </div>
              <span class="d-inline-block">{{thongTinNoiTru.LoaiPhong['TenLoaiPhong']}}</span>
            </v-col>
          </v-row>
        </div>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2" @click="dialogThongTinNoiTru = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import toastr from 'toastr'
  import axios from 'axios'
  import $ from 'jquery'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  export default {
    name: 'CoQuanDonVi',
    components: {},
    props: [],
    data: () => ({
      loading: false,
      loadingData: false,
      itemsCapDonVi: [
        {name: 'Cấp sở', 'value': '1'},
        {name: 'Cấp huyện', 'value': '2'}
      ],
      soCanCuocCongDan: '092014158',
      capDonViSearch: '',
      
      itemsToChucCapTren: [],
      toChucCapTrenCreate: '',
      tinhTrangHoatDongCreate: '',
      doiTuongUuTien: '',
      itemsDoiTuongUuTien: [],
      fileUpload: [],
      itemsDotDangKy: [],
      dotDangKy: '',
      itemsKyTucXa: [],
      kyTucXa: '',
      itemsLoaiPhong: [],
      loaiPhongKyTucXa: '',
      thongTinNoiTru: '',

      itemsToChuc: [],
      diaChiHoatDongCuThe: '',
      diaChiHoatDongTinhThanh: '',
      itemsDiaChiHoatDongQuanHuyen: [],
      diaChiHoatDongQuanHuyen: '',
      itemsDiaChiHoatDongPhuongXa: [],
      diaChiHoatDongPhuongXa: '',
      thongTinToChuc: {
        "maHanhChinh": "",
        "tenGoi": "",
        "tenTiengAnh": "",
        "tenVietTat": "",
        "diaChiHoatDong": {
          "soNhaChiTiet": "",
          "tinhThanh": {
            "maMuc": "",
            "tenMuc": ""
          },
          "quanHuyen": {
            "maMuc": "",
            "tenMuc": ""
          },
          "phuongXa": {
            "maMuc": "",
            "tenMuc": ""
          }
        },
        "ngayThanhLap": "",
        "soQuyetDinh": "",
        "maSoNganSach": "",
        "nguoiDaiDien": {
          "maSoCaNhan": "",
          "hoVaTen": ""
        },
        "danhBaLienLac": {
          "thuDienTu": "",
          "soDienThoai": "",
          "soFax": ""
        },
        "tinhTrangToChuc": {
          "maMuc": "",
          "tenMuc": ""
        },
        "toChucCapTren": {
          "maHanhChinh": "",
          "tenGoi": "",
          "tenTiengAnh": "",
          "tenVietTat": ""
        }
      },
      page: 0,
      itemsPerPage: 15,
      total: 0,
      pageCount: 2,
      typeAction: '',
      dialogGuiDangKy: false,
      dialogThongTinNoiTru: false,
      validFormAdd: false,
      required: [
        v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc'
      ],
    }),
    created () {
      let vm = this
      vm.getDanhSachDoiTuong()
      vm.getDotDangKy()
      vm.getDsKyTucXa()
    },
    computed: {
    },
    watch: {
      kyTucXa (val) {
        let vm = this
        setTimeout(function () {
          vm.itemsLoaiPhong = []
          vm.loaiPhongKyTucXa = ''
          vm.getDsPhongKyTucXa()
        }, 200)
      },
      diaChiHoatDongQuanHuyen (val) {
        let vm = this
        if (!val) {
          vm.itemsDiaChiHoatDongPhuongXa = []
          vm.diaChiHoatDongPhuongXa = ''
        }
        vm.changeQuanHuyen()
      }
    },
    methods: {
      showAddToChuc () {
        let vm = this
        vm.typeAction = 'create'
        vm.dialogGuiDangKy = true
        setTimeout(function () {
          vm.$refs.formAddToChuc.resetValidation()
        }, 100)
      },
      submitGuiDangKy () {
        let vm = this
        toastr.remove()
        toastr.success('Gửi đăng ký thành công')
        vm.dialogGuiDangKy = false
        return;
        vm.formatOutputData()
        if (vm.loading) {
          return
        }
        vm.loading = true
        if (vm.$refs.formAddToChuc.validate()) {
          let filter = {
            collectionName: 'coquandonvi',
            data: vm.thongTinToChuc
          }
          vm.$store.dispatch('collectionCreate', filter).then(function (result) {
            vm.loading = false
            toastr.remove()
            toastr.success('Thêm mới thành công')
            let data = result.resp
            vm.$router.push({ path: '/co-quan-don-vi/' + data.primKey })
          }).catch(function (response) {
            vm.loading = false
            toastr.remove()
            // if (response && response.status == 409) {
            //   toastr.error('Mã danh mục đã tồn tại')
            //   return
            // }
            toastr.error('Thêm mới thất bại')
          })
        } else {
          vm.loading = false
        }
      },
      
      cancelCreate () {
        let vm = this
        vm.dialogGuiDangKy = false
      },
      traCuuThongTinDangKyNoiTru () {
        let vm = this
        if (!vm.soCanCuocCongDan) {
          return
        }
        let config = {
          method: 'post',
          url : '/v1/datasharing/dangkynoitru/phieudangky/' + vm.soCanCuocCongDan,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
         
          if (serializable && serializable.data && serializable.data[0]) {
            vm.thongTinNoiTru = serializable.data[0]
            vm.dialogThongTinNoiTru = true
          } else {
            toastr.remove()
            toastr.success('Không có thông tin đăng ký')
          }
        }).catch(function (error) {
          toastr.remove()
          toastr.success('Không có thông tin đăng ký')
        })
      },
      getDanhSachDoiTuong () {
        let vm = this
        let config = {
          method: 'get',
          url : '/v1/datasharing/dangkynoitru/doituonguutien',
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
          vm.itemsDoiTuongUuTien = serializable.data.DanhSachDoiTuongUuTien
        }).catch(function (error) {
          
        })
      },
      getDotDangKy () {
        let vm = this
        let config = {
          method: 'get',
          url : '/v1/datasharing/dangkynoitru/thongtindotdangky',
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
          vm.itemsDotDangKy = serializable.data.DanhSachDotDangKyLuuTru
        }).catch(function (error) {
          
        })
      },
      getDsKyTucXa () {
        let vm = this
        let config = {
          method: 'get',
          url : '/v1/datasharing/dangkynoitru/thongtinkytucxa',
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
          vm.itemsKyTucXa = serializable.data.DanhSachTrungTamLuuTru
        }).catch(function (error) {
          
        })
      },
      pickFileUpload () {
        document.getElementById('file_upload').value = ''
        document.getElementById('file_upload').click()
      },
      uploadFile () {
        let vm = this
        let files = $('#file_upload')[0].files
        for (let index = 0; index < files.length; index++) {
          vm.fileUpload.push({
            name: files[index]['name']
          })
        }
        vm.$store.commit('SET_FILEUPLOADYET', true)
      },
      deleteFileAttack (item, index) {
        let vm = this
        if (!item.id) {
          vm.fileUpload.splice(index, 1)
          vm.$store.commit('SET_FILEUPLOADYET', false)
        } else {
          vm.$store.commit('SET_SHOWCONFIRM', true)
          let confirm = {
            auth: false,
            title: 'Xóa tài liệu đính kèm',
            message: 'Bạn có chắc chắn muốn xóa tài liệu này',
            button: {
              yes: 'Có',
              no: 'Không'
            },
            callback: () => {
              let filter = {
                idThanhPhan: vm.thongtinthanhphan.primKey,
                idFile: item.id
              }
              vm.$store.dispatch('deleteFile', filter).then(function(result) {
                vm.fileUpload.splice(index, 1)
                toastr.success('Xóa tài liệu đính kèm thành công')
                vm.$store.commit('SET_FILEUPLOADYET', false)
              }).catch(function(){
                toastr.success('Xóa tài liệu đính kèm thất bại')
              })
            }
          }
          vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
          
        }
      },
      getDsPhongKyTucXa () {
        let vm = this
        let config = {
          method: 'get',
          url : '/v1/datasharing/dangkynoitru/thongtinloaiphong/' + vm.kyTucXa.Id,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
          vm.itemsLoaiPhong = serializable.data.DanhSachLoaiPhong
        }).catch(function (error) {
          
        })
      },
      changeTinhThanh (type) {
        let vm = this
        let danhMucCha = ''
        if (!vm.diaChiHoatDongTinhThanh) {
          return
        }
        danhMucCha = vm.diaChiHoatDongTinhThanh['maMuc']
        let filter = {
          collectionName: 'quanhuyen',
          data: {
            keyword: '',
            page: 0,
            size: 100,
            orderFields: 'maMuc',
            orderTypes: 'asc',
            tinhTrang: '1',
            thamChieu_maMuc: danhMucCha
          }
        }
        
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.itemsDiaChiHoatDongQuanHuyen = response.content
        }).catch(function () {
        })
      },
      changeQuanHuyen (type) {
        let vm = this
        let danhMucCha = ''
        if (!vm.diaChiHoatDongQuanHuyen) {
          return
        }
        danhMucCha = vm.diaChiHoatDongQuanHuyen['maMuc']
        let filter = {
          collectionName: 'phuongxa',
          data: {
            keyword: '',
            page: 0,
            size: 100,
            orderFields: 'maMuc',
            orderTypes: 'asc',
            tinhTrang: '1',
            thamChieu_maMuc: danhMucCha
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.itemsDiaChiHoatDongPhuongXa = response.content
        }).catch(function () {
        })
      },
      formatOutputData () {
        let vm = this
        vm.thongTinToChuc.diaChiHoatDong = {
          "phuongXa": {
            "maMuc": vm.diaChiHoatDongPhuongXa ? vm.diaChiHoatDongPhuongXa.maMuc : '',
            "tenMuc": vm.diaChiHoatDongPhuongXa ? vm.diaChiHoatDongPhuongXa.tenMuc : ''
          },
          "quanHuyen": {
            "maMuc": vm.diaChiHoatDongQuanHuyen ? vm.diaChiHoatDongQuanHuyen.maMuc : '',
            "tenMuc": vm.diaChiHoatDongQuanHuyen ? vm.diaChiHoatDongQuanHuyen.tenMuc : ''
          },
          "tinhThanh": {
            "maMuc": vm.diaChiHoatDongTinhThanh ? vm.diaChiHoatDongTinhThanh.maMuc : '',
            "tenMuc": vm.diaChiHoatDongTinhThanh ? vm.diaChiHoatDongTinhThanh.tenMuc : ''
          },
          "soNhaChiTiet": vm.diaChiHoatDongCuThe
        }
        vm.thongTinToChuc.tinhTrangToChuc = {
          "maMuc": vm.tinhTrangHoatDongCreate ? vm.tinhTrangHoatDongCreate.maMuc : '',
          "tenMuc": vm.tinhTrangHoatDongCreate ? vm.tinhTrangHoatDongCreate.tenMuc : ''
        }
        vm.thongTinToChuc.toChucCapTren = {
          "maHanhChinh": vm.toChucCapTrenCreate ? vm.toChucCapTrenCreate.maHanhChinh : '',
          "tenGoi": vm.toChucCapTrenCreate ? vm.toChucCapTrenCreate.tenGoi : '',
          "tenTiengAnh": "",
		      "tenVietTat": ""
        }
        
      },
      formatInputData () {
        let vm = this
        vm.tinhTrangHoatDongCreate = vm.thongTinToChuc.tinhTrangToChuc
        vm.toChucCapTrenCreate = vm.itemsToChucCapTren.find(function (item) {
          return item.maHanhChinh == vm.thongTinToChuc.toChucCapTren['maHanhChinh']
        })
        vm.diaChiHoatDongCuThe = vm.thongTinToChuc.diaChiHoatDong.soNhaChiTiet
        vm.diaChiHoatDongTinhThanh = vm.thongTinToChuc.diaChiHoatDong.tinhThanh
        vm.diaChiHoatDongQuanHuyen = vm.thongTinToChuc.diaChiHoatDong.quanHuyen
        vm.diaChiHoatDongPhuongXa = vm.thongTinToChuc.diaChiHoatDong.phuongXa
      },
      translateDate (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
      },
      dateLocale (dateInput) {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      },
      convertDate (date) {
        if (!date) return ''
        const [day, month, year] = date.split('/')
        let ddd = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        return (new Date(ddd)).toISOString()
      },
    }
  }
</script>
