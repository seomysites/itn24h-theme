const mix = require('laravel-mix');
const purgecss = require('@fullhuman/postcss-purgecss').default;

mix.setPublicPath('dist');

// mix.combine('src/main.js', 'dist/js/main.min.js');

mix.combine([
    'src/js/owlcarousel2.min.js',
    'src/js/sticky-sidebar.min.js',
    'src/js/jquery-replacetext.min.js',
    'src/js/toc.min.js',
], 'dist/js/vendor.min.js');

mix.combine(
    'src/js/main.js', 
    'dist/js/main.min.js'
);

// mix.css(
//     'src/css/google-fonts.css',
//     'dist/css/google-fonts.min.css'
// );

mix.styles(
    [
        'src/css/fontawesome-all.min.css',
        'src/css/google-fonts.css',
    ],
    'dist/css/all.min.css'
).options({
    postCss: [
        purgecss({
            content: [
                './resources/**/*.html',
                './resources/**/*.js',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        })
    ],
    processCssUrls: false,
});

mix.styles(
    [
        'src/css/main.css'
    ], 
    'dist/css/main.min.css'
).options({
    postCss: [
        purgecss({
            content: [
                './resources/**/*.html',
                './resources/**/*.js',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        })
    ],
    processCssUrls: false,
});
