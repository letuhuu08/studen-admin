<template>
  <v-app-bar app>
    <v-app-bar-nav-icon class="btn-visible-drawer pl-2" @click.stop="changeDrawer" style="color: #2161B1;"></v-app-bar-nav-icon>
    <div id="header-app">
      <header id="banner" class="px-3">
        <div class="container layout wrap" style=""> 
          <a href="javascript:;" class="py-0 px-0"> 
            <img class="logo-banner" src="../assets/logo.jpg"  style="border-radius: 9%">
          </a>
          <div class="title-banner">
            <span class="title-banner-vi">{{ $t('appbar.titlebanner') }}</span>
          </div>
          <!-- <div class="lang-btn">
            <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
              <flag :iso="entry.flag" v-bind:squared=false />
            </button>
          </div> -->
        </div>
      </header>
    </div>
  </v-app-bar>
</template>

<script>
import i18n from '@/plugins/i18n'

  export default {
    name: 'AppBar',
    components: {
    },

    props: {
    },

    data: () => ({
      appName: process.env.NODE_ENV,
      title: process.env.VUE_APP_BASE_TITLE,
      publicPath: process.env.VUE_APP_PULIC_PATH,
      items: [
        {
          icon: '',
          title: 'Báo cáo',
          class: 'baocao-tab',
          id: 'baocao-tab-id',
          to: '/bao-cao'
        },
        {
          icon: '',
          title: 'Cơ quan, đơn vị',
          class: 'congdan-tab',
          id: 'congdan-tab-id',
          to: '/co-quan-don-vi'
        },
        {
          icon: '',
          title: 'Cán bộ',
          class: 'canbo-tab',
          id: 'canbo-tab-id',
          to: '/can-bo'
        },
        {
          icon: '',
          title: 'Danh mục',
          class: 'danhmuc-tab',
          id: 'danhmuc-tab-id',
          to: '/quan-ly-danh-muc'
        }
      ],
      languages: [
        { flag: 'vn', language: 'vi', title: 'Tiếng Việt' },
        { flag: 'us', language: 'en', title: 'English' },
      ],
    }),
    created () {
      let vm = this
    },
    mounted () {
      let vm = this
    },
    computed: {
      indexTab () {
        return this.$store.getters.getIndexTab
      },
      activeChangeLang () {
        return this.$store.getters.activeChangeLang
      },
    },
    watch: {
    },
    methods: {
      changeLocale(locale) {
        let vm = this
        i18n.locale = locale
        vm.$store.commit('SET_ACTIVECHANGELANG', !vm.activeChangeLang)
      },
      changeDrawer () {
        let vm = this
        let drawer = vm.$store.state.drawer
        vm.$store.commit('SET_DRAWER', !drawer)
      },
      redirectTo (item, index) {
        this.$store.commit('SET_INDEXTAB', index)
        this.$router.push({ path: item.to })
      },
    },
  }
</script>
<style lang="scss">
  $image-banner: $public-path + '/images/bg-header.png';
  header {
    height: 54px !important;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px !important;
  }
  header .v-toolbar__content {
    height: 54px !important;
    padding: 0;
  }
  #header-app {
    height: 54px;
    width: 100%;
    background: url($image-banner) no-repeat;
    background-size: cover;
    padding: 0;
  }
  #banner .container {
    height: 54px;
    padding: 0
  }
  #banner .container a {
    text-decoration: none;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
  }
  .title-banner-en {
    font-size: 12px;
  }
  .logo-banner {
    width: 42px;
    height: 42px;
    margin-right: 13px;
  }
  .title-banner {
    display: flex;
    font-family: "Roboto Slab";
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    padding-top: 3px;
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    align-content: center;
    flex-wrap: wrap;
    text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  }
  
  #header-nav {
    position: relative;
  }
  #header-nav #navigation {
    height: 41px;
    background: #F9F4F1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  #header-nav #navigation ul {
      display: flex;
      list-style: none;
      margin-bottom: 0;
      overflow: hidden;
      margin: auto;
      padding: 0;
      justify-content: left;
      max-width: 1300px;
  }
  #header-nav #navigation ul {
      display: flex;
      list-style: none;
      margin-bottom: 0;
      overflow: hidden;
      margin: auto;
      padding: 0;
  }
  #header-nav #navigation li:hover a, #header-nav #navigation li.selected a {
      color: $base-color;
      font-weight: 700;
  }
  #header-nav #navigation li a {
      padding: 8px 15px;
      display: block;
      position: relative;
      text-transform: uppercase;
      text-decoration: none;
      color: $base-color;
      font-size: 16px;
      
  }
  #header-nav #navigation li:hover a:before, #header-nav #navigation li.selected a:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: $base-color;
  }
  #header-nav #banner .btns {
    position: absolute;
    right: 15px;
    top: 105px;
    z-index: 2;
  }

  #header-nav #banner .btns a {
    display: inline-block;
    /* background-color: white; */
    background-color: transparent;
    padding: 6px 50px 6px 20px;
    /* color: #0072bc; */
    /* border: 2px solid #0072bc; */
    text-decoration: none;
    color: white;
    border: 2px solid white;
    border-radius: 50px;
    background-repeat: no-repeat;
    background-position: right -2px top -2px;
    background-size: auto 35px;
  }
  .btn-visible-drawer {
    display: none;
  }
  .lang-btn {
    margin-top: 5px;
    right: 15px;
    position: absolute;
  }
  .lang-btn span.fi {
    width: 25px;
    height: 35px;
    margin-left: 15px;
  }
  @media screen and (max-width: 426px){
    .title-banner-en {
      display: none;
      font-size: 12px;
    }
  }
  @media screen and (max-width: 769px){
    header {
      height: 60px !important;
    }
    header .v-toolbar__content {
      height: 60px !important;
    }
    #header-app {
      height: 60px;
    }
    #banner .container {
      height: 60px;
    }
    #banner .container a {
      max-width: 50px;
    }
    .title-banner {
      max-width: calc(100% - 50px);
      font-size: 13px;
      line-height: 18px;
      align-content: center;
    }
    .title-banner-en {
      font-size: 12px;
    }
    .btn-visible-drawer {
      display: block;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1025px){
    .title-banner {
      font-size: 14px;
      letter-spacing: normal;
      align-content: center;
    }
    .title-banner-en {
      font-size: 12px;
    }
  }
</style>

