<template>
  <p>posts</p>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {RepositoryFactory} from "@/repository/RespositoryFactory";
  import DeleteModal from "../../components/admin/common/modal/DeleteModal";
  import {
    ON_SHOW_ERROR_MESSAGE_EVENT_NAME,
    ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME
  } from "../../components/const/event_name";
  import CategoryModal from "../../components/admin/categories/CategoryModal";
  import {EditorRepositoryFactory} from "../../repository/EditorRepoFactory";
  import {hideModalById, showModalById} from "../../assets/js/boostrap-modal";

  const CategoryRepository = RepositoryFactory.get('category');
  const EditorCategoryRepository = EditorRepositoryFactory.get("category");
  export default {
    name: "posts",
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
        newCategory: this.initCategory(),
        selectedCategories: this.initCategory(),
        onDeleteEventName: 'ON_DELETE_CATEGORY',
        onEditEventName: 'ON_EDIT_CATEGORY',
        onAddEventName: 'ON_ADD_CATEGORY',
        onDeleteCheckedEventName: 'ON_DELETE_CHECKED_CATEGORIES',
        checkboxes: [],
        allCategories: []
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
          var payload = {};
          Object.assign(payload, this.newCategory);
          payload.parentId = null
          if (this.newCategory.parentCategory != null) {
            payload.parentId = this.newCategory.parentCategory.id
          }
          const response = await EditorCategoryRepository.updateCategoryById(this.newCategory.id, payload)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            // var index = this.users.indexOf(this.selectedUser);
            // this.users.splice(index, 1)
            hideModalById('editCategoryModal')
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Cập nhật thành công")
          }
        }
      },
      async initData() {
        const categoriesResponse = await CategoryRepository.getCategoriesByPage(this.$route.query.page || 0);
        if (categoriesResponse.status >= 200 && categoriesResponse.status <= 299) {
          this.totalPage = categoriesResponse.data.totalPage;
          this.categories = categoriesResponse.data.content
        }
        const allCategoriesResponse = await CategoryRepository.getAllCategories();
        if (allCategoriesResponse.status >= 200 && allCategoriesResponse.status <= 299) {
          this.allCategories = allCategoriesResponse.data
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
          parentId: undefined,
          parentCategory: undefined
        }
      },
      showAddModal() {
        this.newCategory = this.initCategory();
        showModalById('addCategoryModal')
      },
      showEditModal(category) {
        this.newCategory = category;
        showModalById('editCategoryModal')
      },
      showDeleteModal(category) {
        this.newCategory = category;
        showModalById('deleteCategoryModal')
      },
      async deleteCategory() {
        if (this.newCategory) {
          const category = this.newCategory
          const response = await EditorCategoryRepository.deleteCategoryById(category.id)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            const index = this.categories.indexOf(category);
            this.categories.splice(index, 1);

            hideModalById('deleteCategoryModal')
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Xóa thành công")
          }
        }
      },
      async addCategory() {
        if (this.newCategory) {
          this.newCategory.parentId = null
          if (this.newCategory.parentCategory != null) {
            this.newCategory.parentId = this.newCategory.parentCategory.id
          }
          const response = await EditorCategoryRepository.addCategory(this.newCategory)
            .catch(reason => {
                const errorMessage = reason.response.data.apierror.message;
                $nuxt.$emit(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, errorMessage)
              }
            );
          if (response.status >= 200 && response.status <= 299) {
            this.categories = [response.data, ...this.categories];
            hideModalById('addCategoryModal')
            $nuxt.$emit(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, "Thêm thành công")
          }
          this.newCategory = this.initCategory()
        }
      },
      showDeleteCheckedModal() {
        showModalById('deleteCheckedCategoryModal')
      },
      deleteCheckedCategories() {
        for (let index = 0; index < this.checkboxes.length; index += 1) {
          if (this.checkboxes[index]) {
            this.newCategory = this.categories[index];
            this.deleteCategory()
          }
        }
        hideModalById('deleteCheckedCategoryModal')
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
      categories() {
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
<!--"Tiêu đề",-->
<!--"Tóm tắt",-->
<!--"Nội dung",-->
<!--"Chuyên mục",-->
<!--"Biên tập viên",-->
<!--"Hành động"-->
<style scoped>

</style>
