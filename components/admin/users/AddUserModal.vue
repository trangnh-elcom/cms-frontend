<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="formAddUserModal">
        <div class="modal-header">
          <h4 class="modal-title">Thêm người dùng</h4>
          <button aria-hidden="true" class="close" data-dismiss="modal" type="button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="addName">Họ tên</label>
            <input class="form-control" id="addName" required type="text" v-model="user.name">
          </div>
          <div class="form-group">
            <label for="addEmail">Email</label>
            <input class="form-control" id="addEmail" required type="email" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="addIsLocked">Trạng thái khóa</label>
            <br>
            <select id="addIsLocked" v-model="user.isLocked">
              <option value="true">Khóa</option>
              <option value="false" selected>Không khóa</option>
            </select>
          </div>
          <div class="form-group">
            <label>Vai trò</label>
            <br>
            <label class="checkbox-inline mx-2" v-for="role in roles">
              <input type="checkbox" :value="role.name"> {{role.name}}
            </label>
          </div>
          <div class="form-group">
            <label for="addPassword">Mật khẩu</label>
            <input class="form-control" id="addPassword" required type="password">
          </div>
        </div>
        <div class="modal-footer">
          <input class="btn btn-default" data-dismiss="modal" type="button" value="Hủy">
          <input class="btn btn-success" type="submit" value="Lưu">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddUserModal",
    props: {
      user: {
        type: Object,
      },
      roles: {
        type: Array
      }
    },
    data() {
      return {}
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
