const mongoose = require('mongoose');

const YoutubeSchema = mongoose.Schema({
    video_id: String,
    trending_date: String,
    title: String,
    channel_title: String,
    category_id: Number,
    publish_time: String,
    tags: String,
    views: Number,
    likes: Number,
    dislikes: Number,
    comment_count: Number,
    thumbnail_link: String,
    comments_disabled: String,
    ratings_disabled: String,
    video_error_or_removed: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Youtube', YoutubeSchema);