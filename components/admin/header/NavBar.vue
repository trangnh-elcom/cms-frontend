<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a class="nav-link" href="/">Trang chủ</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a class="nav-link" href="/users">Users</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a class="nav-link" href="/categories">Chuyên mục</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a class="nav-link" href="/posts">Bài viết</a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input aria-label="Search" class="form-control form-control-navbar" placeholder="Search" type="search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a @click="logout">Đăng xuất</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    methods: {
      async logout() {
        await this.$auth.logout();
        localStorage.removeItem("currentUser")
      },
    }
  }
</script>

<style scoped>

</style>
