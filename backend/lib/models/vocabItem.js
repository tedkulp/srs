const mongoose = require('../database').mongoose;

const vocabItemSchema = mongoose.Schema({
    "core-index" : Number,
    "optimized-voc-index2k+4kdefault" : Number,
    "vocab" : String,
    "kanjified-vocab" : String,
    "vocab-kana" : String,
    "vocab-furigana" : String,
    "vocab-rtk" : String,
    "vocab-translation" : String,
    "part-of-speech" : String,
    "example-sentence" : String,
    "example-sentence-translation" : String,
    "notes" : String,
    "own-note-recognition" : String,
    "own-note-production" : String,
    "pitch-accent" : String,
    "word-type" : String,
    "vocab-audio" : String,
    "sentence-audio" : String,
    "image" : String,
    "optimized-voc-index2k" : String,
    "nukikame-core6k-optimized-voc-index" : Number,
    "vocab-frequency" : Number,
    "jlpt-level" : String,
    "word-structure" : String,
    "notes-meta" : String,
    "tags" : String,
}, {
    timestamps: {},
    collection: 'vocab_items',
});

const vocabItem = mongoose.model('VocabItem', vocabItemSchema);

module.exports.model = vocabItem;
module.exports.schema = vocabItemSchema;
