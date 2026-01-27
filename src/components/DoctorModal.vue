<template>
	<div
		class="modal fade"
		:id="`modal${doctor.id}`"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">
						{{ doctor.name + ' ' + doctor.title }}
					</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<router-link
						:to="{ name: 'clinics', params: { branch: doctor.branch } }"
					>
						<div
							class="tag tag-link"
							data-bs-dismiss="modal"
							aria-label="Close"
						>
							{{ branchValuePair[doctor.branch] + '診所' }}
						</div>
					</router-link>
					<ul class="my-3" v-if="doctor.experience.length > 0">
						<li v-for="experience in doctor.experience" :key="experience">
							{{ experience }}
						</li>
					</ul>
					<div class="my-3" v-else>（尚無資料）</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		doctor: {
			type: Object,
		},
		branchValuePair: {
			type: Object,
		},
	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

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
