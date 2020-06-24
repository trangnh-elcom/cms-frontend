<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="formAddCategoryModal">
        <div class="modal-header">
          <h4 class="modal-title">Thêm mới chuyên mục</h4>
          <button aria-hidden="true" class="close" data-dismiss="modal" type="button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="addName">Tên</label>
            <input class="form-control" id="addName" required type="text">
          </div>
          <div class="form-group">
            <label for="addParent">Chuyên mục cha</label>
            <br>
            <select id="addParent">
              <option value="">#</option>
<!--              <th:block th:each="cate1: ${categories}">-->
<!--                <option th:text="${cate1.name}" th:value="${cate1.id}"></option>-->
<!--              </th:block>-->
            </select>
          </div>
          <client-only>
            <v-select :options="['a', 'b', 'c']" label="label">
              <template slot="option" slot-scope="option">
                {{ option }}
              </template>
            </v-select>
          </client-only>
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
    components: {ModelSelect},
    props: {
      category: {
        type: Object
      },
      categories: {
        type: Object
      }
    }
  }
</script>

<style scoped>

</style>
