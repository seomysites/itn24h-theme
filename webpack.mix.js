let mix = require('laravel-mix');

mix.setPublicPath('dist');

mix.combine('src/main.js', 'dist/main.min.js');