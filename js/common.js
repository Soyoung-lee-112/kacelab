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

  const topRightBottom = document.querySelector('.ms2 .top__right__item.bottom');
  topRightBottom.addEventListener('mouseover', () => {
    topRightBottom.classList.add('hover');
  })
  topRightBottom.addEventListener('mouseleave', () => {
    topRightBottom.classList.remove('hover', 'hover1', 'hover2', 'hover3', 'hover4');
  })
  const items = document.querySelectorAll('.top__right__item .item');
  items.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
      const hoverClass = topRightBottom.classList.contains('hover');
      if (hoverClass) { 
        topRightBottom.classList.add(`hover${index}`);
        item.classList.add('on');
      }
    })
    item.addEventListener('mouseleave', () => {
      topRightBottom.classList.remove(`hover${index}`);
      item.classList.remove('on');
    })
  })
})();




