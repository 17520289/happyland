const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
    mix.sass('resources/scss/custom-backpack-bundle.scss', 'public/packages/backpack/base/css/')
    .options({
      processCssUrls: false
    });
    // mix.sass('resources/scss/backpack-override.scss', 'public/packages/backpack/base/css/');