/* Thymeleaf variable*/
// const hostname = window.location.hostname;
const hostname = ""
const epPath = epDirectory;
currentPodcast = JSON.parse(lastestPodcast)
/*--------------------------------------------------------------------------------------------------------------------*/
// Update media player information
let playingPodcastPath;

const current_play_id = currentPodcast.id;
let mediaPlayer = document.querySelector('.media-player')

const formattedDate = getDateFromTimestamp(currentPodcast.createdTime)

mediaPlayer.querySelector('#last-ep-date').innerHTML = formattedDate;
mediaPlayer.querySelector('#last-ep-description').innerHTML = currentPodcast.description;
mediaPlayer.querySelector('#last-ep-img').setAttribute('src', currentPodcast.coverImgPath);
mediaPlayer.querySelector('#last-ep-title').innerHTML = currentPodcast.title;
mediaPlayer.querySelector('#last-ep-num').innerHTML = currentPodcast.id;
mediaPlayer.querySelectorAll('.main-ep-duration').forEach((s) => s.innerHTML = parseInt(currentPodcast.duration /60) + "m")
mediaPlayer.querySelector('#last-ep-author').innerHTML = currentPodcast.authors
mediaPlayer.querySelector('#last-ep-author-mb').innerHTML = currentPodcast.authors
playingPodcastPath = currentPodcast.directory;
adjustCarouselTopPosition();


// handle click
const mainEpisode = document.querySelector(".ep-description-mb")
mainEpisode.addEventListener("click", () =>{
    window.location.href = hostname + currentPodcast.page;
})

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
const current_play_bar = audioPLayer.querySelector(".play-current")

let audio, audioPosBeforePlay, playFromAuto

function getTimeFromNum(num_of_second){
    let minute = parseInt(num_of_second/60);
    let second = parseInt(num_of_second-minute*60);
    if (second < 10) second = '0'+ second;
    if (minute < 10) minute = '0' + minute;
    return minute + ':' + second;
}

/****************************  Carousel ******************************/
/*mobile view*/
function adjustCarouselTopPosition(){
    const player_view = document.querySelector(".banner")
    const descriptionHeight= document.querySelector(".ep-description-mb")
    if (window.matchMedia("(max-width: 767px)").matches){
        player_view.style.paddingBottom=descriptionHeight.offsetHeight -210 +"px"
    }
}
/*end mobile view*/

let glide = new Glide('.glide', {
    type: 'slide',
    focusAt: 'center',      // Center the currently focused item
    rewind: false,     // Equivalent to loop: false in Owl Carousel
    gap: 100,           // Equivalent to margin: 80 in Owl Carousel
    perView: 3,        // Equivalent to items: 1 in Owl Carousel
    width :300,
    breakpoints: {
    }}).mount();

const glideTrack = document.querySelector('.glide__track .glide__slides');
let html_playing = `<div class="carousel-playing collapse show">
                       <span class="playing__bar playing__bar1"></span>
                       <span class="playing__bar playing__bar2"></span>
                       <span class="playing__bar playing__bar3"></span>
                    </div>`
let html_glide =(number , imgLink, title,description, current_play_id, episode_link ) => {
    return `<li class="glide__slide">
        <a href=${episode_link} class="text-decoration-none d-block position-relative" >
            <div class="position-relative">
                <img src=${imgLink} alt="" class="grey-filter" style="width:300px;height:300px">
                <div class="img-overlay"></div>
            </div>
            <div class="container carousel-hover-description play-bt-hv d-flex flex-column">
                <div class="row description">${description}</div>
                <div class="row ms-auto mt-auto">
                    ${(number !=current_play_id)? `<img src=${ hostname + "/images/podcast/icon/play.svg"} alt="" class="carousel-play-bt p-0 collapse show">`:'' }
                    ${number == current_play_id?  html_playing:''}
                </div>
            </div>
            <div class="item-title-bg carousel-podcast-title" id="carousel-podcast-id">
                <p>#<span>${number}</span>. ${title}</p>
            </div>
        </a>
        <a href=${episode_link} class="blur-bg" style="">
        </a>
</li>`
}

