let publicPath = '/'

if (process.env.NODE_ENV === 'production'
    && !process.env.IS_NETLIFY) {
  publicPath = '/microbios/'
}

module.exports = { publicPath }
