
<template>
  <div>
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      :list="list"
      :value="value"
      @input="emitter"
      @change="changeMucLuc"
    >
      <div class="item-group" :key="el.id" v-for="(el, index) in realValue" @dblclick.stop="goToPage(el)" @click.stop="editChild(el)">
        <div class="item layout wrap" >
          <div class="flex" style="width: calc(100% - 30px);text-align: left;">{{ el.TenDauMuc }}</div>
          <div class="flex" style="width: 30px;max-width: 30px;text-align: right;align-self: center;">{{el.SoTrang}}</div>
        </div>
        <nested-test class="item-sub" :list="el.MucLucCon" />
      </div>
    </draggable>
    <v-dialog
      max-width="600"
      v-model="dialogThemMucLuc"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Chỉnh sửa mục lục</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogThemMucLuc = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formAddMucLuc"
            v-model="validFormAdd"
            lazy-validation
          >
            <v-layout wrap>
              <v-col cols="12" class="py-0 mb-2">
                <label>Tên đầu mục <span class="red--text">(*)</span></label>
                <v-textarea
                  class="flex input-form"
                  v-model="tenDauMuc"
                  solo
                  dense
                  :rules="required"
                  required
                  hide-details="auto"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="py-0 my-2">
                <label>Trang số<span class="red--text"> (*)</span></label>
                <v-text-field
                  class="flex input-form"
                  v-model="trangDauMuc"
                  solo
                  dense
                  :rules="required"
                  required
                  hide-details="auto"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2"  @click="dialogThemMucLuc = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
          <v-btn small class="mr-2 white--text" color="orange"  @click="submitXoaDauMuc">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Xóa đầu mục</span>
          </v-btn>
          <v-btn small class="mr-0" color="primary"  @click="submitThemMucLuc">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Cập nhật</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import axios from 'axios';
import draggable from "vuedraggable";
export default {
  name: "nested-test",
  data: () => ({
    elementUpdate: '',
    dialogThemMucLuc: false,
    tenDauMuc: '',
    trangDauMuc: '',
    validFormAdd: false,
    required: [
      v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc'
    ],
  }),
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    changeMucLuc () {
      let vm = this
      vm.$emit('tiny:change-mucluc', vm.realValue)
    },
    editChild(el) {
      let vm = this
      console.log('31231234444', el)
      console.log('elements', vm.elements)
      vm.elementUpdate = el
      vm.tenDauMuc = el.TenDauMuc
      vm.trangDauMuc = el.SoTrang
      vm.dialogThemMucLuc = true
    },
    submitThemMucLuc () {
      let vm = this
      if (vm.$refs.formAddMucLuc.validate()) {       
        // console.log('vm.elements', vm.elements)
        let data = [].concat(vm.elements)
        data.forEach((element, index) => {
          if (element.id == vm.elementUpdate.id) {
            let itemUpdate = {
              TenDauMuc: vm.tenDauMuc,
              SoTrang: vm.trangDauMuc
            }
            data[index] = Object.assign(element, itemUpdate)
          } else {
            if (element.hasOwnProperty('MucLucCon') && element.MucLucCon.length) {
              element['MucLucCon'].forEach((elementChild, indexChild) => {
                if (elementChild.id == vm.elementUpdate.id) {
                  let itemUpdate = {
                    TenDauMuc: vm.tenDauMuc,
                    SoTrang: vm.trangDauMuc
                  }
                  data[index]['MucLucCon'][indexChild] = Object.assign(elementChild, itemUpdate)
                }
              })
            }
          }
        });
        // console.log('dataOutput', data)
        vm.dialogThemMucLuc = false
        vm.capNhatCamNang(data)
      }
    },
    submitXoaDauMuc () {
      let vm = this
      vm.$store.commit('SET_SHOWCONFIRM', true)
      let confirm = {
        auth: false,
        title: 'Xoá mục lục',
        message: 'Bạn có chắc xóa đầu mục này?',
        button: {
          yes: 'Có',
          no: 'Không',
        },
        callback: () => {
          let data = [].concat(vm.elements)
          data.forEach((element, index) => {
            if (element.id == vm.elementUpdate.id) {
              data.splice(index, 1);
            } else {
              if (element.hasOwnProperty('MucLucCon') && element.MucLucCon.length) {
                element['MucLucCon'].forEach((elementChild, indexChild) => {
                  if (elementChild.id == vm.elementUpdate.id) {
                    data[index]['MucLucCon'].splice(indexChild, 1);
                  }
                })
              }
            }
          });
          // console.log('dataOutput123', data)
          vm.$store.dispatch("updateElements", data);
          vm.dialogThemMucLuc = false
          vm.capNhatCamNang(data)
        }
      }
      vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
    },
    capNhatCamNang (elements) {
      let vm = this
      if (vm.loading) {
        return
      }
      let contentMucLuc = JSON.parse(vm.thongTinCamNang.Content)
      let dataCamNang = Object.assign(contentMucLuc, {
        MucLuc: elements
      })
      let config = {
        method: 'post',
        url : '/v1/datasharing/camnang/' + vm.thongTinCamNang.PrimKey,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({"Content": JSON.stringify(dataCamNang), "TrangThai": "1"}),
        params: {}
      }
      axios(config).then(function (response) {

      })
    },
    goToPage (el) {
      let vm = this
      vm.$store.commit('SET_PAGE_PDF', el.SoTrang)
    }
  },
  components: {
    draggable
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
    elements: {
      get() {
        return this.$store.state.elements;
      },
      set(value) {
        this.$store.dispatch("updateElements", value);
      }
    },
    thongTinCamNang () {
      return this.$store.state.thongTinCamNang;
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  }
};
</script>
<style scoped>
.item-container {
  max-width: 40rem;
  margin: 0;
}
.item-group .item:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    font-weight: bold;
}
.item {
  padding: 10px;
  background-color: #fefefe;
  border: 1px solid rgba(0,0,0,.125);
  cursor: move;
  width: 100%;
}
.item-sub {
  margin: 0 0 0 30px;
}
.item-sub .item {
  font-weight: normal !important;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>