let loadmore_glide = () => {
    return `<li class="glide__slide">
        <a href="#episode-list" class="text-decoration-none loadmore-glide d-flex justify-content-center align-items-center" >
            Load more...
        </a>
</li>`
}
let html_ep_slide = (imgSrc, title, description, id, episode_link) => {
    return `<a href=${episode_link} class="item">
					<img class="img-fluid img-responsive img-rounded ava-img" src=${imgSrc}>
					<h3 class="item-title">${title}</h3>
					<p class="item-description">${description}</p>
					${(id !=current_play_id)? `<img src=${hostname+ "/images/podcast/icon/play.svg"} alt="" class="carousel-play-bt p-0 collapse show">`:'' }
                    ${id == current_play_id?  html_playing:''}
			</a>`
}

const queryRelatedPodcasts = (current_play_id) => {
    let minId = current_play_id-8;
    let maxId = current_play_id-2;
    let relatedPodcasts = new XMLHttpRequest();
    relatedPodcasts.open('GET', `/podcasts/search/findByIdBetween?minId=${minId}&maxId=${maxId}`)
    relatedPodcasts.setRequestHeader('Content-Type', 'application/json');
    relatedPodcasts.setRequestHeader('Access-Control-Allow-Origin', '*');
    relatedPodcasts.onreadystatechange = function (){
        if (relatedPodcasts.readyState == XMLHttpRequest.DONE){
            if( relatedPodcasts.status == 200){
                let response = JSON.parse(relatedPodcasts.responseText)
                const podcastList = response._embedded.podcasts
                /* for mobile views*/
                if (window.matchMedia("(max-width:767px)").matches) {
                    const ep_items = document.querySelector(".ep-items")

                    podcastList.forEach((podcast) => {
                        {
                            if (podcast.id != currentPodcast.id){
                                ep_items.insertAdjacentHTML('beforeend', html_ep_slide(podcast.coverImgPath, podcast.title, podcast.description, podcast.id, hostname + podcast.page))
                            }
                        }
                    })
                    /* moving scroll to current playing episode*/
                    const item = document.querySelector(".ep-items .item")
                    const itemHeight = item.offsetHeight + parseInt(window.getComputedStyle(item).marginBottom) ;
                    ep_items.scrollTop = itemHeight * (current_play_id - podcastList[0].id )
                }

                podcastList.forEach((podcast) => {
                    if (podcast.id !=currentPodcast.id){
                        glideTrack.insertAdjacentHTML('beforeend', html_glide(podcast.id, podcast.coverImgPath, podcast.title, podcast.description, current_play_id, hostname + podcast.page ));
                    }

                })
                glideTrack.insertAdjacentHTML('beforeend', loadmore_glide());
                glide.update({
                    startAt: 0
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
                updateGlideArrowDisableEffect();
            }
        }
    }
    relatedPodcasts.send()
}
/*   a bug in glide effect, dynamically add item to glide not change effect
*    of left glide arrow   */
function updateGlideArrowDisableEffect() {
    const glideLeftArrow = document.querySelector('.glide__arrow--left')
    glideLeftArrow.classList.remove("glide__arrow--disabled")
}

queryRelatedPodcasts(currentPodcast.id)

/* Default podcasts with "all" */

localStorage.getItem("tag")
let urlQueryAllPodcast =hostname + `/podcasts?sort=id,desc`
queryPodcastByUrl(urlQueryAllPodcast).then(result => {
    let listPodcast =Array.from(result)  ;
    updateCardByPodcastList(listPodcast.slice(0,6))
})

let btnLoadMore = document.querySelector('#lm-btn')
btnLoadMore.addEventListener('click', () => {
    const numCard = document.querySelectorAll('.ep-card')
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
let tag_html = (name) => {
    return `<div class="btn tag badge text-wrap mb-3">${name}</div>`
}
let tag_html_mb = (name) => {
    return `<div class="tag-btn-mb">${name}</div>`
}

let listOfTag = new XMLHttpRequest();
listOfTag.open('GET', '/tags')
listOfTag.setRequestHeader('Content-Type', 'application/json')
listOfTag.onreadystatechange = () => {
    if (listOfTag.readyState == XMLHttpRequest.DONE){
        if (listOfTag.status == 200){
            const tag_container = document.querySelector('.tags')
            let response = JSON.parse(listOfTag.response)
            let tag_names = response._embedded.tags

            /* for mobile view*/
            if (window.matchMedia("(max-width: 767px").matches) {
                tag_names.forEach((tag) =>{
                    tag_container.insertAdjacentHTML('beforeend', tag_html_mb(tag.name))
                })
            }

            tag_names.forEach((tag) => {
                tag_container.insertAdjacentHTML('beforeend',tag_html(tag.name))
            })


            let tag_btns = tag_container.querySelectorAll('.tag')
            if (window.matchMedia("(max-width: 767px").matches) {
                tag_btns = tag_container.querySelectorAll('.tag-btn-mb')
            }
            //all-tag will sort by desc
            tag_btns[0].addEventListener('click', ()=> {
                let url = hostname +`/podcasts?sort=id,desc`
                let listPodcast
                localStorage.setItem("tag", "all")
                changeTagBtnEffect(tag_btns,tag_btns[0])
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
                    changeTagBtnEffect(tag_btns,tag_btn)
                    queryPodcastByTag(tag_btn.innerHTML, ).then(result => {
                        updateCardByPodcastList(result)
                    })
                })
            })
        }
    }
}
listOfTag.send()

// helper function for change tag btn effect onlick same as hover
function changeTagBtnEffect(tag_btns, tag_btn) {
    tag_btns.forEach((tag) => tag.classList.remove("tag-hover"))
    tag_btn.classList.add("tag-hover")
}
/*   Query list of podcasts   */

let card_html = (card_img_link, ep_date, ep_number, ep_title, ep_description, ep_duration, episode_link) => {
    return `<a href=${episode_link} class="card shadow ep-card">
        <img src=${card_img_link} class="card-img-top" alt="" width="300px" height="300px">
            <div class="card-body pt-1">
                <div class="d-flex justify-content-between">
                    <p class="card-date ">${ep_date}</p>
                    <p class="card-date ">${ep_duration}</p>
                </div>
                <h5 class="card-title ">#${ep_number}. ${ep_title}</h5>
                <p class="card-text ">${ep_description}</p>
            </div>
    </a>`
}

let card_html_mb = (card_img_link, card_title, card_description, episode_link) =>{
    return `<a href=${episode_link} class="item ep-card" >
					<img class="img-fluid img-responsive img-rounded ava-img" src=${card_img_link}>
					<h3 class="item-title ">${card_title}</h3>
					<p class="item-description ">${card_description}</p>
			</a>`
}


function updateCardByPodcastList(listPodcast, appendMode= false) {
    if (listPodcast == null) return
    const cardContainer = document.querySelector(".podcast-cards")

    if(appendMode == false){
        cardContainer.innerHTML = ""
    }

    if(window.matchMedia("(max-width:767px)").matches){
        Array.from(listPodcast).slice(0,6).forEach((podcast) => {
            cardContainer.insertAdjacentHTML('beforeend', card_html_mb(podcast.coverImgPath, podcast.title, podcast.description, podcast.page))
        })
    }
    else {
        Array.from(listPodcast).slice(0,6).forEach((podcast) => {
            cardContainer.insertAdjacentHTML('beforeend', card_html(podcast.coverImgPath, getDateFromTimestamp(podcast.createdTime), podcast.id, podcast.title, podcast.description, getTimeFromNum(podcast.duration), podcast.page))
        })
    }

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
    if (tagName== "all") queryByTagUrl = hostname + `/podcasts?sort=id,desc` + postfix
    return queryPodcastByUrl(queryByTagUrl)
}


topScrollHandler()
function topScrollHandler(){
    const topScrollBtn = document.querySelector(".top-scroll")
    topScrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}



