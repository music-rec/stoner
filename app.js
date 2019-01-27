const ytdl = require('ytdl-core');
const readline = require('readline');
const FFmpeg = require('fluent-ffmpeg');
const decoder = require('lame').Decoder;
const Speaker = require('speaker');
const opt = {
    videoFormat: 'mp4',
    quality: 'lowest',
    audioFormat: 'mp3',
    filter (format) {
        return format.container === opt.videoFormat && format.audioEncoding
    }
}
let history = [];
let next_id ;

var getVideo = function(uri){

    let video = ytdl(uri, opt);

    video.on('progress', (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded`);
        process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        readline.moveCursor(process.stdout, 0, -1);
        //hack dont let video stream to stop
        video.resume();
    });
    video.on('info', (info) => {
        console.log(info.title);
        next_id = info.related_videos[0].id;
    });
    video.on('end', () => {
        process.stdout.write('\n\n');
    });

    return video;
}

var play = function(){
    let video = null;
    let ffmpeg;

    history.push[next_id];
    video = getVideo(next_id);
    ffmpeg = new FFmpeg(video);

    let speaker = new Speaker();
    let out = ffmpeg.format(opt.audioFormat).pipe(decoder()).pipe(speaker);;

    out.on('error', error => {
        video.end();
        throw error;
    });

    speaker.on('close', ()=>{
        play();
    });
}


if(process.argv[2]){
    id = process.argv[2];
    if(!ytdl.validateID(id)){
        console.log('id is not valid');
        process.exit();
    }
    else{
        next_id = id;
        play();
    }
}
else{
    console.log('Give youtube url');
}
