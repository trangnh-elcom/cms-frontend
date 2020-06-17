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
  export default {
    components: {PageFooter, TopHeader},
    head() {
      return {
        link: [
          {rel: 'icon', type: 'image/x-icon', href: 'img/core-img/favicon.ico'},
          {
            rel: "stylesheet",
            href: "style.css",
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
    }
  }
</script>
