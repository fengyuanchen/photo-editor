{
  "name": "photo-editor",
  "description": "A photo editing application based on the Cropper.js",
  "version": "1.2.0",
  "main": "index.html",
  "scripts": {
    "build": "webpack --mode production --env.production",
    "clean": "del-cli dist index.html",
    "lint": "eslint src *.js --ext .js,.vue --fix",
    "release": "npm run clean && npm run lint && npm run build",
    "serve": "webpack-dev-server --mode development --host 0.0.0.0 --useLocalIp --hot --open --overlay",
    "start": "npm run serve"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fengyuanchen/photo-editor.git"
  },
  "author": {
    "name": "Chen Fengyuan",
    "url": "https://chenfengyuan.com/"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/fengyuanchen/photo-editor/issues"
  },
  "homepage": "https://fengyuanchen.github.io/photo-editor",
  "dependencies": {
    "@babel/polyfill": "^7.12.1",
    "cropperjs": "^1.5.11",
    "normalize.css": "^8.0.1",
    "vue": "^2.6.12"
  },
  "devDependencies": {
    "@babel/core": "^7.13.16",
    "@babel/preset-env": "^7.13.15",
    "babel-loader": "^8.2.2",
    "css-loader": "^3.6.0",
    "cssnano": "^4.1.11",
    "del-cli": "^3.0.1",
    "eslint": "^6.7.1",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-html": "^6.1.2",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-vue": "^6.2.2",
    "html-webpack-plugin": "^3.2.0",
    "postcss-cli": "^6.1.3",
    "postcss-import": "^12.0.1",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^1.3.0",
    "vue-loader": "^15.9.6",
    "vue-template-compiler": "^2.6.12",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.2"
  }
}
