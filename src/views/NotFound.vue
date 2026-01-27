<template>
	<section class="container">
		<h3 class="mt-3 mt-sm-5 border-top">404 Not Found</h3>
	</section>
</template>
<script>
export default {
	name: 'NotFound',
	created() {
		this.$emit('lift-screen')
	},
}
</script>
