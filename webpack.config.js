var config = require('madewithlove-webpack-config').packages;

module.exports = config({
    libraryName: 'ReduxReducerFactory',
}).merge({
    externals: {
        immutable: true
    }
});
