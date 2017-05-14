<template>
  <div class="app">
    <header class="header">
      <span class="title">Photo Editor</span>
      <navbar @change="change"></navbar>
    </header>
    <main class="main">
      <editor ref="editor" v-if="$store.state.loader.loaded"></editor>
      <loader ref="loader" v-else></loader>
    </main>
  </div>
</template>

<script>
  export default {
    methods: {
      change(action) {
        switch (action) {
          case 'crop':
            this.$refs.editor.crop();
            break;

          case 'clear':
            this.$refs.editor.clear();
            break;

          case 'restore':
            this.$refs.editor.restore();
            break;

          case 'remove':
            this.$refs.editor.reset();
            break;

          default:
        }
      },
    },
  };
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
</style>

<style scoped>
  .app {
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
  }

  .header {
    background-color: #666;
    height: 48px;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .header {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  .title {
    color: #fff;
    display: block;
    float: left;
    font-size: 18px;
    line-height: 48px;
  }

  .main {
    background-color: #333;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 48px;
  }
</style>
