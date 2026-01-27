<template>
	<header class="header mt-3">
		<div class="row">
			<div class="center-intro col-12 col-lg-8">
				<p class="mt-1">
					我們是經營最完善最專業的優質團隊。20多年的寒暑，兢兢業業全心投入洗腎的領域，精神和熱忱始終如一！
					我們有專業的專科醫師，定期接受培訓的護理人員，隨時為腎友衛教宣導，以確保提供腎友最高品質的透析服務。
				</p>
				<p class="mt-1">
					另外，我們為腎友們提供最貼心的免費專車接送，視病如親的醫療團隊，讓所有接受洗腎服務的腎友們，能在溫馨安全的環境中，接受最好的照護和治療。
				</p>
				<p class="mt-3">
					專治：尿毒搔癢症 不寧腿 腎性貧血 腎性骨病變 任何洗腎相關疾病
				</p>
				<p class="my-3 highlight">
					※ 本院積極推廣 C肝治療，達成院內 C肝清零，杜絕染病風險
				</p>
			</div>
			<div class="strength-list col-12 col-lg-4 d-flex">
				<ul class="strength-items d-flex flex-row">
					<li class="strength-item">
						<router-link to="/services">專車接送</router-link>
					</li>
					<li class="strength-item">
						<router-link to="/services">疾病預防</router-link>
					</li>
					<li class="strength-item">
						<router-link to="/services">生化檢查</router-link>
					</li>
					<li class="strength-item">
						<router-link to="/team">專業醫護</router-link>
					</li>
				</ul>
				<router-link class="more-strength" to="/services"
					>更多特色 +</router-link
				>
			</div>
		</div>
	</header>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/Header.scss';
</style>
