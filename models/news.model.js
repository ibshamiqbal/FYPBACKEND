const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: { type: Number, required: false },
    description: { type: String, required: false },
    type: { type: String, required: false },
    sportId: { type: Number, default: null },
    leagueId: { type: String, default: null },
    createDate: { type: Date, required: false }
});

const NewsSchema = new mongoose.Schema({
    description: { type: String, required: false },
    headline: { type: String, required: false },
    images: [{ type: String }], // Array of image URLs
    link: { type: String, required: false },
    published: { type: Date, required: false },
    premium: { type: Boolean, required: false },
    lastModified: { type: Date, required: false },
    categories: [CategorySchema] // Array of category objects
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
