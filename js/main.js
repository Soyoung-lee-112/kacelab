document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".container");

  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
  });

  gsap.registerPlugin(ScrollTrigger);

  // ScrollTrigger와 LocomotiveScroll 연동
  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed",
  });

  scroller.on("scroll", ScrollTrigger.update);

  // 비디오 영역 애니메이션 설정
  gsap.to(".ms1 .ms1__videoWrap", {
    // width: "calc(100% - 8rem)", // 목표 너비
    width: "calc((100% - 8rem) / 2)",
    scrollTrigger: {
      trigger: ".pin__wrap",
      scroller: pageContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      pin: true,
    },
    ease: "power2.inOut",
    onStart: () => {
      // 애니메이션이 시작할 때 너비를 초기화
      gsap.set(".ms1 .ms1__videoWrap", { width: "0" });
    },
  });
});
(function () {
  setInterval(updateDateTime, 1000);

  const videoWrapper = document.querySelector("#ms2__videobox");
  const video = document.querySelector("#ms2__video");

  videoWrapper.addEventListener("mouseenter", () => {
    video.play();
  });

  videoWrapper.addEventListener("mouseleave", () => {
    video.pause();
    // video.currentTime = 0;
  });
})();

function updateDateTime() {
  const dt = luxon.DateTime.now();

  const week = dt.toFormat("EEE");
  const day = dt.toFormat("dd");
  const hours = dt.toFormat("HH");
  const minutes = dt.toFormat("mm");

  const weekEl = document.querySelector(".day_of_week");
  const dayEl = document.querySelector(".day_of_month");
  const hoursEl = document.querySelector(".time__h");
  const minutesEl = document.querySelector(".time__m");

  weekEl.textContent = week;
  dayEl.textContent = day;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
}

class Marquee {
  constructor({ el }) {
    this.el = el;
    this.animations = [];
    this.SLOWDOWN_RATE = 0.2;
    this.maxPlaybackRate = 3;
    this.cloneMarqueeGroup();
    this.initAnimations();
    this.initEvents();
  }

  // 애니메이션 초기화
  initAnimations() {
    const { duration = 10, reverse = false } = this.el.dataset;

    this.animations = this.marqueeGroups.map((group) =>
      group.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
        {
          duration: duration * 3000,
          direction: reverse ? "reverse" : "normal",
          iterations: Infinity,
        }
      )
    );
  }

  // 속도 조절
  setAnimationSpeed(playbackRate) {
    this.animations.forEach((anim) => (anim.playbackRate = playbackRate));
  }

  // 마우스 및 스크롤 이벤트 초기화
  initEvents() {
    this.el.addEventListener("mouseenter", () =>
      this.setAnimationSpeed(this.SLOWDOWN_RATE)
    );
    this.el.addEventListener("mouseleave", () => this.setAnimationSpeed(1));

    if (this.el.classList.contains("ms3_marquee")) {
      let lastScrollY = window.scrollY;
      window.addEventListener("scroll", () => {
        const scrollSpeed = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        this.adjustAnimationSpeed(scrollSpeed);
      });
    }
  }

  // 스크롤 속도에 따라 애니메이션 속도 조정
  adjustAnimationSpeed(scrollSpeed) {
    const playbackRate = Math.min(
      1 + (scrollSpeed / 1000) * (this.maxPlaybackRate - 1),
      this.maxPlaybackRate
    );
    this.setAnimationSpeed(playbackRate);
  }

  // 마퀴 그룹 복제
  cloneMarqueeGroup() {
    const clone = this.el.querySelector(".marquee__group").cloneNode(true);
    clone.classList.add("clone");
    this.el.append(clone);
    this.marqueeGroups = Array.from(
      this.el.querySelectorAll(".marquee__group")
    );
  }
}

document.querySelectorAll(".marquee").forEach((el) => new Marquee({ el }));
