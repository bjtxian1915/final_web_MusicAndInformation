        // 使用 Intersection Observer 監控元素可見性
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('exit');
                } else {
                    if (entry.boundingClientRect.top < 0) {
                        entry.target.classList.add('exit');
                    }
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.3
        });

        // 監控所有需要動畫的元素
        document.querySelectorAll('.content, .footer-section').forEach(element => {
            observer.observe(element);
        });
        // 監控滾動位置以顯示/隱藏按鈕
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// 平滑滾動至頂部
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.getElementsByClassName('music').addEventListener('click', function(){
    document.getElementById('audio').play();
})