<template>
	<section class="clinics container">
		<Header v-show="!isMobile" />
		<h3 class="mt-3 mt-sm-0 mt-lg-3 p-0 ms-0 border-top">分院介紹</h3>
		<ClinicsNavTabs
			:is-mobile="isMobile"
			:branch="branch"
			:branch-value-pair="branchValuePair"
		/>
		<div class="clinic-info">
			<transition name="fade" mode="out-in">
				<ClinicDetails
					:branch="branch"
					:key="branch"
					:clinic="clinics[branch]"
					:is-mobile="isMobile"
				/>
			</transition>
			<!-- Modal -->
			<DoctorModal
				v-for="doctor in allDoctors"
				:key="doctor.id"
				:doctor="doctor"
				:branch-value-pair="branchValuePair"
			/>
		</div>
	</section>
</template>

<script>
import Header from '@/components/Header.vue'
import ClinicsNavTabs from '../components/ClinicsNavTabs.vue'
import ClinicDetails from '../components/ClinicDetails.vue'
import DoctorModal from '@/components/DoctorModal.vue'
import clinicData from '@/content/BranchesInfo.json'
import { backToTop, throttle } from '@/utils/mixins'
const branches = Object.keys(clinicData)

export default {
	name: 'Clinics',
	mixins: [backToTop, throttle],
	components: {
		Header,
		ClinicsNavTabs,
		ClinicDetails,
		DoctorModal,
	},
	data() {
		return {
			branch: '',
			clinics: clinicData,
			branchValuePair: {},
			allDoctors: [],
			isMobile: window.innerWidth < 768,
			handleResize: this.throttle(this.updateSize, 200),
		}
	},
	methods: {
		updateSize() {
			this.isMobile = window.innerWidth < 768
		},
	},
	created() {
		window.addEventListener('resize', this.handleResize)
		this.branch = this.$route.params.branch
		const allDoctorsArray = []
		Object.entries(clinicData).forEach(([key, value]) => {
			allDoctorsArray.push(...value.doctors)
			this.branchValuePair[key] = value.name
		})
		this.allDoctors = allDoctorsArray
		if (!branches.includes(this.branch)) {
			this.$router.push({ name: 'not-found' })
		}
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleResize)
	},
	beforeRouteUpdate(to, from, next) {
		this.branch = to.params.branch
		if (!branches.includes(this.branch)) {
			next({ name: 'not-found' })
		}
		next()
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/ClinicDetails.scss';
</style>
