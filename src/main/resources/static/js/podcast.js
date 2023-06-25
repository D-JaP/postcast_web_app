/*--------------------------------------------------------------------------------------------------------------------*/
// carousel

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


/*--------------------------------------------------------------------------------------------------------------------*/
// Ajax request for podcast
let playingPodcastPath;
let lastPodcast = new XMLHttpRequest();
lastPodcast.open('GET', '/podcasts/1', true );
lastPodcast.setRequestHeader('Content-Type', 'application/json'); // Set the appropriate content type header
lastPodcast.setRequestHeader('Access-Control-Allow-Origin', '*');
lastPodcast.onreadystatechange = function () {
    if (lastPodcast.readyState == XMLHttpRequest.DONE){
        if (lastPodcast.status === 200) {
            let response = JSON.parse(lastPodcast.responseText);
            let mediaPlayer = document.querySelector('.media-player')

            let created_date = new Date(response.createdTime)
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const formattedDate = created_date.toLocaleDateString('en-US', options)
            mediaPlayer.querySelector('#last-ep-date').innerHTML = formattedDate;

            mediaPlayer.querySelector('#last-ep-description').innerHTML = response.description;

            mediaPlayer.querySelector('#last-ep-img').setAttribute('src', response.coverImgPath);

            mediaPlayer.querySelector('#last-ep-title').innerHTML = response.title;

            mediaPlayer.querySelector('#last-ep-num').innerHTML = "Episode #"+response.id;

            playingPodcastPath = response.directory;
        }
        else{
        //    error handle

        }
    }
}
lastPodcast.send();


/*--------------------------------------------------------------------------------------------------------------------*/
// media player howlerjs
const audioPLayer = document.querySelector(".media-player");

// toggle play/pause
const play_btn = audioPLayer.querySelector("#play-btn");

window.addEventListener('load', () => {
    window.audio = new Howl({
        src: ['/episode/second_episode.mp3'],
        html5: true
    });
    window.audio.on('end', function() {
        play_btn.classList.remove('play');
        play_btn.classList.add('pause');
    });
});


play_btn.addEventListener("click",()=>{
    if (!window.audio.playing()) {
        play_btn.classList.remove('pause');
        play_btn.classList.add('play');
        window.audio.play();

    }
    else {
        play_btn.classList.remove('play');
        play_btn.classList.add('pause');
        window.audio.pause();
    }
},false);

// fast foreward and rewind
const rw = audioPLayer.querySelector("#rewind-btn");
const ff = audioPLayer.querySelector("#forward-btn");

ff.addEventListener("click", ()=>{
    window.audio.seek(audio.seek()+5);
})

rw.addEventListener("click", ()=>{
    window.audio.seek(audio.seek()-5);
})

// set audio volume

const vol_bar =audioPLayer.querySelector(".vol-container");

vol_bar.addEventListener("click", e => {
    const slider_width = window.getComputedStyle(vol_bar).width;
    const new_vol = e.offsetX/parseInt(slider_width);
    window.audio.volume(new_vol);
    audioPLayer.querySelector(".vol-bar-current").style.width = (new_vol * 100)+'%';
})

const play_bar =audioPLayer.querySelector(".play-bar-container");
const current_play_bar = audioPLayer.querySelector(".play-current")
play_bar.addEventListener("mousedown", e => {
    const slider_width = window.getComputedStyle(play_bar).width;
    const new_pos = e.offsetX/parseInt(slider_width);
    window.audio.seek(new_pos * window.audio.duration());
    current_play_bar.style.width = (new_pos * 100)+'%';
})
const time_pass = audioPLayer.querySelector(".time-pass");
const time_left = audioPLayer.querySelector(".play-time .time-left");

// audio player bar
setInterval(() => {
    if (window.audio){
        current_play_bar.style.width = window.audio.seek() / window.audio.duration() * 100 + "%";
        time_pass.innerHTML = getTimeFromNum(window.audio.seek());
        time_left.innerHTML = getTimeFromNum(window.audio.duration()-window.audio.seek());
    }
}, 100);

function getTimeFromNum(num_of_second){
    var minute = parseInt(num_of_second/60);
    var second = parseInt(num_of_second-minute*60);
    if (second < 10) second = '0'+ second;
    if (minute < 10) minute = '0' + minute;
    return minute + ':' + second;
}

// window.audio.on('end', function() {
//     play_btn.classList.remove('play');
//     play_btn.classList.add('pause');
// });


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


