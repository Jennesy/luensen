<template>
	<nav :class="['nav-bar', 'container', { cover: isCovered }]">
		<router-link
			:to="{ path: '/' }"
			:class="['navbar__brand', { cover: isCovered }]"
		>
			<div class="navbar__gov-health-logo">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/ROC_National_Health_Insurance_Emblem.svg/1200px-ROC_National_Health_Insurance_Emblem.svg.png"
					alt=""
				/>
			</div>
			<div class="navbar__brand-logo" @click="handleCheck(false)">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					x="0px"
					y="0px"
					viewBox="0 0 181.5 211.7"
					style="enable-background: new 0 0 181.5 211.7"
					xml:space="preserve"
					v-html="logoSVG"
				></svg>
			</div>
			<div class="navbar__brand-name" @click="handleCheck(false)">
				戴良恭聯合洗腎中心
			</div>
			<div class="navbar__brand-slogan">全北區最優質洗腎診所</div>
		</router-link>
		<div
			:class="['navbar__items', { cover: isCovered }, { checked: isChecked }]"
			@click="handleCheck(!isChecked)"
			@blur="handleCheck(false)"
		>
			<ul class="">
				<li class="navbar__item">
					<router-link
						:class="{ active: $route.name === 'clinics' }"
						to="/clinics"
						>分院</router-link
					>
				</li>
				<li class="navbar__item">
					<router-link to="/team">醫生團隊</router-link>
				</li>
				<li class="navbar__item">
					<router-link to="/services">服務項目</router-link>
				</li>
				<li class="navbar__item">
					<router-link to="/learningResources">衛教專欄</router-link>
				</li>
				<li class="navbar__item">
					<router-link to="/about">我們的故事</router-link>
				</li>
			</ul>
		</div>
		<div
			:class="['navbar__hamburger', { checked: isChecked }]"
			@click="handleCheck(!isChecked)"
			v-html="hamburgerSVG"
		></div>
	</nav>
</template>

<script>
import { hamburger, logo } from '@/content/WebSvg.json'

export default {
	props: {
		isCovered: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isChecked: false,
			hamburgerSVG: hamburger,
			logoSVG: logo,
		}
	},
	methods: {
		handleCheck: function (value) {
			if (window.innerWidth < 992) {
				this.isChecked = value
			}
			return
		},
	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/NavBar.scss';
</style>
