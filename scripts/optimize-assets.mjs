import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const imagesDir = path.join(publicDir, 'images');
const profileJpg = path.join(imagesDir, 'profile.jpg');
const faviconSvg = path.join(publicDir, 'favicon.svg');

async function main() {
  console.log('Optimizing profile image...');
  if (fs.existsSync(profileJpg)) {
    // 384x384 for 2x retina display of 192x192
    await sharp(profileJpg)
      .resize(384, 384, { fit: 'cover', position: 'center' })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(imagesDir, 'profile.webp'));

    await sharp(profileJpg)
      .resize(192, 192, { fit: 'cover', position: 'center' })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(imagesDir, 'profile-192.webp'));

    await sharp(profileJpg)
      .resize(384, 384, { fit: 'cover', position: 'center' })
      .avif({ quality: 80, effort: 6 })
      .toFile(path.join(imagesDir, 'profile.avif'));

    // Keep an optimized profile-opt.jpg as fallback if needed
    await sharp(profileJpg)
      .resize(384, 384, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(path.join(imagesDir, 'profile-opt.jpg'));

    console.log('Profile images generated successfully.');
  }

  console.log('Generating favicons and PWA icons...');
  if (fs.existsSync(faviconSvg)) {
    const svgBuffer = fs.readFileSync(faviconSvg);

    // 180x180 apple-touch-icon
    await sharp(svgBuffer)
      .resize(180, 180)
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    // 32x32 favicon
    await sharp(svgBuffer)
      .resize(32, 32)
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // 16x16 favicon
    await sharp(svgBuffer)
      .resize(16, 16)
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'favicon-16x16.png'));

    // 192x192 PWA icon
    await sharp(svgBuffer)
      .resize(192, 192)
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'icon-192.png'));

    // 512x512 PWA icon
    await sharp(svgBuffer)
      .resize(512, 512)
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'icon-512.png'));

    // Safari pinned tab SVG
    fs.copyFileSync(faviconSvg, path.join(publicDir, 'safari-pinned-tab.svg'));

    console.log('Favicon and PWA icons generated successfully.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
