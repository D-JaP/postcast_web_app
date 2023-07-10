/*--------------------------------------------------------------------------------------------------------------------*/
// Ajax request for podcast
let playingPodcastPath;
let current_play_id;
let currentPodcast = new XMLHttpRequest();
currentPodcast.open('GET', '/podcasts/1', true );
currentPodcast.setRequestHeader('Content-Type', 'application/json'); // Set the appropriate content type header
currentPodcast.setRequestHeader('Access-Control-Allow-Origin', '*');
currentPodcast.onreadystatechange = function () {
    if (currentPodcast.readyState == XMLHttpRequest.DONE){
        if (currentPodcast.status === 200) {
            let response = JSON.parse(currentPodcast.responseText);
            let mediaPlayer = document.querySelector('.media-player')

            const formattedDate = getDateFromTimestamp(response.createdTime)

            mediaPlayer.querySelector('#last-ep-date').innerHTML = formattedDate;

            mediaPlayer.querySelector('#last-ep-description').innerHTML = response.description;

            mediaPlayer.querySelector('#last-ep-img').setAttribute('src', response.coverImgPath);

            mediaPlayer.querySelector('#last-ep-title').innerHTML = response.title.toUpperCase();

            mediaPlayer.querySelector('#last-ep-num').innerHTML = response.id;
            current_play_id = response.id

            mediaPlayer.querySelector('.time-left').innerHTML = getTimeFromNum(response.duration);

            playingPodcastPath = response.directory;


        }
        else{
        //    error handle

        }
    }
}
currentPodcast.send();

function getDateFromTimestamp(createdTime) {
    let created_date = new Date(createdTime * 1000)
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = created_date.toLocaleDateString('en-US', options)
    return formattedDate
}
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


/****************************  Carousel ******************************/
let glide = new Glide('.glide', {
    type: 'slider',
    focusAt: 'center',      // Center the currently focused item
    rewind: false,     // Equivalent to loop: false in Owl Carousel
    gap: 100,           // Equivalent to margin: 80 in Owl Carousel
    perView: 3,        // Equivalent to items: 1 in Owl Carousel
    width :300,
    breakpoints: {
        600: { perView: 1 },   // Responsive settings for width >= 600px
        1024: { perView: 3 },  // Responsive settings for width >= 1024px
        1366: { perView: 3 }   // Responsive settings for width >= 1366px
    }}).mount();

const glideTrack = document.querySelector('.glide__track .glide__slides');
let html_playing = `<div class="carousel-playing collapse show">
                       <span class="playing__bar playing__bar1"></span>
                       <span class="playing__bar playing__bar2"></span>
                       <span class="playing__bar playing__bar3"></span>
                    </div>`
let html_glide =(number , imgLink, title,description, current_play_id ) => {
    return `<li class="glide__slide">
        <a href="../images/podcast/icon/play.svg" class="text-decoration-none d-block position-relative" >
            <div class="position-relative">
                <img src=${imgLink} alt="" class="grey-filter" style="width:300px;height:300px">
                <div class="img-overlay"></div>
            </div>
            <div class="container carousel-hover-description play-bt-hv d-flex flex-column">
                <div class="row description">${description}</div>
                <div class="row ms-auto mt-auto">
                    ${(number !=current_play_id)? `<img src="../images/podcast/icon/play.svg" alt="" class="carousel-play-bt p-0 collapse show">`:'' }
                    ${number == current_play_id?  html_playing:''}
                    
                </div>
            </div>
            <div class="item-title-bg carousel-podcast-title" id="carousel-podcast-id">
                <p>#<span>${number}</span>. ${title}</p>
            </div>
        </a>
<!--        <div class="blur-bg" style="">-->
        </div>
</li>`
}

let loadmore_glide = () => {
    return `<li class="glide__slide">
        <a href="#episode-list" class="text-decoration-none loadmore-glide d-flex justify-content-center align-items-center" >
            Load more...
        </a>
</li>`
}


const queryRelatedPodcasts = (current_play_id) => {
    let minId = current_play_id-3;
    let maxId = current_play_id+5;
    let relatedPodcasts = new XMLHttpRequest();
    relatedPodcasts.open('GET', `/podcasts/search/findByIdBetween?minId=${minId}&maxId=${maxId}`)
    relatedPodcasts.setRequestHeader('Content-Type', 'application/json');
    relatedPodcasts.setRequestHeader('Access-Control-Allow-Origin', '*');
    relatedPodcasts.onreadystatechange = function (){
        if (relatedPodcasts.readyState == XMLHttpRequest.DONE){
            if( relatedPodcasts.status == 200){
                let response = JSON.parse(relatedPodcasts.responseText)
                const podcastList = response._embedded.podcasts
                podcastList.forEach((podcast) => {
                    glideTrack.insertAdjacentHTML('beforeend', html_glide(podcast.id, podcast.coverImgPath, podcast.title, podcast.description, current_play_id ));
                })
                glideTrack.insertAdjacentHTML('beforeend', loadmore_glide());
                glide.update({
                    startAt: current_play_id - response._embedded.podcasts[0].id + 1
                });

                const loadmore_event = document.querySelector(".loadmore-glide");
                loadmore_event.addEventListener("click", (e)=>{
                    e.preventDefault()
                    const offset = 100; // Adjust offset as needed
                    const target = document.querySelector(loadmore_event.getAttribute('href'));
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                })
            }
        }
    }
    relatedPodcasts.send()
}

let current_ep_num_element = document.querySelector('#last-ep-num')

