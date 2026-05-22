// ===========================
// kr.js — Логика перелистывания
// ===========================

(function() {
    const book = document.getElementById('book');
    const flipLayer = document.getElementById('flipLayer');
    const flipImage = document.getElementById('flipImage');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');

    // Состояние
    let currentPage = 1;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let direction = 0;
    let activeSequence = [];
    let totalFrames = 0;

    // Порог для завершения перелистывания
    const THRESHOLD = 80;

    // Карты анимаций
    const sequences = {
        '1to2': {
            frames: [
                'img/info/anim2.png',
                'img/info/anim3.png',
                'img/info/anim4.png',
                'img/info/anim5.png',
                'img/info/anim6.png',
                'img/info/anim7.png'
            ],
            targetPage: 2,
            targetShow: page2,
            currentHide: page1
        },
        '2to1': {
            frames: [
                'img/info/anim2.png',
                'img/info/anim3.png',
                'img/info/anim4.png',
                'img/info/anim5.png',
                'img/info/anim6.png',
                'img/info/anim7.png'
            ],
            targetPage: 1,
            targetShow: page1,
            currentHide: page2
        },
        '2to3': {
            frames: [
                'img/info/anim9.png',
                'img/info/anim10.png',
                'img/info/anim11.png',
                'img/info/anim12.png',
                'img/info/anim13.png'
            ],
            targetPage: 3,
            targetShow: page3,
            currentHide: page2
        },
        '3to2': {
            frames: [
                'img/info/anim9.png',
                'img/info/anim10.png',
                'img/info/anim11.png',
                'img/info/anim12.png',
                'img/info/anim13.png'
            ],
            targetPage: 2,
            targetShow: page2,
            currentHide: page3
        }
    };

    function getSequenceKey(from, to) {
        return `${from}to${to}`;
    }

    function showPage(pageNumber) {
        page1.style.display = 'none';
        page2.style.display = 'none';
        page3.style.display = 'none';

        if (pageNumber === 1) page1.style.display = 'flex';
        if (pageNumber === 2) page2.style.display = 'flex';
        if (pageNumber === 3) page3.style.display = 'flex';

        currentPage = pageNumber;
    }

    function getFrame(progress) {
        if (direction === -1) {
            progress = 1 - progress;
        }
        const frameIndex = Math.min(
            Math.floor(progress * totalFrames),
            totalFrames - 1
        );
        return activeSequence[frameIndex];
    }

    function updateFlip(progress) {
        if (activeSequence.length === 0) return;

        const clampedProgress = Math.max(0, Math.min(1, progress));
        const frameSrc = getFrame(clampedProgress);

        if (flipImage.src.indexOf(frameSrc) === -1) {
            flipImage.src = frameSrc;
        }
    }

    function startDrag(e) {
        if (isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const bookRect = book.getBoundingClientRect();
        const relX = clientX - bookRect.left;
        const edgeWidth = 120;

        let seqKey = null;

        if (relX < edgeWidth && currentPage > 1) {
            direction = -1;
            seqKey = getSequenceKey(currentPage, currentPage - 1);
        } else if (relX > bookRect.width - edgeWidth && currentPage < 3) {
            direction = 1;
            seqKey = getSequenceKey(currentPage, currentPage + 1);
        }

        if (!seqKey || !sequences[seqKey]) return;

        const seq = sequences[seqKey];
        activeSequence = seq.frames;
        totalFrames = activeSequence.length;

        flipLayer.style.display = 'flex';

        if (direction === 1) {
            flipImage.src = activeSequence[0];
        } else {
            flipImage.src = activeSequence[activeSequence.length - 1];
        }

        if (seq.currentHide) {
            seq.currentHide.style.display = 'none';
        }
        if (seq.targetShow) {
            seq.targetShow.style.display = 'flex';
        }

        isDragging = true;
        startX = clientX;
        currentX = clientX;
        book.classList.add('flipping');
    }

    function moveDrag(e) {
        if (!isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        currentX = clientX;

        const deltaX = currentX - startX;
        const bookWidth = book.offsetWidth;

        let progress = Math.abs(deltaX) / bookWidth;
        progress = Math.max(0, Math.min(1, progress));

        updateFlip(progress);
    }

    function endDrag(e) {
        if (!isDragging) return;

        const deltaX = currentX - startX;
        const absDelta = Math.abs(deltaX);
        const bookWidth = book.offsetWidth;
        const progress = absDelta / bookWidth;

        isDragging = false;
        book.classList.remove('flipping');

        if (progress > THRESHOLD / bookWidth) {
            const seqKey = direction === 1
                ? getSequenceKey(currentPage, currentPage + 1)
                : getSequenceKey(currentPage, currentPage - 1);

            const seq = sequences[seqKey];
            if (seq) {
                flipImage.src = direction === 1
                    ? activeSequence[activeSequence.length - 1]
                    : activeSequence[0];

                setTimeout(() => {
                    flipLayer.style.display = 'none';
                    showPage(seq.targetPage);
                }, 50);
            }
        } else {
            const seqKey = direction === 1
                ? getSequenceKey(currentPage, currentPage + 1)
                : getSequenceKey(currentPage, currentPage - 1);

            const seq = sequences[seqKey];
            if (seq) {
                flipImage.src = direction === 1
                    ? activeSequence[0]
                    : activeSequence[activeSequence.length - 1];

                setTimeout(() => {
                    flipLayer.style.display = 'none';
                    if (seq.currentHide) seq.currentHide.style.display = 'flex';
                    if (seq.targetShow) seq.targetShow.style.display = 'none';
                    showPage(currentPage);
                }, 50);
            }
        }

        activeSequence = [];
        totalFrames = 0;
        direction = 0;
    }

    // События мыши
    book.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    // События касания
    book.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('touchend', endDrag);

    // Запрет встроенного перетаскивания
    book.addEventListener('dragstart', (e) => e.preventDefault());

    // Старт: показываем первую страницу
    showPage(1);
})();