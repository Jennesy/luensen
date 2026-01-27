<template>
	<ul class="nav nav-pills">
		<li class="nav-item">
			<div
				:class="['nav-link', { active: currentBranch === '' }]"
				aria-current="page"
				@click="changeBranch('')"
			>
				全部
			</div>
		</li>
		<li class="nav-item" v-for="branch in branches" :key="branch">
			<div
				:class="['nav-link', { active: branch === currentBranch }]"
				@click="changeBranch(branch)"
			>
				{{ branchValuePair[branch] + '診所' }}
			</div>
		</li>
	</ul>
</template>
<script>
export default {
	props: {
		branchValuePair: {
			type: Object,
		},
		currentBranch: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			branches: Object.keys(this.branchValuePair),
		}
	},
	methods: {
		changeBranch(branch) {
			this.$emit('change-branch', branch)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.nav-pills .nav-link.active {
	color: white;
	background-color: $main-color;
}
.nav-pills .nav-link {
	color: $main-color;
	cursor: pointer;
}
</style>
