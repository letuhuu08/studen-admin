(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-690e4168"],{"0e8f":function(t,e,i){"use strict";i("20f6");var s=i("e8f2");e["a"]=Object(s["a"])("flex")},"127f":function(t,e,i){"use strict";i("49c5")},"14cd":function(t,e,i){},"36a7":function(t,e,i){},"3a2f":function(t,e,i){"use strict";i("9734");var s=i("4ad4"),a=i("a9ad"),n=i("16b7"),o=i("b848"),r=i("f573"),l=i("f2e7"),c=i("80d2"),h=i("d9bd"),d=i("58df");e["a"]=Object(d["a"])(a["a"],n["a"],o["a"],r["a"],l["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,i=!this.bottom&&!this.left&&!this.top&&!this.right,s=!1!==this.attach?t.offsetLeft:t.left;let a=0;return this.top||this.bottom||i?a=s+t.width/2-e.width/2:(this.left||this.right)&&(a=s+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),this.calcXOverflow(a,this.dimensions.content.width)+"px"},calculatedTop(){const{activator:t,content:e}=this.dimensions,i=!1!==this.attach?t.offsetTop:t.top;let s=0;return this.top||this.bottom?s=i+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(s=i+t.height/2-e.height/2),this.nudgeTop&&(s-=parseInt(this.nudgeTop)),this.nudgeBottom&&(s+=parseInt(this.nudgeBottom)),!1===this.attach&&(s+=this.pageYOffset),this.calcYOverflow(s)+"px"},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:Object(c["h"])(this.maxWidth),minWidth:Object(c["h"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick(()=>{this.value&&this.callActivate()})},mounted(){"v-slot"===Object(c["u"])(this,"activator",!0)&&Object(h["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=s["a"].options.methods.genActivatorListeners.call(this);return t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")},t.keydown=t=>{t.keyCode===c["z"].esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent(()=>[this.genTransition()]),this.genActivator()])}})},"49c5":function(t,e,i){},"5e23":function(t,e,i){},6887:function(t,e,i){},"71d9":function(t,e,i){"use strict";i("5e23");var s=i("8dd9"),a=i("adda"),n=i("80d2"),o=i("d9bd");e["a"]=s["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...s["a"].options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:Object(n["h"])(this.computedHeight)}}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(o["a"])(t,e,this)})},methods:{genBackground(){const t={height:Object(n["h"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(a["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(n["h"])(this.computedContentHeight)}},Object(n["t"])(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(n["h"])(this.extensionHeight)}},Object(n["t"])(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}})},7958:function(t,e,i){},"7b2e":function(t,e,i){"use strict";i("14cd")},"8b0d":function(t,e,i){},"8efc":function(t,e,i){},9734:function(t,e,i){},adda:function(t,e,i){"use strict";i("8efc");var s=i("90a2"),a=(i("36a7"),i("24b2")),n=i("58df"),o=Object(n["a"])(a["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},this.$slots.default)}},render(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),r=o,l=i("7560"),c=i("d9f7"),h=i("d9bd");const d="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(n["a"])(r,l["a"]).extend({name:"v-img",directives:{intersect:s["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(t,e,i){if(!d||i||this.eager){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch(t=>{Object(h["c"])("Failed to decode image, trying to render anyway\n\nsrc: "+this.normalisedSrc.src+(t.message?"\nOriginal error: "+t.message:""),this)}).then(this.onLoad):this.onLoad()},t.onerror=this.onError,this.hasError=!1,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),t.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const i=()=>{const{naturalHeight:s,naturalWidth:a}=t;s||a?(this.naturalWidth=a,this.calculatedAspectRatio=a/s):t.complete||!this.isLoading||this.hasError||null==e||setTimeout(i,e)};i()},genContent(){const t=r.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:this.naturalWidth+"px"}}),t},__genPlaceholder(){if(this.$slots.placeholder){const t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render(t){const e=r.options.render.call(this,t),i=Object(c["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:d?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},b5b6:function(t,e,i){},b5fa:function(t,e,i){"use strict";i("f3b6")},b640:function(t,e,i){t.exports=i.p+"img/logo.265113f7.jpg"},bb51:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("Drawer"),i("AppBar"),i("v-main",[i("div",{staticClass:"container wrap-content-page"},[i("div",{staticClass:"mx-auto pa-5",staticStyle:{"padding-bottom":"40px !important"},attrs:{flat:""}},[i("h1",{staticClass:"title-page"},[t._v(t._s(t.titlePage))]),i("router-view")],1)]),i("Footer")],1)],1)},a=[],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-navigation-drawer",t._b({attrs:{id:"core-navigation-drawer",permanent:"","expand-on-hover":t.expandOnHover,right:t.$vuetify.rtl,src:"","mobile-breakpoint":"960",app:""},on:{click:function(e){e.stopPropagation(),t.mini,t.mini}},scopedSlots:t._u([{key:"prepend",fn:function(){return[i("v-list-item",{class:t.mini?"px-0 pl-2":"",attrs:{"two-line":""}},[t.mini?i("v-list-item-avatar",[i("img",{staticStyle:{width:"24px",height:"24px"},attrs:{src:t.publicPath+"/images/image-acc.png"}})]):t._e(),i("v-list-item-content",[i("v-list-item-title",{staticClass:"text-drawer mb-3",staticStyle:{"font-size":"16px"}},[t._v(t._s(t.userInfo.hoVaTen?t.userInfo.hoVaTen:""))]),i("div",{staticStyle:{color:"#6ec1fe"}},[t._v(" "+t._s(t.userInfo.maSoCanBo?t.userInfo.maSoCanBo:"")+" ")])],1)],1)]},proxy:!0},{key:"append",fn:function(){return[i("div",{staticClass:"pa-2"},[i("v-tooltip",{attrs:{top:"",color:"#0073C8"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,a=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"px-2 d-flex justify-start",staticStyle:{"padding-left":"0px !important",width:"100%"},attrs:{text:""},on:{click:function(e){return e.stopPropagation(),t.logout.apply(null,arguments)}}},"v-btn",a,!1),s),[i("v-icon",{staticClass:"icon-draw"},[t._v("mdi-logout-variant")]),i("span",{staticClass:"text-drawer ml-3"},[t._v("   "+t._s(t.$t("drawer.dangXuat")))])],1)]}}])},[i("span",{staticClass:"ml-3"},[t._v(t._s(t.$t("drawer.dangXuat")))])])],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},"v-navigation-drawer",t.$attrs,!1),[i("v-divider"),i("v-list",{attrs:{dense:""}},t._l(t.formatListMenu,(function(e,s){return i("v-list-item",{key:s,class:t.menuName===e.MaMenu&&t.formatListMenu.length?"item-active mb-3 list-menu":"mb-3 list-menu",on:{click:function(i){return i.stopPropagation(),t.goToPage(e.DuongDan)}}},[i("v-list-item-icon",[i("v-tooltip",{attrs:{top:"",color:"#0073C8"},scopedSlots:t._u([{key:"activator",fn:function(s){var a=s.on,n=s.attrs;return[i("v-icon",t._g(t._b({staticClass:"icon-draw",staticStyle:{"font-size":"24px !important"}},"v-icon",n,!1),a),[t._v(t._s(e.iconRender))])]}}],null,!0)},[i("span",[t._v(t._s(e.TenMenu))])])],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"text-drawer text-list"},[t._v(t._s(e.TenMenu))])],1)],1)})),1)],1)},o=[];i("13d5");const r={ManageCadres:"Quản Lý Cán Bộ",MangeRightsGroup:"Quản Lý Nhóm Quyền",ManageMenu:"Quản Lý Menu",ManageStudents:"Quản Lý Sinh Viên",ManageNews:"Quản Lý Tin Tức",ManageCategoryNews:"Quản Lý Chuyên Mục Tin Tức",ManageFeedback:"Quản Lý Trả Lời Góp Ý",ManageMap:"Quản Lý Địa Điểm Bản Đồ",CamNangHoaLac:"Cẩm Nang Hòa Lạc",ManageTypeMap:"Quản Lý Loại Bản Đồ",ManageArea:"Quản Lý Khu Vực Bản Đồ",ManageMotelInfor:"Quản Lý Thông Tin Nhà Trọ",ManageListMotel:"Quản Lý Dánh Sách Nhà Trọ",ManageHandBook:"Quản Lý Cẩm Nang Hòa Lạc",ManageTypeHandBook:"Quản Lý Chuyên Mục Cẩm Nang Hòa Lạc",camNangHoaLac:"Chi Tiết Cẩm Nang Hòa Lạc",ManageNotification:"Xem Danh Sách Thông Báo"},l=[{name:"mdi-account",path:"/quan-li-can-bo"},{name:"mdi-key",path:"/quan-li-nhom-quyen"},{name:"mdi-account-school",path:"/quan-li-sinh-vien"},{name:"mdi-menu-open",path:"/quan-li-menu"},{name:"mdi-newspaper-variant-outline",path:"/quan-li-chuyen-muc-tin-tuc"},{name:"mdi-newspaper-variant-multiple-outline",path:"/quan-li-bai-viet-tin-tuc"},{name:"mdi-comment-multiple",path:"/quan-li-gop-y"},{name:"mdi-map-marker",path:"/quan-li-ban-do"},{name:"mdi-map",path:"/quan-li-loai-ban-do"},{name:"mdi-book-cog-outline",path:"/cam-nang-hoa-lac"},{name:" mdi-book-open-variant",path:"/chuyen-muc-cam-nang-hoa-lac"},{name:"mdi-map-marker-distance",path:"/quan-li-khu-vuc-ban-do"},{name:"mdi-bell",path:"/quan-ly-thong-bao"},{name:"mdi-home-alert",path:"/quan-ly-thong-tin-nha-tro"},{name:"mdi-home",path:"/quan-ly-danh-sach-nha-tro"}];var c={name:"Drawer",props:{expandOnHover:{type:Boolean,default:!1}},data:()=>({publicPath:"",mini:!0,menuName:"",userInfo:"",listMenu:[]}),created(){let t=this,e=t.$router.history.current;console.log("currentQuery",e),t.menuName=e.name;for(const i in r)if(t.MaMenu===i){console.log("property: ",i),t.$store.dispatch("setTitlePage",r[i]);break}t.getMenus(),t.$store.commit("SET_DRAWER",!t.isMobile),t.userInfo=t.$cookies.get("UserInfo",""),console.log("infor: ",t.userInfo,t.MaMenu,r)},mounted(){let t=this;t.mini=!t.isMobile},computed:{drawer:{get(){return this.$store.state.drawer},set(t){this.$store.commit("SET_DRAWER",t)}},formatListMenu(){const t=this;let e=[],i=function(t){function e(t,e){return Number(t.SoThuTu)<Number(e.SoThuTu)?-1:Number(t.SoThuTu)>Number(e.SoThuTu)?1:0}return t.sort(e)};if(t.listMenu=i(t.listMenu),"Quản trị hệ thống"!==t.userInfo.viTriChucDanh){console.log("menu: ",t.listMenu,t.userInfo);const i=t.listMenu.reduce((e,i)=>t.userInfo.menu.includes(i.PrimKey)?[...e,i]:e,[]);i.forEach(t=>{l.forEach(i=>{i.path===t.DuongDan&&e.push({...t,iconRender:i.name})})})}else{let i=[];t.listMenu.forEach(t=>{l.forEach(e=>{e.path===t.DuongDan&&i.push({...t,iconRender:e.name})})}),e=i}return t.$store.commit("SET_MENU_NGUOI_DUNG",e),console.log("dataRender",t.userInfo.viTriChucDanh,e),e}},watch:{$route:function(t,e){let i=this;t.query;i.menuName=t.name;for(const s in r)if(i.menuName===s){i.$store.dispatch("setTitlePage",r[s]);break}},isMobile(t){this.mini=!t,this.$store.commit("SET_DRAWER",!t)}},methods:{getMenus(){const t=this,e={page:0,size:100,keyword:"",orderFields:"",orderTypes:"",tinhTrang:"",thamChieu_maMuc:""},i={collectionName:"menu",data:e};t.$store.dispatch("collectionFilter",i).then((function(e){console.log("respon: ",e),t.listMenu=e.content,console.log("add: ",t.listMenu)})).catch((function(){}))},goToPage(t){let e=this;e.$router.push({path:t})},logout(){let t=this;t.$store.commit("SET_ISSIGNED",!1),localStorage.setItem("user",null),t.$cookies.set("Token",""),t.$cookies.set("RefreshToken",""),t.$cookies.set("admin",""),window.location.href=window.location.origin+window.location.pathname+"#/login"}}},h=c,d=(i("e07b"),i("2877")),p=i("6544"),u=i.n(p),m=i("8336"),g=i("ce7e"),v=i("132d"),f=i("8860"),b=i("da13"),S=i("8270"),y=i("5d23"),_=i("34c3"),w=(i("7958"),i("adda")),x=i("fe6c"),T=i("58df");function C(t,e=[]){return Object(T["a"])(Object(x["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty(){return t}},watch:{app(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated(){this.callUpdate()},created(){for(let t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted(){this.callUpdate()},deactivated(){this.removeApplication()},destroyed(){this.removeApplication()},methods:{callUpdate(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication(t=!1){(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:()=>0}})}var $=i("a9ad"),O=i("b848"),A=i("e4cd"),M=i("e707"),B=i("d10f"),L=i("7560"),E=i("a293"),N=i("dc22"),k=i("c3f0"),I=i("80d2");const R=Object(T["a"])(C("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),$["a"],O["a"],A["a"],M["a"],B["a"],L["a"]);var j=R.extend({name:"v-navigation-drawer",directives:{ClickOutside:E["a"],Resize:N["a"],Touch:k["a"]},provide(){return{isInNav:"nav"===this.tag}},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:()=>({isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}),computed:{applicationProperty(){return this.right?"right":"left"},classes(){return{"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary,...this.themeClasses}},computedMaxHeight(){if(!this.hasApp)return null;const t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop(){if(!this.hasApp)return 0;let t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp(){return this.app&&!this.isMobile&&!this.temporary},isBottom(){return this.bottom&&this.isMobile},isMiniVariant(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile(){return!this.stateless&&!this.permanent&&A["a"].options.computed.isMobile.call(this)},reactsToClick(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles(){const t=this.isBottom?"translateY":"translateX";return{height:Object(I["h"])(this.height),top:this.isBottom?"auto":Object(I["h"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?`calc(100% - ${Object(I["h"])(this.computedMaxHeight)})`:void 0,transform:`${t}(${Object(I["h"])(this.computedTransform,"%")})`,width:Object(I["h"])(this.computedWidth)}}},watch:{$route:"onRouteChange",isActive(t){this.$emit("input",t)},isMobile(t,e){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=e&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent(t){t&&(this.isActive=!0)},showOverlay(t){t?this.genOverlay():this.removeOverlay()},value(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover(t){this.updateMiniVariant(!t)}},beforeMount(){this.init()},methods:{calculateTouchArea(){const t=this.$el.parentNode;if(!t)return;const e=t.getBoundingClientRect();this.touchArea={left:e.left+50,right:e.right-50}},closeConditional(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend(){return this.genPosition("append")},genBackground(){const t={height:"100%",width:"100%",src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(w["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[e])},genDirectives(){const t=[{name:"click-outside",value:{handler:()=>{this.isActive=!1},closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||t.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),t},genListeners(){const t={transitionend:t=>{if(t.target!==t.currentTarget)return;this.$emit("transitionend",t);const e=document.createEvent("UIEvents");e.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(e)}};return this.miniVariant&&(t.click=()=>this.$emit("update:mini-variant",!1)),this.expandOnHover&&(t.mouseenter=()=>this.isMouseover=!0,t.mouseleave=()=>this.isMouseover=!1),t},genPosition(t){const e=Object(I["t"])(this,t);return e?this.$createElement("div",{staticClass:"v-navigation-drawer__"+t},e):e},genPrepend(){return this.genPosition("prepend")},genContent(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;const t=Number(this.computedWidth);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render(t){const e=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(I["t"])(this,"img"))&&e.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),e)}}),H=i("3a2f"),P=Object(d["a"])(h,n,o,!1,null,null,null),D=P.exports;u()(P,{VBtn:m["a"],VDivider:g["a"],VIcon:v["a"],VList:f["a"],VListItem:b["a"],VListItemAvatar:S["a"],VListItemContent:y["a"],VListItemIcon:_["a"],VListItemTitle:y["b"],VNavigationDrawer:j,VTooltip:H["a"]});var z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app-bar",{attrs:{app:""}},[s("v-app-bar-nav-icon",{staticClass:"btn-visible-drawer pl-2",staticStyle:{color:"#2161B1"},on:{click:function(e){return e.stopPropagation(),t.changeDrawer.apply(null,arguments)}}}),s("div",{attrs:{id:"header-app"}},[s("header",{staticClass:"px-3",attrs:{id:"banner"}},[s("div",{staticClass:"container layout wrap"},[s("a",{staticClass:"py-0 px-0",attrs:{href:"javascript:;"}},[s("img",{staticClass:"logo-banner",staticStyle:{"border-radius":"9%"},attrs:{src:i("b640")}})]),s("div",{staticClass:"title-banner"},[s("span",{staticClass:"title-banner-vi"},[t._v(t._s(t.$t("appbar.titlebanner")))])])])])])],1)},V=[],W=i("d3a4"),q={name:"AppBar",components:{},props:{},data:()=>({appName:"production",title:"Hệ thống quản lý hỗ trợ sinh viên",publicPath:"",items:[{icon:"",title:"Báo cáo",class:"baocao-tab",id:"baocao-tab-id",to:"/bao-cao"},{icon:"",title:"Cơ quan, đơn vị",class:"congdan-tab",id:"congdan-tab-id",to:"/co-quan-don-vi"},{icon:"",title:"Cán bộ",class:"canbo-tab",id:"canbo-tab-id",to:"/can-bo"},{icon:"",title:"Danh mục",class:"danhmuc-tab",id:"danhmuc-tab-id",to:"/quan-ly-danh-muc"}],languages:[{flag:"vn",language:"vi",title:"Tiếng Việt"},{flag:"us",language:"en",title:"English"}]}),created(){},mounted(){},computed:{indexTab(){return this.$store.getters.getIndexTab},activeChangeLang(){return this.$store.getters.activeChangeLang}},watch:{},methods:{changeLocale(t){let e=this;W["a"].locale=t,e.$store.commit("SET_ACTIVECHANGELANG",!e.activeChangeLang)},changeDrawer(){let t=this,e=t.$store.state.drawer;t.$store.commit("SET_DRAWER",!e)},redirectTo(t,e){this.$store.commit("SET_INDEXTAB",e),this.$router.push({path:t.to})}}},U=q,F=(i("127f"),i("8b0d"),i("71d9"));function Q(t,e,i){const{self:s=!1}=e.modifiers||{},a=e.value,n="object"===typeof a&&a.options||{passive:!0},o="function"===typeof a||"handleEvent"in a?a:a.handler,r=s?t:e.arg?document.querySelector(e.arg):window;r&&(r.addEventListener("scroll",o,n),t._onScroll=Object(t._onScroll),t._onScroll[i.context._uid]={handler:o,options:n,target:s?void 0:r})}function X(t,e,i){var s;if(null==(s=t._onScroll)||!s[i.context._uid])return;const{handler:a,options:n,target:o=t}=t._onScroll[i.context._uid];o.removeEventListener("scroll",a,n),delete t._onScroll[i.context._uid]}const G={inserted:Q,unbind:X};var Y=G,J=i("d9bd"),K=i("2b0e"),Z=K["a"].extend({name:"scrollable",directives:{Scroll:G},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:()=>({currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}),computed:{canScroll(){return"undefined"!==typeof window},computedScrollThreshold(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp(){this.savedScroll=this.savedScroll||this.currentScroll},isActive(){this.savedScroll=0}},mounted(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(J["c"])("Unable to locate element with identifier "+this.scrollTarget,this))},methods:{onScroll(){this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick(()=>{Math.abs(this.currentScroll-this.savedScroll)>this.computedScrollThreshold&&this.thresholdMet()}))},thresholdMet(){}}}),tt=i("f2e7");const et=Object(T["a"])(F["a"],Z,B["a"],tt["a"],C("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"]));var it=et.extend({name:"v-app-bar",directives:{Scroll:Y},provide(){return{VAppBar:this}},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data(){return{isActive:this.value}},computed:{applicationProperty(){return this.bottom?"bottom":"top"},canScroll(){return Z.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes(){return{...F["a"].options.computed.classes.call(this),"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll}},scrollRatio(){const t=this.computedScrollThreshold;return Math.max((t-this.currentScroll)/t,0)},computedContentHeight(){if(!this.shrinkOnScroll)return F["a"].options.computed.computedContentHeight.call(this);const t=this.dense?48:56,e=this.computedOriginalHeight;return t+(e-t)*this.scrollRatio},computedFontSize(){if(!this.isProminent)return;const t=1.25,e=1.5;return t+(e-t)*this.scrollRatio},computedLeft(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop(){return this.app?this.$vuetify.application.bar:0},computedOpacity(){if(this.fadeImgOnScroll)return this.scrollRatio},computedOriginalHeight(){let t=F["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;const t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed(){return this.collapseOnScroll?this.currentScroll>0:F["a"].options.computed.isCollapsed.call(this)},isProminent(){return F["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles(){return{...F["a"].options.computed.styles.call(this),fontSize:Object(I["h"])(this.computedFontSize,"rem"),marginTop:Object(I["h"])(this.computedMarginTop),transform:`translateY(${Object(I["h"])(this.computedTransform)})`,left:Object(I["h"])(this.computedLeft),right:Object(I["h"])(this.computedRight)}}},watch:{canScroll:"onScroll",computedTransform(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll(t){this.isActive=!t||0!==this.currentScroll},hideOnScroll(t){this.isActive=!t||this.currentScroll<this.computedScrollThreshold}},created(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground(){const t=F["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render(t){const e=F["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}}),st=i("9d26"),at=K["a"].extend({name:"v-app-bar-nav-icon",functional:!0,render(t,{slots:e,listeners:i,props:s,data:a}){const n=Object.assign(a,{staticClass:("v-app-bar__nav-icon "+(a.staticClass||"")).trim(),props:{...s,icon:!0},on:i}),o=e().default;return t(m["a"],n,o||[t(st["a"],"$menu")])}}),nt=Object(d["a"])(U,z,V,!1,null,null,null),ot=nt.exports;u()(nt,{VAppBar:it,VAppBarNavIcon:at});var rt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-footer",{staticClass:"px-3",attrs:{app:"",id:"footer"}},[i("v-layout",{attrs:{wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-layout",{attrs:{wrap:""}},[i("v-flex",{staticClass:"text-1"},[i("v-icon",{attrs:{size:"18",color:"#2161B1"}},[t._v("mdi-copyright")]),t._v("  "),i("span",[t._v("Lê Tự Hữu")])],1),i("v-flex",{staticClass:"text-2"},[i("v-icon",{attrs:{size:"18",color:"#2161B1"}},[t._v("mdi-phone-in-talk-outline")]),t._v("  "),i("span",[t._v("0369140787")])],1),i("v-flex",{staticClass:"text-3"},[i("v-icon",{attrs:{size:"18",color:"#2161B1"}},[t._v("mdi-email-outline")]),t._v("  "),i("span",[t._v("Email: huu01669140787")])],1),i("v-flex",{staticClass:"text-3"},[i("v-icon",{attrs:{size:"18",color:"#2161B1"}},[t._v("mdi-account-check")]),t._v("  "),i("span",[t._v("Mã sinh viên: 19810310662")])],1),i("v-flex",{staticClass:"text-3"},[i("v-icon",{attrs:{size:"18",color:"#2161B1"}},[t._v("mdi-account")]),t._v("  "),i("span",[t._v(" Lớp: D14CNPM1")])],1)],1)],1)],1)],1)},lt=[],ct={name:"Footer",data:()=>({appName:"production",publicPath:""}),created(){},methods:{randomNumber(t,e){return Math.floor(e+Math.random()*(t-e+1))}}},ht=ct,dt=(i("7b2e"),i("0e8f")),pt=(i("b5b6"),i("8dd9")),ut=Object(T["a"])(pt["a"],C("footer",["height","inset"]),B["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty(){return this.inset?"insetFooter":"footer"},classes(){return{...pt["a"].options.computed.classes.call(this),"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset}},computedBottom(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned(){return Boolean(this.absolute||this.fixed||this.app)},styles(){const t=parseInt(this.height);return{...pt["a"].options.computed.styles.call(this),height:isNaN(t)?t:Object(I["h"])(t),left:Object(I["h"])(this.computedLeft),right:Object(I["h"])(this.computedRight),bottom:Object(I["h"])(this.computedBottom)}}},methods:{updateApplication(){const t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render(t){const e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),mt=i("a722"),gt=Object(d["a"])(ht,rt,lt,!1,null,null,null),vt=gt.exports;u()(gt,{VFlex:dt["a"],VFooter:ut,VIcon:v["a"],VLayout:mt["a"]});var ft=i("2f62"),bt={components:{Drawer:D,AppBar:ot,Footer:vt},data:()=>({}),created(){},methods:{},computed:{...Object(ft["b"])(["titlePage"]),menusNguoiDung(){return this.$store.getters.GET_MENU_NGUOI_DUNG}},watch:{menusNguoiDung(t){let e=this.$router.history.current;t&&(t&&t.length&&"/"===e.path?this.$router.push({path:t[0]["DuongDan"]}):(this.$router.push({path:e.path}),this.$store.dispatch("setTitlePage",r[e.name])))}}},St=bt,yt=(i("b5fa"),i("7496")),_t=(i("bd0c"),B["a"].extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles(){const{bar:t,top:e,right:i,footer:s,insetFooter:a,bottom:n,left:o}=this.$vuetify.application;return{paddingTop:e+t+"px",paddingRight:i+"px",paddingBottom:s+a+n+"px",paddingLeft:o+"px"}}},render(t){const e={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,e,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})),wt=Object(d["a"])(St,s,a,!1,null,null,null);e["default"]=wt.exports;u()(wt,{VApp:yt["a"],VMain:_t})},bd0c:function(t,e,i){},e07b:function(t,e,i){"use strict";i("6887")},f3b6:function(t,e,i){}}]);