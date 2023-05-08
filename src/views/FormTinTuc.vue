<template>
    <v-form
        class="dialog-body"
        ref="formTinTuc"
        v-model="validForm"
        lazy-validation
        > 
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Tiêu đề: <span style="color:red;">*</span></div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.tieuDe"
                    class="flex input-form"
                    solo
                    label="Nhập tiêu đề..."
                    dense
                    hide-details="auto"
                    required
                    :rules="rules.text"
                ></v-text-field>
            </v-col>
        </v-row>
    
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Nội dung: </div>
            </v-col>
            <v-col cols="12" sm="10">
                <vue-editer v-model="formData.noiDung" :height="300"/>
            </v-col>
        </v-row>
    
        <v-row style="display: -webkit-box;">
            <v-col cols="12" sm="2">
                <div class="titleText">Chuyên mục: </div>
            </v-col>
            <v-col cols="12" sm="4" style="display: table;">
                <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    v-model="formData.chuyenMuc"
                    :items="chuyenMucItems"
                    item-text="name"
                    item-value="value"
                    placeholder="Chọn loại chuyên mục"
                    dense
                    solo
                    hide-details="auto"
                    return-object
                    clearable
                    >
                </v-autocomplete>
            </v-col>
            
            <v-col cols="12" sm="2">
                <div class="titleText">Ngày xuất bản: </div>
            </v-col>
            <v-col cols="12" sm="4" style="display: table;margin-top:-18px;">
                <v-flex xs6>
                    <v-menu
                        ref="menuDate"
                        v-model="menuDate"
                        :close-on-content-click="true"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="formData.ngayXuatBan"
                                placeholder="dd/mm/yyyy HH:mm"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            <!-- <v-datetime-picker 
                                v-model="formData.ngayXuatBan" 
                                :active-picker.sync="activePicker"
                            ></v-datetime-picker> -->
                        </template>
                    </v-menu>
                </v-flex>
            </v-col>
        </v-row>
    
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Ảnh đại diện: </div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-file-input
                    v-model="formData.anhDaiDien"
                    chips
                    show-size
                    label="Tải ảnh đại diện"
                    small-chips
                    truncate-length="25"
                ></v-file-input>
            </v-col>
        </v-row>
            
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Tải file: </div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-file-input
                    v-model="formData.taiFile"
                    chips
                    show-size
                    label="Tải tài liệu"
                    small-chips
                    truncate-length="25"
                    multiple
                ></v-file-input>
                <div class="note italic">
                    Chỉ nhận file jpg, jpeg, png, pdf, doc, docx, xls, xlsx, rar, zip, pptx, ppt
                </div>  
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Trạng thái: </div>
            </v-col>
            <v-col cols="12" sm="10" style="margin-top: -16px;">
                <v-row>
                    <v-switch
                        v-model="formData.trangThaiValue"
                        :label="trangThaiLabel"
                        flat
                        @change="setTinhTrang()"
                    ></v-switch>
                </v-row>
            </v-col>
        </v-row>

    </v-form>   
</template>
      
<script>
import Pagination from './Pagination.vue'
import { VueEditor } from "vue2-editor";

export default {
    props: ["editingContent", "dataInput", "readonly"],
    components: {
        Pagination, 
        'vue-editer' : VueEditor 
    },
    data() {
        return {
            itemsPerPage: 10,
            pageCount: 1,
            page: 0,
            dialogTinTuc: false,
            editTinTuc: false,
            dateTime: new Date(),
            switchTinhTrang: false,
            textTinhTrang: '',
            required: [
                v => (v !== '' && v !== null && v !== undefined) || 'Đây là trường bắt buộc nhập'
            ],
            rules: {
                text: [val => (val || '').length > 0 || 'Đây là trường bắt buộc nhập'],
            },
            validForm: false,
            activePicker: null,
            date: null,
            menuDate: false,
            formData: {},
            trangThai: false,
            dataOutput: '',
            chuyenMuc: '',
            chuyenMucItems: [
                { name: 'Trung tâm hỗ trợ sinh viên', value: 1 },
                { name: 'Thông tin nội trú', value: 2 },
                { name: 'Cẩm nang Hòa Lạc', value: 3 },
                { name: 'Chuyên mục 1', value: 4 },
                { name: 'Chuyên mục 2', value: 5 },
                { name: 'Chuyên mục 3', value: 6 },
                { name: 'Tin tức chung', value: 7 }
            ],
            trangThaiLabel: '',
        }
    },
    created() {
    },
    watch: {
    },
    methods: {
        initForm (type) {
            let vm = this
            
            if (type === 'update' && vm.dataInput) {
                vm.formData = vm.dataInput
                vm.setTinhTrang()
                vm.$refs.formTinTuc.resetValidation()
            }
        },
        resetForm () {
            let vm = this
            vm.formData.noiDung = ''
            vm.$refs.formTinTuc.reset()
            vm.$refs.formTinTuc.resetValidation()            
        },
        validateForm () {
            let vm = this
            return vm.$refs.formTinTuc.validate()
        },
        submitForm () {
            let vm = this
            if (vm.formData.trangThaiValue === null) { vm.formData.trangThaiValue = false }
            let dataOutput = Object.assign({}, vm.formData)
            vm.$store.commit('SET_FORM_DATA', dataOutput)
        },
        setTinhTrang() {
            let vm = this
            setTimeout( function () {
                if (vm.formData.trangThaiValue == true) {
                    vm.formData.trangThaiName = "Hoạt động"
                    vm.trangThaiLabel = "Kích hoạt"
                } else { 
                    vm.formData.trangThaiName = "Không hoạt động" 
                    vm.trangThaiLabel = "Không kích hoạt"
                }
            }, 200)
            
        },
    }
}
</script>
<style>

</style>