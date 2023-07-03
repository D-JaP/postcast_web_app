/*--------------------------------------------------------------------------------------------------------------------*/
const owl_item_container = document.querySelector(".owl-carousel")
const owl_item_html = `<div className="item" style="justify-content: center;
                            border-radius: 10px;">
                            <img src="../images/podcast/podcast.png" alt="" className="" style="width:300px;height:300px;border-radius: 15px;">
                            <div className="play-bt-hv" style="">
                                <img src="../images/podcast/icon/play.svg" alt="" id="carousel-play-bt" className="carousel-play-bt"
                                    style="width:7rem;
                                    position: absolute;
                                    top: 20%;
                                    left: 50%;
                                    transform: translateX(-50%);">
                            </div>
                            <div className="item-title-bg carousel-podcast-title" id="carousel-podcast-id" 
                                style="width: 100%;background-color: #0a4a6b;
                                height: 100px;
                                transform: translateY(-50%);
                                border-bottom-left-radius: 20px;
                                border-bottom-right-radius: 20px;
                                font-size: 1.3rem;
                                font-weight: 300;
                                color: #fff;
                                padding: 15px 20px 15px 20px;">
                                <p>#123. Title of the podcast</p>
                            </div>
                            <div className="blur-bg" style="position: absolute!important;
                                width: 100%;
                                height: 100%;
                                top:0px;
                                background-color: rgba(61, 61, 61, 0.5);
                                z-index: 3000;">
                            </div>
                    </div>`

const owl_item_html_ = `<div className="owl-item" style="width: 320px; margin-right: 80px;">
    <div className="item">
        <img src="../images/podcast/podcast.png" alt="" className="" style="width:300px;height:300px">
            <div className="play-bt-hv">
                <img src="../images/podcast/icon/play.svg" alt="" id="carousel-play-bt" className="carousel-play-bt"
                     style="width:7rem">
            </div>
            <div className="item-title-bg carousel-podcast-title" id="carousel-podcast-id">
                <p>#123. Title of the podcast</p>
            </div>
            <div className="blur-bg" style="">
            </div>
    </div>
</div>`

// carousel
let owl = $('.owl-carousel').owlCarousel({
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
            nav:true
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

let relatedPodcasts = new XMLHttpRequest();
relatedPodcasts.open('GET', '/podcasts/search/findByIdBetween?minId=2&maxId=2')
relatedPodcasts.setRequestHeader('Content-Type', 'application/json');
relatedPodcasts.setRequestHeader('Access-Control-Allow-Origin', '*');
relatedPodcasts.onreadystatechange = function (){
    if (relatedPodcasts.readyState == XMLHttpRequest.DONE){
        if( relatedPodcasts.status == 200){
            let response = JSON.parse(relatedPodcasts.responseText)
            owl.owlCarousel('add', owl_item_html).owlCarousel('refresh');
            owl.owlCarousel('add', owl_item_html).owlCarousel('refresh');
        }
    }
}
relatedPodcasts.send()

