(function() {
    var burger = document.getElementById('burger');
    var navMenu = document.getElementById('navMenu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
})();

(function() {
    var book = document.getElementById('book');
    var flipLayer = document.getElementById('flipLayer');
    var flipImage = document.getElementById('flipImage');
    var page1 = document.getElementById('page1');
    var page2 = document.getElementById('page2');
    var page3 = document.getElementById('page3');

    var currentPage = 1;
    var isDragging = false;
    var startX = 0;
    var currentX = 0;
    var direction = 0;
    var activeSequence = [];
    var totalFrames = 0;

    var THRESHOLD = 80;

    var sequences = {
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
        return from + 'to' + to;
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
        var frameIndex = Math.min(
            Math.floor(progress * totalFrames),
            totalFrames - 1
        );
        return activeSequence[frameIndex];
    }

    function updateFlip(progress) {
        if (activeSequence.length === 0) return;

        var clampedProgress = Math.max(0, Math.min(1, progress));
        var frameSrc = getFrame(clampedProgress);

        if (flipImage.src.indexOf(frameSrc) === -1) {
            flipImage.src = frameSrc;
        }
    }

    function startDrag(e) {
        if (isDragging) return;

        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var bookRect = book.getBoundingClientRect();
        var relX = clientX - bookRect.left;
        var edgeWidth = 120;

        var seqKey = null;

        if (relX < edgeWidth && currentPage > 1) {
            direction = -1;
            seqKey = getSequenceKey(currentPage, currentPage - 1);
        } else if (relX > bookRect.width - edgeWidth && currentPage < 3) {
            direction = 1;
            seqKey = getSequenceKey(currentPage, currentPage + 1);
        }

        if (!seqKey || !sequences[seqKey]) return;

        var seq = sequences[seqKey];
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

        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        currentX = clientX;

        var deltaX = currentX - startX;
        var bookWidth = book.offsetWidth;

        var progress = Math.abs(deltaX) / bookWidth;
        progress = Math.max(0, Math.min(1, progress));

        updateFlip(progress);
    }

    function endDrag(e) {
        if (!isDragging) return;

        var deltaX = currentX - startX;
        var absDelta = Math.abs(deltaX);
        var bookWidth = book.offsetWidth;
        var progress = absDelta / bookWidth;

        isDragging = false;
        book.classList.remove('flipping');

        if (progress > THRESHOLD / bookWidth) {
            var seqKey = direction === 1
                ? getSequenceKey(currentPage, currentPage + 1)
                : getSequenceKey(currentPage, currentPage - 1);

            var seq = sequences[seqKey];
            if (seq) {
                flipImage.src = direction === 1
                    ? activeSequence[activeSequence.length - 1]
                    : activeSequence[0];

                setTimeout(function() {
                    flipLayer.style.display = 'none';
                    showPage(seq.targetPage);
                }, 50);
            }
        } else {
            var seqKey2 = direction === 1
                ? getSequenceKey(currentPage, currentPage + 1)
                : getSequenceKey(currentPage, currentPage - 1);

            var seq2 = sequences[seqKey2];
            if (seq2) {
                flipImage.src = direction === 1
                    ? activeSequence[0]
                    : activeSequence[activeSequence.length - 1];

                setTimeout(function() {
                    flipLayer.style.display = 'none';
                    if (seq2.currentHide) seq2.currentHide.style.display = 'flex';
                    if (seq2.targetShow) seq2.targetShow.style.display = 'none';
                    showPage(currentPage);
                }, 50);
            }
        }

        activeSequence = [];
        totalFrames = 0;
        direction = 0;
    }

    book.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    book.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('touchend', endDrag);

    book.addEventListener('dragstart', function(e) { e.preventDefault(); });

    showPage(1);
})();
