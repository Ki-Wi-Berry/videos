import videoPlay from './Player/main.vue';

function install(app) {
  app.component(videoPlay.name, videoPlay)
}
videoPlay.install = install
export {
  videoPlay,
  install
}
export default videoPlay;