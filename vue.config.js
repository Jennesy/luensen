const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin-next')

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: '/',

	css: {
		loaderOptions: {
			sass: {
				additionalData: `
          @import "@/assets/scss/_variables.scss";
        `,
			},
		},
	},

	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = '戴良恭聯合洗腎中心'
			return args
		})
	},
	
	// Prerender plugin disabled - will use manual post-build script instead
	// configureWebpack(config) {
	// 	if (process.env.NODE_ENV === 'production') {
	// 		config.plugins.push(
	// 			new PrerenderSPAPlugin({
	// 				staticDir: path.join(__dirname, 'dist'),
	// 				routes: ['/', '/clinics', '/team', '/services', '/about'],
	// 				renderer: require('@prerenderer/renderer-puppeteer'),
	// 				rendererOptions: {
	// 					maxConcurrentRoutes: 2,
	// 					timeout: 30000,
	// 					headless: true,
	// 				},
	// 			})
	// 		)
	// 	}
	// },
})