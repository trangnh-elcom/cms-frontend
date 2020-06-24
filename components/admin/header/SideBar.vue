<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a class="brand-link" href="/">
      <img alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           src="/admin/AdminLTE/AdminLTELogo.png" style="opacity: .8">
      <span class="brand-text font-weight-light">CMS Tin tức</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition"
         v-show="currentUser">
      <div class="os-resize-observer-host">
        <div class="os-resize-observer observed" style="left: 0px; right: auto;"></div>
      </div>
      <div class="os-size-auto-observer" style="height: calc(100% + 1px); float: left;">
        <div class="os-resize-observer observed"></div>
      </div>
      <div class="os-content-glue" style="margin: 0px -8px; width: 249px; height: 636px;"></div>
      <div class="os-padding" v-if="currentUser">
        <div class="os-viewport os-viewport-native-scrollbars-invisible"
             style="overflow-y: scroll; right: 0px; bottom: 0px;">
          <div class="os-content" style="padding: 0px 8px; height: 100%; width: 100%;">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img alt="User Image" class="img-circle elevation-2"
                     src="/admin/AdminLTE/user2-160x160.jpg">
              </div>
              <div class="info">
                <a class="d-block" href="#"><span>{{currentUser.name}}</span></a>
                <a class="d-block" href="#"><span>{{currentUser.roles.map(value => value.name)}} </span></a>
              </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-accordion="false" data-widget="treeview"
                  role="menu">
                <li class="nav-item has-treeview menu-open">
                  <a class="nav-link active" href="#">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Quản lý
                      <i class="right fas fa-angle-left"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a class="nav-link" :class="{'active' :  $nuxt.$route.name === 'admin-users'}" href="users">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Quản lý user</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{'active' :  $nuxt.$route.name === 'admin-categories'}" href="categories">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Quản lý chuyên mục</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{'active' :  $nuxt.$route.name === 'admin-posts'}" href="posts">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Quản lý bài viết</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <!-- /.sidebar-menu -->
          </div>
        </div>
      </div>
      <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
        <div class="os-scrollbar-track">
          <div class="os-scrollbar-handle" style="width: 100%; transform: translate(0px);"></div>
        </div>
      </div>
      <div class="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
        <div class="os-scrollbar-track">
          <div class="os-scrollbar-handle" style="height: 50.5155%; transform: translate(0px);"></div>
        </div>
      </div>
      <div class="os-scrollbar-corner"></div>
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "SideBar",
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    data() {
      return {
        currentUser: this.getCurrentUser()
      }
    },
    methods: {
      getCurrentUser() {
        if (process.browser) {
          return JSON.parse(localStorage.getItem("currentUser"))
        }
        return undefined
      }
    }
  }
</script>

<style scoped>

</style>
