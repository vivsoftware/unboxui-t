/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  reactStrictMode: false,
  i18n,
  // env: {
  //   API_URL: "https://voxo-node.pixelstrap.net/api/",
  // },
  images:{
    
    // domains:['192.168.1.7']
    domains:['strapi.unboxindustry.com']
  }
});


