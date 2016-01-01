export default {
  data: function () {
    return {
      uploaded: false,
      cropping: false,
      cropped: false,
      download: typeof document.createElement('a').download !== 'undefined',
      url: '',
      name: ''
    };
  },
  template: '#button-box',
  methods: {
    click: function (e) {
      const target = e.target;
      const action = target.dataset.action || target.parentNode.dataset.action;

      if (action) {
        switch (action) {
          case 'restore':
            this.restore();
            break;

          case 'remove':
            this.remove();
            break;

          case 'clear':
          case 'crop':
            this.cropping = false;
            break;
        }

        this.$dispatch('broadcast', action);
      }
    },
    restore: function () {
      this.cropped = false;
      this.url = '';
      this.name = '';
    },
    remove: function () {
      this.uploaded = false;
      this.cropping = false;

      if (this.cropped) {
        this.restore();
      }
    }
  },
  events: {
    uploaded: function () {
      this.uploaded = true;
    },
    cropping: function () {
      this.cropping = true;
    },
    cleared: function () {
      this.cropping = false;
    },
    restored: function () {
      this.restore();
    },
    removed: function () {
      this.remove();
    },
    cropped: function (data) {
      this.cropped = true;
      this.cropping = false;

      if (this.download) {
        this.url = data.url;
        this.name = data.name;
      }
    }
  }
};
