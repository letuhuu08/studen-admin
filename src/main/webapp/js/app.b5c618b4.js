(function(a) {
    function n(n) {
        for (var t, o, c = n[0], u = n[1], r = n[2], l = 0, s = []; l < c.length; l++) o = c[l], Object.prototype.hasOwnProperty.call(i, o) && i[o] && s.push(i[o][0]), i[o] = 0;
        for (t in u) Object.prototype.hasOwnProperty.call(u, t) && (a[t] = u[t]);
        d && d(n);
        while (s.length) s.shift()();
        return h.push.apply(h, r || []), e()
    }

    function e() {
        for (var a, n = 0; n < h.length; n++) {
            for (var e = h[n], t = !0, o = 1; o < e.length; o++) {
                var c = e[o];
                0 !== i[c] && (t = !1)
            }
            t && (h.splice(n--, 1), a = u(u.s = e[0]))
        }
        return a
    }
    var t = {},
        o = { app: 0 },
        i = { app: 0 },
        h = [];

    function c(a) { return u.p + "js/" + ({}[a] || a) + "." + { "chunk-080382e2": "ac19d885", "chunk-7f6aa468": "9bdf7d61", "chunk-d28a782a": "85f19929", "chunk-1a4330d0": "772ad54a", "chunk-3f66e374": "0699250a", "chunk-16286bbc": "47c71b61", "chunk-26744b66": "d99f670c", "chunk-27ccd439": "a43fee08", "chunk-051dee3a": "823f4a42", "chunk-102b6ae9": "db7e71a5", "chunk-2d1c6da0": "7d801172", "chunk-3fb44730": "70c40b75", "chunk-49285a3e": "f5307ca8", "chunk-619b8cdc": "0f4af016", "chunk-75120fa0": "791a6c3d", "chunk-79e3f90b": "5ac73dfa", "chunk-7d48cd2a": "b9ebd431", "chunk-ee2a7f38": "9304cf75", "chunk-2d0c8a73": "e9c70317", "chunk-32b4e424": "3a4ac2e9", "chunk-47d93a6f": "cad39975", "chunk-594d6d48": "6660f05d", "chunk-0506f7a2": "94418a08", "chunk-46ec2d4a": "db679b39", "chunk-602cef70": "f72f6055", "chunk-6c1a781b": "71fcf528", "chunk-70b3fe68": "5231ee73", "chunk-871cfdda": "f6a5d9b5", "chunk-fb2f5c4e": "b8e0024c", "chunk-e2cc431c": "0502ef73", "chunk-5a98c7ea": "c28804f7", "chunk-4c0fb1fe": "9cc10a3d" }[a] + ".js" }

    function u(n) { if (t[n]) return t[n].exports; var e = t[n] = { i: n, l: !1, exports: {} }; return a[n].call(e.exports, e, e.exports, u), e.l = !0, e.exports }
    u.e = function(a) {
        var n = [],
            e = { "chunk-080382e2": 1, "chunk-7f6aa468": 1, "chunk-d28a782a": 1, "chunk-1a4330d0": 1, "chunk-3f66e374": 1, "chunk-16286bbc": 1, "chunk-26744b66": 1, "chunk-27ccd439": 1, "chunk-051dee3a": 1, "chunk-102b6ae9": 1, "chunk-2d1c6da0": 1, "chunk-3fb44730": 1, "chunk-49285a3e": 1, "chunk-619b8cdc": 1, "chunk-75120fa0": 1, "chunk-79e3f90b": 1, "chunk-7d48cd2a": 1, "chunk-ee2a7f38": 1, "chunk-32b4e424": 1, "chunk-47d93a6f": 1, "chunk-0506f7a2": 1, "chunk-46ec2d4a": 1, "chunk-602cef70": 1, "chunk-6c1a781b": 1, "chunk-70b3fe68": 1, "chunk-871cfdda": 1, "chunk-fb2f5c4e": 1, "chunk-e2cc431c": 1, "chunk-5a98c7ea": 1, "chunk-4c0fb1fe": 1 };
        o[a] ? n.push(o[a]) : 0 !== o[a] && e[a] && n.push(o[a] = new Promise((function(n, e) {
            for (var t = "css/" + ({}[a] || a) + "." + { "chunk-080382e2": "e537aa6e", "chunk-7f6aa468": "db102021", "chunk-d28a782a": "8c1130ab", "chunk-1a4330d0": "fec30d9f", "chunk-3f66e374": "a40e8fa6", "chunk-16286bbc": "717b8312", "chunk-26744b66": "3b5d52e4", "chunk-27ccd439": "3b5d52e4", "chunk-051dee3a": "c42dcec3", "chunk-102b6ae9": "00950134", "chunk-2d1c6da0": "6d76cd91", "chunk-3fb44730": "703b6b5b", "chunk-49285a3e": "205aa32e", "chunk-619b8cdc": "f3d431fe", "chunk-75120fa0": "9b2651a0", "chunk-79e3f90b": "c0d5710e", "chunk-7d48cd2a": "f1b7e789", "chunk-ee2a7f38": "26739319", "chunk-2d0c8a73": "31d6cfe0", "chunk-32b4e424": "3eb7ffdc", "chunk-47d93a6f": "fe90f387", "chunk-594d6d48": "31d6cfe0", "chunk-0506f7a2": "717c10a6", "chunk-46ec2d4a": "3eb7ffdc", "chunk-602cef70": "717b8312", "chunk-6c1a781b": "3b5d52e4", "chunk-70b3fe68": "3b5d52e4", "chunk-871cfdda": "7013ce4c", "chunk-fb2f5c4e": "3b5d52e4", "chunk-e2cc431c": "79c4c9d3", "chunk-5a98c7ea": "3b5d52e4", "chunk-4c0fb1fe": "9b29b4f5" }[a] + ".css", i = u.p + t, h = document.getElementsByTagName("link"), c = 0; c < h.length; c++) {
                var r = h[c],
                    l = r.getAttribute("data-href") || r.getAttribute("href");
                if ("stylesheet" === r.rel && (l === t || l === i)) return n()
            }
            var s = document.getElementsByTagName("style");
            for (c = 0; c < s.length; c++) { r = s[c], l = r.getAttribute("data-href"); if (l === t || l === i) return n() }
            var d = document.createElement("link");
            d.rel = "stylesheet", d.type = "text/css", d.onload = n, d.onerror = function(n) {
                var t = n && n.target && n.target.src || i,
                    h = new Error("Loading CSS chunk " + a + " failed.\n(" + t + ")");
                h.code = "CSS_CHUNK_LOAD_FAILED", h.request = t, delete o[a], d.parentNode.removeChild(d), e(h)
            }, d.href = i;
            var p = document.getElementsByTagName("head")[0];
            p.appendChild(d)
        })).then((function() { o[a] = 0 })));
        var t = i[a];
        if (0 !== t)
            if (t) n.push(t[2]);
            else {
                var h = new Promise((function(n, e) { t = i[a] = [n, e] }));
                n.push(t[2] = h);
                var r, l = document.createElement("script");
                l.charset = "utf-8", l.timeout = 120, u.nc && l.setAttribute("nonce", u.nc), l.src = c(a);
                var s = new Error;
                r = function(n) {
                    l.onerror = l.onload = null, clearTimeout(d);
                    var e = i[a];
                    if (0 !== e) {
                        if (e) {
                            var t = n && ("load" === n.type ? "missing" : n.type),
                                o = n && n.target && n.target.src;
                            s.message = "Loading chunk " + a + " failed.\n(" + t + ": " + o + ")", s.name = "ChunkLoadError", s.type = t, s.request = o, e[1](s)
                        }
                        i[a] = void 0
                    }
                };
                var d = setTimeout((function() { r({ type: "timeout", target: l }) }), 12e4);
                l.onerror = l.onload = r, document.head.appendChild(l)
            }
        return Promise.all(n)
    }, u.m = a, u.c = t, u.d = function(a, n, e) { u.o(a, n) || Object.defineProperty(a, n, { enumerable: !0, get: e }) }, u.r = function(a) { "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 }) }, u.t = function(a, n) {
        if (1 & n && (a = u(a)), 8 & n) return a;
        if (4 & n && "object" === typeof a && a && a.__esModule) return a;
        var e = Object.create(null);
        if (u.r(e), Object.defineProperty(e, "default", { enumerable: !0, value: a }), 2 & n && "string" != typeof a)
            for (var t in a) u.d(e, t, function(n) { return a[n] }.bind(null, t));
        return e
    }, u.n = function(a) { var n = a && a.__esModule ? function() { return a["default"] } : function() { return a }; return u.d(n, "a", n), n }, u.o = function(a, n) { return Object.prototype.hasOwnProperty.call(a, n) }, u.p = "/", u.oe = function(a) { throw console.error(a), a };
    var r = window["webpackJsonp"] = window["webpackJsonp"] || [],
        l = r.push.bind(r);
    r.push = n, r = r.slice();
    for (var s = 0; s < r.length; s++) n(r[s]);
    var d = l;
    h.push([0, "chunk-vendors"]), e()
})({
    0: function(a, n, e) { a.exports = e("56d7") },
    "1f55": function(a, n, e) {},
    "3be3": function(a, n, e) {
        "use strict";
        e.d(n, "a", (function() { return t }));
        const t = "/v1/datasharing/"
    },
    "56d7": function(a, n, e) {
        "use strict";
        e.r(n);
        var t = e("2b0e"),
            o = function() {
                var a = this,
                    n = a.$createElement,
                    e = a._self._c || n;
                return e("v-app", { directives: [{ name: "resize", rawName: "v-resize", value: a.onResize, expression: "onResize" }] }, [e("confirm-dialog"), e("router-view")], 1)
            },
            i = [],
            h = function() {
                var a = this,
                    n = a.$createElement,
                    e = a._self._c || n;
                return e("transition", { attrs: { name: "fade" } }, [a.isShow ? e("div", { staticClass: "vc-overlay", attrs: { id: "vueConfirm" }, on: { click: a.handleClickOverlay } }, [e("transition", { attrs: { name: "zoom" } }, [a.isShow ? e("div", { ref: "vueConfirmDialog", staticClass: "vc-container" }, [e("span", { staticClass: "vc-text-grid" }, [a.dialog.title ? e("h4", { staticClass: "vc-title", domProps: { innerHTML: a._s(a.dialog.title) } }) : a._e(), a.dialog.message ? e("p", { staticClass: "vc-text", domProps: { innerHTML: a._s(a.dialog.message) } }) : a._e(), a.dialog.auth ? e("span", [e("input", { directives: [{ name: "focus", rawName: "v-focus" }, { name: "model", rawName: "v-model", value: a.password, expression: "password" }], staticClass: "vc-input", attrs: { type: "password", name: "vc-password", placeholder: "Password", autocomplete: "off" }, domProps: { value: a.password }, on: { keyup: function(n) { return n.type.indexOf("key") || 13 === n.keyCode ? function(n) { return a.handleClickButton(n, !0) }.apply(null, arguments) : null }, input: function(n) { n.target.composing || (a.password = n.target.value) } } })]) : a._e()]), e("div", { staticClass: "vc-btn-grid", class: { isMono: !a.dialog.button.no || !a.dialog.button.yes } }, [a.dialog.button.no ? e("button", {
                    staticClass: "vc-btn left",
                    attrs: { type: "button" },
                    on: {
                        click: function(n) {
                            return n.stopPropagation(),
                                function(n) { return a.handleClickButton(n, !1) }.apply(null, arguments)
                        }
                    }
                }, [a._v(" " + a._s(a.dialog.button.no) + " ")]) : a._e(), a.dialog.button.yes ? e("button", {
                    staticClass: "vc-btn",
                    attrs: { disabled: !!a.dialog.auth && !a.password, type: "button" },
                    on: {
                        click: function(n) {
                            return n.stopPropagation(),
                                function(n) { return a.handleClickButton(n, !0) }.apply(null, arguments)
                        }
                    }
                }, [a._v(" " + a._s(a.dialog.button.yes) + " ")]) : a._e()])]) : a._e()])], 1) : a._e()])
            },
            c = [];
        const u = { name: "VueConfirmDialog", data() { return { password: null } }, props: { params: { type: Object, default () { return {} } } }, methods: { handleClickButton({ target: a }, n) { n ? this.dialog.callback() : this.$store.commit("SET_CONFIG_CONFIRM_DIALOG", { auth: !1, title: "", message: "", button: {}, callback: () => {} }), this.$store.commit("SET_SHOWCONFIRM", !1) }, handleClickOverlay({ target: a }) {} }, computed: { isShow() { return this.$store.getters.getIsShowConfirm }, dialog() { return this.$store.getters.getDialogConfirm } }, mounted() {}, beforeDestroy() {} };
        var r = u,
            l = r,
            s = (e("880d"), e("2877")),
            d = Object(s["a"])(l, h, c, !1, null, null, null),
            p = d.exports,
            m = {
                name: "App",
                components: { "confirm-dialog": p },
                data: () => ({}),
                created() {},
                computed: {},
                methods: {
                    onResize: function() {
                        let a = this.$vuetify.breakpoint.name;
                        this.$store.commit("SET_BREAKPOINTNAME", a)
                    }
                }
            },
            T = m,
            g = e("6544"),
            f = e.n(g),
            C = e("7496"),
            y = e("269a"),
            k = e.n(y),
            b = e("dc22"),
            B = Object(s["a"])(T, o, i, !1, null, null, null),
            v = B.exports;
        f()(B, { VApp: C["a"] }), k()(B, { Resize: b["a"] });
        var S = e("f309");
        e("1f55");
        t["a"].use(S["a"]);
        var N = new S["a"]({ theme: { themes: { light: { primary: "#2161B1" } } } }),
            D = e("8c4f");
        t["a"].use(D["a"]);
        var P = new D["a"]({ mode: "hash", base: "/", routes: [{ path: "/", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-4c0fb1fe")]).then(e.bind(null, "bb51")), children: [{ path: "/quan-ly-tin-tuc", name: "QuanLyTinTuc", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-594d6d48"), e.e("chunk-0506f7a2")]).then(e.bind(null, "312e")), props: !0 }, { path: "/quan-ly-loai-ban-do", name: "QuanLyLoaiBanDo", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-16286bbc")]).then(e.bind(null, "6be0")), props: !0 }, { path: "/quan-ly-dia-diem-ban-do-so", name: "QuanLyDiaDiemBDS", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-602cef70")]).then(e.bind(null, "1103")), props: !0 }, { path: "/quan-ly-chuyen-muc", name: "QuanLyChuyenMuc", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-6c1a781b")]).then(e.bind(null, "e3ca")), props: !0 }, { path: "/quan-li-can-bo", name: "ManageCadres", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-7d48cd2a")]).then(e.bind(null, "908f")), props: !0 }, { path: "/quan-li-nhom-quyen", name: "MangeRightsGroup", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-32b4e424")]).then(e.bind(null, "b4a1")), props: !0 }, { path: "/quan-li-sinh-vien", name: "ManageStudents", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-49285a3e")]).then(e.bind(null, "469b")), props: !0 }, { path: "/quan-li-menu", name: "ManageMenu", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-871cfdda")]).then(e.bind(null, "f0b4")), props: !0 }, { path: "/quan-li-chuyen-muc-tin-tuc", name: "ManageCategoryNews", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-75120fa0")]).then(e.bind(null, "7223")), props: !0 }, { path: "/quan-li-bai-viet-tin-tuc", name: "ManageNews", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-79e3f90b")]).then(e.bind(null, "e58a")), props: !0 }, { path: "/quan-li-gop-y", name: "ManageFeedback", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-ee2a7f38")]).then(e.bind(null, "4ff5")), props: !0 }, { path: "/dang-ky-noi-tru", name: "DangKyNoiTru", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-5a98c7ea")]).then(e.bind(null, "5cb0")), props: !0 }, { path: "/mau-thong-bao", name: "MauThongBao", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-2d1c6da0")]).then(e.bind(null, "d1ac")), props: !0 }, { path: "/thong-bao", name: "ThongBao", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-47d93a6f")]).then(e.bind(null, "f894")), props: !0 }, { path: "/cam-nang-hoa-lac", name: "ManageHandBook", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-3fb44730")]).then(e.bind(null, "6bbf")), props: !0 }, { path: "/chuyen-muc-cam-nang-hoa-lac", name: "ManageTypeHandBook", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-619b8cdc")]).then(e.bind(null, "2ea0")), props: !0 }, { name: "camNangHoaLac", path: "/chi-tiet-cam-nang-hoa-lac/:id", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-594d6d48"), e.e("chunk-e2cc431c")]).then(e.bind(null, "ca09")) }, { path: "/quan-li-ban-do", name: "ManageMap", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-051dee3a")]).then(e.bind(null, "a398")), props: !0 }, { path: "/quan-li-loai-ban-do", name: "ManageTypeMap", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-fb2f5c4e")]).then(e.bind(null, "d71a")), props: !0 }, { path: "/quan-li-khu-vuc-ban-do", name: "ManageArea", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-26744b66")]).then(e.bind(null, "fa32")), props: !0 }, { path: "/quan-ly-thong-tin-nha-tro", name: "ManageMotelInfor", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-70b3fe68")]).then(e.bind(null, "ce42")), props: !0 }, { path: "/quan-ly-danh-sach-nha-tro", name: "ManageListMotel", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-27ccd439"), e.e("chunk-102b6ae9")]).then(e.bind(null, "265f")), props: !0 }, { path: "/quan-ly-thong-bao", name: "ManageNotification", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-2d0c8a73")]).then(e.bind(null, "5695")), props: !0 }, { path: "/quan-ly-thu-tuc", name: "ManageProcedure", component: () => Promise.all([e.e("chunk-d28a782a"), e.e("chunk-1a4330d0"), e.e("chunk-3f66e374"), e.e("chunk-594d6d48"), e.e("chunk-46ec2d4a")]).then(e.bind(null, "e0c3")), props: !0 }] }, { name: "Login", path: "/login", component: () => e.e("chunk-7f6aa468").then(e.bind(null, "a55b")) }, { name: "ShowNews", path: "/tin-tuc/:id", component: () => e.e("chunk-080382e2").then(e.bind(null, "7c1e")) }] }),
            L = e("2f62"),
            M = e("bc3a"),
            _ = e.n(M),
            w = e("1157"),
            x = e.n(w),
            A = e("d3a4"),
            E = e("3be3");
        t["a"].use(L["a"]);
        var H = new L["a"].Store({
                state: { indexTab: 0, apiSso: "http://119.17.200.66:8373", secretLogin: "f5gDd1JLB0vq6VVBvzEbltq6iVuaddvk", drawer: !1, breakpointName: "lg", isShowConfirm: !1, dialogConfirm: { auth: !1, title: "", message: "", button: {}, callback: () => {} }, formData: "", formThongKe: "", activeChangeLang: !1, fileUploadYet: !1, listGender: [], listProvince: [], listAgencies: [], listPosition: [], listWork: [], titlePage: "", elements: [], pagePdf: 1, thongTinCamNang: "", menusNguoiDung: "" },
                getters: { getIndexTab: a => a.indexTab, getIsSigned: a => a.isSigned, getIsSigned: a => a.isSigned, getBreakpointName: a => a.breakpointName, getIsShowConfirm: a => a.isShowConfirm, getDialogConfirm: a => a.dialogConfirm, getFormData: a => a.formData, getFormThongKe: a => a.formThongKe, activeChangeLang: a => a.activeChangeLang, fileUploadYet: a => a.fileUploadYet, GET_PAGE_PDF: a => a.pagePdf, GET_THONGTINCAMNANG: a => a.thongTinCamNang, GET_MENU_NGUOI_DUNG: a => a.menusNguoiDung },
                mutations: { SET_LIST_STATE_IN_STORE: (a, { payload: n, nameState: e }) => a[e] = [...n.content], SET_TITLE_PAGE_IN_STORE: (a, n) => a.titlePage = n, SET_INDEXTAB(a, n) { a.indexTab = n }, SET_ISSIGNED(a, n) { a.isSigned = n }, SET_DRAWER(a, n) { a.drawer = n }, SET_BREAKPOINTNAME(a, n) { a.breakpointName = n }, SET_SHOWCONFIRM(a, n) { a.isShowConfirm = n }, SET_CONFIG_CONFIRM_DIALOG(a, n) { a.dialogConfirm = n }, SET_FORM_DATA(a, n) { a.formData = n }, SET_FORM_THONGKE(a, n) { a.formThongKe = n }, SET_ACTIVECHANGELANG(a, n) { "en" == A["a"].locale ? a.activeChangeLang = !0 : a.activeChangeLang = !1 }, SET_FILEUPLOADYET(a, n) { a.fileUploadYet = n }, updateElements: (a, n) => { a.elements = n }, SET_PAGE_PDF: (a, n) => { a.pagePdf = n }, SET_THONGTINCAMNANG: (a, n) => { a.thongTinCamNang = n }, SET_MENU_NGUOI_DUNG: (a, n) => { a.menusNguoiDung = n } },
                actions: {
                    updateElements: ({ commit: a }, n) => { a("updateElements", n) },
                    createItemData({ commit: a, state: n }, { payload: e, type: t }) {
                        return new Promise((a, n) => {
                            let o = { method: "post", url: E["a"] + t, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: e, params: {} };
                            _()(o).then((function(n) { a(n) })).catch((function(a) { n(a.response) }))
                        })
                    },
                    deleteItemData({ commit: a, state: n }, { payload: e, type: t }) {
                        return new Promise((a, n) => {
                            let o = { method: "delete", url: E["a"] + t + "/" + e, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: {}, params: {} };
                            _()(o).then((function(n) { a(n) })).catch((function(a) { n(a) }))
                        })
                    },
                    editItemData({ commit: a, state: n }, { payload: e, type: t, id: o }) {
                        return new Promise((a, n) => {
                            let i = { method: "post", url: E["a"] + t + "/" + o, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: e, params: {} };
                            _()(i).then((function(n) { a(n) })).catch((function(a) { n(a) }))
                        })
                    },
                    collectionFilterInstore({ commit: a, state: n }, e) {
                        return new Promise((n, t) => {
                            let o = { method: "get", url: E["a"] + e.collectionName + "/filter", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: {}, params: e.data };
                            _()(o).then((function(t) {
                                let o = t.data;
                                const i = { payload: o, nameState: e.state };
                                a("SET_LIST_STATE_IN_STORE", i), n(o)
                            })).catch((function(a) { t(a) }))
                        })
                    },
                    uploadFile({ commit: a, state: n }, { payload: e, type: t }) {
                        return new Promise((a, n) => {
                            let o = { method: "post", url: E["a"] + t, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: e, params: {} };
                            _()(o).then((function(n) { a(n) })).catch((function(a) { n(a) }))
                        })
                    },
                    exportFile({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let o = { method: "get", url: "/v1/datasharing/" + e.collectionName, headers: { "Content-Type": "application/json", Authorization: "Bearer " + t["a"].$cookies.get("Token") }, responseType: "blob", data: {}, params: e.data };
                            _()(o).then((function(n) {
                                let t = n.data;
                                const o = window.URL.createObjectURL(t),
                                    i = document.createElement("a");
                                document.body.appendChild(i), i.style = "display: none", i.href = o, i.download = `${e.nameFile}.${e.typeFile}`, i.click(), window.URL.revokeObjectURL(o), a(t)
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    exportTongHopBaoCao({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let o = { method: "get", url: e.url, headers: { "Content-Type": "application/json", Authorization: "Bearer " + t["a"].$cookies.get("Token") }, responseType: "blob", data: {} };
                            _()(o).then((function(n) {
                                if (n.data) {
                                    var t = window.URL.createObjectURL(n.data),
                                        o = document.createElement("a");
                                    document.body.appendChild(o), o.style = "display: none", o.href = t, o.download = "tonghopbaocao-" + e.maBaoCao + ".xlsx", o.click(), window.URL.revokeObjectURL(t), a("success")
                                } else a("pending")
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    collectionFilter({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = { method: "get", url: "/v1/datasharing/" + e.collectionName + "/filter", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: {}, params: e.data };
                            _()(t).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    getDetailsItemData({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = { method: "get", url: "/v1/datasharing/" + e.collectionName, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: {}, params: e.data };
                            _()(t).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    getDetailsItemDataPublic({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = { method: "get", url: "/base/auth/vnu/tintuc/" + e.id, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: {}, params: e.data };
                            _()(t).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    setTitlePage({ commit: a, state: n }, e) { a("SET_TITLE_PAGE_IN_STORE", e) },
                    getThongKe({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/thanhphanbaocao/thongke", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    login({ commit: a, state: n }, e) {
                        return new Promise((a, t) => {
                            let o = { url: n.apiSso + "/flex/oauth2/token", method: "POST", headers: { Authorization: "Basic ZmxleDpzc28=", secret: n.secretLogin, Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }, data: e.data };
                            x.a.ajax(o).done((function(n) {
                                let e = n;
                                a(e)
                            })).fail((function(a) { t(a) }))
                        })
                    },
                    loginKeyCloak({ commit: a, state: n }, e) {
                        return new Promise((a, t) => {
                            let o = { url: n.apiSso + "/flex/oauth2/authorization_endpoint?redirect_uri=" + e.uri, method: "GET", headers: { Secret: n.secretLogin, "Content-Type": "application/json" } };
                            x.a.ajax(o).done((function(n) { a(n) })).fail((function(a) { t(a) }))
                        })
                    },
                    logoutKeyCloak({ commit: a, state: n }, e) {
                        return new Promise((a, e) => {
                            let t = { url: n.apiSso + "/flex/oauth2/logout_endpoint", method: "GET", headers: { "Content-Type": "application/json" } };
                            x.a.ajax(t).done((function(n) { a(n) })).fail((function(a) { e(a) }))
                        })
                    },
                    getTokenKeyCloak({ commit: a, state: n }, e) {
                        return new Promise((a, t) => {
                            let o = { url: n.apiSso + "/flex/oauth2/token", method: "POST", headers: { Authorization: "Basic ZmxleDpzc28=", secret: n.secretLogin, Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }, data: { code: e.code, redirect_uri: e.redirect_uri } };
                            x.a.ajax(o).done((function(n) {
                                let e = n;
                                a(e)
                            })).fail((function(a) { t(a) }))
                        })
                    },
                    getRefreshTokenKeyCloak({ commit: a, state: n }, e) {
                        return new Promise((a, t) => {
                            let o = { url: n.apiSso + "/flex/oauth2/refreshtoken", method: "POST", headers: { Authorization: "Basic ZmxleDpzc28=", secret: n.secretLogin, Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }, data: { refresh_token: e.code, redirect_uri: e.redirect_uri } };
                            x.a.ajax(o).done((function(n) {
                                let e = n;
                                a(e)
                            })).fail((function(a) { t(a) }))
                        })
                    },
                    getThongTinUserDangNhap({ commit: a, state: n }, e) {
                        return new Promise((a, t) => {
                            let o = { method: "get", url: n.apiSso + "/v1/datasharing/canbo/token", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: e.token }, data: {}, params: {} };
                            x.a.ajax(o).done((function(n) {
                                let e = n;
                                a(e)
                            })).fail((function(a) { t(a) }))
                        })
                    },
                    getEmployee({ commit: a, state: n }, e) {
                        return new Promise((a, t) => {
                            let o = { method: "get", url: n.apiSso + "/o/rest/v2/employees/" + e.email + "/profile", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: e.token }, data: {}, params: {} };
                            x.a.ajax(o).done((function(n) {
                                let e = n;
                                a(e)
                            })).fail((function(a) { t(a) }))
                        })
                    },
                    createAccountCanBo({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/" + e.data.type, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    changePass({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/resetpwd", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    changeAcc({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/" + e.type + "/" + e.maDinhDanh + "/tendinhdanh", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    activeCaNhan({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/" + e.data.type + "/active", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    blockCaNhan({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/" + e.data.type + "/lock", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    unBlockCaNhan({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/" + e.data.type + "/unlock", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    restoreCaNhan({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "post", url: "/v1/datasharing/idp/account/" + e.data.type + "/restore", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    deleteCaNhan({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = JSON.stringify(e.data),
                                o = { method: "delete", url: "/v1/datasharing/idp/account/" + e.data.type + "/delete", headers: { Accept: "application/json", "Content-Type": "application/json" }, data: t };
                            _()(o).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a.response) }))
                        })
                    },
                    loadDataSource({ commit: a, state: n }, e) {
                        return new Promise((a, o) => {
                            let i = e.api;
                            e.api.indexOf("http") < 0 && (i = n.apiSso + e.api);
                            let h = { url: i, method: "GET", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + t["a"].$cookies.get("Token") }, data: {} };
                            x.a.ajax(h).done((function(n) {
                                let e = n;
                                a(e)
                            })).fail((function(a) { o(a) }))
                        })
                    },
                    downloadFile({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let o = { headers: { Authorization: "Bearer " + t["a"].$cookies.get("Token") }, responseType: "blob" };
                            _.a.get("/v1/datasharing/thanhphanbaocao/downloadFile/" + e.id, o).then((function(n) {
                                if (n.data) {
                                    var t = document.createElement("a");
                                    document.body.appendChild(t), t.style = "display: none";
                                    var o = window.URL.createObjectURL(n.data);
                                    t.href = o, t.download = e.name, t.click(), a("success")
                                } else a("pending")
                            })).catch((function(a) { console.log(a) }))
                        })
                    },
                    deleteFile({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let t = { method: "delete", url: "/v1/datasharing/thanhphanbaocao/" + e.idThanhPhan + "/attachment/" + e.idFile, headers: { Accept: "application/json", "Content-Type": "application/json" }, data: {} };
                            _()(t).then((function(n) {
                                let e = n.data;
                                a(e)
                            })).catch((function(a) { n(a) }))
                        })
                    },
                    exportTongHopBaoCao({ commit: a, state: n }, e) {
                        return new Promise((a, n) => {
                            let o = JSON.stringify(e.data),
                                i = { method: "post", url: e.url, headers: { "Content-Type": "application/json", Authorization: "Bearer " + t["a"].$cookies.get("Token") }, responseType: "blob", data: o };
                            _()(i).then((function(n) {
                                if (n.data) {
                                    var t = window.URL.createObjectURL(n.data),
                                        o = document.createElement("a");
                                    document.body.appendChild(o), o.style = "display: none", o.href = t, o.download = "tonghopbaocao-" + e.maBaoCao + ".xlsx", o.click(), window.URL.revokeObjectURL(t), a("success")
                                } else a("pending")
                            })).catch((function(a) { n(a) }))
                        })
                    }
                }
            }),
            I = e("2b27"),
            O = e.n(I),
            V = e("854a"),
            j = e.n(V),
            G = (e("d304"), e("ad24")),
            R = e("f962"),
            q = e("755e");
        j.a.options = { closeButton: !0, timeOut: "5000", positionClass: "toast-top-center", showMethod: "fadeIn" }, t["a"].use(G["a"]), t["a"].use(O.a), t["a"].config.productionTip = !1;
        const K = "http://119.17.200.66:8373";
        "undefined" !== typeof K && (_.a.defaults.baseURL = K), _.a.interceptors.response.use(a => a, a => {
            if (401 == a.response.status)
                if (H.commit("SET_ISSIGNED", ""), t["a"].$cookies.set("Token", ""), t["a"].$cookies.get("RefreshToken")) {
                    let a = { code: t["a"].$cookies.get("RefreshToken"), redirect_uri: "http://119.17.200.69:8032/index.html" };
                    H.dispatch("getRefreshTokenKeyCloak", a).then(a => { t["a"].$cookies.set("Token", a.access_token, a.expires_in), t["a"].$cookies.set("RefreshToken", a.refresh_token, a.refresh_expires_in), _.a.defaults.headers["Authorization"] = "Bearer " + a.access_token, j.a.remove(), j.a.error("Thao tác thất bại. Vui lòng thử lại.") }).catch((function() { P.push({ path: "/login" }) }))
                } else P.push({ path: "/login" });
            return a.response && 200 === a.response.status ? parseError(a.response.data) : Promise.reject(a)
        }), t["a"].$cookies.get("Token") ? (H.commit("SET_ISSIGNED", !0), _.a.defaults.headers["Authorization"] = "Bearer " + t["a"].$cookies.get("Token")) : (H.commit("SET_ISSIGNED", !1), localStorage.setItem("user", null)), t["a"].mixin({
            data: () => ({ dataLocal: R }),
            methods: {
                checkRole(a) {
                    let n = this,
                        e = n.$cookies.get("Roles", "");
                    if (!a || !e) return !1;
                    let t = e.split(","),
                        o = t.find((function(n) { return n == a }));
                    return !!o
                }
            },
            computed: { groupId() { return this.$cookies.get("groupId", "") }, userId() { return this.$cookies.get("userId", "") }, isSigned() { return this.$store.getters.getIsSigned }, isAdmin() { return this.$cookies.get("admin", "") }, userLogin() { let a = ""; try { a = JSON.parse(localStorage.getItem("user")) } catch (n) {} return a }, isMobile() { let a = this.$store.getters.getBreakpointName; return "xs" === a || "sm" === a } }
        }), t["a"].use(q, { load: { key: "AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s", libraries: "places" } }), new t["a"]({ vuetify: N, router: P, store: H, i18n: A["a"], render: a => a(v) }).$mount("#app")
    },
    "880d": function(a, n, e) {
        "use strict";
        e("eb19")
    },
    d3a4: function(a, n, e) {
        "use strict";
        var t = e("2b0e"),
            o = e("a925");
        t["a"].use(o["a"]);
        const i = { vi: { thongTinBatBuoc: "Thông tin bắt buộc", themMoi: "Thêm mới", timKiem: "Tìm kiếm", thoat: "Thoát", basic: { thongTinBatBuoc: "Thông tin bắt buộc", themMoi: "Thêm mới", timKiem: "Tìm kiếm", thoat: "Thoát", quayLai: "Quay lại", hotline: "Điện thoại: (024) 3.754.7422 ", xoa: "Xóa", sua: "Sửa", huy: "Hủy", xacnhan: "Xác nhận", stt: "STT", yes: "Có", no: "Không" }, login: { welcomeMsg1: "HỆ THỐNG QUẢN LÝ HỖ TRỢ SINH VIÊN", welcomeMsg2: "ĐẠI HỌC QUỐC GIA HÀ NỘI", loginMsg: "ĐĂNG NHẬP", trungTamCongNgheMsg: "Trung tâm hỗ trợ sinh viên ", headOffice: "Địa chỉ: 144 đường Xuân Thuỷ, Cầu Giấy, Hà Nội", tenDangNhap: "Tên Đăng Nhập", batBuocTenDangNhap: "Tên đăng nhập là bắt buộc", matKhau: "Mật Khẩu", batBuocMatKhau: "Mật khẩu là bắt buộc", saiTenDangNhapVaMatKhau: "Tên đăng nhập hoặc mật khẩu không chính xác" }, drawer: { taoBaoCao: "Tạo Báo Cáo", baoCaoChoXuLy: "Báo Cáo Chờ Xử Lý", baoCaoXuLyLai: "Báo Cáo Xử Lý Lại", baoCaoChoDuyet: "Báo Cáo Chờ Duyệt", baoCaoChoPheDuyet: "Báo Cáo Chờ Phê Duyệt", tongHopBaoCao: "Tổng Hợp Báo Cáo", traCuu: "Tra Cứu Báo Cáo", coQuanDonVi: "Cơ Quan, Đơn Vị", canBo: "Cán Bộ", chucVuCanBo: "Chức Vụ Cán Bộ", quanLyDanhMuc: "Quản Lý Danh Mục", dangXuat: "Đăng Xuất" }, appbar: { titlebanner: "HỆ THỐNG HỖ TRỢ SINH VIÊN " }, formTaoBaoCao: { headercontent: "TẠO BÁO CÁO", loaiBaoCao: "Loại báo cáo", donViDuocGiao: "Đơn vị được giao", taoVaGiaoBaoCao: "Tạo và giao báo cáo", chonTatCa: "Chọn tất cả", boTatCa: "Bỏ tất cả", daChon: "Đã chọn", chuaChon: "Chưa chọn", kyBaoCao: "Kỳ báo cáo", namBaoCao: "Năm báo cáo", hanXuLy: "Hạn xử lý", chonNhomBaoCao: "Chọn nhóm báo cáo", chonNhomDonVi: "Chọn nhóm đơn vị" }, baoCaoTongHop: { timKiemNangCao: "Tìm kiếm nâng cao", maBaoCao: "Mã báo cáo", tuNgay: "Từ Ngày", denNgay: "Đến Ngày", timKiem: "Tìm kiếm", stt: "STT", loaiBaoCao: "Loại báo cáo", kyBaoCao: "Kỳ, năm báo cáo", donViDuocGiao: "Đơn vị được giao", ngayTao: "Ngày tạo", hanXuLy: "Hạn xử lý", tinhTrang: "Tình trạng", thaoTac: "Thao tác", chiTietBaoCao: "Chi tiết báo cáo", xoaBaoCao: "Xóa báo cáo" }, pagination: { page: "Trang", tongSo: "Tổng số" }, thongKe: { headercontent: "Tổng hợp báo cáo", locSoLieu: "Lọc số liệu", nhomBaoCao: "Nhóm báo cáo", baoCao: "Báo cáo", tongHop: "Tổng hợp", vuiLongChonBaoCao: "Vui lòng chọn báo cáo muốn thống kê", vuiLongChonMau: "Vui lòng chọn mẫu thống kê" }, coQuanDonVi: { headercontent: "CƠ QUAN, ĐƠN VỊ", themMoi: "Thêm mới", themMoiThanhCong: "Thêm mới thành công", themMoiThatBai: "Thêm mới thất bại", nhapTenDonVi: "Nhập tên đơn vị, mã đơn vị", thoat: "Thoát", themCoQuanDonVi: "Thêm cơ quan, đơn vị" }, danhSachCanBo: { headercontent: "DANH SÁCH CÁN BỘ", themMoiCanBo: "Thêm mới cán bộ", nhapTenMaCanBo: "Nhập tên, mã cán bộ", stt: "STT", donViCongTac: "Đơn vị công tác", chucVu: "Chức vụ", maCanBo: "Mã cán bộ", hoVaTen: "Họ tên", sdt: "Số điện thoại/ email", tinhTrangCongTac: "Tình trạng công tác", thaoTac: "Thao tác" }, danhSachChucVu: { headercontent: "DANH SÁCH CHỨC VỤ", nhapTenChucVu: "Nhập tên chức vụ", chonDonVi: "Chọn đơn vị", themChucVu: "Thêm chức vụ" }, quanLyDanhMuc: { headercontent: "DỮ LIỆU DANH MỤC", nhapMaDanhMuc: "Nhập mã danh mục hoặc tên danh mục" }, chiTietBaoCao: { headercontent: "Chi Tiết Báo Cáo", xemLichSuThucHien: "Xem lịch sử thực hiện", themMoiThanhPhan: "Thêm mới thành phần", danhSachThanhPhan: "Danh sách thành phần", themThanhPhanBaoCao: "Thêm thành phần báo cáo", thongTinThanhPhanBaoCao: "THÔNG TIN THÀNH PHẦN BÁO CÁO", capNhatThanhPhanBaoCao: "CẬP NHẬT THÀNH PHẦN BÁO CÁO", themThanhPhan: "Thêm thành phần", chiTietThanhPhan: "Chi tiết thành phần", capNhat: "Cập nhật", xuatExcel: "Xuất excel", ghiChu: "Ghi chú", ghiChuThucHien: "Ghi chú thực hiện", noiDungGhiChu: "Nội dung ghi chú...", thaoTac: "Thao tác", nguoiThucHien: "Người thực hiện", thoiGianThucHien: "Thời gian thực hiện", ghiChuThucHienNote: "Ghi chú thực hiện", lichSuThucHien: "Lịch sử thực hiện", stt: "STT", tenVanBan: "Tên văn bản", loaiVanBan: "Loại văn bản", coQuanBanHanh: "Cơ quan ban hành", ngayBanHanh: "Ngày ban hành", soHieuVanBan: "Số hiệu văn bản", tinhTrang: "Tình trạng", chuaThemFileDinhKem: "Chưa thêm file đính kèm", themMoiThatBai: "Thêm mới thất bại", capNhatThatBai: "Cập nhật thất bại", xoaThanhPhan: "Xóa thành phần", banCoChacChanXoa: "Bạn có chắc chắn muốn xóa thành phần báo cáo này", xoaThanhPhanThatBai: "Xóa thành phần thất bại", xoaThanhPhanThanhCong: "Xóa thành phần thành công", chuaTaoTaiKhoan: "Chưa tạo tài khoản", thucHienThanhCong: "Thực hiện thành công", thucHienThatBai: "Thực hiện thất bại", taiLieu: "Tài liệu ", taiLenKhongThanhCong: " tải lên không thành công. Vui lòng kiểm tra lại.", khongTheThemThanhPhan: "Không thể thêm thành phần. Loại báo cáo chỉ có 1 thành phần" }, formThemThanhPhan: { taiLenTaiLieuDinhKem: "Tải lên tài liệu đính kèm", khongCoGiayToDinhKem: "Không có giấy tờ đính kèm!" }, viTriChucDanh: { stt: "STT", chucVu: "Chức vụ", donVi: "Đơn vị", vaiTroSuDung: "Vai trò sử dụng", thaoTac: "Thao tác", thuocDonVi: "Thuộc đơn vị" } }, en: { thongTinBatBuoc: "Information required", themMoi: "Add new", timKiem: "Search", thoat: "Cancel", basic: { thongTinBatBuoc: "Information required", themMoi: "Add new", timKiem: "Search", thoat: "Cancel", quayLai: "Back", hotline: "", xoa: "Delete", sua: "Edit", huy: "Cancel", xacnhan: "Accept", stt: "S/N", yes: "Yes", no: "No" }, login: { welcomeMsg1: "", welcomeMsg2: "", loginMsg: "SIGN IN", trungTamCongNgheMsg: "", headOffice: "", tenDangNhap: "Username", batBuocTenDangNhap: "Incorrect username", matKhau: "Password", batBuocMatKhau: "Incorrect password", saiTenDangNhapVaMatKhau: "Incorrect username or password." }, drawer: { taoBaoCao: "Create Report", baoCaoChoXuLy: "Waiting Report", baoCaoXuLyLai: "Report Reprocessing", baoCaoChoDuyet: "Report Waiting Unit-Level Approval", baoCaoChoPheDuyet: "Report Waiting Approval", tongHopBaoCao: "Synthesis Report", traCuu: "Search Report", coQuanDonVi: "Agencies, Units", canBo: "Cadre", chucVuCanBo: "Cadre Position", quanLyDanhMuc: "Catalog Management", dangXuat: "Log Out" }, appbar: { titlebanner: "" }, formTaoBaoCao: { headercontent: "CREATING REPORT", loaiBaoCao: "Type of report", donViDuocGiao: "Sub-agency in charge", taoVaGiaoBaoCao: "Create and deliver report", chonTatCa: "select all", boTatCa: "deselect all", daChon: "Selected", chuaChon: "Unselected", kyBaoCao: "Reporting period", namBaoCao: "Report year", hanXuLy: "Processing deadline", chonNhomBaoCao: "Select report group", chonNhomDonVi: "Select unit group" }, baoCaoTongHop: { timKiemNangCao: "Advanced search", maBaoCao: "Report code", tuNgay: "From date", denNgay: "To date", timKiem: "Search", stt: "S/N", kyBaoCao: "Report periad", loaiBaoCao: "Type of report", donViDuocGiao: "Sub-agency in charge", ngayTao: "Date Created", hanXuLy: "Processing deadline", tinhTrang: "Status", thaoTac: "Action", chiTietBaoCao: "Report Details", xoaBaoCao: "Delete report" }, pagination: { page: "Page", tongSo: "Total" }, thongKe: { headercontent: "synthesis report", locSoLieu: "filter data", nhomBaoCao: "Report group", baoCao: "Report", tongHop: "Synthetic", vuiLongChonBaoCao: "Please select the report you want to filter", vuiLongChonMau: "Please select a statistical sample" }, coQuanDonVi: { headercontent: "AGENCIES, UNITS", themMoi: "Add new", themMoiThanhCong: "Agencies, Units have been added successfully", themMoiThatBai: "Failed to add", nhapTenDonVi: "Enter the unit name, unit code", thoat: "Cancel", themCoQuanDonVi: "Add new agencie, unit" }, danhSachCanBo: { headercontent: "CADRES LIST", themMoiCanBo: "Add new cadres", nhapTenMaCanBo: "Enter cadre name and cadre code ", stt: "S/N", donViCongTac: "Work unit", chucVu: "Job position", maCanBo: "Cadre code", hoVaTen: "Fullname", sdt: "Phone number/ email", tinhTrangCongTac: "Working Status", thaoTac: "Action" }, danhSachChucVu: { headercontent: "JOB POSITION LIST", nhapTenChucVu: "Enter job position", chonDonVi: "Select unit", themChucVu: "Add job position" }, quanLyDanhMuc: { headercontent: "CATEGORY DATA", nhapMaDanhMuc: "Enter the category code or category name" }, chiTietBaoCao: { headercontent: "Report Detail", xemLichSuThucHien: "View execution history", themMoiThanhPhan: "Add new component", danhSachThanhPhan: "Component list", themThanhPhanBaoCao: "Add report component", thongTinThanhPhanBaoCao: "REPORT COMPONENT INFORMATION", capNhatThanhPhanBaoCao: "UPDATE REPORT COMPONENT", themThanhPhan: "Add component", chiTietThanhPhan: "Component details", capNhat: "Update", xuatExcel: "Export excel", ghiChu: "Note", ghiChuThucHien: "Write a Note", noiDungGhiChu: "Note content...", thaoTac: "Action", nguoiThucHien: "Performer", thoiGianThucHien: "Execution time", ghiChuThucHienNote: "Note", lichSuThucHien: "Execution history", stt: "S/N", tenVanBan: "Name of Document", loaiVanBan: "Document type", coQuanBanHanh: "Issuing authority", ngayBanHanh: "Issuance date", soHieuVanBan: "Text number", tinhTrang: "Status", chuaThemFileDinhKem: "No files attached yet", themMoiThatBai: "Adding failed", capNhatThatBai: "Update failed", xoaThanhPhan: "Delete component", banCoChacChanXoa: "Are you sure to remove this report element", xoaThanhPhanThatBai: "Delete component failed", xoaThanhPhanThanhCong: "Delete component successfully", chuaTaoTaiKhoan: "Have not created an account yet", thucHienThanhCong: "Successful", thucHienThatBai: "Failed", taiLieu: "Document ", taiLenKhongThanhCong: " upload failed. Please check again.", khongTheThemThanhPhan: "Cannot add component. The report type has only one component" }, formThemThanhPhan: { taiLenTaiLieuDinhKem: "Upload attachments", khongCoGiayToDinhKem: "No documents attached!" }, viTriChucDanh: { stt: "S/n", chucVu: "Job position", donVi: "Unit", vaiTroSuDung: "User role", thaoTac: "Action", thuocDonVi: "From Unit" } } },
            h = new o["a"]({ locale: "vi", fallbackLocale: "vi", messages: i });
        n["a"] = h
    },
    eb19: function(a, n, e) {},
    f962: function(a) { a.exports = JSON.parse('{"danhSachBaoCao":[{"maDinhDanh":"231241233","maBaoCao":"BC-983123","tenBaoCao":"Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biển đổi khí hậu được xây dựng và ban hành","quyTrinh":{"@type":"T_QuyTrinh","maQuyTrinh":"QT-001"},"mauBaoCao":{"@type":"T_MauBaoCao","maDinhDanh":"","maMauBaoCao":"MAU_001","nhapNhieuThanhPhan":1},"kyBaoCao":{"@type":"C_KyBaoCao","maMuc":"1","tenMuc":"Theo tháng"},"hanXuLy":"02-09-2022","coQuanThucHien":{"@type":"T_CoQuanDonVi","maHanhChinh":"STNMT","tenGoi":"Sở Tài nguyên và môi trường"},"tinhTrang":{"@type":"C_TrangThaiXuLy","tenMuc":"Đang xử lý","maMuc":"1"},"thoiGianTao":"12-08-2022","thoiGianCapNhat":"","nguoiTaoLap":{"@type":"T_DanhTinhDienTu","tenDinhDanh":"","maSoID":""}},{"maDinhDanh":"23123","maBaoCao":"BC-154312","tenBaoCao":"Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biển đổi khí hậu được xây dựng và ban hành","quyTrinh":{"@type":"T_QuyTrinh","maQuyTrinh":"QT-002"},"mauBaoCao":{"@type":"T_MauBaoCao","maDinhDanh":"","maMauBaoCao":"MAU_002","nhapNhieuThanhPhan":1},"kyBaoCao":{"@type":"C_KyBaoCao","maMuc":"1","tenMuc":"Theo tuần"},"hanXuLy":"08-08-2022","coQuanThucHien":{"@type":"T_CoQuanDonVi","maHanhChinh":"STTTT","tenGoi":"Sở Thông tin và truyền thông"},"tinhTrang":{"@type":"C_TrangThaiXuLy","tenMuc":"Chờ duyệt","maMuc":"2"},"thoiGianTao":"01-08-2022","thoiGianCapNhat":"","nguoiTaoLap":{"@type":"T_DanhTinhDienTu","tenDinhDanh":"","maSoID":""}}],"danhSachThanhPhan":[{"maDinhDanh":"231241233","maBaoCao":"BC-983123","tenBaoCao":"Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biển đổi khí hậu được xây dựng và ban hành","quyTrinh":{"@type":"T_QuyTrinh","maQuyTrinh":"QT-001"},"noiDung":{"loaiVanBan":{"name":"Quyết định","value":"1"},"hienTrang":[{"name":"Dự thảo","value":"1"},{"name":"Đã ban hành","value":"2"}],"coQuanBanHanh":[{"name":"Sở thông tin và truyền thông","value":"1"}],"ngayBanHanh":"2022-11-11T00:00:00.000Z","tenVanBan":"Tôi là tên văn bản","tomTatNoiDung":"Tôi là tên tóm tắt nội dung","tinhTrang":{"tenMuc":"Đang xử lý","maMuc":"1"}},"mauBaoCao":{"@type":"T_MauBaoCao","maDinhDanh":"","maMauBaoCao":"MAU_001","nhapNhieuThanhPhan":1},"kyBaoCao":{"@type":"C_KyBaoCao","maMuc":"1","tenMuc":"Theo tháng"},"hanXuLy":"02-09-2022","coQuanThucHien":{"@type":"T_CoQuanDonVi","maHanhChinh":"STNMT","tenGoi":"Sở Tài nguyên và môi trường"},"tinhTrang":{"@type":"C_TrangThaiXuLy","tenMuc":"Đang xử lý","maMuc":"1"},"thoiGianTao":"12-08-2022","thoiGianCapNhat":"","nguoiTaoLap":{"@type":"T_DanhTinhDienTu","tenDinhDanh":"","maSoID":""}},{"maDinhDanh":"23123","maBaoCao":"BC-154312","tenBaoCao":"Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biển đổi khí hậu được xây dựng và ban hành","quyTrinh":{"@type":"T_QuyTrinh","maQuyTrinh":"QT-002"},"mauBaoCao":{"@type":"T_MauBaoCao","maDinhDanh":"","maMauBaoCao":"MAU_002","nhapNhieuThanhPhan":1},"noiDung":{"loaiVanBan":{"name":"Quyết định","value":"1"},"hienTrang":[{"name":"Dự thảo","value":"1"},{"name":"Đã ban hành","value":"2"}],"coQuanBanHanh":[{"name":"Sở thông tin và truyền thông","value":"1"}],"ngayBanHanh":"2022-11-11T00:00:00.000Z","tenVanBan":"Tôi là tên văn bản","tomTatNoiDung":"Tôi là tên tóm tắt nội dung","tinhTrang":{"tenMuc":"Đang xử lý","maMuc":"1"}},"kyBaoCao":{"@type":"C_KyBaoCao","maMuc":"1","tenMuc":"Theo tuần"},"hanXuLy":"08-08-2022","coQuanThucHien":{"@type":"T_CoQuanDonVi","maHanhChinh":"STTTT","tenGoi":"Sở Thông tin và truyền thông"},"tinhTrang":{"@type":"C_TrangThaiXuLy","tenMuc":"Chờ duyệt","maMuc":"2"},"thoiGianTao":"01-08-2022","thoiGianCapNhat":"","nguoiTaoLap":{"@type":"T_DanhTinhDienTu","tenDinhDanh":"","maSoID":""}}],"chiTietBaoCao":{"maDinhDanh":"231241233","maBaoCao":"BC-983123","tenBaoCao":"Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biển đổi khí hậu được xây dựng và ban hành","quyTrinh":{"@type":"T_QuyTrinh","maQuyTrinh":"QT-001"},"mauBaoCao":{"@type":"T_MauBaoCao","maDinhDanh":"","maMauBaoCao":"MAU_001","nhapNhieuThanhPhan":1},"kyBaoCao":{"@type":"C_KyBaoCao","maMuc":"1","tenMuc":"Theo tháng"},"hanXuLy":"02-09-2022","coQuanThucHien":{"@type":"T_CoQuanDonVi","maHanhChinh":"STNMT","tenGoi":"Sở Tài nguyên và môi trường"},"tinhTrang":{"@type":"C_TrangThaiXuLy","tenMuc":"Đang xử lý","maMuc":"1"},"thoiGianTao":"12-08-2022","thoiGianCapNhat":"","nguoiTaoLap":{"@type":"T_DanhTinhDienTu","tenDinhDanh":"","maSoID":""}},"mauBaoCao":{"maDinhDanh":"","tenGoi":"","trangThai":{"@type":"C_TrangThaiDuLieu","maMuc":"","tenMuc":""},"maMauBaoCao":"","mauTaoMaBaoCao":"","quyTrinhXuLy":{"@type":"T_QuyTrinh","maQuyTrinh":""},"nhapNhieuThanhPhan":true,"mauNhap":[{"name":"loaiVanBan","title":"Loại văn bản","type":"select","multiple":false,"itemText":"name","itemValue":"value","minLength":0,"maxLength":0,"required":true,"rules":[],"fieldClass":"col-6","placeHolder":"","defaultValue":"","dataType":"","dataSource":[{"name":"Quyết định","value":"1"},{"name":"Công văn","value":"2"}],"autoEvent":""},{"name":"hienTrang","title":"Hiện trạng","type":"select","multiple":true,"itemText":"name","itemValue":"value","minLength":0,"maxLength":0,"required":false,"rules":"","fieldClass":"col-6","placeHolder":"","defaultValue":"","dataType":"","dataSource":[],"autoEvent":"","api":"http://10.3.16.185:8080/api/danhmuc/1","responseDataApi":"content"},{"name":"coQuanBanHanh","title":"Cơ quan ban hành","type":"select","multiple":true,"itemText":"name","itemValue":"value","minLength":0,"maxLength":0,"required":true,"rules":"","fieldClass":"col-6","placeHolder":"","defaultValue":"","dataType":"","dataSource":[{"name":"Sở thông tin và truyền thông","value":"1"},{"name":"Sở tài nguyên và môi trường","value":"2"}],"autoEvent":""},{"name":"ngayBanHanh","title":"Ngày ban hành","type":"date","minLength":0,"maxLength":0,"required":true,"rules":"","fieldClass":"col-6","placeHolder":"ddmmyyyy, dd/mm/yyyy","defaultValue":"20221108","dataType":"","dataSource":"","autoEvent":""},{"name":"tenVanBan","title":"Tên văn bản","type":"textfield","minLength":0,"maxLength":0,"required":true,"rules":"","fieldClass":"col-12","placeHolder":"","defaultValue":"","dataType":"","dataSource":"","autoEvent":""},{"name":"tomTatNoiDung","title":"Tóm tắt nội dung","type":"textarea","minLength":0,"maxLength":0,"required":true,"rules":"","fieldClass":"col-12","placeHolder":"","defaultValue":"","dataType":"","dataSource":"","autoEvent":""},{"name":"files","title":"Giấy tờ đính kèm","type":"attack","multiple":true,"minLength":0,"maxLength":0,"required":true,"rules":"","fieldClass":"col-12","placeHolder":"","defaultValue":"","dataType":"","dataSource":"","autoEvent":""}],"mauThongKe":{"maMau":"","tenMau":"","groupBy":[{"name":"","title":""}],"orderBy":[{"name":"","type":["asc","desc"]}],"limit":"","query":"","searchHidden":{"@type":"S_Query","where":""},"searchForm":[{"operator":["=","!=",">=","<=","like"],"keySearch":"","keyUrl":{"@type":"S_TruongDuLieu","name":"","title":"","type":{"@type":"C_KieuDuLieu","maMuc":"","tenMuc":""},"minLength":0,"maxLength":0,"required":false,"fieldClass":"","placeHolder":"","defaultValue":"","dataType":"","dataSource":""}}],"listView":[{"@type":"S_DanhSach","title":"","name":"","fieldClass":""}]},"mauHienThi":{"headers":[{"sortable":false,"text":"STT","value":"index","type":"index","class":"td-center","width":"50"},{"sortable":false,"text":"Tên văn bản","value":"tenVanBan","class":"th-center"},{"sortable":false,"text":"Loại văn bản","value":"loaiVanBan","class":"th-center td-center","type":"object","mapping":"name"},{"sortable":false,"text":"Đơn vị thực hiện","value":"coQuanBanHanh","type":"array","mapping":"name","class":"th-center"},{"sortable":false,"text":"Ngày ban hành","value":"ngayBanHanh","class":"th-center td-center","type":"date"},{"sortable":false,"width":"120","text":"Tình trạng","value":"tinhTrang","type":"calculator","calculator":"dataInput[\'tinhTrang\'][\'tenMuc\']","class":"th-center td-center"},{"sortable":false,"text":"Thao tác","value":"action","type":"action","class":"th-center td-center","width":"150"}],"itemsPerPage":15}},"quanlyloaibando":[{"id":0,"thuTu":1,"tenLoaiBanDo":"Tòa Nhà","maIcon":"0xe089","trangThai":1,"thaoTac":""},{"id":1,"thuTu":2,"tenLoaiBanDo":"Ký Túc Xá","maIcon":"0xf879","trangThai":1,"thaoTac":""},{"id":2,"thuTu":3,"tenLoaiBanDo":"Ăn Uống","maIcon":"0xe131","trangThai":1,"thaoTac":""},{"id":3,"thuTu":4,"tenLoaiBanDo":"Check In","maIcon":"0xe131","trangThai":1,"thaoTac":""},{"id":4,"thuTu":5,"tenLoaiBanDo":"Bãi Đỗ Xe","maIcon":"0xe39e","trangThai":1,"thaoTac":""},{"id":5,"thuTu":6,"tenLoaiBanDo":"Hiệu Thuốc","maIcon":"0xe131","trangThai":1,"thaoTac":""}]}') }
});