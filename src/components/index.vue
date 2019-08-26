<template>
  <div class="home">

    <computer-touch @changeValue="changeValue()"
                    ref="investmentFund1"
                    :min="0"
                    :max="100"
                    :current-value="investmentFund1">
    </computer-touch>
  </div>
</template>

<script>

  import ComputerTouch from './touch/computer-touch'
  // 首页
  export default {
    name: 'Home',
    components: {
      ComputerTouch
    },
    data() {
      return {
        investmentFund1: 10
      }
    },
    methods: {
      changeValue() {

      }
    }
  }
</script>

<style>
  .home {
    padding: 300px 15px;
  }
</style>

