<template>
  <div class="navbar">
    <nav class="nav" @click="click">
      <label class="nav__button" for="file" title="Upload" role="button" v-if="!data.loaded"><span class="fa fa-upload"></span></label>
      <button type="button" class="nav__button" data-action="restore" title="Undo (Ctrl + Z)" v-if="data.cropped"><span class="fa fa-undo"></span></button>
      <button type="button" class="nav__button nav__button--danger" data-action="remove" title="Delete (Delete)" v-if="data.loaded && !data.cropping"><span class="fa fa-trash"></span></button>
      <button type="button" class="nav__button nav__button--danger" data-action="clear" title="Cancel (Esc)" v-if="data.cropping"><span class="fa fa-ban"></span></button>
      <button type="button" class="nav__button nav__button--success" data-action="crop" title="OK (Enter)" v-if="data.cropping"><span class="fa fa-check"></span></button>
      <a class="nav__button nav__button--success" title="Download" :download="data.name" :href="data.url" v-if="downloadable && data.loaded"><span class="fa fa-download"></span></a>
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

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },

    methods: {
      click({ target }) {
        const action = target.getAttribute('data-action') || target.parentElement.getAttribute('data-action');

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

  .nav__button {
    background-color: transparent;
    border-width: 0;
    color: #fff;
    cursor: pointer;
    display: block;
    float: left;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    width: 3rem;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: #0074d9;
      color: #fff;
    }
  }

  .nav--success:hover {
    background-color: #2ecc40;
  }

  .nav--danger:hover {
    background-color: #ff4136;
  }
</style>
