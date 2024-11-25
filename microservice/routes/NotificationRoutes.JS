const express = require('express');

module.exports = (notificationController) => {
    const router = express.Router();

    router.post('/', (req, res) => notificationController.createNotification(req, res));

    console.log('Rotas configuradas com sucesso.');
    return router;
};
