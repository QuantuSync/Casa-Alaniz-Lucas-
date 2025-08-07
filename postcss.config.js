module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Solo incluir cssnano en producción si está instalado
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
            normalizeWhitespace: false,
          },
        ],
      },
    }),
  },
};
