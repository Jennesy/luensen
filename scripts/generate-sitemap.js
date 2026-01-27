const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')
const path = require('path')

// Base URL for your website
const BASE_URL = 'http://www.luensen.tw'

// Routes from prerender.js
const routes = [
  '/',
  '/clinics',
  '/clinics/lkdiang', 
  '/clinics/jingan',
  '/clinics/kanghe', 
  '/clinics/shikang',
  '/clinics/shinhe',
  '/team',
  '/services', 
  '/learningResources',
  '/about'
]

async function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...')
  
  const sitemap = new SitemapStream({ hostname: BASE_URL })
  const writeStream = createWriteStream(path.join(__dirname, '../dist/sitemap.xml'))
  
  sitemap.pipe(writeStream)
  
  // Add each route to the sitemap
  routes.forEach(route => {
    sitemap.write({
      url: route,
      changefreq: 'monthly',
      priority: route === '/' ? 1.0 : 0.8
    })
  })
  
  sitemap.end()
  
  await streamToPromise(sitemap)
  console.log('✅ Sitemap generated at dist/sitemap.xml')
  console.log(`📁 Sitemap contains ${routes.length} URLs`)
}

generateSitemap().catch(console.error)