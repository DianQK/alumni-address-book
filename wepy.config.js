var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      sourceMap: true,
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    'replace': {
      filter: /\.js$/,
      config: {
        find: 'dev: true',
        replace: 'dev: false'
      }
    },
    uglifyjs: {
      filter: /\.js$/,
      config: {
        compress: {
          drop_console: true,
          hoist_funs: true,
          warnings: true
        },
        mangle: {
          except: ['Team', 'Student', 'TeamStudentMap']
        }
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
