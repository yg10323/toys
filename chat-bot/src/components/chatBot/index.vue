<template>
  <div class="chat-bot">
    <div class="content">
      <ul v-for="(configName, index) in configNames" :key="index">
        <li
          v-for="(item, index) in config[configName].msg"
          :key="index"
          v-show="config[configName].showMessage[index]"
        >
          <span>{{ config[configName].showMessage[index] }}</span>
        </li>

        <li
          class="btns"
          v-if="config[configName].msgHasBeenShown && config[configName].btns"
        >
          <button
            class="btn"
            v-for="(value, index) in Object.values(config[configName].btns)"
            :key="index"
            @click="handleBtnClick(Object.keys(config[configName].btns)[index])"
          >
            {{ value }}
          </button>
        </li>
      </ul>
      <!-- 展示按钮的条件：文字展示完并且当前展示的文本项有配置按钮 -->
    </div>
  </div>
</template>

<script>
import config from "./config.json";

export default {
  name: "",
  data() {
    return {
      config: "",
      nextConfig: "firstShowMsg",
      configNames: ["firstShowMsg"],
      index: 0,
      counter: 0,
    };
  },
  created() {
    let _config = this.$utils.deepClone(config);
    this.config = this.$utils.formatData(_config);
  },
  mounted() {
    this.outText();
  },
  methods: {
    // 展示文字
    outText() {
      let config = this.config[this.nextConfig];
      // 依次获取数组中的文本项
      let text = config.msg[this.index];
      // 当前文本项展示完成后，更新index并初始化counter
      if (text.length === config.showMessage[this.index].length) {
        this.index += 1;
        this.counter = 0;
      }
      // index越界后结束函数
      if (this.index == config.msg.length) {
        config.msgHasBeenShown = true;
        return;
      }
      // 定时更新要显示的文本
      if (this.counter < text.length) {
        config.showMessage[this.index] += text.charAt(this.counter);
        this.counter += 1;
        setTimeout(this.outText, 150);
      }
    },
    // 按钮点击
    handleBtnClick(nextConfigName) {
      this.index = 0;
      this.nextConfig = nextConfigName;
      this.configNames.push(nextConfigName);
      this.outText();
    },
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

.chat-bot {
  user-select: none;
}

.content {
  padding: 10px;
  width: 500px;
  height: 500px;
  background-color: red;
}

.content li {
  list-style: none;
  margin-bottom: 10px;
}

.content span {
  padding: 0 5px;
  background-color: #ccc;
  border-radius: 10px;
}

.btns {
  display: flex;
  justify-content: right;
}

.btns .btn {
  margin-left: 5px;
}
</style>