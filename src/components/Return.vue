<template>
  <div class="return">
    <router-link :to="returned" class="return" v-bind:class="{black: isBlack}">
      <b-icon-arrow-left-short class="return-icon"></b-icon-arrow-left-short>
      <div v-bind:class="{black: isBlack}" class="return-text">Voltar</div>
    </router-link>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Return extends Vue {
  @Prop({default: '/'}) private returned!: string;
  @Prop({default: false}) private isBlack!: boolean;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.return {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  &:hover {
    color: #ffffff95;
    text-decoration: none;
  }
  &.black{
    color: #121212;
  }
  &-text {
    font-size: 16px;
    // &.black{
    //   color: #121212;
    // }
  }
  &-icon {
    font-size: 24px;
  }
}
</style>
