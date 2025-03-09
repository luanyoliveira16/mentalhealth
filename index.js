(async () => {
    const { default: app } = await import('./backend/server.js');

    module.exports = app;
})();
