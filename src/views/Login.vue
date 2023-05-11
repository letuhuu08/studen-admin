<template>
  <div class="wrap-login">
    <v-container
      id="login-page"
      class="px-0 pt-0"
      fluid
      tag="section"
    >
      <div class="container-wrap">
        <div class="wrap-title">
          <!-- <div class="d-flex justify-end py-0 pb-0 my-0 px-5">
            <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
              <flag :iso="entry.flag" v-bind:squared=false />
              {{entry.title}}
            </button>
          </div> -->
          <v-flex class="mb-3" style="text-align: center;">
            <img class="img-login-logo" src="../assets/logo.jpg" style="border-radius: 9%">
          </v-flex>
          
          <v-flex class="wrap-title pt-1 mb-2">
            <div class="text-1">{{ $t('login.welcomeMsg1')}} </div>
          </v-flex>
        </div>

        <div class="wrap-form px-4 py-3" v-if="!signed">
          <div>
            <v-form ref="form" v-model="valid" lazy-validation class="">
              <v-flex xs12 class="action-title mb-5" style="text-align: center;
                font-size: 22px;
                font-family: 'Roboto Slab';
                color: #fff;
                font-weight: 700;">
                <div>{{ $t('login.loginMsg') }}</div>
              </v-flex>
              <v-flex xs12>
                <span style='color: white;'>{{ $t('login.tenDangNhap') }}</span>
                <v-text-field
                  dense
                  class="input-text"
                  v-model="userName"
                  :rules="[v => !!v || $t('login.batBuocTenDangNhap')]"
                  required
                  prepend-inner-icon="mdi-account"
                  @keyup.enter="login"
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="" style="margin-top: 15px">
                <span style='color: white;'>{{ $t('login.matKhau') }}</span>
                <v-text-field
                  class="input-text"
                  dense
                  v-model="password"
                  :type="'password'"
                  :rules="[v => !!v || $t('login.batBuocMatKhau')]"
                  required
                  prepend-inner-icon="mdi-key"
                  @keyup.enter="login"
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="wrap-btn-login" style="margin-top: 30px;margin-bottom: 20px">
                <v-btn class="my-0 white--text mr-3 btn-login" style="padding: 0 15px !important;"
                  :loading="loading"
                  :disabled="loading"
                  @click="login"
                >
                  <v-icon size="20">mdi-login</v-icon>&nbsp;
                  {{ $t('login.loginMsg') }}
                </v-btn>
              </v-flex>
            </v-form>
          </div>
        </div>
        <div class="wrap-form px-3 py-3" v-if="signed">
          <div class="text-login">TÀI KHOẢN ĐÃ ĐĂNG NHẬP HỆ THỐNG</div>
          <v-flex xs12  style="margin: 20px 0;text-align: center;">
            <v-btn small class="my-0 white--text mr-3 btn-login" style="padding: 0 15px !important;"
              :loading="loading"
              :disabled="loading"
              @click="goToPage"
            >
                <v-icon size="20">mdi-home-circle-outline</v-icon>&nbsp;
                <span>Truy cập hệ thống</span>
            </v-btn>

            <v-btn class="my-0 white--text mr-3 mt-3 btn-login" small style="padding: 0 15px !important;"
              :loading="loading"
              :disabled="loading"
              @click="submitLogout"
            >
              <div class="v-btn__content">
                <v-icon size="18">mdi-logout-variant</v-icon>&nbsp;
                <span>Đăng xuất</span>
              </div>
            </v-btn>
          </v-flex>
        </div>
      </div> 
      
    </v-container>
    <div class="wrap-contact-info">
      <div class="mb-1">{{ $t('login.trungTamCongNgheMsg') }}</div>
      <div class="mb-1">
        <v-icon size="18" color="#007F3E">mdi-map-marker-outline</v-icon>&nbsp;
        <span>{{ $t('login.headOffice') }}</span>
      </div>
      <div class="mb-1">
        <v-icon size="18" color="#007F3E">mdi-phone-in-talk-outline</v-icon>&nbsp;
        <span>(024) 3.754.7422</span>
      </div>
      <div class="mb-1">
        <v-icon size="18" color="#007F3E">mdi-email-outline</v-icon>&nbsp;
        <span>tthtsv@vnu.edu.vn</span>
      </div>
    </div>
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </div>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import toastr from 'toastr'
  import i18n from '@/plugins/i18n'

  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  export default {
    name: 'Login',

    data: () => ({
      publicPath: process.env.VUE_APP_PULIC_PATH,
      apiSso: process.env.VUE_APP_PATH_API_SSO,
      overlay: false,
      loading: false,
      valid: true,
      userName: 'suadminfds1@fds.vn',
      password: 'Fds@2022',
      client_secret: '',
      code: '',
      signed: false,
      languages: [
        { flag: 'vn', language: 'vi', title: 'Tiếng Việt' },
        { flag: 'us', language: 'en', title: 'English' },
      ],
      
    }),
    created () {
      let vm = this
      
      if (Vue.$cookies.get('Token')) {
        vm.signed = true
      } else {
        vm.signed = false
      }
    },
    computed: {
    },
    methods: {
      changeLocale(locale) {
        i18n.locale = locale;
      },
      login () {
        let vm = this
        if (vm.loading || !vm.userName || !vm.password) {
          return
        }
        vm.loading = true
        let filter = {
          data: {
            username: vm.userName,
            password: vm.password,
            app: 'dvc-mobile'
          }
        }
        vm.$store.dispatch('login', filter).then(function (result) {
          vm.loading = false
          if (result && result.access_token) {
            try {
              let payload = String(result.access_token.split('.')[1]).replace(/_/g, "/")
              let dataUser = JSON.parse(atob(payload))
              let roleUser = dataUser && dataUser.hasOwnProperty('realm_access') && dataUser.realm_access['roles'] ? dataUser.realm_access.roles : ''
              // let admin = dataUser ? dataUser.find(function (item) {
              //   return item.MaDonVi === 'FDS'
              // }) : false
              let admin

              if (dataUser.hasOwnProperty('MaDonVi')) {
                if (dataUser.MaDonVi === "FDS" || dataUser.MaDonVi === "VNU") admin = true
              }

              
              if (roleUser && roleUser.length) {
                vm.$cookies.set('Token', result.access_token, result.expires_in)
                vm.$cookies.set('RefreshToken', result.refresh_token, result.refresh_expires_in)
                axios.defaults.headers['Authorization'] = 'Bearer ' + result.access_token
                vm.$store.commit('SET_ISSIGNED', true)

                if (admin) {
                    // if (true) {
                  vm.$cookies.set('admin', true, result.expires_in)
                  let dataUser1 = {
                    hoVaTen: 'Quản trị',
                    maSoCanBo: '',
                    viTriChucDanh: 'Quản trị hệ thống',
                    vaiTroSuDung: dataUser.VaiTroSuDung,
                    isAdmin: true
                  }
                  vm.$cookies.set('UserInfo', dataUser1, result.expires_in)
                  vm.$cookies.set('Roles', '', result.expires_in)
                  vm.goToPage()
                } else {
                  // get roles
                  let dataUser2 = {
                    hoVaTen:  decodeURIComponent(escape(dataUser.HoVaTen)),
                    maSoCanBo:  '',
                    viTriChucDanh: '',
                    vaiTroSuDung: dataUser.VaiTroSuDung,
                    menu: dataUser?.Menus.split(","),
                    MaDonVi: dataUser?.MaDonVi
                  }
                  vm.$cookies.set('UserInfo', dataUser2, result.expires_in)
                  setTimeout(function () {
                    vm.goToPage()
                  }, 200)
                }                
              } else {
                vm.loading = false
                vm.overlay = false
                toastr.error('TÀI KHOẢN KHÔNG CÓ TRÊN HỆ THỐNG')
                setTimeout(function () {
                  vm.submitLogout()
                }, 500)
              }
            } catch (error) {
              vm.loading = false
               toastr.error('TÀI KHOẢN KHÔNG CÓ TRÊN HỆ THỐNG')
              setTimeout(function () {
                vm.submitLogout()
              }, 500)
            }
          } else {
            toastr.remove()
            // toastr.error(this.$t('login.saiTenDangNhapVaMatKhau'))
          }
        }).catch(function (result) {
          vm.loading = false
          toastr.remove()
          toastr.error(i18n.t('login.saiTenDangNhapVaMatKhau'))
        })
      },
      submitLogout () {
        let vm = this
        vm.signed = false
        vm.$store.commit('SET_ISSIGNED', false)
        localStorage.setItem('user', null)
        vm.$cookies.set('Token', '')
        vm.$cookies.set('RefreshToken', '')
      },
      goToPage () {
        let vm = this
        vm.$router.push({ path: '/' })
        // if (vm.isAdmin || vm.checkRole('THEMMOIBAOCAO')) {
        //   // vm.$router.push({ path: '/' })
        //   vm.$router.push({ path: '/quan-li-can-bo' })
        // } else if (vm.checkRole('XEMBAOCAODONVI') || vm.checkRole('XEMTATCABAOCAO')) {
        //   vm.$router.push({ path: '/bao-cao/cho-xu-ly' })
        // }
      }
    }
  }
