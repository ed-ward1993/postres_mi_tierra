const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
                serif: ['Cambria', ...defaultTheme.fontFamily.serif],

            },
        },
    },
    variants:{
        width:["responsive", "hover", "focus"],
        extend:{},
    },

    plugins: [
            require('@tailwindcss/forms'),
            require('@tailwindcss/typography'),


        ],
};
