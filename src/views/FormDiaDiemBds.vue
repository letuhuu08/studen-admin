<template>
    <v-form
        class="dialog-body"
        ref="formDiaDiemBds"
        v-model="validForm"
        lazy-validation
        > 
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Tên địa điểm: <span style="color:red;">*</span></div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.tenDiaDiem"
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
                <div class="titleText">Mô tả:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.moTa"
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
                <div class="titleText">Tọa độ:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.toaDo"
                    min='0'
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
                <div class="titleText">Loại bản đồ: </div>
            </v-col>
            <v-col cols="12" sm="10" style="display: table;">
                <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    v-model="formData.loaiBanDo"
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
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Trạng thái:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-checkbox 
                style="display: contents"
                v-model="formData.trangThaiValue"
                label=" Xuất bản"
                @change="setTrangThai()"
                ></v-checkbox>
            </v-col>
        </v-row> 
        
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Khu vực:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" sm="2">
                        <v-checkbox 
                        style="display: contents;"
                        v-model="formData.focusValue" 
                        label="Focus"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="10">
                        <v-autocomplete
                            class="flex input-form"
                            hide-no-data
                            v-model="formData.khuVuc"
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
                focusText: '',
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
            }
        },
        created() {
            let vm = this
            if (this.switchTinhTrang === true) {
                this.textTinhTrang = "Kích hoạt"
            } else {
                this.textTinhTrang = "Không kích hoạt"
            }
            setTimeout( function () {
                if (vm.formData.focusValue == true) {

                } else {

                }
            }, 200)
        },
        watch: {
        },
        methods: {
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
                vm.$refs.formDiaDiemBds.reset()
                vm.$refs.formDiaDiemBds.resetValidation()
            },
            validateForm () {
                let vm = this
                return vm.$refs.formDiaDiemBds.validate()
            },
            submitForm () {
                let vm = this
                let dataOutput = Object.assign({}, vm.formData)
                vm.$store.commit('SET_FORM_DATA', dataOutput)
            },
            setTrangThai() {
                let vm = this
                if (vm.trangThai == true) {
                    vm.formData.trangThai = 1
                } else {
                    vm.formData.trangThai = 0
                }
            }
        }
    }
    </script>
    <style>
    
    </style>