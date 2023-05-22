import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'
import i18n from '@/plugins/i18n'
import {
    baseUrl
} from './constant/baseURL'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        indexTab: 0,
        apiSso: process.env.VUE_APP_PATH_API_SSO,
        secretLogin: 'f5gDd1JLB0vq6VVBvzEbltq6iVuaddvk',
        drawer: false,
        breakpointName: 'lg',
        isShowConfirm: false,
        dialogConfirm: {
            auth: false,
            title: '',
            message: '',
            button: {},
            callback: () => {}
        },
        formData: '',
        formThongKe: '',
        activeChangeLang: false,
        fileUploadYet: false,
        //  Start Hien's code
        listGender: [],
        listProvince: [],
        listAgencies: [],
        listPosition: [],
        listWork: [],
        titlePage: "",
        // End Hien's code
        elements: [],
        pagePdf: 1,
        thongTinCamNang: '',
        menusNguoiDung: ''
    },
    getters: {
        getIndexTab: (state) => state.indexTab,
        getIsSigned: (state) => {
            return state.isSigned
        },
        getIsSigned: (state) => {
            return state.isSigned
        },
        getBreakpointName: (state) => state.breakpointName,
        getIsShowConfirm: (state) => {
            return state.isShowConfirm
        },
        getDialogConfirm: (state) => {
            return state.dialogConfirm
        },
        getFormData: (state) => {
            return state.formData
        },
        getFormThongKe: (state) => {
            return state.formThongKe
        },
        activeChangeLang: (state) => {
            return state.activeChangeLang
        },
        fileUploadYet: (state) => {
            return state.fileUploadYet
        },
        GET_PAGE_PDF: (state) => {
            return state.pagePdf
        },
        GET_THONGTINCAMNANG: (state) => {
            return state.thongTinCamNang
        },
        GET_MENU_NGUOI_DUNG: (state) => {
            return state.menusNguoiDung
        }
    },
    mutations: {
        // Start Hien's code
        SET_LIST_STATE_IN_STORE: (state, {
            payload,
            nameState
        }) => (state[nameState] = [...payload.content]),
        SET_TITLE_PAGE_IN_STORE: (state, payload) => {
            return state.titlePage = payload
                // console.log("mutation: ",state, payload )
        },
        // End Hien's code
        SET_INDEXTAB(state, indexTab) {
            state.indexTab = indexTab
        },
        SET_ISSIGNED(state, payload) {
            state.isSigned = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        SET_BREAKPOINTNAME(state, breakpointName) {
            state.breakpointName = breakpointName
        },
        SET_SHOWCONFIRM(state, payload) {
            state.isShowConfirm = payload
        },
        SET_CONFIG_CONFIRM_DIALOG(state, payload) {
            state.dialogConfirm = payload
        },
        SET_FORM_DATA(state, payload) {
            state.formData = payload
        },
        SET_FORM_THONGKE(state, payload) {
            state.formThongKe = payload
        },
        SET_ACTIVECHANGELANG(state, payload) {
            if (i18n.locale == 'en') {
                state.activeChangeLang = true
            } else {
                state.activeChangeLang = false
            }
        },
        SET_FILEUPLOADYET(state, payload) {
            state.fileUploadYet = payload
        },
        updateElements: (state, payload) => {
            state.elements = payload;
        },
        SET_PAGE_PDF: (state, payload) => {
            state.pagePdf = payload;
        },
        SET_THONGTINCAMNANG: (state, payload) => {
            state.thongTinCamNang = payload;
        },
        SET_MENU_NGUOI_DUNG: (state, payload) => {
            state.menusNguoiDung = payload;
        },
    },
    actions: {
        updateElements: ({
            commit
        }, payload) => {
            commit("updateElements", payload);
        },
        // getThongKeHoSo ({commit, state}, filter) {
        //   return new Promise((resolve, reject) => {
        //     let config = {
        //       method: 'get',
        //       url: state.apiSso + '/o/rest/v2/statistics/dossiers/todo',
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       },
        //       data: {},
        //       params: filter.data
        //     }
        //     axios(config).then(function (response) {
        //       let serializable = response.data
        //       resolve(serializable)
        //     }).catch(function (error) {
        //       reject(error)
        //     })
        //   })
        // },
        // collectionCreate ({commit, state}, filter) {
        //   return new Promise((resolve, reject) => {
        //     let dataPost = JSON.stringify(filter.data)
        //     let config = {
        //       method: 'post',
        //       url: '/v1/datasharing/' + filter.collectionName,
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       },
        //       data : dataPost
        //     }
        //     axios(config).then(function (response) {
        //       let serializable = response.data
        //       resolve(serializable)
        //     }).catch(function (error) {
        //       reject(error.response)
        //     })
        //   })
        // },
        // collectionUpdate ({commit, state}, filter) {
        //   return new Promise((resolve, reject) => {
        //     let dataPost = JSON.stringify(filter.data)
        //     let config = {
        //       method: 'post',
        //       url: '/v1/datasharing/' + filter.collectionName + '/' + filter.id,
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       },
        //       data : dataPost
        //     }
        //     axios(config).then(function (response) {
        //       let serializable = response.data
        //       resolve(serializable)
        //     }).catch(function (error) {
        //       reject(error)
        //     })
        //   })
        // },
        // collectionDelete ({commit, state}, filter) {
        //   return new Promise((resolve, reject) => {
        //     let config = {
        //       method: 'delete',
        //       url: '/v1/datasharing/' + filter.collectionName + '/' + filter.id,
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       },
        //       data: {}
        //     }
        //     axios(config).then(function (response) {
        //       let serializable = response.data
        //       resolve(serializable)
        //     }).catch(function (error) {
        //       reject(error)
        //     })
        //   })
        // },
        createItemData({
            commit,
            state
        }, {
            payload,
            type
        }) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'post',
                    url: baseUrl + type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: payload,
                    params: {}
                }
                axios(config).then(function(response) {
                    // console.log("response post: ", response)
                    resolve(response)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        deleteItemData({
            commit,
            state
        }, {
            payload,
            type
        }) {
            // console.log("delete payload: ", payload)
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'delete',
                    url: baseUrl + type + `/${payload}`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {},
                    params: {}
                }
                axios(config).then(function(response) {
                    //  console.log("response delete: ", response)
                    resolve(response)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        editItemData({
            commit,
            state
        }, {
            payload,
            type,
            id
        }) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'post',
                    url: baseUrl + type + `/${id}`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: payload,
                    params: {}
                }
                axios(config).then(function(response) {
                    resolve(response)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        collectionFilterInstore({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'get',
                    url: baseUrl + filter.collectionName + '/' + 'filter',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {},
                    params: filter.data
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    const payload = {
                        payload: serializable,
                        nameState: filter.state
                    }
                    commit('SET_LIST_STATE_IN_STORE', payload)
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        uploadFile({
            commit,
            state
        }, {
            payload,
            type
        }) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'post',
                    url: baseUrl + type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: payload,
                    params: {}
                }
                axios(config).then(function(response) {
                    // console.log("response post: ", response)
                    resolve(response)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        exportFile({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'get',
                    url: '/v1/datasharing/' + filter.collectionName,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Vue.$cookies.get('Token')
                    },
                    responseType: 'blob',
                    data: {},
                    params: filter.data
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    const urlFile = window.URL.createObjectURL(serializable)
                    const a = document.createElement('a')
                    document.body.appendChild(a)
                    a.style = 'display: none'
                    a.href = urlFile
                    a.download = `${filter.nameFile}.${filter.typeFile}`
                    a.click()
                    window.URL.revokeObjectURL(urlFile)
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        exportTongHopBaoCao({ commit, state }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'get',
                    url: filter.url,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Vue.$cookies.get('Token')
                    },
                    responseType: 'blob',
                    data: {}
                }
                axios(config).then(function(response) {
                    if (response.data) {
                        var urlFile = window.URL.createObjectURL(response.data)
                        var a = document.createElement('a')
                        document.body.appendChild(a)
                        a.style = 'display: none'
                        a.href = urlFile
                        a.download = 'tonghopbaocao-' + filter.maBaoCao + '.xlsx'
                        a.click()
                        window.URL.revokeObjectURL(urlFile)
                        resolve('success')
                    } else {
                        resolve('pending')
                    }
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        // notificationUploadFileImage ({commit, state}, {payload, type}) {
        //   return new Promise((resolve, reject) => {
        //     let config = {
        //       method: 'post',
        //      url : baseUrl + type,
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       },
        //       data: payload,
        //       params: {}
        //     }
        //     axios(config).then(function (response) {
        //       // console.log("response post: ", response)
        //       resolve(response)
        //     }).catch(function (error) {
        //       reject(error)
        //     })
        //   })
        // },
        collectionFilter({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'get',
                    // url: 'https://my-json-server.typicode.com/anhpt00973/student-admin/' + filter.collectionName + '/' ,
                    url: '/v1/datasharing/' + filter.collectionName + '/' + 'filter',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {},
                    params: filter.data
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        getDetailsItemData({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'get',
                    // url: 'https://my-json-server.typicode.com/anhpt00973/student-admin/' + filter.collectionName + '/' ,
                    url: '/v1/datasharing/' + filter.collectionName,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {},
                    params: filter.data
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        getDetailsItemDataPublic({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'get',
                    // url: 'https://my-json-server.typicode.com/anhpt00973/student-admin/' + filter.collectionName + '/' ,
                    url: '/base/auth/vnu/tintuc/' + filter.id,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {},
                    params: filter.data
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        setTitlePage({
            commit,
            state
        }, name) {
            commit('SET_TITLE_PAGE_IN_STORE', name)
        },
        // collectionDetail ({commit, state}, filter) {
        //   return new Promise((resolve, reject) => {
        //     let config = {
        //       method: 'get',
        //       url: '/v1/datasharing/' + filter.collectionName + '/' + filter.id,
        //       data: {},
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       }
        //     }
        //     axios(config).then(function (response) {
        //       let serializable = response.data
        //       resolve(serializable)
        //     }).catch(function (error) {
        //       reject(error)
        //     })
        //   })
        // },
        // collectionDetailSearch ({commit, state}, filter) {
        //   return new Promise((resolve, reject) => {
        //     let config = {
        //       method: 'get',
        //       url: '/v1/datasharing/' + filter.collectionName + '/' + filter.keySearch + '/' + filter.id,
        //       data: {},
        //       headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json'
        //       }
        //     }
        //     axios(config).then(function (response) {
        //       let serializable = response.data
        //       resolve(serializable)
        //     }).catch(function (error) {
        //       reject(error)
        //     })
        //   })
        // },
        getThongKe({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/thanhphanbaocao/thongke',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        login({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    "url": state.apiSso + '/flex/oauth2/token',
                    "method": "POST",
                    "headers": {
                        'Authorization': 'Basic ZmxleDpzc28=',
                        'secret': state.secretLogin,
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "data": filter.data
                };

                $.ajax(settings).done(function(response) {
                    let serializable = response
                    resolve(serializable)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        loginKeyCloak({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    "url": state.apiSso + '/flex/oauth2/authorization_endpoint?redirect_uri=' + filter.uri,
                    "method": "GET",
                    "headers": {
                        'Secret': state.secretLogin,
                        'Content-Type': 'application/json'
                    },
                };

                $.ajax(settings).done(function(response) {
                    resolve(response)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        logoutKeyCloak({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    "url": state.apiSso + '/flex/oauth2/logout_endpoint',
                    "method": "GET",
                    "headers": {
                        'Content-Type': 'application/json'
                    },
                };

                $.ajax(settings).done(function(response) {
                    resolve(response)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        getTokenKeyCloak({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    "url": state.apiSso + '/flex/oauth2/token',
                    "method": "POST",
                    "headers": {
                        'Authorization': 'Basic ZmxleDpzc28=',
                        'secret': state.secretLogin,
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "data": {
                        "code": filter.code,
                        "redirect_uri": filter.redirect_uri
                    }
                };

                $.ajax(settings).done(function(response) {
                    let serializable = response
                    resolve(serializable)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        getRefreshTokenKeyCloak({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    "url": state.apiSso + '/flex/oauth2/refreshtoken',
                    "method": "POST",
                    "headers": {
                        'Authorization': 'Basic ZmxleDpzc28=',
                        'secret': state.secretLogin,
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "data": {
                        "refresh_token": filter.code,
                        "redirect_uri": filter.redirect_uri
                    }
                };

                $.ajax(settings).done(function(response) {
                    let serializable = response
                    resolve(serializable)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        getThongTinUserDangNhap({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    method: 'get',
                    url: state.apiSso + '/v1/datasharing/canbo/token',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': filter.token
                    },
                    data: {},
                    params: {}
                }
                $.ajax(settings).done(function(response) {
                    let serializable = response
                    resolve(serializable)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        getEmployee({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let settings = {
                    method: 'get',
                    url: state.apiSso + "/o/rest/v2/employees/" + filter.email + '/profile',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': filter.token
                    },
                    data: {},
                    params: {}
                }
                $.ajax(settings).done(function(response) {
                    let serializable = response
                    resolve(serializable)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        createAccountCanBo({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/' + filter.data.type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        changePass({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/resetpwd',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        changeAcc({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/' + filter.type + '/' + filter.maDinhDanh + '/tendinhdanh',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        activeCaNhan({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/' + filter.data.type + '/active',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        blockCaNhan({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/' + filter.data.type + '/lock',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        unBlockCaNhan({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/' + filter.data.type + '/unlock',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        restoreCaNhan({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: '/v1/datasharing/idp/account/' + filter.data.type + '/restore',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        deleteCaNhan({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'delete',
                    url: '/v1/datasharing/idp/account/' + filter.data.type + '/delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: dataPost
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error.response)
                })
            })
        },
        loadDataSource({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let apiGet = filter.api
                if (filter.api.indexOf('http') < 0) {
                    apiGet = state.apiSso + filter.api
                }
                let settings = {
                    "url": apiGet,
                    "method": "GET",
                    "headers": {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Vue.$cookies.get('Token')
                    },
                    "data": {}
                };

                $.ajax(settings).done(function(response) {
                    let serializable = response
                    resolve(serializable)
                }).fail(function(response) {
                    reject(response)
                })
            })
        },
        downloadFile({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let param = {
                    headers: {
                        'Authorization': 'Bearer ' + Vue.$cookies.get('Token')
                    },
                    responseType: 'blob'
                }
                axios.get('/v1/datasharing/thanhphanbaocao/downloadFile/' + filter.id, param).then(function(response) {
                        if (response.data) {
                            var a = document.createElement('a')
                            document.body.appendChild(a)
                            a.style = 'display: none'
                            var urlFile = window.URL.createObjectURL(response.data)
                            a.href = urlFile
                            a.download = filter.name
                            a.click()
                            resolve('success')
                        } else {
                            resolve('pending')
                        }
                    }).catch(function(xhr) {
                        console.log(xhr)
                    })
                    // 
            })
        },
        deleteFile({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let config = {
                    method: 'delete',
                    url: '/v1/datasharing/thanhphanbaocao/' + filter.idThanhPhan + '/attachment/' + filter.idFile,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {}
                }
                axios(config).then(function(response) {
                    let serializable = response.data
                    resolve(serializable)
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
        exportTongHopBaoCao({
            commit,
            state
        }, filter) {
            return new Promise((resolve, reject) => {
                let dataPost = JSON.stringify(filter.data)
                let config = {
                    method: 'post',
                    url: filter.url,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Vue.$cookies.get('Token')
                    },
                    responseType: 'blob',
                    data: dataPost
                }
                axios(config).then(function(response) {
                    if (response.data) {
                        var urlFile = window.URL.createObjectURL(response.data)
                        var a = document.createElement('a')
                        document.body.appendChild(a)
                        a.style = 'display: none'
                        a.href = urlFile
                        a.download = 'tonghopbaocao-' + filter.maBaoCao + '.xlsx'
                        a.click()
                        window.URL.revokeObjectURL(urlFile)
                        resolve('success')
                    } else {
                        resolve('pending')
                    }
                }).catch(function(error) {
                    reject(error)
                })
            })
        },
    }
})