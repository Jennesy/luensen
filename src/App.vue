<template>
	<div id="app">
		<WebBackground :isCovered="isCovered" @lift-screen="liftScreen" />
		<NavBar :isCovered="isCovered" />
		<div class="view" id="view" :class="[{ cover: isCovered }]">
			<main>
				<transition name="fade" mode="out-in">
					<router-view @lift-screen="liftScreen" :key="$route.name" />
				</transition>
			</main>
			<Footer />
		</div>
	</div>
</template>
<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import WebBackground from './components/WebBackground.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
	name: 'App',
	components: {
		WebBackground,
		NavBar,
		Footer,
	},
	data() {
		return {
			isCovered: true,
			touchMoveOptions: { passive: true },
		}
	},
	methods: {
		liftScreen: function () {
			this.isCovered = false
			window.removeEventListener('click', this.liftScreen)
			window.removeEventListener('keydown', this.liftScreen)
			window.removeEventListener('wheel', this.liftScreen)
			window.removeEventListener('touchmove', this.liftScreen, this.touchMoveOptions)
		},
	},
	created() {
		window.addEventListener('click', this.liftScreen)
		window.addEventListener('keydown', this.liftScreen)
		window.addEventListener('wheel', this.liftScreen)
		window.addEventListener('touchmove', this.liftScreen, this.touchMoveOptions)
	},
}
</script>
