const pack = function(image = [], data = [], basis = 7) {
    const imageLength = image.length / 4
    const dataLength = data.length
    const max = Math.pow(basis, 3) - 1
    const step = (imageLength / dataLength) | 0
    for (let i = 0, k = 0; i < imageLength; i++) {
        const p = i * 4
        let v = max
        if (k < dataLength && i % step === 0) {
            v = data[k++] || 0
        }
        for (let j = 0; j < 3; j++) {
            const x = image[p + j]
            let r = ((x / basis) | 0) * basis
            if (r + basis > 255) r -= basis
            image[p + j] = (v % basis) + r
            v = (v / basis) | 0
        }
    }
    return image
}
const unpack = function(image, basis = 7) {
    const imageLength = image.length / 4
    const data = []
    const max = Math.pow(basis, 3) - 1
    for (let i = 0, k = 0; i < imageLength; i++) {
        const p = i * 4
        let v = 0
        for (let j = 0; j < 3; j++) {
            const x = image[p + j]
            let r = ((x / basis) | 0) * basis
            if (r + basis > 255) r -= basis
            v += (x - r) * Math.pow(basis, j)
        }
        if (v < max) data[k++] = v
    }
    return new Uint8Array(data)
}
module.exports = {
    pack,
    unpack
}