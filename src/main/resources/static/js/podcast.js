/*--------------------------------------------------------------------------------------------------------------------*/
// Ajax request for podcast
let playingPodcastPath;
let currentPodcast = new XMLHttpRequest();
currentPodcast.open('GET', '/podcasts/1', true );
currentPodcast.setRequestHeader('Content-Type', 'application/json'); // Set the appropriate content type header
currentPodcast.setRequestHeader('Access-Control-Allow-Origin', '*');
currentPodcast.onreadystatechange = function () {
    if (currentPodcast.readyState == XMLHttpRequest.DONE){
        if (currentPodcast.status === 200) {
            let response = JSON.parse(currentPodcast.responseText);
            let mediaPlayer = document.querySelector('.media-player')

            let created_date = new Date(response.createdTime * 1000)
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const formattedDate = created_date.toLocaleDateString('en-US', options)
            mediaPlayer.querySelector('#last-ep-date').innerHTML = formattedDate;

            mediaPlayer.querySelector('#last-ep-description').innerHTML = response.description;

            mediaPlayer.querySelector('#last-ep-img').setAttribute('src', response.coverImgPath);

            mediaPlayer.querySelector('#last-ep-title').innerHTML = response.title;

            mediaPlayer.querySelector('#last-ep-num').innerHTML = "Episode #"+response.id;

            mediaPlayer.querySelector('.time-left').innerHTML = getTimeFromNum(response.duration);

            playingPodcastPath = response.directory;
        }
        else{
        //    error handle

        }
    }
}
currentPodcast.send();

/*--------------------------------------------------------------------------------------------------------------------*/
// media player howlerjs
const audioPLayer = document.querySelector(".media-player");
let is_loaded = false;
// toggle play/pause
const play_btn = audioPLayer.querySelector("#play-btn");
const rw = audioPLayer.querySelector("#rewind-btn");
const fw = audioPLayer.querySelector("#forward-btn");
const time_pass = audioPLayer.querySelector(".time-pass");
const time_left = audioPLayer.querySelector(".play-time .time-left");
const auto_play_btn = document.querySelector('.auto-play-btn');
const auto_play_btn_thumb = auto_play_btn.querySelector('.auto-play-btn-thumb');
const vol_bar =audioPLayer.querySelector(".vol-container");
const play_bar =audioPLayer.querySelector(".play-bar-container");
const current_play_bar = audioPLayer.querySelector(".play-current")

