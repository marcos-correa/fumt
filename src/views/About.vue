<template>
  <div class="about">
    <Return></Return>
  </div>
</template>



<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Return from '@/components/Return.vue'; // @ is an alias to /src

  @Component({
    components: {
      Return
    },
  })
  export default class About extends Vue {}
</script>



<style lang="scss">
  @import '@/assets/scss/_mixins';
 .about{
   @include bg(#04BF58);
 }
</style>
