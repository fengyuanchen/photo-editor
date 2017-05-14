<template>
  <div class="navbar">
    <nav class="nav" @click="click">
      <label class="nav__button" for="file" title="Upload" role="button" v-show="!loader.loaded"><span class="fa fa-upload"></span></label>
      <button type="button" class="nav__button" data-action="restore" title="Undo (Ctrl + Z)" v-show="editor.cropped"><span class="fa fa-undo"></span></button>
      <button type="button" class="nav__button nav__button--danger" data-action="remove" title="Delete (Delete)" v-show="loader.loaded && !editor.cropping"><span class="fa fa-trash"></span></button>
      <button type="button" class="nav__button nav__button--danger" data-action="clear" title="Cancel (Esc)" v-show="editor.cropping"><span class="fa fa-ban"></span></button>
      <button type="button" class="nav__button nav__button--success" data-action="crop" title="OK (Enter)" v-show="editor.cropping"><span class="fa fa-check"></span></button>
      <a class="nav__button nav__button--success" title="Download" :download="loader.name" :href="loader.url" v-if="downloadable && loader.loaded"><span class="fa fa-download"></span></a>
      <a class="nav__button" href="https://github.com/fengyuanchen/photo-editor" title="View on GitHub"><span class="fa fa-github"></span></a>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        downloadable: typeof document.createElement('a').download !== 'undefined',
      };
    },

    computed: {
      editor() {
        return this.$store.state.editor;
      },

      loader() {
        return this.$store.state.loader;
      },
    },

    methods: {
      click({ target }) {
        const action = target.dataset.action || target.parentNode.dataset.action;

        if (action) {
          this.$emit('change', action);
        }
      },
    },
  };
</script>

<style scoped>
  .navbar {
    float: right;
  }

  .nav {
    &__button {
      background-color: transparent;
      border-width: 0;
      color: #fff;
      cursor: pointer;
      display: block;
      float: left;
      font-size: 16px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      width: 48px;

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: #0074d9;
        color: #fff;
      }

      &--success {
        &:hover {
          background-color: #2ecc40;
        }
      }

      &--danger {
        &:hover {
          background-color: #ff4136;
        }
      }
    }
  }
</style>
