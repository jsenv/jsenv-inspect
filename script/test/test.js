const { executeTestPlan, launchChromiumTab, launchNode } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "test/**/*.test.js": {
      chromium: {
        launch: launchChromiumTab,
      },
      node: {
        launch: launchNode,
      },
    },
  },
  coverage: process.argv.includes("--coverage"),
  completedExecutionLogMerging: true,
})
