<template>
  <div class="sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed" style="height: auto;">
    <div class="wrapper">
      <NavBar/>
      <SideBar/>
      <div class="content-wrapper" style="min-height: 563px;">
        <nuxt/>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import NavBar from "../components/admin/header/NavBar";
  import SideBar from "../components/admin/header/SideBar";
  import Footer from "../components/admin/footer/Footer";
  import {
    ON_SHOW_ERROR_MESSAGE_EVENT_NAME,
    ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME
  } from "../components/const/event_name";

  export default {
    name: "admin",
    components: {Footer, SideBar, NavBar},
    head() {
      return {
        link: [
          {rel: 'icon', type: 'image/x-icon', href: 'img/core-img/favicon.ico'},
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/all.css",
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/ionicons.css",
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/tempusdominus-bootstrap-4.css",
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/icheck-bootstrap.css"
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/jqvmap.css"
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/adminlte.css",
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/OverlayScrollbars.css",
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/daterangepicker.css",
          },
          {
            rel: "stylesheet",
            href: "/admin/AdminLTE/summernote-bs4.css",
          },
          {
            rel: "stylesheet", // Google Font: Source Sans Pro
            href: "/admin/AdminLTE/css.css",
          },
          {
            rel: "stylesheet",
            href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/icon?family=Material+Icons",
          }
        ],
        script: [
          {src: '/admin/AdminLTE/jquery_004.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/jquery-ui.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/bootstrap.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/sparkline.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/jquery_003.js', body: true, defer: 'true'},
          // {src: '/admin/AdminLTE/jquery_002.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/jquery.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/moment.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/daterangepicker.js', body: true, defer: 'true'},
          // {src: '/admin/AdminLTE/tempusdominus-bootstrap-4.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/summernote-bs4.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/jquery_005.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/adminlte.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/dashboard.js', body: true, defer: 'true'},
          {src: '/admin/AdminLTE/demo.js', body: true, defer: 'true'},
        ]
      }
    },
    mounted() {
      this.addNuxtEventListener()
    },
    methods: {
      addNuxtEventListener() {
        this.$nuxt.$on(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, (message) => {
          this.makeToast(message, 'success')
        })
        this.$nuxt.$on(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, (message) => {
          this.makeToast(message, 'danger')
        })
      },
      makeToast(message, variant = null) {
        this.$bvToast.toast(message, {
          variant: variant,
          solid: true
        })
      }
    },
  }
</script>

<style scoped>

</style>
