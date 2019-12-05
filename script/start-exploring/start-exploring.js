const { startExploring } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

startExploring({
  ...jsenvConfig,
  livereloading: true,
  port: 3000,
})
