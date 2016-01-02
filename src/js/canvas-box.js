import Cropper from 'cropper';

export default {
  data: function () {
    return {
      editable: false,
      cropper: false,
      cropping: false,
      data: null,
      canvasData: null,
      cropBoxData: null,
      image: null,
      type: '',
      name: '',
      url: '',
      originalUrl: ''
    };
  },
  template: '#canvas-box',
  ready: function () {
    window.addEventListener('keydown', this.keydown, false);
  },
  beforeDestory: function () {
    window.removeEventListener('keydown', this.keydown, false);
  },
  methods: {
    load: function (e) {
      if (!this.image) {
        this.image = e.target;
        this.start();
      }
    },
    click: function (e) {
      const cropper = this.cropper;
      const target = e.target;
      let action = '';

      if (!cropper) {
        return;
      }

      action = target.dataset.action || target.parentNode.dataset.action;

      switch (action) {
        case 'move':
        case 'crop':
          cropper.setDragMode(action);
          break;

        case 'zoom-in':
          cropper.zoom(0.1);
          break;

        case 'zoom-out':
          cropper.zoom(-0.1);
          break;

        case 'rotate-left':
          cropper.rotate(-90);
          break;

        case 'rotate-right':
          cropper.rotate(90);
          break;

        case 'flip-horizontal':
          cropper.scaleX(-this.cropper.getData().scaleX || -1);
          break;

        case 'flip-vertical':
          cropper.scaleY(-this.cropper.getData().scaleY || -1);
          break;

        // No default
      }
    },
    keydown: function (e) {
      const cropper = this.cropper;
      const key = e.key || e.keyCode || e.which || e.charCode;

      switch (key) {

        // Undo crop (Key: Ctrl + Z)
        case 90:
          if (e.ctrlKey) {
            e.preventDefault();
            this.restore(true);
          }

          break;

        // Delete the image (Key: Delete)
        case 46:
          this.remove(true);
          break;
      }

      if (!cropper) {
        return;
      }

      switch (key) {

        // Crop the image (Key: Enter)
        case 13:
          this.crop(true);
          break;

        // Clear crop area (Key: Esc)
        case 27:
          this.clear(true);
          break;

        // Move to the left (Key: ←)
        case 37:
          e.preventDefault();
          cropper.move(-1, 0);
          break;

        // Move to the top (Key: ↑)
        case 38:
          e.preventDefault();
          cropper.move(0, -1);
          break;

        // Move to the right (Key: →)
        case 39:
          e.preventDefault();
          cropper.move(1, 0);
          break;

        // Move to the bottom (Key: ↓)
        case 40:
          e.preventDefault();
          cropper.move(0, 1);
          break;

        // Enter crop mode (Key: C)
        case 67:
          cropper.setDragMode('crop');
          break;

        // Enter move mode (Key: M)
        case 77:
          cropper.setDragMode('move');
          break;

        // Zoom in (Key: I)
        case 73:
          cropper.zoom(0.1);
          break;

        // Zoom out (Key: O)
        case 79:
          cropper.zoom(-0.1);
          break;

        // Rotate left (Key: L)
        case 76:
          cropper.rotate(-90);
          break;

        // Rotate right (Key: R)
        case 82:
          cropper.rotate(90);
          break;

        // Flip horizontal (Key: H)
        case 72:
          cropper.scaleX(-this.cropper.getData().scaleX || -1);
          break;

        // Flip vertical (Key: V)
        case 86:
          cropper.scaleY(-this.cropper.getData().scaleY || -1);
          break;
      }
    },
    dblclick: function (e) {
      if (e.target.className.indexOf('cropper-face') >= 0) {
        e.preventDefault();
        e.stopPropagation();
        this.crop(true);
      }
    },
    start: function () {
      const _this = this;

      if (this.cropper) {
        return;
      }

      this.cropper = new Cropper(this.image, {
        autoCrop: false,
        dragMode: 'move',
        background: false,
        built: function () {
          if (_this.data) {
            this.cropper
              .crop()
              .setData(_this.data)
              .setCanvasData(_this.canvasData)
              .setCropBoxData(_this.cropBoxData);
            _this.data = null;
            _this.canvasData = null;
            _this.cropBoxData = null;
          }
        },
        crop: function (data) {
          if (data.width > 0 && data.height > 0 && !_this.cropping) {
            _this.cropping = true;
            _this.$dispatch('broadcast', 'cropping');
          }
        }
      });
    },
    stop: function () {
      if (this.cropper) {
        this.cropper.destroy();
        this.cropper = null;
        this.cropping = false;
      }
    },
    crop: function (dispatch) {
      const cropper = this.cropper;
      const type = this.type;

      if (this.cropping) {
        this.originalUrl = this.url;
        this.data = cropper.getData();
        this.canvasData = cropper.getCanvasData();
        this.cropBoxData = cropper.getCropBoxData();
        this.url = cropper.getCroppedCanvas(type === 'image/png' ? null : {
          fillColor: '#fff'
        }).toDataURL(type);
        this.stop();

        if (dispatch) {
          this.$dispatch('broadcast', 'cropped', {
            url: this.url,
            name: this.name
          });
        }
      }
    },
    clear: function (dispatch) {
      if (this.cropping) {
        this.cropper.clear();
        this.cropping = false;

        if (dispatch) {
          this.$dispatch('broadcast', 'cleared');
        }
      }
    },
    restore: function (dispatch) {
      if (!this.cropper) {
        this.image = null;
        this.url = this.originalUrl;
        this.originalUrl = '';

        if (dispatch) {
          this.$dispatch('broadcast', 'restored');
        }
      }
    },
    remove: function (dispatch) {

      // Disallow to delete image when cropping
      if (this.cropping) {
        return;
      }

      this.stop();
      this.editable = false;
      this.data = null;
      this.image = null;
      this.type = '';
      this.name = '';
      this.url = '';
      this.originalUrl = '';

      if (dispatch) {
        this.$dispatch('broadcast', 'removed');
      }
    }
  },
  events: {
    uploaded: function ({url, type, name}) {
      this.editable = true;
      this.type = type;
      this.name = name;
      this.url = url;
    },
    remove: function () {
      this.remove();
    },
    crop: function () {
      this.crop(true);
    },
    clear: function () {
      this.clear();
    },
    restore: function () {
      this.restore();
    }
  }
};
