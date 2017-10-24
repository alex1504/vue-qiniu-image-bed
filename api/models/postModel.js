var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var PostSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    poster: { type: String },
    content: String,
    star: { type: Number, default: 0 },
    starBy: { type: Array },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
}, {
    timestamps: true
})

// 保存记录前自动生成日期
function genDate(post) {
    var currentDate = new Date();
    if (!post.createdAt) post.createdAt = currentDate;
    post.updatedAt = currentDate;
}


PostSchema.pre('save', function(next) {
    genDate(this);
    next();
})


module.exports = mongoose.model('Posts', PostSchema)