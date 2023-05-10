<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
     permanent
    v-model="drawer"
    
    @click.stop="mini != mini"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    src=""
    mobile-breakpoint="960"
    app
    v-bind="$attrs"
  >
    <template v-slot:prepend>
      <v-list-item two-line :class="mini ? 'px-0 pl-2' : ''">
        <v-list-item-avatar v-if="mini">
          <img
            :src="`${publicPath}/images/image-acc.png`"
            style="width: 24px; height: 24px"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-drawer mb-3" style="font-size: 16px">{{
            userInfo.hoVaTen ? userInfo.hoVaTen : ""
          }}</v-list-item-title>
          <div style="color: #6ec1fe">
            {{ userInfo.maSoCanBo ? userInfo.maSoCanBo : "" }}
          </div>
        </v-list-item-content>     
        <!-- <v-btn icon @click.stop="mini = !mini">
          <v-icon class="text-drawer">mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item :class="menuName === menu.MaMenu && formatListMenu.length ? 'item-active mb-3 list-menu' : 'mb-3 list-menu'" v-for="(menu, index) in formatListMenu" :key="index" @click.stop="goToPage(menu.DuongDan)">
        <v-list-item-icon >
          <v-tooltip top color="#0073C8">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                class="icon-draw"
                style="font-size: 24px !important"
                >{{ menu.iconRender }}</v-icon
              >
            </template>
            <span>{{ menu.TenMenu }}</span>
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-drawer text-list">{{
            menu.TenMenu
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-tooltip top color="#0073C8">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click.stop="logout"
              v-bind="attrs"
              v-on="on"
              text
              style="padding-left: 0px !important; width: 100%"
              class="px-2 d-flex justify-start"
            >
              <v-icon class="icon-draw">mdi-logout-variant</v-icon>
              <span class="text-drawer ml-3"
                >&nbsp; &nbsp;{{ $t("drawer.dangXuat") }}</span
              >
            </v-btn>
          </template>
          <span class="ml-3">{{ $t("drawer.dangXuat") }}</span>
        </v-tooltip>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { titlePage } from "../constant/titlePage";
import { iconMenu } from "../constant/listIconMenu";

