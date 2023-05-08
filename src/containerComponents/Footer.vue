<template>
  <v-footer app
    id="footer" class="px-3"
  >
      <v-layout wrap>
        <v-flex xs12>
          <v-layout wrap>
            <v-flex class="text-1">
              <v-icon size="18" color="#2161B1">mdi-copyright</v-icon>&nbsp;
              <span>Lê Tự Hữu</span>
            </v-flex>
            <v-flex class="text-2">
              <v-icon size="18" color="#2161B1">mdi-phone-in-talk-outline</v-icon>&nbsp;
              <span>0369140787</span>
            </v-flex>
            <v-flex class="text-3">
              <v-icon size="18" color="#2161B1">mdi-email-outline</v-icon>&nbsp;
              <span>Email: huu01669140787</span>
            </v-flex>
              <v-flex class="text-3">
              <v-icon size="18" color="#2161B1">mdi-account-check</v-icon>&nbsp;
              <span>Mã sinh viên: 19810310662</span>
            </v-flex>
             <v-flex class="text-3">
              <v-icon size="18" color="#2161B1">mdi-account</v-icon>&nbsp;
              <span>  Lớp: D14CNPM1</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',

    data: () => ({
      appName: process.env.NODE_ENV,
      publicPath: process.env.VUE_APP_PULIC_PATH,
    }),
    created () {
      let vm = this
    },
    methods:{
      randomNumber(max, min) {
 return Math.floor(min + Math.random()*(max - min + 1)) 
      }
    },
  }
</script>

<style lang="scss">
  #footer {
    height: 36px;
    /* background: url(/images/bg-footer.png) no-repeat; */
    box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.3) !important;
    background-color: #ffffff;
    background-size: cover;
    padding: 0;
  }
  #footer .container {
    height: 36px;
    padding: 10px;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
  }
  .image-footer {
    text-align: right;
  }
  #footer .text-1, #footer .text-2, #footer .text-3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    color: #2161B1;
  }
  #footer .text-2 {
    text-align: center;
  }
  #footer .text-3 {
    text-align: right;
  }
  .image-footer .img-1 {
    margin-right: 15px;
  }
  @media screen and (max-width: 426px){
    #footer, #footer .container {
      height: 90px
    }
    #footer .text-2, #footer .text-3 {
      text-align: left;
      margin-top: 5px;
    }
  }
  @media screen and (min-width: 426px) and (max-width: 769px){
    #footer, #footer .container {
      height: 56px
    }
    #footer .text-2, #footer .text-3 {
      text-align: left;
      margin-top: 5px;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1025px){
    #footer, #footer .container {
      height: 56px
    }
    #footer .text-1 {
      width: 100%;
    }
    #footer .text-2, #footer .text-3 {
      text-align: left;
      margin-top: 5px;
    }
  }
</style>
