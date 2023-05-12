(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-871cfdda"],{"2a7f":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s}));var n=a("71d9"),i=a("80d2");const s=Object(i["j"])("v-toolbar__title"),o=Object(i["j"])("v-toolbar__items");n["a"]},"36a7":function(t,e,a){},"4bd4":function(t,e,a){"use strict";var n=a("58df"),i=a("7e2b"),s=a("3206");e["a"]=Object(n["a"])(i["a"],Object(s["b"])("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",e=>{this.$set(this.errorBag,t._uid,e)},{immediate:!0}),a={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",n=>{n&&(this.errorBag.hasOwnProperty(t._uid)||(a.valid=e(t)))}):a.valid=e(t),a},validate(){return 0===this.inputs.filter(t=>!t.validate(!0)).length},reset(){this.inputs.forEach(t=>t.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(t=>t.resetValidation()),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find(e=>e._uid===t._uid);if(!e)return;const a=this.watchers.find(t=>t._uid===e._uid);a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter(t=>t._uid!==e._uid),this.inputs=this.inputs.filter(t=>t._uid!==e._uid),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},this.$slots.default)}})},"5e23":function(t,e,a){},"71d9":function(t,e,a){"use strict";a("5e23");var n=a("8dd9"),i=a("adda"),s=a("80d2"),o=a("d9bd");e["a"]=n["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...n["a"].options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:Object(s["h"])(this.computedHeight)}}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(o["a"])(t,e,this)})},methods:{genBackground(){const t={height:Object(s["h"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(i["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(s["h"])(this.computedContentHeight)}},Object(s["t"])(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(s["h"])(this.extensionHeight)}},Object(s["t"])(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],a=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,a,e)}})},"8a9f":function(t,e,a){},"8efc":function(t,e,a){},a523:function(t,e,a){"use strict";a("20f6"),a("4b85");var n=a("e8f2"),i=a("d9f7");e["a"]=Object(n["a"])("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:a,children:n}){let s;const{attrs:o}=a;return o&&(a.attrs={},s=Object.keys(o).filter(t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e})),e.id&&(a.domProps=a.domProps||{},a.domProps.id=e.id),t(e.tag,Object(i["a"])(a,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(s||[])}),n)}})},adda:function(t,e,a){"use strict";a("8efc");var n=a("90a2"),i=(a("36a7"),a("24b2")),s=a("58df"),o=Object(s["a"])(i["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},this.$slots.default)}},render(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),r=o,l=a("7560"),c=a("d9f7"),d=a("d9bd");const u="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(s["a"])(r,l["a"]).extend({name:"v-img",directives:{intersect:n["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const a=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[a]):a}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(t,e,a){if(!u||a||this.eager){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch(t=>{Object(d["c"])("Failed to decode image, trying to render anyway\n\nsrc: "+this.normalisedSrc.src+(t.message?"\nOriginal error: "+t.message:""),this)}).then(this.onLoad):this.onLoad()},t.onerror=this.onError,this.hasError=!1,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),t.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const a=()=>{const{naturalHeight:n,naturalWidth:i}=t;n||i?(this.naturalWidth=i,this.calculatedAspectRatio=i/n):t.complete||!this.isLoading||this.hasError||null==e||setTimeout(a,e)};a()},genContent(){const t=r.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:this.naturalWidth+"px"}}),t},__genPlaceholder(){if(this.$slots.placeholder){const t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render(t){const e=r.options.render.call(this,t),a=Object(c["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:u?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,a,e.children)}})},c460:function(t,e,a){"use strict";a("8a9f")},f0b4:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12",sm:"5"}},[a("v-text-field",{staticClass:"input-form",attrs:{solo:"",dense:"",clearable:"","hide-details":"auto",placeholder:"Nhập từ khóa tìm kiếm","append-icon":"mdi-magnify"},on:{"click:append":function(e){return t.getListMenuFilter("")},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getListMenuFilter("")},"click:clear":function(e){return t.getListMenuFilter("clear")}},model:{value:t.textSearch,callback:function(e){t.textSearch=e},expression:"textSearch"}})],1),a("v-col",{attrs:{cols:"12",sm:"7"}},[a("div",{staticStyle:{float:"right"}},[a("v-btn",{staticClass:"btn-form mx-0 text-white mr-3",attrs:{small:"",color:"primary"},on:{click:t.openDialogDecentralization}},[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-file-plus")]),t._v("  Phân quyền ")],1),a("v-btn",{staticClass:"btn-form mx-0 text-white",attrs:{small:"",color:"primary"},on:{click:t.showModalForm}},[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-plus")]),t._v("  Thêm mới ")],1)],1)])],1),a("v-row",{staticClass:"my-0 mb-3"},[a("v-col",{staticClass:"pt-0",attrs:{cols:"12"}},[a("v-data-table",{staticClass:"table-base mt-2",attrs:{headers:t.headers,items:t.listMenu,"items-per-page":t.itemsPerPage,"item-key":"MaMenu","hide-default-footer":"","no-data-text":"Không có dữ liệu",loading:t.loadingData,"loading-text":"Đang tải... ","item-text":"name"},scopedSlots:t._u([{key:"item.chon",fn:function(t){t.index}},{key:"item.stt",fn:function(e){var a=e.index;return[t._v(" "+t._s((t.page+1)*t.itemsPerPage-t.itemsPerPage+a+1)+" ")]}},{key:"item.LoaiMenu",fn:function(e){var a=e.item;e.index;return[t._v(" "+t._s("1"===a.LoaiMenu?"Mobile":"Web")+" ")]}},{key:"item.thaotac",fn:function(e){var n=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"mr-2",attrs:{color:"#2161b1",text:"",icon:""},on:{click:function(e){return e.stopPropagation(),t.editMenu(n)}}},"v-btn",s,!1),i),[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[a("span",[t._v("Sửa")])]),a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"ml-2",attrs:{color:"red",text:"",icon:""},on:{click:function(e){return e.stopPropagation(),t.deleteMenu(n)}}},"v-btn",s,!1),i),[a("v-icon",{attrs:{size:"18"}},[t._v("mdi-delete")])],1)]}}],null,!0)},[a("span",[t._v("Xóa")])])]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),t.pageCount?a("pagination",{attrs:{pageInput:t.page,total:t.total,pageCount:t.pageCount},on:{"tiny:change-page":t.handlechangePage}}):t._e()],1)],1),t.dialogForm?a("div",[a("v-dialog",{attrs:{"max-width":"1200",persistent:"",fullscreen:""},model:{value:t.dialogForm,callback:function(e){t.dialogForm=e},expression:"dialogForm"}},[a("v-card",[a("v-toolbar",{staticClass:"px-3",attrs:{dark:"",color:"primary"}},[t.edittingForm?a("v-toolbar-title",[t._v("Cập nhật menu")]):t._e(),t.edittingForm?t._e():a("v-toolbar-title",[t._v("Thêm mới menu")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{icon:"",dark:""},on:{click:t.closeModalForm}},[a("v-icon",[t._v("mdi-close")])],1)],1)],1),a("FormMenu",{ref:"formMenuRef",attrs:{dataEdit:t.dataEdit,listMenu:t.listMenu},on:{emitDataGroup:t.handleEmitDataGroup}}),a("v-card-text",{staticClass:"px-2 py-2"},[a("v-card-actions",{staticClass:"justify-center my-4"},[a("v-btn",{staticClass:"white--text mr-2",attrs:{small:"",depressed:"",color:"red",loading:t.loadingAction,disabled:t.loadingAction},on:{click:t.closeModalForm}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-close ")]),t._v(" "+t._s(t.$t("basic.thoat"))+" ")],1),t.readonlyForm?t._e():a("v-btn",{staticClass:"mr-2",attrs:{small:"",depressed:"",color:"primary",loading:t.loadingAction,disabled:t.loadingAction},nativeOn:{click:function(e){return t.submitForm.apply(null,arguments)}}},[a("v-icon",{attrs:{left:"",dark:"",size:"18"}},[t._v(" mdi-file-document-plus-outline ")]),t.edittingForm?a("span",[t._v("Cập nhật")]):a("span",[t._v("Thêm mới")])],1)],1)],1)],1)],1)],1):t._e(),t.dialogMenu?a("div",[a("v-dialog",{attrs:{persistent:"","max-width":"860px"},model:{value:t.dialogMenu,callback:function(e){t.dialogMenu=e},expression:"dialogMenu"}},[a("v-card",[a("v-toolbar",{staticClass:"px-3",attrs:{dark:"",color:"primary"}},[a("span",{staticClass:"text-h5"},[t._v("Phân quyền menu")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("FormPhanQuyenMenu",{ref:"formPhanQuyenMenuRef",attrs:{dataMenu:t.listMenu,dataSelectEditMenu:t.dataSelectEditMenu}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"white--text mr-2",attrs:{small:"",depressed:"",color:"red",loading:t.loadingAction,disabled:t.loadingAction},on:{click:function(e){t.dialogMenu=!1}}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-close ")]),t._v(" "+t._s(t.$t("basic.thoat"))+" ")],1),t.readonlyForm?t._e():a("v-btn",{staticClass:"mr-2",attrs:{small:"",depressed:"",color:"primary",loading:t.loadingAction,disabled:t.loadingAction},on:{click:t.handleDecentralization}},[a("v-icon",{attrs:{left:"",dark:"",size:"18"}},[t._v(" mdi-file-document-plus-outline ")]),a("span",[t._v("Phân quyền")])],1)],1)],1)],1)],1):t._e()],1)},i=[],s=(a("13d5"),a("e20e")),o=a("854a"),r=a.n(o),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{ref:"formMenuRef",staticClass:"dialog-body",attrs:{"lazy-validation":""},model:{value:t.validForm,callback:function(e){t.validForm=e},expression:"validForm"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Chức năng: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-select",{staticClass:"flex input-form",attrs:{rules:[t.rules.required],disabled:!!t.dataEdit.MaMenu,items:t.optionIdMenu,label:"Chọn",dense:"",solo:"","hide-details":"auto",required:""},model:{value:t.formData.MaMenu,callback:function(e){t.$set(t.formData,"MaMenu",e)},expression:"formData.MaMenu"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Tên menu: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-text-field",{staticClass:"flex input-form",attrs:{rules:[t.rules.required],solo:"",label:"Nhập tên đầy đủ...",dense:"","hide-details":"auto",required:""},model:{value:t.formData.TenMenu,callback:function(e){t.$set(t.formData,"TenMenu",e)},expression:"formData.TenMenu"}})],1),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Mã icon:")]),a("v-text-field",{staticClass:"flex input-form",attrs:{solo:"",label:"Nhập mã icon...",dense:"","hide-details":"auto",required:""},model:{value:t.formData.MaIcon,callback:function(e){t.$set(t.formData,"MaIcon",e)},expression:"formData.MaIcon"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Đường dẫn: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-text-field",{staticClass:"flex input-form",attrs:{rules:[t.rules.required],solo:"",label:"Nhập đường dẫn...",dense:"","hide-details":"auto",required:""},model:{value:t.formData.DuongDan,callback:function(e){t.$set(t.formData,"DuongDan",e)},expression:"formData.DuongDan"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Tên tiếng anh:")]),a("v-text-field",{staticClass:"flex input-form",attrs:{solo:"",label:"Nhập tên tiếng anh...",dense:"","hide-details":"auto"},model:{value:t.formData.TenTiengAnh,callback:function(e){t.$set(t.formData,"TenTiengAnh",e)},expression:"formData.TenTiengAnh"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Số thứ tự: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-text-field",{staticClass:"flex input-form",attrs:{rules:[t.rules.number],solo:"",label:"Nhập số thứ tự...",dense:"","hide-details":"auto",type:"number"},model:{value:t.formData.SoThuTu,callback:function(e){t.$set(t.formData,"SoThuTu",e)},expression:"formData.SoThuTu"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Menu cha:")]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.getListMenu,label:"Chọn",dense:"",solo:"","hide-details":"auto"},model:{value:t.formData.MaMenuCha,callback:function(e){t.$set(t.formData,"MaMenuCha",e)},expression:"formData.MaMenuCha"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Tình trạng:")]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.optionStatus,label:"Chọn",dense:"",solo:"","hide-details":"auto"},model:{value:t.formData.TinhTrang,callback:function(e){t.$set(t.formData,"TinhTrang",e)},expression:"formData.TinhTrang"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Nhóm quyền:")]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.optionGroups,label:"Chọn",dense:"",solo:"",multiple:"","hide-details":"auto"},model:{value:t.formData.PhanQuyenMenu,callback:function(e){t.$set(t.formData,"PhanQuyenMenu",e)},expression:"formData.PhanQuyenMenu"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("div",{staticClass:"titleText mb-2"},[t._v("Loại menu:")]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.optionType,label:"Chọn",dense:"",solo:"","hide-details":"auto",required:""},model:{value:t.formData.LoaiMenu,callback:function(e){t.$set(t.formData,"LoaiMenu",e)},expression:"formData.LoaiMenu"}})],1)],1)],1)},c=[],d={props:["dataEdit","listMenu"],data(){var t;return{formData:{MaMenuCha:this.dataEdit.MaMenuCha||"",MaMenu:this.dataEdit.MaMenu||"",TinhTrang:this.dataEdit.TinhTrang||"2",LoaiMenu:this.dataEdit.LoaiMenu||"",TenMenu:this.dataEdit.TenMenu||"",DuongDan:this.dataEdit.DuongDan||"",TenTiengAnh:this.dataEdit.TenTiengAnh||"",MaIcon:this.dataEdit.MaIcon||"",SoThuTu:this.dataEdit.SoThuTu||"",PhanQuyenMenu:null!==(t=this.dataEdit.ListQuyenMenu)&&void 0!==t&&t.length?this.dataEdit.ListQuyenMenu.map(t=>t.MaDinhDanh):[]},validForm:!1,optionStatus:[{text:"Hoạt động",value:"2"},{text:"Không hoạt động",value:"1"}],optionGroups:[],optionType:[{text:"Web",value:"0"},{text:"Mobile",value:"1"}],rules:{required:t=>!!t||"Không được để trống.",birthday:t=>{const e=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;return e.test(t)||"Định dạng ngày sinh là: ngày/tháng/năm"},number:t=>{const e=/^(?:[1-9]\d*|\d)$/;return e.test(t)||"Trường này phải nhập số"}}}},mounted(){},created(){const t=this;t.getGroup()},methods:{getGroup(){let t=this;const e={page:0,size:20,keyword:"",orderFields:"",orderTypes:"",tinhTrang:"1",thamChieu_maMuc:""},a={collectionName:"nhomquyen",data:e};t.$store.dispatch("collectionFilter",a).then((function(e){const a=e.content;t.$emit("emitDataGroup",a),t.optionGroups=a.map(t=>({text:t.TenNhomQuyen,value:t.MaDinhDanh}))}))},validateForm(){let t=this;return t.$refs.formMenuRef.validate()}},computed:{getListMenu(){var t;const e=this;let a=[];return a=null!==(t=e.dataEdit)&&void 0!==t&&t.PrimKey?e.listMenu.reduce((function(t,a){var n;return(null===(n=e.dataEdit)||void 0===n?void 0:n.PrimKey)!==a.PrimKey&&t.push({text:a.TenMenu,value:a.MaMenu}),t}),[]):e.listMenu.map(t=>({text:t.TenMenu,value:t.MaMenu})),a},optionIdMenu(){const t=[{text:"Quản lý cán bộ",value:"ManageCadres"},{text:"Quản lý sinh viên",value:"ManageStudents"},{text:"Quản lý nhóm quyền",value:"MangeRightsGroup"},{text:"Quản lý bài viết tin tức",value:"ManageNews"},{text:"Quản lý menu",value:"ManageMenu"},{text:"Quản lý phản hồi góp ý",value:"ManageFeedback"},{text:"Quản lý khu vực bản đồ",value:"ManageArea"},{text:"Quản lý loại bản đồ",value:"ManageTypeMap"},{text:"Quản lý địa điểm bản đồ",value:"ManageMap"},{text:"Quản lý chuyên mục tin tức",value:"ManageCategoryNews"},{text:"Quản lý chuyên mục cẩm nang Hòa Lạc",value:"ManageTypeHandBook"},{text:"Xem tất cả thông báo",value:"ManageNotification"},{text:"Quản lý cẩm nang Hòa Lạc",value:"CamNangHoaLac"},{text:"Tin tức - App",value:"TinTuc_App"},{text:"Góp ý - App",value:"GopY_App"},{text:"Thông báo - App",value:"ThongBao_App"},{text:"Bản đồ số - App",value:"BanDo_App"},{text:"Cẩm nang - App",value:"CamNang_App"},{text:"Đăng ký nội trú - App",value:"DangKyNoiTru_App"},{text:"Ảnh xác minh - App",value:"AnhXacMinh_App"},{text:"Quản lý thủ tục",value:"ManageProcedure"},{text:"Quản lý nhà trọ",value:"ManageMotelInfor"},{text:"Quản lý phòng trọ",value:"ManageListMotel"}];return t}}},u=d,h=(a("c460"),a("2877")),m=a("6544"),p=a.n(m),g=a("62ad"),v=a("4bd4"),f=a("0fd9"),b=a("b974"),M=a("8654"),y=Object(h["a"])(u,l,c,!1,null,null,null),x=y.exports;p()(y,{VCol:g["a"],VForm:v["a"],VRow:f["a"],VSelect:b["a"],VTextField:M["a"]});var _=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{ref:"formPhanNhomQuyenRef",staticClass:"dialog-body",attrs:{"lazy-validation":""},model:{value:t.validForm,callback:function(e){t.validForm=e},expression:"validForm"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Menu: "),a("span",{staticStyle:{color:"red"}},[t._v("*")])]),a("v-select",{staticClass:"flex input-form",attrs:{rules:[t.rules.required],items:t.listMenu,label:"Chọn Menu",chips:"",multiple:"",solo:"","hide-details":"auto",required:""},model:{value:t.formData.menu,callback:function(e){t.$set(t.formData,"menu",e)},expression:"formData.menu"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("div",{staticClass:"titleText mb-2"},[t._v(" Nhóm quyền: ")]),a("v-select",{staticClass:"flex input-form",attrs:{items:t.listGroup,chips:"",label:"Chọn nhóm quyền",multiple:"",solo:"","hide-details":"auto",required:""},model:{value:t.formData.TenNhomQuyen,callback:function(e){t.$set(t.formData,"TenNhomQuyen",e)},expression:"formData.TenNhomQuyen"}})],1)],1)],1)},C=[],T={props:["dataMenu","dataSelectEditMenu"],data(){return{formData:{menu:this.dataSelectEditMenu||null,TenNhomQuyen:null},listGroup:[],listMenu:[],validForm:!1,rules:{required:t=>!!t||"Không được để trống."}}},mounted(){},created(){const t=this;t.listMenu=t.dataMenu.map(t=>({text:t.TenMenu,value:t.MaDinhDanh})),t.getGroup()},methods:{validateForm(){let t=this;return t.$refs.formPhanNhomQuyenRef.validate()},getGroup(){let t=this;const e={page:0,size:20,keyword:"",orderFields:"",orderTypes:"",tinhTrang:"1",thamChieu_maMuc:""},a={collectionName:"nhomquyen",data:e};t.$store.dispatch("collectionFilter",a).then((function(e){const a=e.content;t.listGroup=a.map(t=>({text:t.TenNhomQuyen,value:t.MaDinhDanh}))}))}}},D=T,S=Object(h["a"])(D,_,C,!1,null,"0a1cda94",null),k=S.exports;p()(S,{VCol:g["a"],VForm:v["a"],VRow:f["a"],VSelect:b["a"]});var $={components:{Pagination:s["a"],FormMenu:x,FormPhanQuyenMenu:k},data(){return{selected:[],textSearch:"",headers:[{sortable:!1,text:"STT",align:"center",value:"stt",width:70},{sortable:!1,text:"Mã menu",align:"left",value:"MaMenu",class:"th-center",width:200},{sortable:!1,text:"Tên menu",align:"left",value:"TenMenu",class:"th-center"},{sortable:!1,text:"Tên nhóm quyền",align:"left",value:"tenNhomQuyen",class:"th-center",width:250},{sortable:!1,text:"Loại menu",align:"left",value:"LoaiMenu",class:"th-center",width:120},{sortable:!1,text:"Thao tác",align:"left",value:"thaotac",class:"th-center",width:150}],listMenu:[],itemsPerPage:20,loadingData:!1,pageCount:1,page:0,edittingForm:!1,dialogForm:!1,readonlyForm:!1,loadingAction:!1,total:1,dataEdit:{},dialogMenu:!1,dataSelectEditMenu:null,emitDataGroup:[]}},created(){const t=this;t.getListMenu()},mounted(){console.log("mom: ")},methods:{getListMenuFilter(t){const e=this;e.getListMenu({keyword:t?"":e.textSearch})},getListMenu(t){let e=this;e.loadingData=!0;const a={page:0,size:20,keyword:"",orderFields:"",orderTypes:"",tinhTrang:"",thamChieu_maMuc:""},n={collectionName:"menu",data:t?{...a,...t}:a};e.$store.dispatch("collectionFilter",n).then((function(t){e.listMenu=t.content.map(t=>({...t,tenNhomQuyen:t.ListQuyenMenu.map(t=>t.TenNhomQuyen).join(", ")})),console.log("res: ",e.listMenu),e.total=e.listMenu.length,e.pageCount=t.totalPages,e.page=t.pageable.pageNumber,e.loadingData=!1})).catch((function(){e.loadingData=!1}))},deleteMenu(t){const e=this;e.dialogDelete=!1;const a={payload:t.PrimKey,type:"menu"};e.$store.commit("SET_SHOWCONFIRM",!0);let n={auth:!1,title:"Xóa menu",message:"Bạn có chắc chắn muốn xóa menu này",button:{yes:"Có",no:"Không"},callback:()=>{e.$store.dispatch("deleteItemData",a).then((function(a){r.a.success("Xóa thành công"),e.listMenu=e.listMenu.reduce((function(e,a){return t.PrimKey!==a.PrimKey&&e.push(a),e}),[]),e.total=e.listMenu.length,console.log("res dele: ",a)})).catch((function(){e.loadingData=!1}))}};e.$store.commit("SET_CONFIG_CONFIRM_DIALOG",n)},editMenu(t){const e=this,a={...t};e.edittingForm=!0,console.log("item edit: ",t),e.dataEdit=a,e.dialogForm=!0},handlechangePage(t){const e=this;e.getListMenu(t)},showModalForm(){const t=this;t.dialogForm=!0,t.edittingForm=!1},closeModalForm(){const t=this;t.dialogForm=!1,t.dataEdit={}},openDialogDecentralization(){const t=this;t.dialogMenu=!0,t.selected.length?t.dataSelectEditMenu=t.selected.map(t=>t.MaDinhDanh):t.dataSelectEditMenu=[]},handleDecentralization(){const t=this;if(console.log("handleCkick: ",t.selected),t.$refs.formPhanQuyenMenuRef.validateForm()){const e=t.$refs.formPhanQuyenMenuRef.formData,a=t.listMenu.reduce((t,a)=>e.menu.includes(a.MaDinhDanh)?[...t,{IdMenu:a.PrimKey,PhanQuyenMenu:e.TenNhomQuyen?e.TenNhomQuyen.map(t=>({MaDinhDanhNhomQuyen:t})):[]}]:t,[]),n={payload:a,type:"menu/many"};t.$store.dispatch("createItemData",n).then((function(e){r.a.success("Phân quyền thành công"),t.dialogMenu=!1,t.selected=[],t.getListMenu(),console.log("res post: ",e)})).catch((function(){t.loadingData=!1})),console.log("submit",e,a,e.menu)}},handleEmitDataGroup(t){const e=this;e.emitDataGroup=t},submitForm(){const t=this;if(t.$refs.formMenuRef.validateForm()){const e=t.$refs.formMenuRef.formData;if(e.PhanQuyenMenu=t.emitDataGroup.reduce((t,a)=>e.PhanQuyenMenu.includes(a.MaDinhDanh)?[...t,{MaDinhDanhNhomQuyen:a.MaDinhDanh}]:t,[]),e.MaMenu=e.MaMenu.replace(/ +/g,""),t.edittingForm){const a={payload:e,type:"menu",id:t.dataEdit.PrimKey};t.$store.dispatch("editItemData",a).then((function(a){r.a.success("Cập nhật thành công"),t.dialogForm=!1,t.listMenu=t.listMenu.reduce((function(n,i){return t.dataEdit.PrimKey===i.PrimKey?[...n,{...i,...e,tenNhomQuyen:a.data.resp.ListQuyenMenu.map(t=>t.TenNhomQuyen).join(", "),ListQuyenMenu:a.data.resp.ListQuyenMenu}]:[...n,i]}),[]),console.log("res edit: ",a,t.dataEdit.PrimKey,t.listMenu),t.dataEdit={}})).catch((function(){t.loadingData=!1,r.a.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường")}))}else{const a={payload:e,type:"menu"};t.$store.dispatch("createItemData",a).then((function(a){if(r.a.success("Thêm mới thành công"),t.listMenu.length<t.itemsPerPage){const n=[...t.listMenu];n.push({...e,PrimKey:a.data.resp.PrimKey,tenNhomQuyen:a.data.resp.ListQuyenMenu.map(t=>t.TenNhomQuyen).join(", "),ListQuyenMenu:a.data.resp.ListQuyenMenu}),t.listMenu=n}t.dialogForm=!1,t.total=t.listMenu.length,console.log("res post: ",a)})).catch((function(e){t.loadingData=!1,console.log("err: ",e),"menu.maMenu_conflict"===e.data.messageCode?r.a.error("Trùng mã menu"):r.a.error("Vui lòng kiểm tra lại dữ liệu nhập vào các trường")}))}console.log("submit",e,t.emitDataGroup)}}},watch:{page(){console.log("page:",this.page)}}},E=$,F=a("8336"),w=a("b0af"),P=a("99d9"),Q=a("a523"),N=a("8fea"),L=a("169a"),A=a("132d"),z=a("2fa4"),B=a("71d9"),O=a("2a7f"),V=a("3a2f"),j=Object(h["a"])(E,n,i,!1,null,"98616a72",null);e["default"]=j.exports;p()(j,{VBtn:F["a"],VCard:w["a"],VCardActions:P["a"],VCardText:P["b"],VCol:g["a"],VContainer:Q["a"],VDataTable:N["a"],VDialog:L["a"],VIcon:A["a"],VRow:f["a"],VSpacer:z["a"],VTextField:M["a"],VToolbar:B["a"],VToolbarItems:O["a"],VToolbarTitle:O["b"],VTooltip:V["a"]})}}]);