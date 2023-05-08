<template>
    <v-form
        class="dialog-body"
        ref="formLoaiBanDo"
        v-model="validForm"
        lazy-validation
        > 
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Thứ tự:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.thuTu"
                    type="number"
                    min="0"
                    class="flex input-form"
                    solo
                    dense
                    hide-details="auto"
                    :clearable="!readonly"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Tên loại bản đồ: <span style="color:red;">*</span></div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.tenLoaiBanDo"
                    class="flex input-form"
                    solo
                    label="Nhập tên loại bản đồ..."
                    dense
                    hide-details="auto"
                    :clearable="!readonly"
                    required
                    :rules="rules.text"
                ></v-text-field>
            </v-col>
        </v-row>  
          
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Mã icon:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.maIcon"
                    class="flex input-form"
                    solo
                    dense
                    hide-details="auto"
                    :clearable="!readonly"
                ></v-text-field>
            </v-col>
        </v-row> 
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Trạng thái:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-checkbox 
                v-model="formData.trangThaiValue"
                label=" Xuất bản"
                @change="setTrangThai()"
                ></v-checkbox>
            </v-col>
        </v-row> 
    </v-form>   
    </template>
      
    <script>
    import Pagination from './Pagination.vue'

    export default {
        props: ["editingContent", "dataInput", "readonly"],
        components: {
          Pagination
        },
        data() {
            return {
                itemsPerPage: 10,
                pageCount: 1,
                page: 0,
                dialogTinTuc: false,
                editTinTuc: false,
                datetime: new Date(),
                switchTinhTrang: true,
                textTinhTrang: '',
                rules: {
                  text: [val => (val || '').length > 0 || 'Đây là trường bắt buộc nhập'],
                },
                validForm: false,
                activePicker: null,
                datetime: null,
                date: null,
                menuDate: false,
                formData: {},
                trangThai: false,
                dataOutput: '',
            }
        },
        created() {
            if (this.switchTinhTrang === true) {
                this.textTinhTrang = "Kích hoạt"
            } else {
                this.textTinhTrang = "Không kích hoạt"
            }
        },
        watch: {
        },
        methods: {
            // edittingForm() {
            //     this.dialogTinTuc = true
            //     this.editTinTuc = true
            // },
            // addChiTietTinTuc() {
            //     this.dialogTinTuc = true
            //     this.editTinTuc = false
            // },
            // exitForm() {
            //     this.dialogTinTuc = false
            // },
            
            // save (date) {
            //     this.$refs.menu.save(date)
            // },
            initForm (type) {
                if (type === 'update' && this.dataInput) {
                    this.formData = this.dataInput
                    if (this.formData.trangThai == 1) {
                        this.trangThai = true
                    } else {
                        this.trangThai = false
                    }
                }
            },
            resetForm () {
                let vm = this
                vm.$refs.formLoaiBanDo.reset()
                vm.$refs.formLoaiBanDo.resetValidation()
            },
            validateForm () {
                let vm = this
                return vm.$refs.formLoaiBanDo.validate()
            },
            submitForm () {
                let vm = this
                let dataOutput = Object.assign({}, vm.formData)
                vm.$store.commit('SET_FORM_DATA', dataOutput)
            },
            setTrangThai() {
                let vm = this
                if (vm.trangThaiValue == true) {
                    vm.formData.trangThaiName = "Xuất bản"
                } else {
                    vm.formData.trangThaiName = "Không xuất bản"
                }
            }
        }
    }
    </script>
    <style>
    
    </style>