</script>

<style lang="scss">
  $image-login: '../assets/login-banner.png';
  #app {
    background: transparent !important
  }
  .wrap-login {
    background: url($image-login) no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .wrap-login input {
    padding-top: 0px !important;
  }
  #login-page {
    position: relative;
    margin: 0 auto;
  }
  .container-wrap {
    // background: rgba(14, 42, 66, 0.8);
    // box-shadow: inset -4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width: auto;
    height: auto;
    // padding: 45px;
    margin: 0 auto;
    margin-top: 20px;
  }
  #login-page .text-1 {
    font-family: "Roboto Slab";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #2757f3;
    margin-bottom: 10px;
  }
  #login-page .text-2 {
    font-family: "Roboto Slab";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #2757f3;
  }
  .wrap-form {
    max-width: 450px;
    margin: 0 auto;
    background: #21332a;
    border: 1px solid #BAB7B5;
    border-radius: 5px;
    margin-top: 45px;
  }
  .text-login {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.17);
    margin-bottom: 15px;
    text-transform: uppercase;
    text-align: center;
  }
  .wrap-login .input-text .v-input__slot:before {
    border-color: transparent;
    border: none !important;
  }
  .wrap-login .input-text .v-input__slot::after {
    display: none !important
  }
  .wrap-login .input-text .v-input__slot {
    border: 1px solid #BAB7B5;
    padding: 4px 5px;
    border-radius: 5px;
    height: 32px
  }
  .input-text .v-icon{
    color: #ffffff !important;
    font-size: 20px !important;
  }
  .input-text input {
    color: #ffffff !important;
    font-size: 14px;
  }
  .input-text  .v-input__slot {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 8%), 0px 2px 2px 0px rgb(0 0 0 / 0%), 0px 1px 5px 0px rgb(0 0 0 / 7%) !important;
  }
  .input-text input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ffffff !important;
    opacity: 1; /* Firefox */
  }

  .input-text input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #ffffff !important;
  }

  .input-text input::-ms-input-placeholder { /* Microsoft Edge */
    color: #ffffff !important;
  }
  .btn-login {
    background: linear-gradient(90deg, #2757f3 0%, #2757f3 100%);
  }
  .wrap-title, .wrap-btn-login {
    text-align: center;
    text-transform: uppercase;
  }
  .wrap-contact-info {
    display: none;
    max-width: 1366px !important;
    height: 120px;
    position: absolute;
    bottom: 0;
    left: 100px;
    color: #2757f3 !important;
  }
  .img-login-logo {
    width: 90px;
  }
  .wrap-title {
    text-align: center;
    margin-top: 0px;
  }
  @media screen and (max-width: 426px) {
    .action-title {
      display: none;
    }
    .img-login-logo {
      width: 50px;
    }
    .container-wrap {
      padding: 8px;
      margin-top: 0px;
    }
    .wrap-title {
      text-align: center;
      margin-top: 0px;
    }
    #login-page .text-1 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    #login-page .text-2 {
      font-size: 16px;
    }
    .wrap-btn-login {
      text-align: center;
    }
    .wrap-form {
      margin: 0 10px;
      margin-top: 10px;
    }
    .wrap-contact-info {
      left: 15px;
    }
  }
  @media screen and (min-width: 426px) and (max-width: 769px){
    .container-wrap {
      padding: 8px;
      margin-top: 0px;
    }
    .wrap-title {
      text-align: center;
      margin-top: 0px;
    }
    .wrap-form {
      margin-top: 15px;
      padding-top: 24px !important;
    }
    #login-page .text-1 {
      font-size: 18px;
    }
    .wrap-contact-info {
      left: 50px;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1025px){
    .container-wrap {
      padding: 8px;
      margin-top: 0px;
    }
    .wrap-title {
      text-align: center;
      margin-top: 0px;
    }
    .wrap-form {
      margin-top: 15px;
    }
    .wrap-contact-info {
      left: 50px;
    }
  }
  #login-page button {
    padding: 5px;
    font-size: 16px;
    color: white;
    margin: 5px;
  }
  #login-page .label {
    color: white;
  }
  #login-page .lang-btn {
    margin-top: 5px;
    margin-left: 91%;
    position: absolute;
  }
</style>
