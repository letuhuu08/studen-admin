(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0bb49078"],{"0e8f":function(t,e,a){"use strict";a("20f6");var n=a("e8f2");e["a"]=Object(n["a"])("flex")},"2ea0":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticStyle:{float:"right"}},[a("v-btn",{staticClass:"btn-form mr-3 text-white",attrs:{small:"",color:"primary"},on:{click:function(e){t.toggleAdvanceSearch=!t.toggleAdvanceSearch}}},[t.toggleAdvanceSearch?a("v-icon",{attrs:{size:"18"}},[t._v("mdi-filter-variant")]):a("v-icon",{attrs:{size:"18"}},[t._v("mdi-filter-variant-plus")]),t._v("  Tìm kiếm ")],1),a("v-btn",{staticClass:"btn-form mx-0 text-white",attrs:{small:"",color:"primary"},on:{click:t.showModalForm}},[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-plus")]),t._v("  Thêm mới ")],1)],1)])],1),t.toggleAdvanceSearch?a("v-card",{staticClass:"mt-5",attrs:{outlined:"",elevation:"0"}},[a("v-form",{ref:"formSearchRef",attrs:{"lazy-validation":""}},[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"mb-2"},[t._v("Nhập tên chuyên mục:")]),a("v-text-field",{staticClass:"input-form",attrs:{solo:"",dense:"",clearable:"","hide-details":"auto",placeholder:"Nhập từ khóa tìm kiếm"},on:{"click:clear":function(e){return t.getListCategoryHandBookFilter("clear")}},model:{value:t.textNameSearch,callback:function(e){t.textNameSearch=e},expression:"textNameSearch"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"mb-2"},[t._v("Nhập mã chuyên mục:")]),a("v-text-field",{staticClass:"input-form",attrs:{solo:"",dense:"",clearable:"","hide-details":"auto",placeholder:"Nhập từ khóa tìm kiếm"},on:{"click:clear":function(e){return t.getListCategoryHandBookFilter("clear")}},model:{value:t.textSearch,callback:function(e){t.textSearch=e},expression:"textSearch"}})],1),a("v-col",{staticClass:"px-2",attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"mb-2"},[t._v("Ngày tạo:")]),a("div",[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{staticClass:"pr-2",attrs:{xs6:""}},[a("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[a("v-text-field",t._g(t._b({staticClass:"flex input-form",attrs:{rules:[t.rules.date,t.rules.checkDateNow,t.rules.checkDateInputStartSend],clearable:"",placeholder:"Từ ngày...","persistent-hint":"","prepend-icon":"",solo:"",dense:"","hide-details":"auto","hide-no-data":""},on:{blur:function(e){t.dateStartSend=t.parseDate(t.textDateStartSend)},input:function(e){return t.handleChangeDate()}},model:{value:t.textDateStartSend,callback:function(e){t.textDateStartSend=e},expression:"textDateStartSend"}},"v-text-field",o,!1),n))]}}],null,!1,2696714926),model:{value:t.toggleShowMenuStartDateSend,callback:function(e){t.toggleShowMenuStartDateSend=e},expression:"toggleShowMenuStartDateSend"}},[a("v-date-picker",{attrs:{"no-title":""},on:{input:function(e){t.toggleShowMenuStartDateSend=!1}},model:{value:t.dateStartSend,callback:function(e){t.dateStartSend=e},expression:"dateStartSend"}})],1)],1),a("v-flex",{attrs:{xs6:""}},[a("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[a("v-text-field",t._g(t._b({staticClass:"flex input-form",attrs:{rules:[t.rules.date,t.rules.checkDateNow,t.rules.checkDateInputEndSend],clearable:"",placeholder:"Đến ngày...","persistent-hint":"","prepend-icon":"",solo:"",dense:"","hide-details":"auto","hide-no-data":""},on:{blur:function(e){t.dateEndSend=t.parseDate(t.textDateEndSend)},input:function(e){return t.handleChangeDate()}},model:{value:t.textDateEndSend,callback:function(e){t.textDateEndSend=e},expression:"textDateEndSend"}},"v-text-field",o,!1),n))]}}],null,!1,3722689904),model:{value:t.toggleShowMenuEndDateSend,callback:function(e){t.toggleShowMenuEndDateSend=e},expression:"toggleShowMenuEndDateSend"}},[a("v-date-picker",{attrs:{"no-title":""},on:{input:function(e){t.toggleShowMenuEndDateSend=!1}},model:{value:t.dateEndSend,callback:function(e){t.dateEndSend=e},expression:"dateEndSend"}})],1)],1)],1)],1)])],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"d-flex justify-end"},[a("v-btn",{staticClass:"btn-form mx-0 text-white",attrs:{small:"",color:"primary"},on:{click:function(e){return t.getListCategoryHandBookFilter("")}}},[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-magnify")]),t._v("  Tìm kiếm ")],1)],1)])],1)],1)],1)],1):t._e(),a("v-row",{staticClass:"my-0 mb-3"},[a("v-col",{staticClass:"pt-0",attrs:{cols:"12"}},[a("v-data-table",{staticClass:"table-base mt-2",attrs:{headers:t.headers,items:t.listCategoryHandBook,"items-per-page":t.itemsPerPage,"item-key":"PrimKey","hide-default-footer":"","no-data-text":"Không có dữ liệu",loading:t.loadingData,"loading-text":"Đang tải... ","item-text":"name"},scopedSlots:t._u([{key:"item.stt",fn:function(e){var a=e.index;return[t._v(" "+t._s((t.page+1)*t.itemsPerPage-t.itemsPerPage+a+1)+" ")]}},{key:"item.thaotac",fn:function(e){var n=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"mr-2",attrs:{color:"#2161b1",text:"",icon:""},on:{click:function(e){return e.stopPropagation(),t.editCategoryHandBook(n)}}},"v-btn",r,!1),o),[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[a("span",[t._v("Sửa")])]),a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"ml-2",attrs:{color:"red",text:"",icon:""},on:{click:function(e){return e.stopPropagation(),t.deleteCategoryHandBook(n)}}},"v-btn",r,!1),o),[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-delete")])],1)]}}],null,!0)},[a("span",[t._v("Xóa")])])]}}])}),t.pageCount?a("pagination",{attrs:{pageInput:t.page,total:t.total,pageCount:t.pageCount},on:{"tiny:change-page":t.handlechangePage}}):t._e()],1)],1),t.dialogForm?a("div",[a("v-dialog",{attrs:{"max-width":"1000",persistent:""},model:{value:t.dialogForm,callback:function(e){t.dialogForm=e},expression:"dialogForm"}},[a("v-card",[a("v-toolbar",{staticClass:"px-3",attrs:{dark:"",color:"primary"}},[t.edittingForm?a("v-toolbar-title",[t._v("Cập nhật chuyên mục cẩm nang Hòa Lạc")]):t._e(),t.edittingForm?t._e():a("v-toolbar-title",[t._v("Thêm mới chuyên mục cẩm nang Hòa Lạc")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{icon:"",dark:""},on:{click:t.closeModalForm}},[a("v-icon",[t._v("mdi-close")])],1)],1)],1),a("FormTypeHandBook",{ref:"formChuyenMucCamNangRef",attrs:{dataEdit:t.dataEdit}}),a("v-card-text",{staticClass:"px-2 py-2"},[a("v-card-actions",{staticClass:"justify-center my-4"},[a("v-btn",{staticClass:"white--text mr-2",attrs:{small:"",depressed:"",color:"red",loading:t.loadingAction,disabled:t.loadingAction},on:{click:t.closeModalForm}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-close ")]),t._v(" Thoát ")],1),t.readonlyForm?t._e():a("v-btn",{staticClass:"mr-2",attrs:{small:"",depressed:"",color:"primary",loading:t.loadingAction,disabled:t.loadingAction},nativeOn:{click:function(e){return t.submitForm.apply(null,arguments)}}},[a("v-icon",{attrs:{left:"",dark:"",size:"18"}},[t._v(" mdi-file-document-plus-outline ")]),t.edittingForm?a("span",[t._v("Cập nhật")]):a("span",[t._v("Thêm mới")])],1)],1)],1)],1)],1)],1):t._e(),t.dialogMenu?a("v-dialog",{attrs:{persistent:"","max-width":"700px"},model:{value:t.dialogMenu,callback:function(e){t.dialogMenu=e},expression:"dialogMenu"}},[a("v-card",[a("v-toolbar",{staticClass:"px-3",attrs:{dark:"",color:"primary"}},[a("span",{staticClass:"text-h5"},[t._v("Phân quyền chuyên mục tin tức")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{staticClass:"px-0",attrs:{cols:"12",sm:"12",md:"12"}},[a("FormPhanQuyenChuyenMucCamNang",{ref:"formPhanQuyenChuyenMucCamNangRef",attrs:{dataTypeHandBook:t.listCategoryHandBook,dataSelectEditCategoryHandBook:t.dataSelectEditCategoryHandBook}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"white--text mr-2",attrs:{small:"",depressed:"",color:"red",loading:t.loadingAction,disabled:t.loadingAction},on:{click:function(e){t.dialogMenu=!1}}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-close ")]),t._v(" Thoát ")],1),t.readonlyForm?t._e():a("v-btn",{staticClass:"mr-2",attrs:{small:"",depressed:"",color:"primary",loading:t.loadingAction,disabled:t.loadingAction},on:{click:t.handleDecentralization}},[a("v-icon",{attrs:{left:"",dark:"",size:"18"}},[t._v(" mdi-file-document-plus-outline ")]),a("span",[t._v("Phân quyền")])],1)],1)],1)],1):t._e()],1)},o=[],r=(a("13d5"),a("e20e")),i=a("854a"),s=a.n(i),l=a("c1df"),c=a.n(l),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{ref:"formCategoryHandBookRef",staticClass:"pa-3",attrs:{"lazy-validation":""},model:{value:t.validForm,callback:function(e){t.validForm=e},expression:"validForm"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Mã chuyên mục: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-text-field",{staticClass:"flex input-form",attrs:{rules:[t.rules.required],solo:"",label:"Nhập mã chuyên mục...",dense:"","hide-details":"auto",required:""},model:{value:t.formData.MaMuc,callback:function(e){t.$set(t.formData,"MaMuc",e)},expression:"formData.MaMuc"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Nhóm quyền:")]),a("v-select",{staticClass:"input-form",attrs:{items:t.optionGroups,label:"Chọn",dense:"",solo:"","hide-details":"auto","hide-no-data":"","return-object":""},model:{value:t.formData.PhanQuyenChuyenMuc,callback:function(e){t.$set(t.formData,"PhanQuyenChuyenMuc",e)},expression:"formData.PhanQuyenChuyenMuc"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Tên chuyên mục: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-text-field",{staticClass:"flex input-form",attrs:{rules:[t.rules.required],solo:"",label:"Nhập tên đầy đủ...",dense:"","hide-details":"auto",required:""},model:{value:t.formData.TenMuc,callback:function(e){t.$set(t.formData,"TenMuc",e)},expression:"formData.TenMuc"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Số thứ tự: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-text-field",{staticClass:"flex input-form",attrs:{rules:[t.rules.number,t.rules.required],solo:"",label:"Nhập số thứ tự...",dense:"","hide-details":"auto"},model:{value:t.formData.SoThuTu,callback:function(e){t.$set(t.formData,"SoThuTu",e)},expression:"formData.SoThuTu"}})],1)],1)],1)},u=[],m={props:["dataEdit","listCategoryNews"],data(){return{formData:{MaMuc:this.dataEdit.MaMuc||"",TenMuc:this.dataEdit.TenMuc||"",SoThuTu:this.dataEdit.SoThuTu||"",PhanQuyenChuyenMuc:this.dataEdit.MddNhomQuyen||""},validForm:!1,rules:{required:t=>!!t||"Không được để trống.",birthday:t=>{const e=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;return e.test(t)||"Định dạng ngày sinh là: ngày/tháng/năm"},number:t=>{const e=/^(?:[1-9]\d*|\d)$/;return e.test(t)||"Trường này phải nhập số"}},optionGroups:[]}},mounted(){},created(){const t=this;t.getGroup()},methods:{getGroup(){let t=this;const e={page:0,size:20,keyword:"",orderFields:"",orderTypes:"",tinhTrang:"1",thamChieu_maMuc:""},a={collectionName:"nhomquyen",data:e};t.$store.dispatch("collectionFilter",a).then((function(e){const a=e.content;t.$emit("emitDataGroup",a),t.optionGroups=a.map(t=>({text:t.TenNhomQuyen,value:t.MaDinhDanh}))}))},validateForm(){let t=this;return t.$refs.formCategoryHandBookRef.validate()}},computed:{getListCategoryNews(){var t;const e=this;let a=[];return a=null!==(t=e.dataEdit)&&void 0!==t&&t.PrimKey?e.listCategoryNews.reduce((function(t,a){var n;return(null===(n=e.dataEdit)||void 0===n?void 0:n.PrimKey)!==a.PrimKey&&t.push({text:a.TenChuyenMuc,value:a.MaChuyenMuc}),t}),[]):e.listCategoryNews.map(t=>({text:t.TenChuyenMuc,value:t.MaChuyenMuc})),a}}},h=m,g=(a("4faf"),a("2877")),v=a("6544"),f=a.n(v),p=a("62ad"),y=a("4bd4"),C=a("0fd9"),D=a("b974"),S=a("8654"),M=Object(g["a"])(h,d,u,!1,null,null,null),x=M.exports;f()(M,{VCol:p["a"],VForm:y["a"],VRow:C["a"],VSelect:D["a"],VTextField:S["a"]});var k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{ref:"formPhanNhomQuyenRef",attrs:{"lazy-validation":""},model:{value:t.validForm,callback:function(e){t.validForm=e},expression:"validForm"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Chuyên mục cẩm nang: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.listCategoryNews,label:"Chọn chuyên mục",chips:"",multiple:"",solo:"",rules:[t.rules.required],required:"","hide-details":"auto","hide-no-data":""},model:{value:t.formData.chuyenMuc,callback:function(e){t.$set(t.formData,"chuyenMuc",e)},expression:"formData.chuyenMuc"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Nhóm quyền: ")]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.listGroup,chips:"",label:"Chọn nhóm quyền",multiple:"",solo:"",required:"","hide-details":"auto","hide-no-data":""},model:{value:t.formData.TenNhomQuyen,callback:function(e){t.$set(t.formData,"TenNhomQuyen",e)},expression:"formData.TenNhomQuyen"}})],1)],1)],1)},b=[],_={props:["dataTypeHandBook","dataSelectEditCategoryHandBook"],data(){return{formData:{chuyenMuc:this.dataSelectEditCategoryHandBook||"",TenNhomQuyen:""},listGroup:[],listCategoryNews:[],validForm:!1,rules:{required:t=>!!t||"Không được để trống."}}},mounted(){},created(){const t=this;t.listCategoryNews=t.dataTypeHandBook.map(t=>({text:t.TenMuc,value:t.MaDinhDanh})),t.getGroup()},methods:{validateForm(){let t=this;return t.$refs.formPhanNhomQuyenRef.validate()},getGroup(){let t=this;const e={page:0,size:200,keyword:"",orderFields:"",orderTypes:"",tinhTrang:"1",thamChieu_maMuc:""},a={collectionName:"nhomquyen",data:e};t.$store.dispatch("collectionFilter",a).then((function(e){const a=e.content;t.listGroup=a.map(t=>({text:t.TenNhomQuyen,value:t.MaDinhDanh}))}))}}},T=_,N=Object(g["a"])(T,k,b,!1,null,"1a5f4d82",null),F=N.exports;f()(N,{VCol:p["a"],VForm:y["a"],VRow:C["a"],VSelect:D["a"]});var w={components:{Pagination:r["a"],FormTypeHandBook:x,FormPhanQuyenChuyenMucCamNang:F},data(){return{selected:[],textSearch:"",headers:[{sortable:!1,text:"STT",align:"center",value:"stt",width:70},{sortable:!1,text:"Mã chuyên mục",align:"left",value:"MaMuc",class:"th-center"},{sortable:!1,text:"Tên chuyên mục",align:"left",value:"TenMuc",class:"th-center"},{sortable:!1,text:"Tên nhóm quyền",align:"left",value:"TenNhomQuyen",class:"th-center"},{sortable:!1,text:"Thao tác",align:"center",value:"thaotac",class:"th-center",width:150}],toggleAdvanceSearch:!1,listCategoryHandBook:[],itemsPerPage:20,loadingData:!1,pageCount:1,page:0,edittingForm:!1,dialogForm:!1,readonlyForm:!1,loadingAction:!1,total:1,dataEdit:{},dialogMenu:!1,dataSelectEditCategoryHandBook:"",emitDataGroup:[],textDateStartSend:"",textDateEndSend:"",textNameSearch:"",toggleShowMenuStartDateSend:!1,dateStartSend:"",toggleShowMenuEndDateSend:!1,dateEndSend:"",rules:{date:t=>{const e=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;let a;return a=!t||(e.test(t)||"Định dạng ngày là: ngày/tháng/năm"),a},checkDateNow:t=>{const e=c()(new Date,"DD/MM/YYYY").valueOf(),a=c()(t,"DD/MM/YYYY").valueOf(),n=e-a>0;return!t||(n||"Ngày nhập không được sau ngày "+c()(new Date,"DD/MM/YYYY").format("DD/MM/YYYY"))},checkDateInputStartSend:t=>{if(this.textDateEndSend){const e=c()(this.textDateEndSend,"DD/MM/YYYY").valueOf(),a=c()(t,"DD/MM/YYYY").valueOf(),n=e-a>0;return!t||(n||"Ngày nhập không được sau ngày "+c()(this.textDateEndSend,"DD/MM/YYYY").format("DD/MM/YYYY"))}return!0},checkDateInputEndSend:t=>{if(this.textDateStartSend){const e=c()(this.textDateStartSend,"DD/MM/YYYY").valueOf(),a=c()(t,"DD/MM/YYYY").valueOf(),n=!(e-a>0);return n||"Ngày nhập không được sau ngày "+c()(this.textDateStartSend,"DD/MM/YYYY").format("DD/MM/YYYY")}return!0}}}},created(){const t=this;t.getLisCategoryHandBook({danhMuc_maDanhMuc:"CHUYENMUCCAMNANG"})},mounted(){},watch:{dateStartSend(){const t=this;t.textDateStartSend=t.formatDate(t.dateStartSend)},dateEndSend(){const t=this;t.textDateEndSend=t.formatDate(t.dateEndSend)}},methods:{formatDate(t){if(!t)return null;const[e,a,n]=t.split("-");return`${n}/${a}/${e}`},parseDate(t){if(!t)return null;const[e,a,n]=t.split("/");return`${n}-${a.padStart(2,"0")}-${e.padStart(2,"0")}`},getListCategoryHandBookFilter(t){const e=this,a={keyword:t?"":e.textNameSearch||e.textSearch,NgayTaoFrom:e.textDateStartSend?c()(e.textDateStartSend,"DD/MM/YYYY").valueOf():"",NgayTaoTo:e.textDateEndSend?c()(e.textDateEndSend,"DD/MM/YYYY").valueOf():"",danhMuc_maDanhMuc:"CHUYENMUCCAMNANG"};e.textNameSearch&&e.textSearch&&(a.keyword=""),e.$refs.formSearchRef.validate()&&e.getLisCategoryHandBook(a)},getLisCategoryHandBook(t){let e=this;e.loadingData=!0;const a={page:0,size:20},n={collectionName:"dulieudanhmuc",data:t?{...a,...t}:a};e.$store.dispatch("collectionFilter",n).then((function(t){e.listCategoryHandBook=t.content,e.total=e.listCategoryHandBook.length,e.pageCount=t.totalPages,e.loadingData=!1,e.page=t.pageable.pageNumber})).catch((function(){e.loadingData=!1}))},deleteCategoryHandBook(t){const e=this;e.dialogDelete=!1;const a={payload:t.PrimKey,type:"loaibando"};e.$store.commit("SET_SHOWCONFIRM",!0);let n={auth:!1,title:"Xóa chuyên mục cẩm nang Hòa Lac",message:"Bạn có chắc chắn muốn xóa chuyên mục cẩm nang Hòa Lạc này",button:{yes:"Có",no:"Không"},callback:()=>{e.$store.dispatch("deleteItemData",a).then((function(a){s.a.success("Xóa thành công"),e.listCategoryHandBook=e.listCategoryHandBook.reduce((function(e,a){return t.PrimKey!==a.PrimKey&&e.push(a),e}),[]),e.total=e.listCategoryHandBook.length})).catch((function(){e.loadingData=!1}))}};e.$store.commit("SET_CONFIG_CONFIRM_DIALOG",n)},editCategoryHandBook(t){const e=this,a={...t};e.edittingForm=!0,e.dataEdit=a,e.dialogForm=!0},handlechangePage(t){const e=this;e.getListCadres(t)},showModalForm(){const t=this;t.dialogForm=!0,t.edittingForm=!1},closeModalForm(){const t=this;t.dialogForm=!1,t.dataEdit={}},openDialogDecentralization(){const t=this;t.dialogMenu=!0,t.dataSelectEditCategoryHandBook=t.selected.length?t.selected.map(t=>t.MaDinhDanh):""},handleDecentralization(){const t=this;if(t.$refs.formPhanQuyenChuyenMucCamNangRef.validateForm()){const e=t.$refs.formPhanQuyenChuyenMucCamNangRef.formData;t.listCategoryHandBook.reduce((t,a)=>e.chuyenMuc.includes(a.MaDinhDanh)?[...t,{IdChuyenMuc:a.PrimKey,PhanQuyenChuyenMuc:e.TenNhomQuyen?e.TenNhomQuyen.map(t=>({MaDinhDanhNhomQuyen:t})):[]}]:t,[])}},handleEmitDataGroup(t){const e=this;e.emitDataGroup=t},handleChangeDate(){const t=this;t.textDateStartSend||t.textDateEndSend||t.getLisCategoryHandBook({danhMuc_maDanhMuc:"CHUYENMUCCAMNANG"})},submitForm(){const t=this;if(t.$refs.formChuyenMucCamNangRef.validateForm()){const e=t.$refs.formChuyenMucCamNangRef.formData,a={...e,DanhMuc:{type:"C_DanhMuc",MaDanhMuc:"CHUYENMUCCAMNANG",TenDanhMuc:"Chuyên mục cẩm nang"},TenNhomQuyen:e.PhanQuyenChuyenMuc.text,MddNhomQuyen:e.PhanQuyenChuyenMuc.value};if(delete a.PhanQuyenChuyenMuc,t.edittingForm){const e={payload:a,type:"dulieudanhmuc",id:t.dataEdit.PrimKey};t.$store.dispatch("editItemData",e).then((function(e){s.a.success("Cập nhật thành công"),t.dialogForm=!1,t.listCategoryHandBook=t.listCategoryHandBook.reduce((function(e,n){return t.dataEdit.PrimKey===n.PrimKey?[...e,{...n,...a}]:[...e,n]}),[]),t.dataEdit={}})).catch((function(){t.loadingData=!1,s.a.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường")}))}else{const e={payload:a,type:"dulieudanhmuc"};t.$store.dispatch("createItemData",e).then((function(e){if(s.a.success("Thêm mới thành công"),t.listCategoryHandBook.length<t.itemsPerPage){const n=[...t.listCategoryHandBook];n.push({...a,PrimKey:e.data.resp.PrimKey}),t.listCategoryHandBook=n}t.dialogForm=!1,t.total=t.listCategoryHandBook.length})).catch((function(){t.loadingData=!1,s.a.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường")}))}}}}},Y=w,E=a("8336"),H=a("b0af"),P=a("99d9"),B=a("a523"),$=a("8fea"),V=a("2e4b"),Q=a("169a"),A=a("0e8f"),G=a("132d"),q=a("a722"),O=a("e449"),z=a("2fa4"),K=a("71d9"),R=a("2a7f"),L=a("3a2f"),I=Object(g["a"])(Y,n,o,!1,null,"22256b7f",null);e["default"]=I.exports;f()(I,{VBtn:E["a"],VCard:H["a"],VCardActions:P["a"],VCardText:P["b"],VCol:p["a"],VContainer:B["a"],VDataTable:$["a"],VDatePicker:V["a"],VDialog:Q["a"],VFlex:A["a"],VForm:y["a"],VIcon:G["a"],VLayout:q["a"],VMenu:O["a"],VRow:C["a"],VSpacer:z["a"],VTextField:S["a"],VToolbar:K["a"],VToolbarItems:R["a"],VToolbarTitle:R["b"],VTooltip:L["a"]})},"4faf":function(t,e,a){"use strict";a("bb9c")},bb9c:function(t,e,a){}}]);