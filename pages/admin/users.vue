<template>
  <div>
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>Quản lý thông tin người dùng</h2>
            </div>
            <div class="col-sm-6">
              <a @click="showAddModal" class="btn btn-success"><i
                class="material-icons">&#xE147;</i> <span>Thêm user</span></a>
              <a @click="showDeleteCheckedModal" class="btn btn-danger"><i
                class="material-icons">&#xE15C;</i> <span>Xóa</span></a>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>
           <span class="custom-checkbox">
            <input id="selectAll" type="checkbox" v-model="isCheckedAll">
            <label for="selectAll"></label>
           </span>
            </th>
            <th v-for="header in tableHeaders">
              {{header}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr :key="user.id" v-for="(user, index) in users">
            <td>
                  <span class="custom-checkbox">
                  <input id="checkbox1" name="options[]" type="checkbox" v-model="checkboxes[index]" value="1">
                  <label for="checkbox1"></label>
                  </span>
            </td>
            <td>
              <p>{{user.name}}</p>
            </td>
            <td>
              <p>{{user.email}}</p>
            </td>
            <td>
              <p>{{user.locked}}</p>
            </td>
            <td>
                  <span v-for="role in user.roles">
                    {{role.name}}
                  </span>
            </td>
            <td>
              <div id="editAnUser">
                <a @click="showEditModal(user)" class="edit">
                  <i class="material-icons"
                     data-toggle="tooltip"
                     title="Chỉnh sửa">&#xE254;
                  </i>
                </a>
              </div>
              <div id="removeAnUser">
                <a @click="showDeleteModal(user)" class="delete">
                  <i class="material-icons"
                     data-toggle="tooltip"
                     title="Xóa">&#xE872;
                  </i>
                </a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="clearfix" v-if="totalPage > 0">
          <ul class="pagination" v-for="index in totalPage">
            <li :class="{ 'active' : isActivePage(index) }" class="page-item">
              <a :href="'users?page='+(index-1)" class="page-link">{{index}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Add Modal HTML -->
    <div class="modal fade" id="addUserModal">
      <AddUserModal :onOkEvent="onAddEventName" :roles="roles" :user="newUser" mode="add"></AddUserModal>
    </div>
    <!-- Edit Modal HTML -->
    <div class="modal fade" id="editUserModal">
      <AddUserModal :onOkEvent="onEditEventName" :roles="roles" :user="newUser" mode="edit"></AddUserModal>
    </div>
    <!-- Delete Modal HTML -->
    <div class="modal fade" id="deleteUserModal">
      <DeleteModal :message="newUser.email" :onOkEvent="onDeleteEventName"></DeleteModal>
    </div>
    <div class="modal fade" id="deleteCheckedUserModal">
      <DeleteModal :onOkEvent="onDeleteCheckedEventName"></DeleteModal>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {RepositoryFactory} from "@/repository/RespositoryFactory";
  import {EmployerRepositoryFactory} from "../../repository/EmployerRepoFactory";
  import AddUserModal from "../../components/admin/users/AddUserModal";
  import DeleteModal from "../../components/admin/common/modal/DeleteModal";
  import {
    ON_SHOW_ERROR_MESSAGE_EVENT_NAME,
    ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME
  } from "../../components/const/event_name";
  import {hideModalById, showModalById} from "../../assets/js/boostrap-modal";

  const UserRepository = RepositoryFactory.get('user');
  const EUserRepository = EmployerRepositoryFactory.get('user');
  const RoleRepository = RepositoryFactory.get('role');
  export default {
    name: "users",
    components: {DeleteModal, AddUserModal},
    layout: "admin",
    middleware: 'auth',
    mounted() {
      this.addNuxtEventListener();
      this.initData()
    },
    data() {
      return {
        users: [],
        totalPage: 0,
        isCheckedAll: false,
        tableHeaders: [
          'Họ Tên',
          "Email",
          "Khóa",
          "Vai trò",
          "Cập nhật"
        ],
        roles: [],
        newUser: this.initUser(),
        selectedUser: this.initUser(),
        onDeleteEventName: 'ON_DELETE_USER',
        onEditEventName: 'ON_EDIT_USER',
        onAddEventName: 'ON_ADD_USER',
        onDeleteCheckedEventName: 'ON_DELETE_CHECKED_USERS',
        checkboxes: []
      }
    },
    methods: {
      addNuxtEventListener() {
        this.$nuxt.$on(this.onDeleteEventName, () => {
          this.deleteUser()
        });
        this.$nuxt.$on(this.onEditEventName, () => {
          this.updateUser()
        });
        this.$nuxt.$on(this.onAddEventName, () => {
          this.addUser()
        });
        this.$nuxt.$on(this.onDeleteCheckedEventName, () => {
          this.deleteCheckedUsers()
        })
      },
      async updateUser() {
        if (this.newUser) {
          console.log(this.newUser.roles);
          var payload = {};
          Object.assign(payload, this.newUser);
          payload.roles = this.newUser.roles.map(value => value.name);
          console.log(payload);
          const response = await EUserRepository.updateUserByEmail(this.newUser.email, payload)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            // var index = this.users.indexOf(this.selectedUser);
            // this.users.splice(index, 1)
            hideModalById('editUserModal');
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Cập nhật thành công")
          }
        }
      },
      async initData() {
        const usersResponse = await UserRepository.getUsersByPage(this.$route.query.page || 0);
        if (usersResponse.status >= 200 && usersResponse.status <= 299) {
          this.totalPage = usersResponse.data.totalPage;
          this.users = usersResponse.data.content
        }
        const rolesResponse = await RoleRepository.getRolesUnder();
        if (rolesResponse.status >= 200 && rolesResponse.status <= 299) {
          this.roles = rolesResponse.data
        }
      },
      isActivePage(index) {
        if (this.$route.query.page) {
          return this.$route.query.page == (index - 1)
        }
        return 1 == index
      },
      initUser() {
        return {
          name: undefined,
          isLocked: undefined,
          roles: [],
          newPassword: undefined,
          email: undefined
        }
      },
      showAddModal() {
        this.newUser = this.initUser();
        showModalById('addUserModal')
      },
      showEditModal(user) {
        this.newUser = user;
        showModalById('editUserModal')
      },
      showDeleteModal(user) {
        this.newUser = user;
        showModalById('deleteUserModal')
      },
      async deleteUser() {
        if (this.newUser) {
          const index = this.users.indexOf(this.newUser);
          const response = await EUserRepository.deleteUserById(this.newUser.email)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            this.users.splice(index, 1);

            hideModalById('deleteUserModal');
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Xóa thành công")
          }
        }
      },
      async addUser() {
        if (this.newUser) {
          console.log(this.newUser.roles);
          const payload = {};
          Object.assign(payload, this.newUser);
          payload.roles = this.newUser.roles.map(value => value.name);
          const response = await EUserRepository.addUserByAdmin(payload)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            this.users = [this.newUser, ...this.users];
            hideModalById('addUserModal');
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Thêm thành công")
          }
          this.newUser = this.initUser()
        }
      },
      showDeleteCheckedModal() {
        showModalById('deleteCheckedUserModal');
      },
      deleteCheckedUsers() {
        for (var index = 0; index < this.checkboxes.length; index += 1) {
          if (this.checkboxes[index]) {
            this.newUser = this.users[index]
            this.deleteUser()
          }
        }
        hideModalById('deleteCheckedUserModal');
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    beforeDestroy() {
      this.$nuxt.$off(this.onEditEventName);
      this.$nuxt.$off(this.onDeleteEventName);
      this.$nuxt.$off(this.onAddEventName);
      this.$nuxt.$off(this.onDeleteCheckedEventName)
    },
    watch: {
      users() {
        this.checkboxes = new Array(this.users.length)
      },
      isCheckedAll() {
        if (this.isCheckedAll) {
          this.checkboxes.fill(true)
        } else {
          if (this.checkboxes.every(value => value === true)) {
            this.checkboxes.fill(false)
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import "assets/css/admin/managetable.css";
</style>
