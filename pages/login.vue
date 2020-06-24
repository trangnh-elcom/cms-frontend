<template>
  <div>
    <div v-if="showLogin">
      <div class="vizew-login-area section-padding-80">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-6">
              <div class="login-content">
                <!-- Section Title -->
                <div class="section-heading">
                  <h4>Great to have you back!</h4>
                  <div class="line"></div>
                </div>
                <form @submit.prevent="login">
                  <div class="form-group">
                    <input class="form-control" id="exampleInputEmail1" placeholder="Email or User Name" required
                           type="email" v-model="email">
                  </div>
                  <div class="form-group">
                    <input class="form-control" id="exampleInputPassword1" placeholder="Password" required
                           type="password"
                           v-model="password">
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox mr-sm-2">
                      <input class="custom-control-input" id="customControlAutosizing" type="checkbox">
                      <label class="custom-control-label" for="customControlAutosizing">Remember me</label>
                    </div>
                  </div>
                  <button class="btn vizew-btn w-100 mt-30" type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    <form action="/reset/password/" class="form-reset">-->
    <!--        <input type="email" id="resetEmail" class="form-control" placeholder="Email address" required="" autofocus="">-->
    <!--        <button class="btn btn-primary btn-block" type="submit">Reset Password</button>-->
    <!--        <a href="#" id="cancel_reset"><i class="fas fa-angle-left"></i> Back</a>-->
    <!--    </form>-->
    <!--    <br>-->

    <div v-else>
      <form @submit.prevent="signup" style="display: block">
        <input autofocus="" class="form-control" id="user-name" name="name" placeholder="Họ tên" required=""
               type="text">
        <input autofocus="" class="form-control" id="user-email" name="email" placeholder="Địa chỉ email" required
               type="email">
        <input autofocus="" class="form-control" id="user-pass" name="password" placeholder="Mật khẩu" required
               type="password">
        <button class="btn btn-primary btn-block" type="submit"><i class="fas fa-user-plus"></i> Đăng ký</button>
        <a href="/login" id="cancel_signup"><i class="fas fa-angle-left"></i> Đăng nhập</a>
      </form>
    </div>
  </div>
</template>

<script>
  import {ON_SHOW_ERROR_MESSAGE_EVENT_NAME} from "../components/const/event_name";

  export default {
    name: "Signin",
    data() {
      return {
        showLogin: true,
        email: "",
        password: "",
      }
    },
    methods: {
      signup() {

      },
      async login() {
        try {
          console.log("login");
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          }).then(value => {
            this.$auth.setUser(value.data.user);
            if (process.browser) {
              localStorage.setItem("currentUser", JSON.stringify(value.data.user))
            }
          });
          this.$router.push('/admin/users')
        } catch (e) {
          if (e.response.data.apierror.message) {
            $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, e.response.data.apierror.message)
          } else {
            $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, "Tài khoản hoặc mật khẩu không đúng")
          }
        }
      }
    }
  }
</script>

<style scoped>
  input {
    color: white;
  }
</style>
