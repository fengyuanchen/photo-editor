<template>
  <div class="navbar">
    <nav
      class="nav"
      @click="click"
    >
      <label
        v-if="!data.loaded"
        class="nav__button"
        for="file"
        title="Upload"
        role="button"
      ><span class="fa fa-upload" /></label>
      <button
        v-if="data.cropped"
        type="button"
        class="nav__button"
        data-action="restore"
        title="Undo (Ctrl + Z)"
      >
        <span class="fa fa-undo" />
      </button>
      <button
        v-if="data.loaded && !data.cropping"
        type="button"
        class="nav__button nav__button--danger"
        data-action="remove"
        title="Delete (Delete)"
      >
        <span class="fa fa-trash" />
      </button>
      <button
        v-if="data.cropping"
        type="button"
        class="nav__button nav__button--danger"
        data-action="clear"
        title="Cancel (Esc)"
      >
        <span class="fa fa-ban" />
      </button>
      <button
        v-if="data.cropping"
        type="button"
        class="nav__button nav__button--success"
        data-action="crop"
        title="OK (Enter)"
      >
        <span class="fa fa-check" />
      </button>
      <a
        v-if="downloadable && data.loaded"
        class="nav__button nav__button--success"
        title="Download"
        :download="data.name"
        :href="data.url"
      ><span class="fa fa-download" /></a>
      <a
        class="nav__button"
        href="https://github.com/fengyuanchen/photo-editor"
        title="View on GitHub"
      ><span class="fa fa-github" /></a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      downloadable: typeof document.createElement('a').download !== 'undefined',
    };
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
