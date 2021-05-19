# PNKG [![Build Status](https://api.travis-ci.com/swashvirus/pnkg.svg?branch=main)](https://travis-ci.com/swashvirus/pnkg)
[![Pnkg logo](pnkg-gray.png)](https://github.com/swashvirus/pnkg)
## Definition in brief:
Pnkg is a node module that allows you to package arbitrary files into PNG bundles.

## Installation Instructions:
Install as a node module, from commandline type:
```
npm install pnkg
```

```javascript
const fs = require("fs")
const {PNG} = require("pngjs")
const {pack, unpack} = require("pnkg")
```

Install as a commandline module globally type:
```
npm install —global pnkg
```
```
Usage: pnkg [options] [command]
Commands:
  pack [options] <file>
  unpack <file>
  help [command] display help for command
```
## Documentation
_(Coming soon)_

## Examples
### Packing files
```javascript
fs.createReadStream("<image_path>")
.pipe(new PNG())
.on("parsed", function() {
    // read file payload
    fs.readFile("<data_file_path>", function (error, file_data) {
        if (error) {
            throw new Error(error)
        }
        // override image data with pnkged data.
        this.data = pack(new Uint8Array(this.data), new Uint8Array(file_data))
        this.pack()
        .pipe(fs.createWriteStream("<destination_path>"))
    })
})
```
### Unpacking data
```javascript
fs.createReadStream("<destination_path>")
.pipe(new PNG())
.on("parsed", function() {
    fs.writeFile("<data_file_path>"), unpack(new Uint8Array(this.data)), function(error) {
        if (error) {
            throw new Error(error)
        }
    }
})
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2021 John swana  
Licensed under the MIT license.
