<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <form @submit.prevent="emitOkEvent" id="formAddCategoryModal">
        <div class="modal-header">
          <h4 class="modal-title">Thêm mới chuyên mục</h4>
          <button aria-hidden="true" class="close" data-dismiss="modal" type="button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="addName">Tên</label>
            <input class="form-control" id="addName" required type="text" v-model="category.name">
          </div>
          <div class="form-group">
            <label>Chuyên mục cha</label>
            <br>
            <v-select :options="categories" label="name" v-model="category.parentCategory">
              <template slot="option" slot-scope="option">
                {{ option.name }}
              </template>
            </v-select>
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
    name: "CategoryModal",
    props: {
      category: {
        type: Object
      },
      categories: {
        type: Array
      },
      onOkEvent: {
        type: String
      }
    },
    head() {
      return {
        link: [
          {rel: "stylesheet", href: "https://unpkg.com/vue-select@3.0.0/dist/vue-select.css"}
        ]
      }
    },
    methods: {
      emitOkEvent() {
        $nuxt.$emit(this.onOkEvent)
      },
    }
  }
</script>

<style scoped>

</style>
