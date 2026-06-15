module.exports = {
  babel: {
    plugins: [
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
        ? ['babel-plugin-istanbul', { extension: ['.js', '.jsx', '.ts', '.tsx'] }]
        : []
    ].filter(Boolean)
  }
};
