import fs from 'fs-extra'

try {
  fs.copySync('./src/assets', './dist/assets')
  fs.copySync('./index.html', './dist/index.html') // for redirecting to page/index.html
  console.log('Assets copy success!')
} catch (error) {
  console.error(error)
}
