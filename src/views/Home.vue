<template>
  <v-app>
    <Drawer></Drawer>
    <AppBar></AppBar>
    <v-main>
      <div class="container wrap-content-page">
        <div
          class="mx-auto pa-5" style="padding-bottom: 40px !important;"
          flat
        >
          <h1 class="title-page">{{titlePage}}</h1>
          <router-view></router-view>
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
import { mapState } from "vuex"
import {titlePage} from "../constant/titlePage"
export default {

  components: {
    Drawer,
    AppBar,
    Footer
  },

  data: () => ({

  }),
  created () {
    // let router = this.$router.history.current
    // if (router.path === '/') {
    //   this.$router.push({ path: '/login' })
    // }
  },
  methods: {
   
  },
  computed: {
    ...mapState(["titlePage"]),
    menusNguoiDung() {
       return this.$store.getters.GET_MENU_NGUOI_DUNG
     
    }
  },
  watch: {
    menusNguoiDung (val) {
      let router = this.$router.history.current
      if (val) {
        if (val && val.length && router.path === '/') {
          this.$router.push({ path: val[0]['DuongDan'] })
        } else {
          this.$router.push({ path: router.path })
          this.$store.dispatch("setTitlePage", titlePage[router.name])
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
