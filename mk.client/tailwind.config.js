const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:
        {
          "cairo-black" : 'cairo-black',
          "cairo-extrabold" : 'cairo-extrabold',
          "cairo-bold" : 'cairo-bold',
          "cairo-semibold" : 'cairo-semibold',
          "cairo-medium" : 'cairo-medium',
          "cairo-regular" : 'cairo-regular',
          "cairo-light" : 'cairo-light',
          "cairo-extralight" : 'cairo-extralight',
          "ethnocentric": 'ethnocentric',
          "ethnocentric-italic":"ethnocentric",
          "tajawal-black" : 'tajawal-black',
          "tajawal-extrabold" : 'tajawal-extrabold',
          "tajawal-bold" : 'tajawal-bold',
          "tajawal-semibold" : 'tajawal-semibold',
          "tajawal-medium" : 'tajawal-medium',
          "tajawal-regular" : 'tajawal-regular',
          "tajawal-light" : 'tajawal-light',
          "tajawal-extralight" : 'tajawal-extralight',
        },
        colors:{
          primary : {
            50 : "#faf5ff",
            100 : "#f3e8ff",
            200 : "#e9d5ff",
            300 : "#d8b4fe",
            400 : "#c084fc",
            500 : "#a855f7",
            600 : "#9333ea",
            700 : "#7e22ce",
            800 : "#6b21a8",
            900 : "#581c87",
            950 : "#3b0764",
            dark: "#130220" ,
            disabled : "#241a2b",
            gradientFrom : "#322884",
            gradientTo: "#c32ef5"
          }
          
        },
        dropShadow: {
          glow: [
            "0 0px 20px rgba(255,255, 255, 0.35)",
            "0 0px 65px rgba(255, 255,255, 0.2)"
          ]
        },
        keyframes : {
          'scale-glow' : {
            '0%, 100%' : { transform : 'scale(1)', filter : 'brightness(1)' },
            '50%' : { transform : 'scale(1.1)', filter : 'brightness(1.1)' },
          },
          'glow' : {
            '0%, 100%' : {filter : 'brightness(1)' },
            '50%' : { filter : 'brightness(1.1)' },
          },
          'float' : {
            '0%, 100%' : {transform : 'translate(0)' },
            '50%' : { transform : 'translateY(25px)' },
          },
          'float' : {
            '0%, 100%' : {transform : 'translate(0)' },
            '50%' : { transform : 'translateY(40px)' },
          },
          
          'ping-slow' : {
            '75%, 100%' : { transform : 'scale(1.2)', opacity : '0' }
          },
          'glow-shadow':{
            '0%, 100%' : { boxShadow : "0 0px 60px #9333ea"},
            '50%' : { boxShadow : 'none' }
          }
          
        },
        animation:{
          'scale-glow' : 'scale-glow 3s ease-in-out infinite',
          'glow' : 'glow 3s ease-in-out infinite',
          'glow-shadow' : 'glow-shadow 2s ease-in-out infinite',
          'ping-slow-1': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
          'ping-slow-2': 'ping-slow 2s .5s cubic-bezier(0, 0, 0.2, 1) infinite',
          'float' : 'float 2s ease-in-out infinite',
          'float2' : 'float 3s ease-in-out infinite'
        }
    },
    
  },
  plugins: [
    require('tailwindcss-motion')
  ],
}

