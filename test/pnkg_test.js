var fs = require("fs")
var {
    expect
} = require("chai")
var {
    PNG
} = require("pngjs")
var {
    pack,
    unpack
} = require("../lib/pnkg.js")

describe("Pnkg unit tests.", function() {
    describe("Pnkg pack and unpack.", function() {
        it("Pnkg must pack some data (README.md) into an arbitrary image (pnkg.png), unpack the data, and make sure that the unpacked data matches the packed data.", function(done) {
            fs.createReadStream("pnkg.png")
                .pipe(new PNG())
                .on("parsed", function() {
                    fs.readFile("README.md", (error, data) => {
                        if (error) {
                            throw new Error(error)
                        }
                        expect(unpack(pack(new Uint8Array(this.data), new Uint8Array(data)))).to.deep.equal(new Uint8Array(data))
                        done()
                    })
                })
        })
    })
})