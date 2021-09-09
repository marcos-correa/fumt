<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<style scoped lang="scss">
  @import '@/assets/scss/_mixins';
  #app{
    @include bg-color(white);
  }
</style>
