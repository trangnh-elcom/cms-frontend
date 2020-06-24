<template>
  <div>
    <TopHeader/>
    <nuxt />
    <PageFooter/>
  </div>
</template>

<style>
</style>
<script>
  import TopHeader from "../components/header/TopHeader";
  import PageFooter from "../components/footer/PageFooter";
  import {
    ON_SHOW_ERROR_MESSAGE_EVENT_NAME,
    ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME
  } from "../components/const/event_name";
  export default {
    components: {PageFooter, TopHeader},
    head() {
      return {
        link: [
          {rel: 'icon', type: 'image/x-icon', href: 'img/core-img/favicon.ico'},
          {
            rel: "stylesheet",
            href: "style.css",
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/icon?family=Material+Icons",
          }
        ],
        script: [
          {src: 'js/jquery/jquery-2.2.4.min.js', body: true, defer: 'true'},
          {src: 'js/bootstrap/popper.min.js', body: true, defer: 'true'},
          {src: 'js/bootstrap/bootstrap.min.js', body: true, defer: 'true'},
          {src: 'js/plugins/plugins.js', body: true, defer: 'true'},
          {src: 'js/active.js', body: true, defer: 'true'}
        ]
      }
    },
    mounted() {
      this.addNuxtEventListener()
    },
    methods: {
      addNuxtEventListener() {
        this.$nuxt.$on(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME, (message) => {
          this.makeToast(message, 'success')
        })
        this.$nuxt.$on(ON_SHOW_ERROR_MESSAGE_EVENT_NAME, (message) => {
          this.makeToast(message, 'danger')
        })
      },
      makeToast(message, variant = null) {
        this.$bvToast.toast(message, {
          variant: variant,
          solid: true
        })
      }
    },
    beforeDestroy() {
      this.$nuxt.$off(ON_SHOW_SUCCESS_MESSAGE_EVENT_NAME);
      this.$nuxt.$off(ON_SHOW_ERROR_MESSAGE_EVENT_NAME);
    }
  }
</script>
