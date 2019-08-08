<template>
  <el-row class="container">
    <theHeader></theHeader>
    <theMain></theMain>
    <theFooter></theFooter>
  </el-row>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheMain from '@/components/TheMain'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    "theHeader": TheHeader,
    "theMain": TheMain,
    "theFooter": TheFooter
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
</style>