let audio, audioPosBeforePlay
window.addEventListener('load', () => {
    play_btn.addEventListener("click", () =>{
        if(is_loaded == false){
            audio = new Howl({
                src: ['/episode/second_episode.mp3'],
                html5: true,
                preload: true,
                loop: false,
            });
            is_loaded = true;
        }

        addAudioEndHandler(audio);
        loadVolumeLevel(audio);
        addPlayStopButtonHandler(play_btn, audio);
        addReWindForwardBtnHandler(rw, fw, audio);


        //play audio for first time
        if (audioPosBeforePlay != null){
            audio.pause()
            audio.seek(audioPosBeforePlay)
            audio.play()
            audioPosBeforePlay = null
        }
        else {
            audio.play();
        }
        play_btn.classList.remove('pause');
        play_btn.classList.add('play');
        // audio player bar
        setInterval(() => {
            if (audio){
                current_play_bar.style.width = audio.seek() / audio.duration() * 100 + "%";
                time_pass.innerHTML = getTimeFromNum(audio.seek());
                time_left.innerHTML = getTimeFromNum(audio.duration()-audio.seek());
            }
        }, 250);


    }, {once : true})

    loadAutoPlaySetting();
    loadVolumeLevel(audio);
    addVolBarHandler();
    addPlaybarHandler()
    addAutoPlayBtnHandler();

    // set audio volume
    function addVolBarHandler() {
        vol_bar.addEventListener("click", e => {
            const slider_width = window.getComputedStyle(vol_bar).width;
            const new_vol = e.offsetX/parseInt(slider_width);
            localStorage.setItem('volume', new_vol.toString())

            if (audio != null){
                audio.volume(new_vol);
            }
            audioPLayer.querySelector(".vol-bar-current").style.width = (new_vol * 100)+'%';
        })
    }
    // fast foreward and rewind
    function addReWindForwardBtnHandler(rwBtn, fwBtn, audio){
        fwBtn.addEventListener("click", ()=>{
            if (audio != null) {
                audio.seek(audio.seek()+5);
            }
        })

        rwBtn.addEventListener("click", ()=>{
            if (audio != null){
                audio.seek(audio.seek()-5);
            }
        })
    }

    function addAudioEndHandler (audio) {
        audio.on('end', function() {
            play_btn.classList.remove('play');
            play_btn.classList.add('pause');
            audio.unload();
        });
    }

    function addPlayStopButtonHandler() {
        /* play/pause */
        play_btn.addEventListener("click",()=>{
            if (!audio.playing()) {
                play_btn.classList.remove('pause');
                play_btn.classList.add('play');
                audio.play();
            }
            else {
                play_btn.classList.remove('play');
                play_btn.classList.add('pause');
                audio.pause();
            }
        },false);
    }

    function loadVolumeLevel(audio) {
        const vol = localStorage.getItem("volume")
        if (vol != null) {
            audioPLayer.querySelector(".vol-bar-current").style.width = (vol * 100)+'%';
            if(audio!= null){
                audio.volume(vol)
            }
        }
        else {
            if(audio!= null){
                audio.volume(0.5)
            }
            audioPLayer.querySelector(".vol-bar-current").style.width = (0.5 * 100)+'%';
        }
    }

    function attachVolumeLevel(audio, vol_level) {
        audio.volume(parseFloat(vol_level))
    }

    function addPlaybarHandler(){
        play_bar.addEventListener("mousedown", e => {
            if (!is_loaded){
                audio = new Howl({
                    src: ['/episode/second_episode.mp3'],
                    html5: true,
                    preload: true,
                    loop: false,
                    onload: function () {
                        audioPosBeforePlay = new_pos * audio.duration();
                    }
                });
                is_loaded = true;
            }

            const slider_width = window.getComputedStyle(play_bar).width;
            const new_pos = e.offsetX/parseInt(slider_width);
            if (is_loaded){
                audioPosBeforePlay = new_pos * audio.duration();
            }
            audio.seek(new_pos * audio.duration());
            current_play_bar.style.width = (new_pos * 100)+'%';

        })
    }

    function addAutoPlayBtnHandler(){
        // autoplay
        auto_play_btn.addEventListener("click", e =>{
            if(auto_play_btn.classList.contains('on')){
                auto_play_btn.classList.remove('on');
                auto_play_btn.classList.add('off');
                auto_play_btn_thumb.classList.remove('on');
                auto_play_btn_thumb.classList.add('off');
                localStorage.setItem("auto-play", "false");
            }
            else {
                auto_play_btn.classList.remove('off');
                auto_play_btn.classList.add('on');
                auto_play_btn_thumb.classList.remove('off');
                auto_play_btn_thumb.classList.add('on');
                localStorage.setItem("auto-play", "true");
            }
        })
    }

    function loadAutoPlaySetting(){
        let autoplay = localStorage.getItem("auto-play");
        if (autoplay === "true") {
            auto_play_btn.classList.remove('off');
            auto_play_btn.classList.add('on');
            auto_play_btn_thumb.classList.remove('off');
            auto_play_btn_thumb.classList.add('on');
        }
    }

});

function getTimeFromNum(num_of_second){
    let minute = parseInt(num_of_second/60);
    let second = parseInt(num_of_second-minute*60);
    if (second < 10) second = '0'+ second;
    if (minute < 10) minute = '0' + minute;
    return minute + ':' + second;
}