const observer = new MutationObserver((mutations) =>{
    for (const mutation of mutations) {
        if(mutation.type === 'childList'){
            queryRelatedPodcasts(parseInt(current_ep_num_element.innerHTML))
            //disconnect after once execute
            observer.disconnect()
        }
    }
})

observer.observe(current_ep_num_element, {childList: true});

/* Default podcasts with "all" */

localStorage.getItem("tag")
let urlQueryAllPodcast = `podcasts?sort=id,desc`
queryPodcastByUrl(urlQueryAllPodcast).then(result => {
    let listPodcast =Array.from(result)  ;
    updateCardByPodcastList(listPodcast.slice(0,6))
})

let btnLoadMore = document.querySelector('#lm-btn')
btnLoadMore.addEventListener('click', () => {
    const numCard = document.querySelectorAll('.card')
    let currentTag = localStorage.getItem("tag")
    if (currentTag==null) {
        currentTag = "all"
    }
    let currentPage = Math.floor(numCard.length/6)
    if (currentPage == null) {
        currentPage = 0
    }

    let postfix = `&page=${currentPage}&size=6`
    queryPodcastByTag(currentTag, postfix).then((result) => {
        if (result.length==0){
            toggleOffLoadmoreBtn()
        }
        else{
            updateCardByPodcastList(result, true)
        }
    })
})


/* Query list of tag */

let listOfTag = new XMLHttpRequest();
listOfTag.open('GET', '/tags')
listOfTag.setRequestHeader('Content-Type', 'application/json')
listOfTag.onreadystatechange = () => {
    if (listOfTag.readyState == XMLHttpRequest.DONE){
        if (listOfTag.status == 200){
            const tag_container = document.querySelector('.tags')
            let response = JSON.parse(listOfTag.response)
            let tag_names = response._embedded.tags
            tag_names.forEach((tag) => {
                tag_container.insertAdjacentHTML('beforeend',`<div class="btn tag badge text-wrap mb-3">${tag.name}</div>`)
            })

            const tag_btns = tag_container.querySelectorAll('.tag')
            //all-tag will sort by desc
            tag_btns[0].addEventListener('click', ()=> {
                let url = `podcasts?sort=id,desc`
                let listPodcast
                localStorage.setItem("tag", "all")
                queryPodcastByUrl(url).then(result => {
                    listPodcast = result;
                    updateCardByPodcastList(listPodcast)
                })
            })
            //other tags

            const tag_btns_arr = Array.from(tag_btns)
            tag_btns_arr.slice(1).forEach((tag_btn) => {
                tag_btn.addEventListener('click', () => {
                    localStorage.setItem("tag", tag_btn.innerHTML)

                    queryPodcastByTag(tag_btn.innerHTML, ).then(result => {
                        updateCardByPodcastList(result)
                    })
                })
            })
        }
    }
}
listOfTag.send()

/*   Query list of podcasts   */

let card_html = (card_img_link, ep_date, ep_number, ep_title, ep_description, ep_duration) => {
    return `<div class="card shadow">
        <img src=${card_img_link} class="card-img-top" alt="" width="300px" height="300px">
            <div class="card-body pt-1">
                <div class="d-flex justify-content-between">
                    <p class="card-date">${ep_date}</p>
                    <p class="card-date">${ep_duration}</p>
                </div>
                <h5 class="card-title">#${ep_number}. ${ep_title}</h5>
                <p class="card-text">${ep_description}</p>
            </div>
    </div>`
}

function updateCardByPodcastList(listPodcast, appendMode= false) {
    if (listPodcast == null) return
    const cardContainer = document.querySelector(".podcast-cards")
    if(appendMode == false){
        cardContainer.innerHTML = ""
    }

    Array.from(listPodcast).slice(0,6).forEach((podcast) => {
        cardContainer.insertAdjacentHTML('beforeend', card_html(podcast.coverImgPath, getDateFromTimestamp(podcast.createdTime), podcast.id, podcast.title, podcast.description, getTimeFromNum(podcast.duration)))
    })
    if(listPodcast.length <6) {
        toggleOffLoadmoreBtn()
    }
    else{
        toggleOnLoadmoreBtn()
    }
}

function toggleOnLoadmoreBtn(){
    const btn_loadmore = document.querySelector('#lm-btn')
    btn_loadmore.classList.add('collapse')
    btn_loadmore.classList.add('show')
}
function toggleOffLoadmoreBtn(){
    const btn_loadmore = document.querySelector('#lm-btn')
    btn_loadmore.classList.add('collapse')
    btn_loadmore.classList.remove('show')
}


function queryPodcastByUrl(url) {
    return new Promise((resolve, reject) => {
        let listPodcast = new XMLHttpRequest();
        listPodcast.open('GET', url);
        listPodcast.setRequestHeader('Content-Type', 'application/json');
        listPodcast.onreadystatechange = () => {
            if (listPodcast.readyState == XMLHttpRequest.DONE) {
                if (listPodcast.status == 200) {
                    let json_output = JSON.parse(listPodcast.responseText)._embedded.podcasts;
                    resolve(json_output); // Resolve the promise with the result
                } else {
                    reject(listPodcast.status); // Reject the promise with the error status
                }
            }
        };
        listPodcast.send();
    });
}

function queryPodcastByTag(tagName, postfix = ""){
    let queryByTagUrl = `/podcasts/search/findPodcastsByTagsName?name=` + tagName + postfix
    if (tagName== "all") queryByTagUrl =`/podcasts?sort=id,desc` + postfix
    return queryPodcastByUrl(queryByTagUrl)
}







