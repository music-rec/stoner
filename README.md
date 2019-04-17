# Stoner
> Stream YouTube songs in terminal without annoying Ads.

If use youtube for listing songs in background than this app is you new friend.

This app streams youtube songs to speaker without caching on hard drive using [ytdl]() to get audio stream from youtube. it will play songs automatically from youtube video suggestion.

To convert to audio the module [fluent-ffmpeg](https://github.com/schaermu/node-fluent-ffmpeg) is used.

You will need to have [ffmpeg](http://www.ffmpeg.org/) and the necessary encoding libraries installed, as well as in your PATH.

* if you are on Linux install it with command
`$ sudo apt-get install ffmpeg`
* If you're on OSX, this can be handled easily using [Homebrew](http://brew.sh/) (`brew install ffmpeg`).

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
    Note: Put url in between double quotes.

## Devlopment

1. install external dependencies
    - Arch based
        `$ sudo pacman -S alsa-lib ffmpeg`
    - Ubuntu based
        `$ sudo apt-get install libasound2`
2. Clone repo
`$ git clone https://github.com/Janglee123/stoner`
3. Install dependencies
`$ npm install`
4. Run app
`$ npm start <youtube-video-url>` 

## TODO
- [x] fix looping songs.
- [x] add playlist support
- [ ] Make progress bar for audio.
- [ ] handle `Error: Input stream error: Too many redirects`
- [ ] remove ffmpge dependency [make it completely portable]