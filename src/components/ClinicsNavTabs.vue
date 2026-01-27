<template>
	<div class="dropdown">
		<a
			class="btn btn-dropdown dropdown-toggle my-3"
			href="#"
			role="button"
			id="dropdownMenuLink"
			data-bs-toggle="dropdown"
			aria-expanded="false"
			v-show="isMobile"
		>
			{{ branchValuePair[branch] }}診所
		</a>

		<ul
			:class="[
				'mt-3',
				{ nav: !isMobile },
				{ 'nav-tabs': !isMobile },
				{ 'dropdown-menu': isMobile },
			]"
			:aria-labelledby="{ dropdownMenuLink: isMobile }"
			style=""
		>
			<li class="nav-item">
				<router-link
					:class="[{ 'nav-link': !isMobile }, { 'dropdown-item': isMobile }]"
					style="--i: 5"
					aria-current="page"
					to="/clinics/lkdiang"
					>戴良恭診所 (永和)</router-link
				>
			</li>
			<li class="nav-item">
				<router-link
					:class="[{ 'nav-link': !isMobile }, { 'dropdown-item': isMobile }]"
					style="--i: 4"
					to="/clinics/shinhe"
					>欣禾診所 (中和)</router-link
				>
			</li>
			<li class="nav-item">
				<router-link
					:class="[{ 'nav-link': !isMobile }, { 'dropdown-item': isMobile }]"
					style="--i: 3"
					to="/clinics/shikang"
					>世康診所 (汐止)</router-link
				>
			</li>
			<li class="nav-item">
				<router-link
					:class="[{ 'nav-link': !isMobile }, { 'dropdown-item': isMobile }]"
					style="--i: 2"
					to="/clinics/kanghe"
					>康禾診所 (南港)</router-link
				>
			</li>
			<li class="nav-item">
				<router-link
					:class="[{ 'nav-link': !isMobile }, { 'dropdown-item': isMobile }]"
					style="--i: 1"
					to="/clinics/jingan"
					>景安診所 (文山)</router-link
				>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		isMobile: {
			type: Boolean,
			default: false,
		},
		branchValuePair: {
			type: Object,
		},
		branch: {
			type: String,
			default: 'lkdiang',
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/ClinicsNavTabs.scss';
</style>
