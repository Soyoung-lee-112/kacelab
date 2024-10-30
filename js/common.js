(function () {
    // const pageContainer = document.querySelector(".container");
    // const bWidth = window.innerWidth;
    // // scroll smooth
    // const scroller = new LocomotiveScroll({
    //     el: pageContainer,
    //     smooth: true
    // });

const logoImages = [document.getElementById('logoImg1'), document.getElementById('logoImg2')];

document.querySelector('.h__logo').addEventListener('mouseover', () => {
  logoImages.forEach(img => { //배열의 요소 순서대로 값을 갖는다. 
    img.dataset.originalSrc = img.src;
    img.src = 'images/logo2.png';
  });
});

document.querySelector('.h__logo').addEventListener('mouseout', () => {
  logoImages.forEach(img => {
    img.src = img.dataset.originalSrc;
  });
});


})();




