const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@pages': 'src/pages',
        '@components': 'src/components',
        '@utils': 'src/utils',
        '@assets': 'src/assets',
        '@styles': 'src/styles',
        '@services': 'src/services',
        '@router': 'src/router',
        '@layouts': 'src/layouts',
        '@config': 'src/config',
        '@context': 'src/context',
    })(config);

    return config;
};