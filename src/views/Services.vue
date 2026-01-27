<template>
	<section class="services container mt-3 mt-sm-5">
		<h3 class="mb-3 p-0 ms-0">服務項目</h3>
		<div class="row g-5">
			<div class="col-12 col-md-7 col-lg-8">
				<div class="section-intro">
					洗腎是一場人生長跑，20多年來戴良恭聯合洗腎中心專業專心且專一致力於洗腎服務，陪伴上千位腎友與其家庭度過樂觀積極的洗腎生活。我們深知初次洗腎的不安與無助，也了解洗腎之路的不易與困難，因此我們秉持視病如親的精神，我們提供腎友及家屬最貼心、最完善的服務，陪伴腎友活的健康活的有尊嚴！
				</div>
				<ul class="services-list mt-3">
					<li>重大傷病卡代辦</li>
					<li>
						專人專車指定地點接送<br />
						<div class="note">
							詳情請<span
								class="note-modal"
								data-bs-toggle="modal"
								data-bs-target="#phoneModal"
								>至電各分院</span
							>洽詢
						</div>
					</li>
					<li>每次血壓監測</li>
					<li>
						每週血色素/血球比容值測定<br />
						<div class="note">視病人的健康狀況施打EPO</div>
					</li>
					<li>定期生化檢查（每月定期抽血）</li>
				</ul>
				<h5 class="mt-5">其他特色</h5>
				<ul class="other-list mt-1">
					<li>
						一樓店面無障礙空間<br />
						<div class="note">唯世康分院位於 3F</div>
					</li>
					<li>每床配有液晶電視、插座</li>
					<li>腎臟相關疾病和老年慢性病等衛教宣導</li>
					<li>推廣腎友做C肝的治療</li>
				</ul>
			</div>
			<div class="col-12 col-md-5 col-lg-4">
				<img
					src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1083&q=80"
					class="img-fluid"
					alt=""
				/>
			</div>
		</div>
		<!-- Modal -->
		<div
			class="modal fade"
			id="phoneModal"
			tabindex="-1"
			aria-labelledby="phoneModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="phoneModalLabel">各分院聯絡資訊</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<div
							class="clinic-infos mb-4"
							v-for="(clinic, path) in clinics"
							:key="path"
						>
							<h4>
								<router-link
									:to="{ name: 'clinics', params: { branch: path } }"
									class="clinic-info__link"
									>{{ clinic.name + '診所' }}</router-link
								>
							</h4>
							<div class="clinic-info__address">地址：{{ clinic.address }}</div>
							<div class="clinic-info__phone">
								電話：<a
									class="me-1"
									v-for="phone in clinic.phone"
									:key="phone"
									:href="'tel:' + phone"
									>{{ phone }}</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import clinicData from '@/content/BranchesInfo.json'
import { backToTop } from '@/utils/mixins'
export default {
	name: 'Services',
	mixins: [backToTop],
	data() {
		return {
			clinics: clinicData,
		}
	},
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/Services.scss';
</style>
