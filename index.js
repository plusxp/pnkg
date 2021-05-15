#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const {PNG} = require("pngjs")
const program = require("commander")
const {version} = require("./package.json")
const pnkg = require("./lib/pnkg.js")
const {pack,unpack} = pnkg

program
    .version(version)
    .command("pack <file>")
    .option("-i, --image, [thumbnail]", "image to pack file into")
    .option("-o, --output, [output]", "output filename")
    .action(function(file, options) {
        const sufix = ".png"
        fs.createReadStream(options.image)
            .pipe(new PNG())
            .on("parsed", function() {
                fs.readFile(file, (error, data) => {
                    if (error) {
                        throw new Error(error)
                    }
                    this.data = pack(new Uint8Array(this.data), new Uint8Array(data))
                    this.pack().pipe(fs.createWriteStream(options.output || (file + sufix)))
                })
            })
    })

program
    .command("unpack <file>")
    .action(function(file) {
        fs.createReadStream(file)
            .pipe(new PNG())
            .on("parsed", function() {
                fs.writeFile(path.normalize(file.substr(0, file.length - 4)).replace(/^(?:\.\.\/)+/, ""), unpack(new Uint8Array(this.data)), function(error) {
                    if (error) {
                        throw new Error(error)
                    }
                })
            })
    })

program.parse(process.argv)