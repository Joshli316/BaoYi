const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const isWatch = process.argv.includes('--watch');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Copy static files to dist
const staticFiles = ['index.html', 'manifest.json', 'sw.js', '_headers', '_redirects', 'robots.txt', 'sitemap.xml'];
for (const file of staticFiles) {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

// Copy assets directory
const assetsDir = path.join(__dirname, 'assets');
if (fs.existsSync(assetsDir)) {
  const destAssets = path.join(distDir, 'assets');
  if (!fs.existsSync(destAssets)) fs.mkdirSync(destAssets, { recursive: true });
  copyDir(assetsDir, destAssets);
}

// Copy print.css
const printSrc = path.join(__dirname, 'src', 'styles', 'print.css');
const printDest = path.join(distDir, 'print.css');
if (fs.existsSync(printSrc)) fs.copyFileSync(printSrc, printDest);

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const buildOptions = {
  entryPoints: ['src/app.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  target: 'es2020',
  sourcemap: true,
  minify: !isWatch,
  chunkNames: 'chunks/[name]-[hash]',
};

if (isWatch) {
  esbuild.context(buildOptions).then(ctx => {
    ctx.watch();
    console.log('Watching for changes...');
  });
} else {
  esbuild.build(buildOptions).then(() => {
    console.log('Build complete: dist/app.js');
  }).catch(() => process.exit(1));
}
