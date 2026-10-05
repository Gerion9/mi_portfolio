import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const imagesDir = path.join(publicDir, 'images');
const profileJpg = path.join(imagesDir, 'profile.jpg');
const faviconSvg = path.join(publicDir, 'favicon.svg');

// The source photo carries EXIF orientation 6; .rotate() with no arguments
// applies it so every derivative is upright (the old outputs were sideways).
const source = () => sharp(profileJpg).rotate();

async function main() {
  console.log('Optimizing profile image...');
  if (fs.existsSync(profileJpg)) {
    const square = { fit: 'cover', position: 'attention' };

    await source().resize(384, 384, square).webp({ quality: 85, effort: 6 }).toFile(path.join(imagesDir, 'profile.webp'));
    await source().resize(192, 192, square).webp({ quality: 85, effort: 6 }).toFile(path.join(imagesDir, 'profile-192.webp'));
    await source().resize(384, 384, square).avif({ quality: 60, effort: 6 }).toFile(path.join(imagesDir, 'profile.avif'));
    await source().resize(384, 384, square).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(imagesDir, 'profile-opt.jpg'));

    // 4:5 portrait for the About profile card (1x and 2x)
    const portrait = { fit: 'cover', position: 'attention' };
    await source().resize(480, 600, portrait).webp({ quality: 82, effort: 6 }).toFile(path.join(imagesDir, 'profile-portrait-480.webp'));
    await source().resize(960, 1200, portrait).webp({ quality: 78, effort: 6 }).toFile(path.join(imagesDir, 'profile-portrait-960.webp'));
    await source().resize(960, 1200, portrait).avif({ quality: 55, effort: 6 }).toFile(path.join(imagesDir, 'profile-portrait-960.avif'));

    console.log('Profile images generated successfully.');
  }

  console.log('Generating favicons and PWA icons...');
  if (fs.existsSync(faviconSvg)) {
    const svgBuffer = fs.readFileSync(faviconSvg);
    await sharp(svgBuffer).resize(180, 180).png({ quality: 90 }).toFile(path.join(publicDir, 'apple-touch-icon.png'));
    await sharp(svgBuffer).resize(32, 32).png({ quality: 90 }).toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(svgBuffer).resize(16, 16).png({ quality: 90 }).toFile(path.join(publicDir, 'favicon-16x16.png'));
    await sharp(svgBuffer).resize(192, 192).png({ quality: 90 }).toFile(path.join(publicDir, 'icon-192.png'));
    await sharp(svgBuffer).resize(512, 512).png({ quality: 90 }).toFile(path.join(publicDir, 'icon-512.png'));
    fs.copyFileSync(faviconSvg, path.join(publicDir, 'safari-pinned-tab.svg'));
    console.log('Favicon and PWA icons generated successfully.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
