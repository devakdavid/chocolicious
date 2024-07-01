module.exports = {
    // other configurations...
    assetPrefix: process.env.NODE_ENV === 'production' ? '/chocolicious' : '',
    output: {
        fileSystem: process.env.NODE_ENV !== 'production',
    },
}
