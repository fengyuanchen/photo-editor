export default {
  data: function () {
    return {
      uploaded: false
    };
  },
  template: '#upload-box',
  methods: {
    read: function (file, callback = () => {}) {
      let reader = null;

      if (file) {
        if (/^image\/\w+$/.test(file.type)) {
          reader = new FileReader();

          reader.onload = () => {
            this.uploaded = true;
            this.$dispatch('broadcast', 'uploaded', {
              type: file.type,
              name: file.name,
              url: reader.result
            });

            callback();
          };

          reader.readAsDataURL(file);
        } else {
          window.alert('Please choose an image file.');
          callback();
        }
      } else {
        callback();
      }
    },
    change: function (e) {
      const target = e.target;
      const files = target.files;

      this.read(files && files[0], () => {
        target.value = '';
      });
    },
    dragover: function (e) {
      e.preventDefault();
    },
    drop: function (e) {
      const files = e.dataTransfer.files;

      e.preventDefault();

      this.read(files && files[0]);
    }
  },
  events: {
    remove: function () {
      this.uploaded = false;
    },
    removed: function () {
      this.uploaded = false;
    }
  }
};
