<template>
  <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th>
           <span class="custom-checkbox">
            <input id="selectAll" type="checkbox">
            <label for="selectAll"></label>
           </span>
      </th>
      <th v-for="header in tableHeaders">
        {{header}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in tableData" :key="user.id">
      <td>
        <span class="custom-checkbox">
        <input id="checkbox1" name="options[]" type="checkbox" value="1">
        <label for="checkbox1"></label>
        </span>
      </td>
      <td v-for="(template, index) in templateOrder" :key="index">
        <span v-html="template">}</span>
      </td>
<!--      <td>-->
<!--        <p>{{user.name}}</p>-->
<!--      </td>-->
<!--      <td>-->
<!--        <p>{{user.email}}</p>-->
<!--      </td>-->
<!--      <td>-->
<!--        <p>{{user.locked}}</p>-->
<!--      </td>-->
<!--      <td>-->
<!--          <span v-for="role in user.roles">-->
<!--            {{role.name}}-->
<!--          </span>-->
<!--      </td>-->
      <td>
        <div id="editAnUser">
          <a class="edit" data-toggle="modal" href="#editUserModal">
            <i class="material-icons"
               data-toggle="tooltip"
               title="Chỉnh sửa">&#xE254;
            </i>
          </a>
        </div>
        <div id="removeAnUser">
          <a class="delete" data-toggle="modal" href="#deleteUserModal">
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
</template>

<script>
  export default {
    name: "CrudTable",
    props: {
      tableHeaders: {
        type: Object,
      },
      tableData: {
        type: Array
      },
      templateOrder: {
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>
