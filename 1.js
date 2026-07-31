document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('info-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitleEn = document.getElementById('modal-title-en');
    const modalTitleEs = document.getElementById('modal-title-es');
    const modalDescEn = document.getElementById('modal-desc-en');
    const modalDescEs = document.getElementById('modal-desc-es');
    const closeBtn = document.querySelector('.close-modal');
    const clickableItems = document.querySelectorAll('.clickable-item');
    const galleryTrack = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.gallery-arrow--prev');
    const nextBtn = document.querySelector('.gallery-arrow--next');

    const openModal = (item) => {
        const imgElement = item.querySelector('img');
        const imgUrl = imgElement ? imgElement.src : '';
        const altText = imgElement ? imgElement.alt : '';
        const titleEn = item.getAttribute('data-title-en') || '';
        const titleEs = item.getAttribute('data-title-es') || '';
        const descEn = item.getAttribute('data-desc-en') || '';
        const descEs = item.getAttribute('data-desc-es') || '';

        modalImg.src = imgUrl;
        modalImg.alt = altText;
        modalTitleEn.textContent = titleEn;
        modalTitleEs.textContent = titleEs;
        modalDescEn.textContent = descEn;
        modalDescEs.textContent = descEs;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    clickableItems.forEach((item) => {
        item.addEventListener('click', () => openModal(item));
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    const getScrollAmount = () => {
        if (!galleryTrack || !galleryTrack.children[0]) {
            return 0;
        }
        const firstCard = galleryTrack.children[0];
        const computedStyle = window.getComputedStyle(galleryTrack);
        const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || '16');
        return firstCard.getBoundingClientRect().width + gap;
    };

    if (prevBtn && nextBtn && galleryTrack) {
        prevBtn.addEventListener('click', () => {
            galleryTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            galleryTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }
});
