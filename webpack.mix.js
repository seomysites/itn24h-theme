let mix = require('laravel-mix');

mix.setPublicPath('dist');

// mix.combine('src/main.js', 'dist/js/main.min.js');

mix.combine([
    'src/js/owlcarousel2.min.js',
    'src/js/sticky-sidebar.min.js',
    'src/js/jquery-replacetext.min.js',
    'src/js/toc.min.js',
], 'dist/js/vendor.min.js');

mix.combine('src/js/main.js', 'dist/js/main.min.js');

mix.css(
    'src/css/google-fonts.css',
    'dist/css/google-fonts.min.css'
);

mix.css('src/css/main.css',
    'dist/css/main.min.css'
);
