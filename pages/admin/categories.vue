<template>
  <div>
    {{categories}}
    {{checkboxes}}
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>Quản lý thông tin chuyên mục</h2>
            </div>
            <div class="col-sm-6">
              <a @click="showAddModal" class="btn btn-success"><i
                  class="material-icons">&#xE147;</i> <span>Thêm chuyên mục</span></a>
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
          <tr :key="category.id" v-for="(category, index) in categories">
            <td>
                  <span class="custom-checkbox">
                  <input id="checkbox1" name="options[]" type="checkbox" v-model="checkboxes[index]" value="1">
                  <label for="checkbox1"></label>
                  </span>
            </td>
            <td>
              <p>{{category.name}}</p>
            </td>
            <td>
              <p v-if="category.parentCategory">{{category.parentCategory.name}}</p>
            </td>
            <td>
              <div id="editAnUser">
                <a @click="showEditModal(category)" class="edit">
                  <i class="material-icons"
                     data-toggle="tooltip"
                     title="Chỉnh sửa">&#xE254;
                  </i>
                </a>
              </div>
              <div id="removeAnUser">
                <a @click="showDeleteModal(category)" class="delete">
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
              <a :href="'categories?page='+(index-1)" class="page-link">{{index}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Add Modal HTML -->
    <div class="modal fade" id="addCategoryModal">
      <CategoryModal :onOkEvent="onAddEventName" :categories="roles" :category="newCategory" mode="add"></CategoryModal>
    </div>
    <!-- Edit Modal HTML -->
    <div class="modal fade" id="editCategoryModal">
      <CategoryModal :onOkEvent="onEditEventName" :categories="roles" :user="newCategory" mode="edit"></CategoryModal>
    </div>
    <!-- Delete Modal HTML -->
    <div class="modal fade" id="deleteCategoryModal">
      <DeleteModal :message="newCategory.email" :onOkEvent="onDeleteEventName"></DeleteModal>
    </div>
    <div class="modal fade" id="deleteCheckedCategoryModal">
      <DeleteModal :onOkEvent="onDeleteCheckedEventName"></DeleteModal>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {RepositoryFactory} from "@/repository/RespositoryFactory";
  import {EmployerRepositoryFactory} from "../../repository/EmployerRepoFactory";
  import DeleteModal from "../../components/admin/common/modal/DeleteModal";
  import {
    ON_SHOW_ERROR_MESSAGE_EVENT_NAME,
    ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME
  } from "../../components/const/event_name";
  import CategoryModal from "../../components/admin/categories/CategoryModal";

  const CategoryRepository = RepositoryFactory.get('category');
  const EUserRepository = EmployerRepositoryFactory.get('user');
  const RoleRepository = RepositoryFactory.get('role');
  export default {
    name: "categories",
    layout: 'admin',
    components: {CategoryModal, DeleteModal},
    middleware: 'auth',
    mounted() {
      this.addNuxtEventListener();
      this.initData()
    },
    data() {
      return {
        categories: [],
        totalPage: 0,
        isCheckedAll: false,
        tableHeaders: [
          "Tên",
          "Chuyên mục cha",
          "Hành động"
        ],
        categories: [],
        newCategory: this.initCategory(),
        selectedCategories: this.initCategory(),
        onDeleteEventName: 'ON_DELETE_CATEGORY',
        onEditEventName: 'ON_EDIT_CATEGORY',
        onAddEventName: 'ON_ADD_CATEGORY',
        onDeleteCheckedEventName: 'ON_DELETE_CHECKED_CATEGORIES',
        checkboxes: []
      }
    },
    methods: {
      addNuxtEventListener() {
        this.$nuxt.$on(this.onDeleteEventName, () => {
          this.deleteCategory()
        });
        this.$nuxt.$on(this.onEditEventName, () => {
          this.updateCategory()
        });
        this.$nuxt.$on(this.onAddEventName, () => {
          this.addCategory()
        });
        this.$nuxt.$on(this.onDeleteCheckedEventName, () => {
          this.deleteCheckedCategories()
        })
      },
      async updateCategory() {
        if (this.newCategory) {
          // TODO: Update this code
          // var payload = {};
          // Object.assign(payload, this.newCategory);
          // payload.roles = this.newCategory.roles.map(value => value.name);
          // console.log(payload);
          // const response = await EUserRepository.updateUserByEmail(this.newCategory.email, payload)
          //   .catch(reason => {
          //       const errorMessage = reason.response.data.apierror.message;
          //       $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
          //     }
          //   );
          // if (response.status >= 200 && response.status <= 299) {
          //   // var index = this.users.indexOf(this.selectedUser);
          //   // this.users.splice(index, 1)
          //   this.hideModal('editCategoryModal');
          //   $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Cập nhật thành công")
          // }
        }
      },
      async initData() {
        const categoriesResponse = await CategoryRepository.getCategoriesByPage(this.$route.query.page || 0);
        if (categoriesResponse.status >= 200 && categoriesResponse.status <= 299) {
          this.totalPage = categoriesResponse.data.totalPage;
          this.categories = categoriesResponse.data.content
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
      initCategory() {
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
      showAddModal() {
        this.newCategory = this.initCategory();
        this.showModal('addCategoryModal')
      },
      showEditModal(user) {
        this.newCategory = user;
        this.showModal('editCategoryModal')
      },
      showDeleteModal(user) {
        this.newCategory = user;
        this.showModal('deleteCategoryModal')
      },
      async deleteCategory() {
        if (this.newCategory) {
          console.log(this.newCategory.email);
          const response = await EUserRepository.deleteUserById(this.newCategory.email)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            var index = this.categories.indexOf(this.newCategory);
            this.categories.splice(index, 1);

            this.hideModal('deleteCategoryModal');
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Xóa thành công")
          }
        }
      },
      async addCategory() {
        if (this.newCategory) {
          console.log(this.newCategory.roles);
          var payload = {};
          Object.assign(payload, this.newCategory);
          payload.roles = this.newCategory.roles.map(value => value.name);
          console.log(payload);
          const response = await EUserRepository.addUserByAdmin(payload)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            this.categories = [this.newCategory, ...this.categories];
            this.hideModal('addCategoryModal');
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Thêm thành công")
          }
          this.newCategory = this.initCategory()
        }
      },
      showDeleteCheckedModal() {
        this.showModal('deleteCheckedCategoryModal');
      },
      deleteCheckedCategories() {
        for (var index = 0; index < this.checkboxes.length; index += 1) {
          if (this.checkboxes[index]) {
            this.newCategory = this.categories[index];
            this.deleteCategory()
          }
        }
        this.hideModal('deleteCheckedCategoryModal');
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
        this.checkboxes = new Array(this.categories.length)
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
