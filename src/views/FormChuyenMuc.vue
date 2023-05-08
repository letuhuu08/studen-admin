<template>
    <v-form
        class="dialog-body"
        ref="formChuyenMuc"
        v-model="validForm"
        lazy-validation
        > 
        <v-row>
            <v-col cols="12" sm="2">
                <div class="titleText">Tiêu đề: <span style="color:red;">*</span></div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-text-field
                    v-model="formData.tenChuyenMuc"
                    class="flex input-form"
                    solo
                    label="Nhập tiêu đề..."
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
                <div class="titleText">Chuyên mục cha:</div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    v-model="formData.chuyenMucCha"
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
            rules: {
                text: [val => (val || '').length > 0 || 'Đây là trường bắt buộc nhập'],
            },
            validForm: false,
            activePicker: null,
            datetime: null,
            date: null,
            menuDate: false,
            formData: {},
            dataOutput: '',
            chuyenMucItems: [
                { name: 'Trung tâm hỗ trợ sinh viên', value: 1 },
                { name: 'Thông tin nội trú', value: 2 },
                { name: 'Cẩm nang Hòa Lạc', value: 3 },
                { name: 'Chuyên mục 1', value: 4 },
                { name: 'Chuyên mục 2', value: 5 },
                { name: 'Chuyên mục 3', value: 6 },
                { name: 'Tin tức chung', value: 7 }
            ],
        }
    },
    created() {
    },
    watch: {
    },
    methods: {
        initForm (type) {
            if (type === 'update' && this.dataInput) {
                this.formData = this.dataInput
            }
        },
        resetForm () {
            let vm = this
            vm.$refs.formChuyenMuc.reset()
            vm.$refs.formChuyenMuc.resetValidation()
        },
        validateForm () {
            let vm = this
            return vm.$refs.formChuyenMuc.validate()
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