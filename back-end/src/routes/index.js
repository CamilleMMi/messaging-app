const authRoutes = require('./authentification.route-1.0.0');
const sandboxRoutes = require('./sandbox.route-1.0.0');

module.exports = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/sandbox', sandboxRoutes);
};