// ===========================
// Горизонтальный слайдер
// ===========================

(function() {
    const sliderH = document.getElementById('imageSliderH');
    if (!sliderH) return;

    const imgLeftH = document.getElementById('imgLeftH');
    const imgCenterH = document.getElementById('imgCenterH');
    const imgRightH = document.getElementById('imgRightH');

    const photos = [
        'img/afisha/photo1.png',
        'img/afisha/photo2.png',
        'img/afisha/photo3.png'
    ];

    let currentCenter = 1;

    function updateSlider() {
        const leftIndex = (currentCenter - 1 + 3) % 3;
        const rightIndex = (currentCenter + 1) % 3;

        imgLeftH.src = photos[leftIndex];
        imgCenterH.src = photos[currentCenter];
        imgRightH.src = photos[rightIndex];
    }

    // Клик по левому фото — оно становится центральным
    imgLeftH.addEventListener('click', function(e) {
        e.stopPropagation();
        currentCenter = (currentCenter - 1 + 3) % 3;
        updateSlider();
    });

    // Клик по центральному фото
    imgCenterH.addEventListener('click', function(e) {
        e.stopPropagation();
        const rect = sliderH.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width / 2) {
            currentCenter = (currentCenter - 1 + 3) % 3;
        } else {
            currentCenter = (currentCenter + 1) % 3;
        }

        updateSlider();
    });

    // Клик по правому фото — оно становится центральным
    imgRightH.addEventListener('click', function(e) {
        e.stopPropagation();
        currentCenter = (currentCenter + 1) % 3;
        updateSlider();
    });
})();







(function() {
    const wrapper = document.getElementById('museumsWrapper');
    const closeBtn = document.getElementById('museumsClose');
    const museumsTitle = document.getElementById('museumsTitle');
    const museumsParagraph = document.getElementById('museumsParagraph');
    const museumsImage = document.getElementById('museumsImage');

    if (!wrapper) return;

    const museumsData = {
        1: {
            title: 'Музей елецкого кружева',
            text: 'В этом музее представлены уникальные старинные и современные кружевные изделия, которые поражают своей красотой и изяществом. Здесь можно узнать историю этого знаменитого промысла, прославившего Елец далеко за его пределами.',
            img: 'img/afisha/m1.png'
        },
        2: {
            title: 'Елецкий краеведческий музей',
            text: 'Один из старейших музеев города, основанный в 1901 году. Располагается в купеческом особняке XIX века и хранит богатую историю Ельца от древности до наших дней. Включает несколько филиалов.',
            img: 'img/afisha/m2.png'
        },
        3: {
            title: 'Дом-музей Т.Н. Хренникова',
            text: 'Мемориальный музей, посвященный жизни и творчеству знаменитого советского композитора, уроженца Ельца. В экспозиции представлены его личные вещи, документы и рояль, передающие атмосферу, в которой создавалась музыка.',
            img: 'img/afisha/m3.png'
        },
        4: {
            title: 'Дом-музей Н.Н. Жукова',
            text: 'Музей знакомит с творчеством известного художника-графика, автора плакатов и иллюстраций. Экспозиция включает его работы, мемориальную обстановку и рассказывает о связи мастера с родным городом.',
            img: 'img/afisha/m4.png'
        },
        5: {
            title: 'Музей ремесел и промыслов',
            text: 'Музей открыт в историческом здании в стиле модерн. Здесь представлены традиционные промыслы края: кружевоплетение, гончарное, кузнечное дело, лозоплетение. Можно увидеть старинные инструменты и изделия мастеров.',
            img: 'img/afisha/m5.png'
        }
    };

    document.querySelectorAll('.museums-circle__pin').forEach(pin => {
        const num = pin.getAttribute('data-pin');
        const defaultSrc = `img/pins/${num}.png`;
        const hoverSrc = `img/pins/${num}h.png`;
        const activeSrc = `img/pins/${num}a.png`;

        pin.addEventListener('mouseenter', function() {
            this.src = hoverSrc;
        });
        pin.addEventListener('mouseleave', function() {
            this.src = defaultSrc;
        });
        pin.addEventListener('mousedown', function() {
            this.src = activeSrc;
        });
        pin.addEventListener('mouseup', function() {
            this.src = hoverSrc;
        });
        pin.addEventListener('click', function(e) {
            e.stopPropagation();
            const data = museumsData[num];
            if (data) {
                museumsTitle.textContent = data.title;
                museumsParagraph.textContent = data.text;
                museumsImage.src = data.img;
                wrapper.classList.add('expanded');
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        wrapper.classList.remove('expanded');
        museumsImage.src = 'img/afisha/m0.png';
    });
})();