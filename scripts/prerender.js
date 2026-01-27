const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Routes that need prerendered HTML files
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

const distPath = path.join(__dirname, '../dist')

console.log('🚀 Starting prerender process with puppeteer...')

// Check if we have puppeteer available
try {
  const puppeteer = require('puppeteer')
  
  async function prerenderWithPuppeteer() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    
    // Start a simple HTTP server
    const { spawn } = require('child_process')
    const server = spawn('npx', ['serve', '-s', distPath, '-p', '3001'], {
      stdio: 'pipe',
      shell: true
    })

    // Listen for server output
    server.stdout.on('data', (data) => {
      console.log(`Server: ${data.toString().trim()}`)
    })

    server.stderr.on('data', (data) => {
      console.error(`Server error: ${data.toString().trim()}`)
    })

    // Wait for server to start (increased from 3s to 6s)
    console.log('⏳ Waiting for server to start...')
    await new Promise(resolve => setTimeout(resolve, 6000))
    
    for (const route of routes) {
      try {
        const url = `http://localhost:3001${route}`
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        
        // Wait for Vue app to mount
        await page.waitForSelector('#app > *', { timeout: 10000 })
        
        const html = await page.content()
        
        // Create directory structure
        const routePath = route === '/' ? '' : route.substring(1)
        const targetDir = routePath ? path.join(distPath, routePath) : distPath
        const targetFile = path.join(targetDir, 'index.html')
        
        if (routePath && !fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
        }
        
        // Calculate relative path depth for assets (only for non-root routes)
        let processedHtml = html
        if (routePath) {
          const depth = route.split('/').length - 1
          const relativePath = '../'.repeat(depth)
          
          processedHtml = html
            .replace(/href="\/css\//g, `href="${relativePath}css/`)
            .replace(/src="\/js\//g, `src="${relativePath}js/`)
            .replace(/href="\/favicon\.svg"/g, `href="${relativePath}favicon.svg"`)
            .replace(/<base href="\/">/g, `<base href="${relativePath}">`)
        }
        
        fs.writeFileSync(targetFile, processedHtml)
        console.log(`✅ Prerendered ${route}/index.html`)
        
      } catch (error) {
        console.error(`❌ Failed to prerender ${route}:`, error.message)
      }
    }
    
    await browser.close()
    server.kill()
    console.log('🎉 Prerendering completed!')
    finalize()
  }
  
  prerenderWithPuppeteer().catch(error => {
    console.error('❌ Prerendering failed:', error)
    // Fallback to simple copy method
    fallbackPrerender()
    finalize()
  })
  
} catch (error) {
  console.log('⚠️  Puppeteer not available, using fallback method')
  fallbackPrerender()
  finalize()
}

function fallbackPrerender() {
  const indexPath = path.join(distPath, 'index.html')
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run npm run build first.')
    process.exit(1)
  }
  
  const indexHtml = fs.readFileSync(indexPath, 'utf8')
  
  console.log('🚀 Generating prerendered HTML files (fallback)...')
  
  routes.slice(1).forEach(route => { // Skip root route
    const routePath = route.substring(1)
    const targetDir = path.join(distPath, routePath)
    const targetFile = path.join(targetDir, 'index.html')
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    
    // Calculate relative path depth for assets
    const depth = route.split('/').length - 1
    const relativePath = '../'.repeat(depth)
    
    // Update paths in HTML to be relative
    let routeHtml = indexHtml
      .replace(/href="\/css\//g, `href="${relativePath}css/`)
      .replace(/src="\/js\//g, `src="${relativePath}js/`)
      .replace(/href="\/favicon\.svg"/g, `href="${relativePath}favicon.svg"`)
      .replace(/<base href="\/"\/>/g, `<base href="${relativePath}"/>`)
    
    fs.writeFileSync(targetFile, routeHtml)
    console.log(`✅ Created ${route}/index.html`)
  })
}

// Finalize: Create 404.html and generate sitemap
function finalize() {
  // Create GitHub Pages 404.html for client-side routing
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;url='/'"></meta>
  <title>戴良恭聯合洗腎中心</title>
</head>
<body>
</body>
</html>`

  fs.writeFileSync(path.join(distPath, '404.html'), redirectHtml)
  console.log('✅ Created 404.html for GitHub Pages routing')

  console.log('\n🎉 Prerendering complete! All routes now have static HTML files.')
  console.log('📁 Files created in dist/ directory:')
  routes.forEach(route => console.log(`   ${route}/index.html`))
  console.log('   404.html (GitHub Pages redirect)')

  // Generate sitemap after prerendering
  console.log('\n🗺️  Generating sitemap...')
  require('./generate-sitemap.js')
}