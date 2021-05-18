const fs = require("fs")
const path = require("path")
module.exports = function(grunt) {
grunt.initConfig({
webpack: {
            dev: {
                mode: "development",
                watch: true,
                entry: {
                    "./dist/pnkg": ["./lib/pnkg.js"]
                },
                module: {
                    rules: []
                },
                output: {
                    path: path.resolve(__dirname, "./"),
                    filename: "[name].min.js"
                }
            },
            prod: {
                mode: "production",
                entry: {
	                "./dist/pnkg": ["./lib/pnkg.js"]
                },
                module: {
                rules: []
                },
                output: {
                path: path.resolve(__dirname, "./"),
                filename: "[name].min.js"
                }
            }
        }
})
grunt.loadNpmTasks("grunt-webpack")
grunt.registerTask("build:dev", ["webpack:dev"])
grunt.registerTask("build:prod", ["webpack:prod"])
}