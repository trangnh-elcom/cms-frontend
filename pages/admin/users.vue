<template>
  <div>
    {{$auth.user}}
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>Quản lý thông tin người dùng</h2>
            </div>
            <div class="col-sm-6">
              <a class="btn btn-success" data-toggle="modal" href="#addUserModal"><i
                class="material-icons">&#xE147;</i> <span>Thêm user</span></a>
              <a class="btn btn-danger" data-toggle="modal" href="#deleteUserModal"><i
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
          <tr v-for="user in users" :key="user.id">
            <td>
                  <span class="custom-checkbox">
                  <input id="checkbox1" name="options[]" type="checkbox" value="1">
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
                <a class="edit" @click="showEditModal(user)">
                  <i class="material-icons"
                     data-toggle="tooltip"
                     title="Chỉnh sửa">&#xE254;
                  </i>
                </a>
              </div>
              <div id="removeAnUser">
                <a class="delete" @click="showDeleteModal(user)">
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
            <li class="page-item" :class="{ 'active' : isActivePage(index) }">
              <a class="page-link" :href="'users?page='+(index-1)">{{index}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Add Modal HTML -->
    <div class="modal fade" id="addUserModal">
      <AddUserModal :user="newUser" :roles="roles" mode="add"></AddUserModal>
    </div>
    <!-- Edit Modal HTML -->
    <div class="modal fade" id="editUserModal">
      <AddUserModal :user="selectedUser" :roles="roles" mode="edit" :onOkEvent="onEditEventName"></AddUserModal>
    </div>
    <!-- Delete Modal HTML -->
    <div class="modal fade" id="deleteUserModal">
      <DeleteModal :message="selectedUser.email" :onOkEvent="onDeleteEventName"></DeleteModal>
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

  const UserRepository = RepositoryFactory.get('user')
  const EUserRepository = EmployerRepositoryFactory.get('user');
  const RoleRepository = RepositoryFactory.get('role');
  export default {
    name: "users",
    components: {DeleteModal, AddUserModal},
    layout: "admin",
    middleware: 'auth',
    mounted() {
      this.addNuxtEventListener()
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
        onEditEventName: 'ON_EDIT_USER'
      }
    },
    methods: {
      addNuxtEventListener() {
        this.$nuxt.$on(this.onDeleteEventName, () => {
          this.deleteUser()
        })
        this.$nuxt.$on(this.onEditEventName, () => {
          this.updateUser()
        })
      },
      async updateUser() {
        if (this.selectedUser) {
          console.log(this.selectedUser.roles)
          var payload = {}
          Object.assign(payload, this.selectedUser);
          payload.roles = this.selectedUser.roles.map(value => value.name)
          console.log(payload)
          const response = await EUserRepository.updateUserByEmail(this.selectedUser.email, payload)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            )
          if (response.status >= 200 && response.status <= 299) {
            // var index = this.users.indexOf(this.selectedUser);
            // this.users.splice(index, 1)
            this.hideModal('deleteUserModal')
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Cập nhật thành công")
          }
        }
      },
      async initData() {
        const usersResponse = await UserRepository.getUsersByPage(this.$route.query.page || 0);
        if (usersResponse.status >= 200 && usersResponse.status <= 299) {
          this.totalPage = usersResponse.data.totalPage
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
      showModal(modalId) {
        $(`#${modalId}`).modal('show')
      },
      hideModal(modalId) {
        $(`#${modalId}`).modal('hide')
      },
      showEditModal(user) {
        this.selectedUser = user
        this.showModal('editUserModal')
      },
      showDeleteModal(user) {
        this.selectedUser = user
        this.showModal('deleteUserModal')
      },
      async deleteUser() {
        if (this.selectedUser) {
          console.log(this.selectedUser.email)
          const response = await EUserRepository.deleteUserById(this.selectedUser.email)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            )
          if (response.status >= 200 && response.status <= 299) {
            var index = this.users.indexOf(this.selectedUser);
            this.users.splice(index, 1)

            this.hideModal('deleteUserModal')
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Xóa thành công")
          }
        }
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
  }
</script>

<style scoped>
  .table-wrapper {
    background: #fff;
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  }

  .table-title {
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
  }

  .table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
  }

  .table-title .btn-group {
    float: right;
  }

  .table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    outline: none !important;
    margin-left: 10px;
  }

  .table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
  }

  .table-title .btn span {
    float: left;
    margin-top: 2px;
  }

  table.table tr th, table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
  }

  table.table tr th:first-child {
    width: 60px;
  }

  table.table tr th:last-child {
    width: 100px;
  }

  table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
  }

  table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
  }

  table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
  }

  table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
  }

  table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
  }

  table.table td a:hover {
    color: #2196F3;
  }

  table.table td a.edit {
    color: #FFC107;
  }

  table.table td a.delete {
    color: #F44336;
  }

  table.table td i {
    font-size: 19px;
  }

  table.table .avatar {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  .pagination {
    float: right;
    margin: 0 0 5px;
  }

  .pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
  }

  .pagination li a:hover {
    color: #666;
  }

  .pagination li.active a, .pagination li.active a.page-link {
    background: #03A9F4;
  }

  .pagination li.active a:hover {
    background: #0397d6;
  }

  .pagination li.disabled i {
    color: #ccc;
  }

  .pagination li i {
    font-size: 16px;
    padding-top: 6px
  }

  .hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
  }

  /* Custom checkbox */
  .custom-checkbox {
    position: relative;
  }

  .custom-checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    margin: 5px 0 0 3px;
    z-index: 9;
  }

  .custom-checkbox label:before {
    width: 18px;
    height: 18px;
  }

  .custom-checkbox label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    background: white;
    border: 1px solid #bbb;
    border-radius: 2px;
    box-sizing: border-box;
    z-index: 2;
  }

  .custom-checkbox input[type="checkbox"]:checked + label:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid #000;
    border-width: 0 3px 3px 0;
    z-index: 3;
    transform: rotateZ(45deg);
  }

  .custom-checkbox input[type="checkbox"]:checked + label:before {
    border-color: #03A9F4;
    background: #03A9F4;
  }

  .custom-checkbox input[type="checkbox"]:checked + label:after {
    border-color: #fff;
  }

  .custom-checkbox input[type="checkbox"]:disabled + label:before {
    color: #b8b8b8;
    cursor: auto;
    box-shadow: none;
    background: #ddd;
  }

  /* Modal styles */
  .modal .modal-dialog {
    max-width: 400px;
  }

  .modal .modal-header, .modal .modal-body, .modal .modal-footer {
    padding: 20px 30px;
  }

  .modal .modal-content {
    border-radius: 3px;
  }

  .modal .modal-footer {
    background: #ecf0f1;
    border-radius: 0 0 3px 3px;
  }

  .modal .modal-title {
    display: inline-block;
  }

  .modal .form-control {
    border-radius: 2px;
    box-shadow: none;
    border-color: #dddddd;
  }

  .modal textarea.form-control {
    resize: vertical;
  }

  .modal .btn {
    border-radius: 2px;
    min-width: 100px;
  }

  .modal form label {
    font-weight: normal;
  }

</style>
