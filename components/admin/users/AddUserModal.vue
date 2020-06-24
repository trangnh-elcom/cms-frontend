<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="formAddUserModal" @submit.prevent="emitOkEvent">
        <div class="modal-header">
          <h4 class="modal-title">{{mode === 'add' ? 'Thêm user' : 'Sửa thông tin user'}}</h4>
          <button aria-hidden="true" class="close" data-dismiss="modal" type="button">&times;</button>
        </div>
        <div class="modal-body">
          <p>{{user}}</p>
          <div class="form-group">
            <label for="addName">Họ tên</label>
            <input autofocus class="form-control" id="addName" required type="text" v-model="user.name">
          </div>
          <div class="form-group">
            <label for="addEmail">Email</label>
            <input :disabled="mode !== 'add'" class="form-control" id="addEmail" required type="email"
                   v-model="user.email">
          </div>
          <div class="form-group">
            <label for="addIsLocked">Trạng thái khóa</label>
            <br>
            <select id="addIsLocked" v-model="user.locked" required>
              <option value="true">Khóa</option>
              <option value="false">Không khóa</option>
            </select>
          </div>
          <div class="form-group">
            <label>Vai trò</label>
            <br>
            <label class="checkbox-inline mx-2" v-for="role in roles">
              <input :checked="isCheckedRole(role)" :value="role.name" @click="isAddRole(role, $event)" type="checkbox">
              {{role.name}}
            </label>
          </div>
          <div class="form-group" v-if="mode === 'add'">
            <label for="addPassword">Mật khẩu</label>
            <input v-model="user.newPassword" class="form-control" id="addPassword" required type="password">
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
      },
      mode: {
        type: String,
        default: "add"
      },
      onOkEvent: {
        type: String
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      isCheckedRole(role) {
        for (let idx = 0; idx < this.user.roles.length; idx++) {
          const value = this.user.roles[idx];
          if (value.id === role.id) {
            return true;
          }
        }
        return false;
      },
      emitOkEvent() {
        $nuxt.$emit(this.onOkEvent)
      },
      addRoleIfNotExist(role){
        console.log("add")
        const indexOfRole = this.user.roles.map(value => value.name).indexOf(role.name);
        if (indexOfRole === -1) {
          this.user.roles.push(role)
        }
      },
      isAddRole(role, event) {
        if (event.target.checked) {
          this.addRoleIfNotExist(role)
        } else {
          this.removeRoleIfExist(role)
        }
      },
      removeRoleIfExist(role) {
        console.log("remove", this.user.roles, role)
        const indexOfRole = this.user.roles.map(value => value.name).indexOf(role.name);
        if (indexOfRole !== -1) {
          this.user.roles.splice(indexOfRole, 1)
        }
      }
    }
  }
</script>

<style scoped>

</style>
