// const { min } = require("lodash");

$('.owl-carousel').owlCarousel({
    center: true,
    loop:false,
    margin:80,
    

    navContainer: '.owl-theme .custom-nav',
    dots:false,
    responsiveClass: true,
    stagePadding: 0,
    responsive:{
        0: {
            items: 1,
            nav:true
        },
    
        600: {
        items: 1,
        nav:false
        },
    
        1024: {
        items: 3,
        nav:true
        },
    
        1366: {
        items: 3,
        nav:true
        }
    }
});

// media player howlerjs

const audioPLayer = document.querySelector(".media-player");

// let audio = new Audio(flagsUrl + 'episode\\first_episode.mp3');
let audio = new Howl({src: ["https://m.sive.rs/DEREK_SIVERS-Flexible-1998-07.mp3"],
    html5:true});
audio.volume(0.5);
// toggle play/pause
const play_btn = audioPLayer.querySelector("#play-btn");

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

// fast foreward and rewind
const rw = audioPLayer.querySelector("#rewind-btn");
const ff = audioPLayer.querySelector("#forward-btn");

ff.addEventListener("click", ()=>{
    audio.seek(audio.seek()+5);
})

rw.addEventListener("click", ()=>{
    audio.seek(audio.seek()-5);
})

// set audio volume

const vol_bar =audioPLayer.querySelector(".vol-container");

vol_bar.addEventListener("click", e => {
    const slider_width = window.getComputedStyle(vol_bar).width;
    const new_vol = e.offsetX/parseInt(slider_width);
    audio.volume(new_vol);
    audioPLayer.querySelector(".vol-bar-current").style.width = (new_vol * 100)+'%';
})

const play_bar =audioPLayer.querySelector(".play-bar-container");
const current_play_bar = audioPLayer.querySelector(".play-current")
play_bar.addEventListener("mousedown", e => {
    const slider_width = window.getComputedStyle(play_bar).width;
    const new_pos = e.offsetX/parseInt(slider_width);
    audio.seek(new_pos * audio.duration());
    current_play_bar.style.width = (new_pos * 100)+'%';
})
const time_pass = audioPLayer.querySelector(".time-pass");
const time_left = audioPLayer.querySelector(".play-time .time-left");

// audio player bar
setInterval(() => {
    current_play_bar.style.width = audio.seek() / audio.duration() * 100 + "%";
    time_pass.innerHTML = getTimeFromNum(audio.seek());
    time_left.innerHTML = getTimeFromNum(audio.duration()-audio.seek());
  }, 100);

function getTimeFromNum(num_of_second){
    var minute = parseInt(num_of_second/60);
    var second = parseInt(num_of_second-minute*60);
    if (second < 10) second = '0'+ second;
    if (minute < 10) minute = '0' + minute;
    return minute + ':' + second;
}

audio.on('end', function() {
    play_btn.classList.remove('play');
    play_btn.classList.add('pause');
});


// autoplay

const auto_play_btn = document.querySelector('.auto-play-btn');
const auto_play_btn_thumb = auto_play_btn.querySelector('.auto-play-btn-thumb');
auto_play_btn.addEventListener("click", e =>{
    if(auto_play_btn.classList.contains('on')){
        auto_play_btn.classList.remove('on');
        auto_play_btn.classList.add('off');
        auto_play_btn_thumb.classList.remove('on');
        auto_play_btn_thumb.classList.add('off');
    }
    else {
        auto_play_btn.classList.remove('off');
        auto_play_btn.classList.add('on');
        auto_play_btn_thumb.classList.remove('off');
        auto_play_btn_thumb.classList.add('on');
    }
})

