<template>
  <div id="app">
    <div>
      <TimePicker
        v-model="time1"
        placeholder="Select time"
        placement="bottom-end"
        style="width: 168px"
        type="timerange"
      ></TimePicker>
    </div>
    <div>
      <Time ref="mTime" :interval="1" :time="time3" />
    </div>
    <div style="display: inline-block;margin-top: 10px">
      <div style="display: flex;margin-bottom: 10px">
        <span>小时：</span>
        <FlipDown :endDate="endDate" />
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span>分钟：</span>
        <FlipDown :endDate="endDate" theme="2" type="2" />
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span>秒钟：</span>
        <FlipDown :endDate="endDate" type="1" />
      </div>
    </div>
    <div>
      <Progress
        :percent="tPercent * 100"
        :stroke-width="20"
        status="active"
        style="width: 268px"
        text-inside
      />
    </div>
    <div>
      <Progress
        :percent="100 - tPercent * 100"
        :stroke-width="20"
        status="active"
        style="width: 268px"
        text-inside
      />
    </div>
  </div>
</template>

<script>
import FlipDown from "vue-flip-down";

export default {
  name: "app",
  components: { FlipDown },
  data() {
    return {
      timeString: String(
        new Date().getFullYear() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getDate() +
          " "
      ),
      time1: ["09:00:00", "18:00:00"],
      tPercent: 0,
      timer: null
    };
  },
  computed: {
    time3() {
      return (
        new Date().getTime() +
        (new Date(this.timeString + this.time1[1]).getTime() -
          new Date().getTime())
      );
    },
    endDate() {
      return new Date(this.timeString + this.time1[1]).getTime();
    }
  },

  mounted() {
    this.setTime();
    this.timer = setInterval(() => {
      this.setTime();
    }, 1000);
  },
  methods: {
    setTime() {
      this.tPercent = (
        (new Date().getTime() -
          new Date(this.timeString + this.time1[0]).getTime()) /
        (new Date(this.timeString + this.time1[1]).getTime() -
          new Date(this.timeString + this.time1[0]).getTime())
      ).toFixed(4);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
