<template>
  <div id="appView">
     <app-header></app-header>
     <transition name="router-fade" mode="out-in">
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
	 </transition>
	 <transition name="router-fade" mode="out-in">
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	 </transition>
  </div>
</template>
<script>
import HeaderMain from '../components/header'
export default {
  components: {
    'app-header':HeaderMain,
  }
}
</script>
<style lang="scss">
	@import '../scss/common';

  	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}

</style>
