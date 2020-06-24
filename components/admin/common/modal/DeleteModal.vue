<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div id="formDeleteUserModal">
        <div class="modal-header">
          <h4 class="modal-title">Xóa bản ghi</h4>
          <button aria-hidden="true" class="close" data-dismiss="modal" type="button">&times;</button>
        </div>
        <div class="modal-body">
          <p>Bạn có muốn xóa bản ghi không?</p>
          <p style="height: fit-content">{{message}}</p>
          <p class="text-warning"><small>Hành động này không thể khôi phục</small></p>
        </div>
        <div class="modal-footer">
          <input class="btn btn-default" data-dismiss="modal" type="button" value="Cancel">
          <input class="btn btn-danger" type="submit" value="Delete" @click="emitOkEvent">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DeleteModal",
    props: {
      message: {
        type: String,
        default: ""
      },
      onOkEvent: {
        type: String
      }
    },
    methods: {
      emitOkEvent() {
        $nuxt.$emit(this.onOkEvent)
      }
    }
  }
</script>

<style scoped>

</style>
