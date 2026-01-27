<template>
	<section class="team container">
		<h3 class="mt-3 mt-sm-5">醫師團隊</h3>
		<TeamBranchPills
			class="my-3"
			:branch-value-pair="branchValuePair"
			:current-branch="currentBranch"
			@change-branch="changeFilter"
		/>
		<transition name="fade" mode="out-in">
			<div class="row g-3 mb-3" :key="currentBranch">
				<div
					class="col-12 col-sm-6 col-md-4 col-lg-3"
					v-for="doctor in doctors"
					:key="doctor.id"
				>
					<div
						class="card"
						data-bs-toggle="modal"
						:data-bs-target="`#modal${doctor.id}`"
					>
						<div class="card-body">
							<h5 class="card-title">{{ doctor.name + ' ' + doctor.title }}</h5>
							<div class="tag">{{ branchValuePair[doctor.branch] }}</div>
							<div class="mt-1 text-truncate">
								<template v-if="doctor.experience.length > 0">
									<span
										v-for="experience in doctor.experience"
										:key="experience"
									>
										{{ experience }} /
									</span>
								</template>
								<span v-else> （尚無資料） </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- Modal -->
		<DoctorModal
			v-for="doctor in doctors"
			:key="doctor.id"
			:doctor="doctor"
			:branch-value-pair="branchValuePair"
		/>
	</section>
</template>
<script>
import clinicData from '@/content/BranchesInfo.json'
import TeamBranchPills from '@/components/TeamBranchPills.vue'
import DoctorModal from '@/components/DoctorModal.vue'
import { backToTop } from '@/utils/mixins'

export default {
	name: 'Team',
	mixins: [backToTop],
	components: {
		TeamBranchPills,
		DoctorModal,
	},
	data() {
		return {
			allDoctors: [],
			doctors: [],
			branchValuePair: {},
			currentBranch: '',
		}
	},
	created() {
		Object.entries(clinicData).forEach(([key, value]) => {
			this.allDoctors = [...this.allDoctors, ...value.doctors]
			this.branchValuePair[key] = value.name
		})
		this.doctors = [...this.allDoctors]
	},
	methods: {
		changeFilter(branch) {
			this.currentBranch = branch
			if (branch === '') {
				this.doctors = [...this.allDoctors]
				return
			}
			this.doctors = this.allDoctors.filter(
				(doctor) => doctor.branch === branch
			)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
	cursor: pointer;
	background-color: #ffffff88;
	transition: transform 0.2s ease-out;
}
.card:hover {
	transform: translateY(-0.1rem);
	background-color: #ffffffcc;
}
.tag {
	display: inline-block;
	padding: 0 0.5rem;
	border-radius: 0.25rem;
	background-color: #{$secondary-color};
}
a {
	.tag-link {
		color: black;
	}
	.tag-link:hover {
		color: white;
		background-color: $main-color;
	}
}
</style>
