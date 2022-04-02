<template>
  <div class="chat-bot">
    <div class="content">
      <h2>你好，恒发欧系啊双方的健康</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

// .content::after {
//   content: "";
//   display: block;
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 2px;
//   height: 100%;
//   background: #000;
//   animation: blink 1s linear infinite;
// }

// @keyframes blink {
//   0%,
//   49% {
//     opacity: 1;
//   }
//   50%,
//   100% {
//     opacity: 0;
//   }
// }

.content h2 {
  font: bold 4em TencentSans;
  letter-spacing: 5px;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 5s forwards;
}

@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>