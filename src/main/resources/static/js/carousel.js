let relatedPodcasts = new XMLHttpRequest();
relatedPodcasts.open('GET', '/podcasts/search/findByIdBetween?minId=2&maxId=2')
relatedPodcasts.setRequestHeader('Content-Type', 'application/json');
relatedPodcasts.setRequestHeader('Access-Control-Allow-Origin', '*');
relatedPodcasts.onreadystatechange = function (){
    if (relatedPodcasts.readyState == XMLHttpRequest.DONE){
        if( relatedPodcasts.status == 200){
            let response = JSON.parse(relatedPodcasts.responseText)
            owl.owlCarousel('add', owl_item_html_).owlCarousel('refresh');
            owl.owlCarousel('add', owl_item_html_).owlCarousel('refresh');
        }
    }
}
relatedPodcasts.send()

let glide = new Glide('.glide', {
        type: 'slider',
        focusAt: 'center',      // Center the currently focused item
        rewind: false,     // Equivalent to loop: false in Owl Carousel
        gap: 100,           // Equivalent to margin: 80 in Owl Carousel
        perView: 3,        // Equivalent to items: 1 in Owl Carousel
    slideWidth:300,
    breakpoints: {
            600: { perView: 1 },   // Responsive settings for width >= 600px
            1024: { perView: 3 },  // Responsive settings for width >= 1024px
            1366: { perView: 3 }   // Responsive settings for width >= 1366px
    }}).mount();

const html_glide = `<li class="glide__slide">
    <img src="../images/podcast/podcast.png" alt="" class="" style="width:300px;height:300px">
        <div class="play-bt-hv">
            <img src="../images/podcast/icon/play.svg" alt="" id="carousel-play-bt" class="carousel-play-bt"
                 style="width:7rem">
        </div>
        <div class="item-title-bg carousel-podcast-title" id="carousel-podcast-id">
            <p>#3. Title of the podcast</p>
        </div>
<!--        <div class="blur-bg" style="">-->
        </div>
</li>`

const glideTrack = document.querySelector('.glide__track .glide__slides');
glideTrack.insertAdjacentHTML('beforeend', html_glide);
glideTrack.insertAdjacentHTML('beforeend', html_glide);
glideTrack.insertAdjacentHTML('beforeend', html_glide);
glideTrack.insertAdjacentHTML('beforeend', html_glide);

glide.update();

