<template>
	<div class="row">
		<div class="clinic-info__main-content col-12 col-lg-7 pe-lg-5">
			<div class="clinic-info__description">
				<h1 v-show="!isMobile">{{ clinic.name }}診所</h1>
				<p class="mt-1" v-html="clinic.description"></p>
			</div>
			<div class="clinic-info__contact mt-4 mt-sm-5">
				<div class="clinic-info__contact-item mt-2">
					地址：{{ clinic.address }}
				</div>
				<div class="clinic-info__contact-item mt-2">
					電話：<a
						class="me-1"
						v-for="phone in clinic.phone"
						:key="phone"
						:href="'tel:' + phone"
						>{{ phone }}</a
					>
				</div>
				<div class="clinic-info__contact-item mt-2">
					臉書：<a :href="clinic.facebook.url">{{ clinic.facebook.name }}</a>
				</div>
			</div>
			<div class="clinic-info__business-hour mt-4 mt-sm-5">
				<div>
					門診時間：
					<div
						v-for="(time, day) in clinic.workingHours"
						:key="day"
						class="d-inline-block me-2"
					>
						{{ day + ' ' + time }}
					</div>
				</div>
				<table class="table table-hover text-center mt-3">
					<thead>
						<tr>
							<th scope="col">時間</th>
							<th scope="col">一</th>
							<th scope="col">二</th>
							<th scope="col">三</th>
							<th scope="col">四</th>
							<th scope="col">五</th>
							<th scope="col">六</th>
							<th scope="col">日</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">早上</th>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td>-</td>
						</tr>
						<tr>
							<th scope="row">下午</th>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td v-html="circleSVG"></td>
							<td>-</td>
						</tr>
						<tr>
							<th scope="row">晚上</th>
							<td v-html="circleSVG"></td>
							<td>-</td>
							<td v-html="circleSVG"></td>
							<td>-</td>
							<td v-html="circleSVG"></td>
							<td>-</td>
							<td>-</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div
			class="clinic-info__side-content col-12 col-lg-5 ps-3 ps-lg-5 order-1 order-lg-0 d-flex flex-column"
		>
			<div class="clinic-info__album mt-5 order-1 order-lg-0">
				<div
					id="carouselExampleIndicators"
					class="carousel slide"
					data-bs-ride="carousel"
				>
					<div class="carousel-indicators">
						<button
							v-for="(image, index) in clinic.photos"
							:key="image"
							type="button"
							data-bs-target="#carouselExampleIndicators"
							:data-bs-slide-to="index"
							:class="{ active: index === 0 }"
							:aria-current="index === 0"
							:aria-label="`Slide ${index + 1}`"
						></button>
					</div>
					<div class="carousel-inner">
						<div
							v-for="(image, index) in clinic.photos"
							:key="image"
							:class="['carousel-item', { active: index === 0 }]"
						>
							<img
								:src="`./images/${branch}/${image}`"
								class="d-block w-100"
								:alt="clinic.name"
							/>
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div class="clinic-info__team-members mt-4 mt-sm-5">
				<div>醫生團隊：</div>
				<ul class="d-flex flex-wrap">
					<li
						class="clinic-info__team-member d-flex mt-2 me-3"
						v-for="doctor in clinic.doctors"
						:key="doctor.id"
						data-bs-toggle="modal"
						:data-bs-target="`#modal${doctor.id}`"
					>
						<div class="clinic-info__team-member-text text-center">
							{{ doctor.name + ' ' + doctor.title }}
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="clinic-info__transportation mt-4 mt-sm-5 mb-0 mb-lg-5">
			<div>地圖：</div>
			<div class="ratio ratio-16x9">
				<iframe
					:src="clinic.googleMaps"
					allowfullscreen
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/ClinicDetails.scss';
</style>

<script>
import { timeCircle } from '@/content/WebSvg.json'

export default {
	data() {
		return {
			circleSVG: timeCircle,
		}
	},
	props: {
		isMobile: {
			type: Boolean,
			default: false,
		},
		branch: {
			type: String,
			default: 'lkdiang',
		},
		clinic: {
			type: Object,
			required: true,
		},
	},
}
</script>
