const ytdl = require('ytdl-core');
const url = require('url');
const ytpl = require('ytpl');
const readline = require('readline');
const FFmpeg = require('fluent-ffmpeg');
const decoder = require('lame').Decoder;
const Speaker = require('speaker');
const opt = {
    videoFormat: 'mp4',
    quality: 'lowest',
    audioFormat: 'mp3',
    filter(format) {
        return format.container === opt.videoFormat && format.audioEncoding
    }
}

let playList = [];
let history = new Set();
let isPlaying = false;

//returns video stream
var getVideo = function (id) {
    let video = ytdl(id, opt);

    //prints download progress
    video.on('progress', (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded`);
        process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        readline.moveCursor(process.stdout, 0, -1);
        //hack :: dont let video stream to stop
        video.resume();
    });

    //prints name of song and id 
    video.on('info', (info) => {
        console.log(info.title);
        console.log('Id : ' + id);

        //if playList is empty add new songs from related videos 
        if (playList.length === 0) {
            let i = 0;
            //check if already played or not
            while (history.has(info.related_videos[i].id) && i < info.related_videos.length - 1) {
                i++;
                if (!info.related_videos[i].id) i++;
            }
            playList.push(info.related_videos[i].id);
        }
    });

    //on end just leave space
    video.on('end', () => {
        process.stdout.write('\n\n');
    });

    return video;
}

//recursively play songs from playList
var play = function () {
    let video = null;
    let ffmpeg;
    let id = playList.shift();
    video = getVideo(id);
    ffmpeg = new FFmpeg(video);

    let speaker = new Speaker();
    let out = ffmpeg.format(opt.audioFormat).pipe(decoder()).pipe(speaker);;

    out.on('error', error => {
        video.end();
        console.error(error);
    });

    speaker.on('close', () => {
        play();
    });
}

if (process.argv[2]) {

    let arg = process.argv[2];

    let url;
    try{
        url = new URL(arg);
    }
    catch(err){
        console.error(err.message);
        process.exit();
    }

    let params = url.searchParams;
    let id = params.get('v');
    let list = params.get('list');
    let index = params.get('index');

    if(!id && !list ){
        console.error(`Invalid URL: ${arg}`);
        process.exit();
    }

    if (list) {
        ytpl(list, function (err, info) {
            if (err) console.log(err);
            info.items.forEach(item => {
                console.log(item.id);
                playList.push(item.id);
            });
            if (!isPlaying) {
                play();
            }
        });
    }

    if (id && ytdl.validateID(id)) {
        playList.push(id);
        isPlaying = true;
        play();
    }
}
else {
    console.log('Give youtube video url');
}
