<template>
  <div id="app">
    <!-- <div class="container-fluid"> -->
      <router-view/>
    <!-- </div> -->
  </div>
</template>



<style scoped lang="scss">
  @import '@/assets/scss/_mixins';
  #app{
    @include bg-color(white);
  }
</style>
