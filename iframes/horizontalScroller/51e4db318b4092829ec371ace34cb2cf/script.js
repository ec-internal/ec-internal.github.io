let images = [];



window.onload = function() {

    let decoded = hex2a('6768705f66643445765257424f4e6c537250336c6b6d4970324f7955593038474969344b466e6d4f');
    let token = 'Bearer ' + decoded; //delete token and put into .env;

    axios({
            method: 'get',
            url: 'https://api.github.com/repos/ec-internal/ec-internal.github.io/contents/iframes/horizontalScroller/51e4db318b4092829ec371ace34cb2cf/images/',
            responseType: 'stream',
            headers: {
                Authorization: token
            }
        })
        .then(function(response) {
            let data = response.data;
            for (let d of data) {
                axios({
                        method: 'get',
                        url: d.url,
                        responseType: 'stream',
                        headers: {
                            Authorization: token
                        }
                    })
                    .then(function(res) {
                        let imageData = res.data;
                        images.push(imageData.content)
                        if (images.length == data.length) {
                            renderImages();
                        }
                    });

            }
        });

};

function renderImages() {
    let index = 0;
    let colorCounter = 1;
    const maxColor = 4;
    for (let img of images) {
        $("#my-keen-slider").append('<div class="keen-slider__slide number-slide' + index + '"><div class="img-container c' + colorCounter + '"><img src="data:image/jpg;base64,' + img + '" /></div></div>');
        index++;
        colorCounter++;
        if (colorCounter > 4) {
            colorCounter = 1;
        }
    }

    var animation = {
        duration: 12000,
        easing: (t) => t,
    };

    let perView = 5;
    let spacing = 25;
    if (window.innerWidth < 1100) {
        perView = 5;
        spacing = 10;
    }
    if (window.innerWidth < 700) {
        perView = 3;
        spacing = 5;
    }

    var slider = new KeenSlider("#my-keen-slider", {
        loop: true,
        renderMode: "performance",
        drag: false,
        slides: {
            perView: perView,
            spacing: spacing,
        },
        created(s) {
            s.moveToIdx(5, true, animation);
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
    });
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}