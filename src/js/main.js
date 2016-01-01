import Vue from 'vue';
import ButtonBox from './button-box.js';
import UploadBox from './upload-box.js';
import CanvasBox from './canvas-box.js';

window.vm = new Vue({
  el: 'body',
  components: {
    ButtonBox,
    UploadBox,
    CanvasBox
  },
  events: {
    broadcast: function (type, data) {
      this.$broadcast(type, data);
    }
  }
});
