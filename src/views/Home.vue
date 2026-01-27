<template>
	<div class="container d-flex flex-column">
		<h3 class="mt-4 p-0">戴良恭聯合洗腎中心</h3>
		<div class="mt-3">
			<div class="brand-intro">
				<p class="mt-1">
					我們是經營最完善最專業的優質團隊。20多年的寒暑，兢兢業業全心投入洗腎的領域，精神和熱忱始終如一！
					我們有專業的專科醫師，定期接受培訓的護理人員，隨時為腎友衛教宣導，以確保提供腎友最高品質的透析服務。
				</p>
				<p class="mt-1">
					另外，我們為腎友們提供最貼心的專車接送，視病如親的醫療團隊，讓所有接受洗腎服務的腎友們，能在溫馨安全的環境中，接受最好的照護和治療。
				</p>
				<p class="mt-3">
					專治：尿毒搔癢症 不寧腿 腎性貧血 腎性骨病變 任何洗腎相關疾病
				</p>
				<p class="my-3 highlight">
					※ 本院積極推廣 C肝治療，達成院內 C肝清零，杜絕染病風險
				</p>
			</div>
			<div class="service-list text-center mt-5">
				<ul
					class="service-items d-flex flex-row flex-wrap justify-content-center mx-auto"
				>
					<li class="service-item">
						<router-link to="/services">專車接送</router-link>
					</li>
					<li class="service-item">
						<router-link to="/services">疾病預防</router-link>
					</li>
					<li class="service-item">
						<router-link to="/services">生化檢查</router-link>
					</li>
					<li class="service-item">
						<router-link to="/team">專業醫護</router-link>
					</li>
					<li>
						<router-link class="more-service" to="/services"
							>更多特色 +</router-link
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="to-clinics-btn text-center mt-3 flex-grow-1">
			<router-link :to="{ path: '/clinics' }" class="btn"
				>查看所有分院</router-link
			>
		</div>
	</div>
</template>
<script>
import { backToTop, throttle } from '@/utils/mixins'
export default {
	name: 'Home',
	mixins: [backToTop, throttle],
	data() {
		return {
			handleScreenSize: this.throttle(this.checkScreenSize, 200),
		}
	},
	methods: {
		checkScreenSize() {
			if (window.innerWidth > 768) {
				this.$router.push('/clinics')
			}
		},
	},
	created() {
		window.addEventListener('resize', this.handleScreenSize)
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleScreenSize)
	},
	beforeRouteEnter(to, from, next) {
		if (window.innerWidth > 768) {
			return next('/clinics')
		}
		next()
	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/Header.scss';
@import '@/assets/scss/Home.scss';
</style>
