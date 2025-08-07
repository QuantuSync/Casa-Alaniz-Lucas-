module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Optimización para producción
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: false,
        }]
      }
    })
  }
};