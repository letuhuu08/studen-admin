<template>
  <v-app>
    <Drawer></Drawer>
    <AppBar></AppBar>
    <v-main>
      <div class="container wrap-content-page"> 
        <div
          class="mx-auto pa-5" style="padding-bottom: 40px !important"
          flat
        >
        
        </div>
      </div>
      <Footer></Footer>
    </v-main>   
    
  </v-app>
</template>

<script>
import Drawer from '../containerComponents/Drawer'
import AppBar from '../containerComponents/AppBar'
import Footer from '../containerComponents/Footer'
import { mapState } from "vuex";
export default {

  components: {
    Drawer,
    AppBar,
    Footer
  },

  data: () => ({

  }),
  created () {
    const vm = this
    // let router = this.$router.history.current
    // if (router.path === '/') {
    //   this.$router.push({ path: '/login' })
    // }
    // vm.getList("listAgencies", "coquandonvi");
    // vm.getList("listPosition", "vitrichucdanh", {
    //   keyword: "",
    //   page: 0,
    //   size: 100,
    //   orderFields: "tenGoi",
    //   orderTypes: "asc",
    //   coQuanDonVi_maDinhDanh: "s",
    // });
    // vm.getList("listWork", "tinhtrangcongtac", {
    //   keyword: "",
    //   page: 0,
    //   size: 100,
    //   orderFields: "maMuc",
    //   orderTypes: "asc",
    //   tinhTrang: 1,
    //   thamChieu_maMuc: "",
    // });
    // vm.getList("listProvince", "tinhthanh", { tinhTrang: "1" });
    // vm.getList("listGender", "gioitinh", { tinhTrang: "1" });
  },
  methods: {
     getList(state, collectionName, dataParam) {
      let vm = this;
      const dataPayload = {
        page: 0,
        size: 20,
        keyword: "",
        orderFields: "",
        orderTypes: "",
        tinhTrang: "",
        thamChieu_maMuc: "",
      };
      let filter = {
        collectionName,
        state,
        data: !dataParam ? dataPayload : { ...dataPayload, ...dataParam },
      };
      vm.$store
        .dispatch("collectionFilterInstore", filter)
        .then(function (response) {
          console.log("res: ", response);
        })
        .catch(function () {
          console.log("Error");
        });
    },
  },
  computed: {
    ...mapState(["titlePage"]),
    menusNguoiDung() {
      return this.$store.getters.GET_MENU_NGUOI_DUNG
    }
  },
  watch: {
    menusNguoiDung (val) {
      let vm = this
      if (val) {
        // console.log('menuNguoiDung', val)
        if (val && val.length) {
          this.$router.push({ path: val[0]['DuongDan'] })
        }
      }
    }
  }
};
</script>
<style lang="scss">
  main.v-main {
    padding-top: 54px !important
  }
  .title-page{
    color: #2161b1;
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 22px;
    text-transform: uppercase;
    margin-bottom: 20px;
    border-bottom: 2px solid #2161b18a;

  }
  @media screen and (max-width: 426px){
    
  }
  @media screen and (max-width: 769px){
    .wrap-content-page {
      padding-bottom: 70px !important
    }
  }
  @media screen and (max-width: 1025px){
    .wrap-content-page {
      padding-bottom: 70px !important
    }
  }
</style>
