import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [
        // {
        //   path: '/',
        //   name: 'QuanLyTinTuc',
        //   component: () => import('@/views/QuanLyTinTuc'),
        //   props: true
        // },
        {
          path: '/quan-ly-tin-tuc',
          name: 'QuanLyTinTuc',
          component: () => import('@/views/QuanLyTinTuc'),
          props: true
        },
        {
          path: '/quan-ly-loai-ban-do',
          name: 'QuanLyLoaiBanDo',
          component: () => import('@/views/QuanLyLoaiBanDo'),
          props: true
        },
        {
          path: '/quan-ly-dia-diem-ban-do-so',
          name: 'QuanLyDiaDiemBDS',
          component: () => import('@/views/QuanLyDiaDiemBDS'),
          props: true
        },
        {
          path: '/quan-ly-chuyen-muc',
          name: 'QuanLyChuyenMuc',
          component: () => import('@/views/QuanLyChuyenMuc'),
          props: true
        },
        {
          path: '/quan-li-can-bo',
          name: 'ManageCadres',
          component: () => import('@/views/ManageCadres'),
          props: true
        },
        {
          path: '/quan-li-nhom-quyen',
          name: 'MangeRightsGroup',
          component: () => import('@/views/MangeRightsGroup'),
          props: true
        },
        {
          path: '/quan-li-sinh-vien',
          name: 'ManageStudents',
          component: () => import('@/views/ManageStudents'),
          props: true
        },
        {
          path: '/quan-li-menu',
          name: 'ManageMenu',
          component: () => import('@/views/ManageMenu'),
          props: true
        },
        {
          path: '/quan-li-chuyen-muc-tin-tuc',
          name: 'ManageCategoryNews',
          component: () => import('@/views/ManageCategoryNews'),
          props: true
        },
        {
          path: '/quan-li-bai-viet-tin-tuc',
          name: 'ManageNews',
          component: () => import('@/views/ManageNews'),
          props: true
        },
        {
          path: '/quan-li-gop-y',
          name: 'ManageFeedback',
          component: () => import('@/views/ManageFeedback'),
          props: true
        },
        {
          path: '/dang-ky-noi-tru',
          name: 'DangKyNoiTru',
          component: () => import('@/views/DangKyNoiTru'),
          props: true
        },
        {
          path: '/mau-thong-bao',
          name: 'MauThongBao',
          component: () => import('@/views/MauThongBao'),
          props: true
        },
        {
          path: '/thong-bao',
          name: 'ThongBao',
          component: () => import('@/views/ThongBao'),
          props: true
        },
        {
          path: '/cam-nang-hoa-lac',
          name: 'ManageHandBook',
          component: () => import('@/views/ManageHandBook'),
          props: true
        },
        {
          path: '/chuyen-muc-cam-nang-hoa-lac',
          name: 'ManageTypeHandBook',
          component: () => import('@/views/ManageTypeHandBook'),
          props: true
        },
        {
          name: 'camNangHoaLac',
          path: '/chi-tiet-cam-nang-hoa-lac/:id',
          component: () => import('@/views/CamNangHoaLac')
        },
        {
          path: '/quan-li-ban-do',
          name: 'ManageMap',
          component: () => import('@/views/ManageMap'),
          props: true
        },
        {
          path: '/quan-li-loai-ban-do',
          name: 'ManageTypeMap',
          component: () => import('@/views/ManageTypeMap'),
          props: true
        },
        {
          path: '/quan-li-khu-vuc-ban-do',
          name: 'ManageArea',
          component: () => import('@/views/ManageArea'),
          props: true
        },
        {
          path: '/quan-ly-thong-tin-nha-tro',
          name: 'ManageMotelInfor',
          component: () => import('@/views/ManageMotelInfor'),
          props: true
        },
        {
          path: '/quan-ly-danh-sach-nha-tro',
          name: 'ManageListMotel',
          component: () => import('@/views/ManageMotelList'),
          props: true
        },
        {
          path: '/quan-ly-thong-bao',
          name: 'ManageNotification',
          component: () => import('@/views/ViewNotify'),
          props: true
        },
        {
          path: '/quan-ly-thu-tuc',
          name: 'ManageProcedure',
          component: () => import('@/views/ManageProcedure'),
          props: true
        },
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/Login')
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import('@/views/HomePage'),
    //   props: true
    // },
    {
      name: 'ShowNews',
      path: '/tin-tuc/:id',
      component: () => import('@/views/ShowNews')
    },
  ]
})
