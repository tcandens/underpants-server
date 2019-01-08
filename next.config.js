const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withPreact = require('@zeit/next-preact')
const withModules = require('next-plugin-transpile-modules')

const plugins = [
  withModules,
  withCss,
  withPreact,
]

module.exports = withPlugins([...plugins], {
  transpileModules: [
    'tachyons',
  ]
})