export default {
  name: "Drawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

    data: () => ({
      publicPath: process.env.VUE_APP_PULIC_PATH,
      mini: true,
      menuName: '',
      userInfo: '',
      listMenu: [],
    }),
    created () {
      let vm = this
      let currentQuery = vm.$router.history.current
     
      
      vm.menuName = currentQuery.name

      // if (currentQuery.name == 'ThongTinDonVi') {
      //   vm.menuName = 'CoQuanDonVi'
      // }
      // if (currentQuery.name === 'ManageCadres') {
      //   vm.menuName = 'QuanLyCanBo'
      // }
      //  if (currentQuery.name === 'MangeRightsGroup') {
      //   vm.menuName = 'QuanLyNhomQuyen'
      // }
      //   if (currentQuery.name === 'ManageStudents') {
      //   vm.menuName = 'QuanLySinhVien'
      // }
      //    if (currentQuery.name === 'ManageMenu') {
      //   vm.menuName = 'QuanLyMenu'
      // }
      //   if (currentQuery.name === 'ManageCategoryNews') {
      //   vm.menuName = 'QuanLyChuyenMucTinTuc'
      // }
      //  if (currentQuery.name === 'ManageNews') {
      //   vm.menuName = 'QuanLyTinTuc'
      // }
      //   if (currentQuery.name === 'ManageFeedback') {
      //   vm.menuName = 'QuanLyGopY'
      // }
      // if (currentQuery.name === 'CamNangHoaLac') {
      //   vm.menuName = 'CamNangHoaLac'
      // }

      for (const property in titlePage) {
        if(vm.MaMenu === property) {
          console.log("property: ", property)
        vm.$store.dispatch("setTitlePage", titlePage[property])
        break;
        }
      }
      vm.getMenus()
      vm.$store.commit('SET_DRAWER', !vm.isMobile)
      vm.userInfo = vm.$cookies.get('UserInfo', '')
    },
    mounted () {
      let vm = this
      vm.mini = vm.isMobile ? false : true
    },
    computed: {
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      formatListMenu() {
        const vm = this
        let dataRender = []
        let sortCounter = function (list) {
          function compare(a, b) {
            if (Number(a.SoThuTu) < Number(b.SoThuTu))
              return -1
            if (Number(a.SoThuTu) > Number(b.SoThuTu))
              return 1
            return 0
          }
          return list.sort(compare)
        }
        vm.listMenu = sortCounter(vm.listMenu)
        if(vm.userInfo.viTriChucDanh !== "Quản trị hệ thống") {
          console.log("menu: ", vm.listMenu,  vm.userInfo)
          const data = vm.listMenu.reduce((res, cur) => {
            if( vm.userInfo.menu.includes(cur.PrimKey)) return [...res, cur]
            else return res
          }, [])
          data.forEach(item => {
            iconMenu.forEach(el=>{
              if(el.path === item.DuongDan) dataRender.push({...item, iconRender: el.name})
            })
          });

        } else {
          let data = []
          // console.log("liaat ", vm.listMenu)
          vm.listMenu.forEach(item => {
            iconMenu.forEach(el=>{
            if (el.path === item.DuongDan) data.push({...item, iconRender: el.name})
        
            })
          });
          dataRender = data
        }
        vm.$store.commit("SET_MENU_NGUOI_DUNG", dataRender)
       
        return dataRender
      },
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentQuery = newRoute.query
        // console.log('currentQuery-watch', newRoute)
        vm.menuName = newRoute.name
        //   if (newRoute.name == 'ThongTinDonVi') {
        //     vm.menuName = 'CoQuanDonVi'
        //   }
        //   if (newRoute.name == 'ThongTinCanBo') {
        //     vm.menuName = 'CanBo'
        //   }
        //   if (newRoute.name == 'ThongKe') {
        //     vm.menuName = 'ThongKe'
        //   }
        //   if (newRoute.name === 'ManageCadres') {
        //     vm.menuName = 'QuanLyCanBo'
        //   }
        //    if (newRoute.name === 'MangeRightsGroup') {
        //   vm.menuName = 'QuanLyNhomQuyen'
        // }
        //   if (newRoute.name === 'ManageStudents') {
        //   vm.menuName = 'QuanLySinhVien' 
        // }
        //    if (newRoute.name === 'ManageMenu') {
        //   vm.menuName = 'QuanLyMenu'
        // }
        //   if (newRoute.name === 'ManageCategoryNews') {
        //   vm.menuName = 'QuanLyChuyenMucTinTuc'
        // }
        //  if (newRoute.name === 'ManageNews') {
        //   vm.menuName = 'QuanLyTinTuc'
        // }
        //   if (newRoute.name === 'ManageFeedback') {
        //   vm.menuName = 'QuanLyGopY'
        // }
        //   if (newRoute.params.hasOwnProperty('type') && newRoute.params.type == 'cho-xu-ly') {
        //     vm.menuName = 'BaoCaoChoXuLy'
        //   }
        //   if (newRoute.params.hasOwnProperty('type') && newRoute.params.type == 'cho-duyet') {
        //     vm.menuName = 'BaoCaoChoDuyet'
        //   }
        //   if (newRoute.params.hasOwnProperty('type') && newRoute.params.type == 'xu-ly-lai') {
        //     vm.menuName = 'BaoCaoXuLyLai'
        //   }
        //   // if (newRoute.params.hasOwnProperty('type') && newRoute.params.type == 'bao-cao-moi') {
        //   //   vm.menuName = 'BaoCaoMoi'
        //   // }
        //   if (newRoute.params.hasOwnProperty('type') && newRoute.params.type == 'tra-cuu') {
        //     vm.menuName = 'TraCuu'
        //   }

        // console.log('titlePage', titlePage, vm.menuName)
        for (const property in titlePage) {
          if(vm.menuName === property) {
            vm.$store.dispatch("setTitlePage", titlePage[property])
            break;
          }
        }
      },
      isMobile (val) {
        this.mini = val ? false : true
        this.$store.commit('SET_DRAWER', !val)

      }
    },
    methods: {
     getMenus () {
      const vm = this
      const dataPayload = {
        page: 0,
        size: 100,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      const filter = {
        collectionName: "menu",
        data: dataPayload,
      };
      vm.$store
        .dispatch("collectionFilter", filter)
        .then(function (response) {
         
         vm.listMenu = response.content 
          // const menuWeb = vm.listMenu.filter(el=> el.LoaiMenu !== "1").sort((a, b)=>a.SoThuTu-b.SoThuTu)
          // vm.$store.commit("SET_MENU_NGUOI_DUNG", menuWeb)
        })
        .catch(function () {});
    },
    goToPage(pathname) {
      let vm = this;
      vm.$router.push({ path: pathname });
    },
    logout() {
      let vm = this;
      vm.$store.commit("SET_ISSIGNED", false);
      localStorage.setItem("user", null);
      vm.$cookies.set("Token", "");
      vm.$cookies.set("RefreshToken", "");
      vm.$cookies.set("admin", "");
      window.location.href =
        window.location.origin + window.location.pathname + "#/login";
    },
  },
};
</script>

<style lang="sass">
.v-navigation-drawer
  background-color: #0468B1 !important
  max-height: none !important
  .v-avatar
    margin-top: 3px !important
  .text-drawer
    color: #ffffff !important
  .item-active
    background: #0073C8
    border-left: 6px solid #2D98E5
    padding: 0 8px !important
  .item-active .v-icon
    color: #ffffff !important
  .icon-draw
    color: #ffffff !important
  .text-list
    font-size: 14px !important
    line-height: 24px !important
    font-weight: 400 !important
  .list-menu
    cursor: pointer
  .v-navigation-drawer__content::-webkit-scrollbar
    width: 0px

</style>

 





