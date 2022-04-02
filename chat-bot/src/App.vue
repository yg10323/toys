<template>
  <div id="app">
    <chat-bot></chat-bot>
  </div>
</template>

<script>
import ChatBot from "./components/chatBot/index.vue";

export default {
  name: "App",
  components: { ChatBot },
};
</script>

<style lang="scss">
// #app {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
</style>
