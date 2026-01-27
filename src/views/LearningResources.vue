<template>
	<section class="learning container">
		<h3 class="mt-3 mt-sm-5 border-top">衛教專欄</h3>
		<div class="row">
			<ul class="my-3 col-12 col-lg-6">
				<li
					class="resource-link"
					v-for="(file, title) in files"
					:key="file.fileName"
				>
					<a :href="`./pdf/${file.fileName}.pdf`" target="_blank">{{
						title
					}}</a>
				</li>
				<div class="more-info mt-3">
					掌握最新資訊：<br /><a
						href="https://www.facebook.com/%E6%88%B4%E8%89%AF%E6%81%AD%E6%B4%97%E8%85%8E%E8%A8%BA%E6%89%80-%E6%B0%B8%E5%92%8C%E6%B4%97%E8%85%8E%E4%B8%AD%E5%BF%83-351239505294446/"
						target="_blank"
						>戴良恭洗腎診所 永和洗腎中心</a
					><br /><a
						href="https://www.facebook.com/groups/140859983131677"
						target="_blank"
						>血液透析大小事</a
					><br /><a href="https://www.tckdf.org.tw/Main/Index" target="_blank"
						>腎臟病防治基金會</a
					>
				</div>
			</ul>
			<div class="col-12 col-lg-6 row g-3">
				<div
					id="imageIndicators"
					class="carousel slide col-12"
					data-bs-ride="carousel"
				>
					<div class="carousel-indicators">
						<button
							v-for="(image, index) in images"
							:key="image.fileName"
							type="button"
							data-bs-target="#imageIndicators"
							:data-bs-slide-to="index"
							:class="{ active: index === 0 }"
							:aria-current="index === 0"
							:aria-label="`Slide ${index + 1}`"
						></button>
					</div>
					<div class="carousel-inner">
						<div
							v-for="(image, index) in images"
							:key="image.fileName"
							:class="['carousel-item', { active: index === 0 }]"
							data-bs-toggle="modal"
							:data-bs-target="`#image${index}Modal`"
						>
							<img
								:src="`./images/healthInfo/${image.fileName}.jpg`"
								class="d-block w-100"
								:alt="image.alt"
							/>
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#imageIndicators"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#imageIndicators"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
				<div
					id="image02Indicators"
					class="carousel slide col-12"
					data-bs-ride="carousel"
				>
					<div class="carousel-indicators">
						<button
							v-for="(image, index) in images02"
							:key="image.fileName"
							type="button"
							data-bs-target="#image02Indicators"
							:data-bs-slide-to="index"
							:class="{ active: index === 0 }"
							:aria-current="index === 0"
							:aria-label="`Slide ${index + 1}`"
						></button>
					</div>
					<div class="carousel-inner">
						<div
							v-for="(image, index) in images02"
							:key="image.fileName"
							:class="['carousel-item', { active: index === 0 }]"
							data-bs-toggle="modal"
							:data-bs-target="`#image02${index}Modal`"
						>
							<img
								:src="`./images/healthInfo/${image.fileName}.${image.ext}`"
								class="d-block w-100"
								:alt="image.alt"
							/>
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#image02Indicators"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#image02Indicators"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</div>
		<!-- Modal -->
		<div
			v-for="(image, index) in images"
			:key="image.fileName"
			class="modal fade"
			:id="`image${index}Modal`"
			tabindex="-1"
			:aria-labelledby="`image${index}ModalLabel`"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<img
							:src="`./images/healthInfo/${image.fileName}.jpg`"
							:alt="image.alt"
						/>
					</div>
				</div>
			</div>
		</div>
		<div
			v-for="(image, index) in images02"
			:key="image.fileName"
			class="modal fade"
			:id="`image02${index}Modal`"
			tabindex="-1"
			:aria-labelledby="`image02${index}ModalLabel`"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<img
							:src="`./images/healthInfo/${image.fileName}.${image.ext}`"
							:alt="image.alt"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { files, images, images02 } from '@/content/LearningResourcesList.json'
import { backToTop } from '@/utils/mixins'

export default {
	name: 'LearningResources',
	mixins: [backToTop],
	data() {
		return {
			files,
			images,
			images02,
		}
	},
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/LearningResources.scss';
</style>
