// ===========================
// slider.js — Мгновенное переключение фото
// ===========================

(function() {
    const slider = document.getElementById('imageSlider');
    if (!slider) return;

    const imgTop = document.getElementById('imgTop');
    const imgCenter = document.getElementById('imgCenter');
    const imgBottom = document.getElementById('imgBottom');

    const photos = [
        '/img/index/photo1.png',
        '/img/index/photo2.png',
        '/img/index/photo3.png'
    ];

    let currentCenter = 1;

    function updateSlider() {
        const topIndex = (currentCenter - 1 + 3) % 3;
        const bottomIndex = (currentCenter + 1) % 3;

        imgTop.src = photos[topIndex];
        imgCenter.src = photos[currentCenter];
        imgBottom.src = photos[bottomIndex];
    }

    // Клик по верхнему фото — оно становится центральным
    imgTop.addEventListener('click', function(e) {
        e.stopPropagation();
        currentCenter = (currentCenter - 1 + 3) % 3;
        updateSlider();
    });

    // Клик по центральному фото
    imgCenter.addEventListener('click', function(e) {
        e.stopPropagation();
        const rect = slider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width / 2) {
            currentCenter = (currentCenter - 1 + 3) % 3;
        } else {
            currentCenter = (currentCenter + 1) % 3;
        }

        updateSlider();
    });

    // Клик по нижнему фото — оно становится центральным
    imgBottom.addEventListener('click', function(e) {
        e.stopPropagation();
        currentCenter = (currentCenter + 1) % 3;
        updateSlider();
    });
})();





(function() {
    const heroSection = document.getElementById('heroSection');
    const heroBtn = document.getElementById('heroBtn');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');

    const slides = [
        { bg: '/img/index/bg1.png', btn: 'город с историей', link: 'info.html' },
        { bg: '/img/index/bg2.png', btn: 'город для отдыха', link: 'places.html' },
        { bg: '/img/index/bg3.png', btn: 'город для жизни', link: 'Afisha.html' }
    ];

    let currentSlide = 0;

    function updateSlide() {
        heroSection.style.backgroundImage = `url('${slides[currentSlide].bg}')`;
        heroBtn.textContent = slides[currentSlide].btn;
        heroBtn.href = slides[currentSlide].link;
    }

    arrowLeft.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });

    arrowRight.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });

    arrowLeft.addEventListener('mouseenter', function() {
        this.src = '/img/all/arrowlefthover.png';
    });
    arrowLeft.addEventListener('mouseleave', function() {
        this.src = '/img/all/arrowleft.png';
    });
    arrowLeft.addEventListener('mousedown', function() {
        this.src = '/img/all/arrowleftactive.png';
    });
    arrowLeft.addEventListener('mouseup', function() {
        this.src = '/img/all/arrowlefthover.png';
    });

    arrowRight.addEventListener('mouseenter', function() {
        this.src = '/img/all/arrowrighthover.png';
    });
    arrowRight.addEventListener('mouseleave', function() {
        this.src = '/img/all/arrowright.png';
    });
    arrowRight.addEventListener('mousedown', function() {
        this.src = '/img/all/arrowrightactive.png';
    });
    arrowRight.addEventListener('mouseup', function() {
        this.src = '/img/all/arrowrighthover.png';
    });

    updateSlide();
})();






(function() {
    const wrapper = document.getElementById('factsWrapper');
    const closeBtn = document.getElementById('factsClose');
    const factsTitle = document.getElementById('factsTitle');
    const factsParagraph = document.getElementById('factsParagraph');
    const factsImage = document.getElementById('factsImage');

    if (!wrapper) return;

    const factsData = {
        1: {
            title: 'Город-воин',
            text: 'Елец впервые упомянут в 1146 году как уже существующий. Он возник как ключевая крепость на границе с «Диким полем» в X-XII веках, встав в один ряд с другими городами-щитами Руси. Его главной задачей была оборона южных рубежей от набегов кочевых племён.',
            img: '/img/index/facts1.png'
        },
        2: {
            title: 'Легенда о Тамерлане',
            text: 'В 1395 году войско грозного Тамерлана, разорив Елец, двинулось на Москву. Но по легенде, завоевателю явилась во сне Богородица и велела повернуть назад. Так город, принеся себя в жертву, чудесным образом спас русскую столицу.',
            img: '/img/index/facts2.png'
        },
        3: {
            title: 'Город 33-х храмов',
            text: 'Елецкие купцы просили у царя статус губернского города. Государь поставил условие — построить 33 храма, чтобы кресты были видны отовсюду. Купцы возвели 31 церковь, но революция помешала завершить замысел. Правда это или легенда — никто точно не знает.',
            img: '/img/index/facts3.png'
        },
        4: {
            title: 'Елецкое кружево',
            text: 'Знаменитое елецкое кружево славится тончайшими узорами. Отличительная особенность — растительные мотивы, среди которых часто встречается цветущая яблоня, символ родного края. Ажурные «яблони» плетеные на коклюшках стали визитной карточкой в XIX веке.',
            img: '/img/index/facts4.png'
        },
        5: {
            title: 'Иван Бунин',
            text: 'Нобелевский лауреат Иван Бунин провёл в Ельце детские и отроческие годы, учась в местной гимназии. Образы города, его быт и природа позже ярко отразились в его прозе, став неотъемлемой частью бунинской России. Сегодня в Ельце можно посетить его дом-музей.',
            img: '/img/index/facts5.png'
        }
    };

    document.querySelectorAll('.facts-circle__pin').forEach(pin => {
        const num = pin.getAttribute('data-pin');
        const defaultSrc = `/img/pins/${num}.png`;
        const hoverSrc = `/img/pins/${num}h.png`;
        const activeSrc = `/img/pins/${num}a.png`;

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
            const data = factsData[num];
            factsTitle.textContent = data.title;
            factsParagraph.textContent = data.text;
            factsImage.src = data.img;
            wrapper.classList.add('expanded');
        });
    });

    closeBtn.addEventListener('click', function() {
        wrapper.classList.remove('expanded');
        factsImage.src = '/img/index/facts0.png';
    });
})();