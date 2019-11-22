module.exports = (app) => {
    const apis = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/api', apis.create);

    // Retrieve all Notes
    app.get('/api', apis.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/:video_id', apis.findOne);

    // Update a Note with noteId
    app.put('/api/:video_id', apis.update);

    // Delete a Note with noteId
    app.delete('/api/:video_id', apis.delete);
}