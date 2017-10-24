var gulp = require('gulp');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var buffer = require('vinyl-buffer');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
    // Generate our spritesheet 
    var spriteData = gulp.src('img/icon-?*.png').pipe(spritesmith({
        imgName: 'icon_sprite.png',
        cssName: 'icon_sprite.css',
        cssVarMap: function(sprite) {
            sprite.name = sprite.name.replace("icon-", "");
        },
        imgPath: '../images/emoji_sprite.png'
    }));

    // Pipe image stream through image optimizer and onto disk 
    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin` 
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('src/imgs/'));

    // Pipe CSS stream through CSS optimizer and onto disk 
    var cssStream = spriteData.css
        .pipe(gulp.dest('src/css/'));

    // Return a merged stream to handle both `end` events 
    return merge(imgStream, cssStream);
});