const Note = require('../models/api.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.video_id) {
        return res.status(400).send({
            message: "Video_id can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        video_id: req.body.video_id,
        trending_date: req.body.trending_date || " ",
        title: req.body.title || " ",
        channel_title: req.body.channel_title || " ",
        category_id: req.body.category_id || " ",
        publish_time: req.body.publish_time || " ",
        tags: req.body.tags || " ",
        views: req.body.views || " ",
        likes: req.body.likes || " ",
        dislikes: req.body.dislikes || " ",
        comment_count: req.body.comment_count || " ",
        thumbnail_link: req.body.thumbnail_link || " ",
        comments_disabled: req.body.comments_disabled || " ",
        ratings_disabled: req.body.ratings_disabled || " ",
        video_error_or_removed: req.body.video_error_or_removed || " ",
        description: req.body.description || " "
    });

    // Save Note in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.video_id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.video_id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.video_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.video_id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.video_id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.video_id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.video_id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.video_id
            });
        });
};