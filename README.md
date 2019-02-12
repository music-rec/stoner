# Stoner
> Stream YouTube songs in terminal without annoying Ads.

If use youtube for listing songs in background than this app is you new friend.

This app streams youtube songs to speacker without caching on hard drive using [ytdl]() to get audio stream from youtube. it will play songs automatically from youtube video suggestion.

To convert to audio the module [fluent-ffmpeg](https://github.com/schaermu/node-fluent-ffmpeg) is used.

You will need to have [ffmpeg](http://www.ffmpeg.org/) and the necessary encoding libraries installed, as well as in your PATH.

* if you are on Linux install it with command
`$ sudo apt-get install ffmpeg`
* If you're on OSX, this can be handled easily using [Homebrew](http://brew.sh/) (`brew install ffmpeg`).

App is created for one day hack challenge.

Thanks to [@jameskyburz](https://github.com/jameskyburz/) for guiding me to use ytdl-core from this [module](https://github.com/jameskyburz/youtube-audio-stream).

## Install

1. Download
    - `$ wget https://github.com/Janglee123/stoner/releases/download/v1.1/stoner.tar.bz2`
2. Extract
    - `$ tar jxf stoner.tar.bz2`
3. Move it to bin dir to run it anywhere
    - `$ sudo sudo cp stoner /usr/bin/`

## How to Use

- `$ stoner <youtube-video-url>`

## Devlopment

1. install external dependencies
    - Arch based
        `$ sudo pacman -S alsa-lib ffmpeg`
2. Clone repo
`$ git clone https://github.com/Janglee123/stoner`
3. Install dependencies
`$ npm install`
4. Run app
`$ npm start <youtube-video-url>` 

## TODO
- [ ] Make progress bar for audio.
- [x] fix looping songs.
- [ ] handle `Error: Input stream error: Too many redirects`
- [ ] add playlist support