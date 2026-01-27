<template>
	<div class="web-background">
		<img :src="`./background.jpg`" alt="" class="web-background__tree" />
		<div :class="['web-background__green-screen', { cover: isCovered }]"></div>
		<div :class="['web-background__white-screen', { cover: isCovered }]"></div>
		<button
			:class="['cover-btn', { cover: isCovered }]"
			@click.stop.prevent="liftScreen"
		>
			<svg class="cover-btn__text" viewBox="0 0 65.257599 69.1996">
				<g transform="matrix(1.3333333,0,0,-1.3333333,0,69.1996)">
					<g transform="translate(46.8173,49.7737)">
						<path
							id="path22"
							style="
								fill: none;
								stroke: #ffffff;
								stroke-width: 4.25199986;
								stroke-linecap: round;
								stroke-linejoin: miter;
								stroke-miterlimit: 10;
								stroke-dasharray: none;
								stroke-opacity: 1;
							"
							d="M 0,0 -22.346,-22.346 -44.691,0"
						/>
					</g>
					<g transform="translate(46.8173,25.3523)">
						<path
							id="path26"
							style="
								fill: none;
								stroke: #ffffff;
								stroke-width: 4.25199986;
								stroke-linecap: round;
								stroke-linejoin: miter;
								stroke-miterlimit: 10;
								stroke-dasharray: none;
								stroke-opacity: 1;
							"
							d="M 0,0 -22.346,-22.346 -44.691,0"
						/>
					</g>
				</g>
			</svg>
		</button>
	</div>
</template>
<script>
export default {
	props: {
		isCovered: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		liftScreen: function () {
			this.$emit('lift-screen')
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/WebBackground.scss';
</style>
