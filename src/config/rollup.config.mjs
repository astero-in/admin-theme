import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

// Read package.json using URL and import.meta
const pkg = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
);

const year = new Date().getFullYear();
const banner = `/*!
 * AdminLTE v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */`;

export default {
  input: 'src/ts/adminlte.ts',
  output: {
    file: 'dist/js/adminlte.js',
    format: 'umd',
    banner,
    name: 'adminlte'
  },
  plugins: [typescript()]
};
