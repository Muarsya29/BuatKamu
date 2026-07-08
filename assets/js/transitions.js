(function () {
  const overlay = () => document.getElementById("overlay");

  function reveal(container) {
    const items = container.querySelectorAll(
      ".kicker, .title, .subtitle, .cta, .chips, .polaroid, .tile, .page-head, .slider, .romantic-box, .card"
    );

    return gsap.timeline()
      .fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power1.out" }, 0)
      .fromTo(
        items,
        { y: 18, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.04,
        },
        0.05
      );
  }

  function overlayIn() {
    return gsap.fromTo(overlay(), { y: "110%" }, { y: "0%", duration: 0.75, ease: "power4.inOut" });
  }

  function overlayOut() {
    return gsap.to(overlay(), { y: "-110%", duration: 0.85, ease: "power4.inOut" });
  }

  barba.init({
    transitions: [
      {
        name: "love-smooth",
        async leave(data) {
          await gsap.to(data.current.container, {
            opacity: 0,
            y: -10,
            scale: 0.985,
            duration: 0.35,
            ease: "power2.in",
          });
          await overlayIn();
        },
        async enter(data) {
          await overlayOut();
          window.scrollTo(0, 0);
          gsap.set(data.next.container, { opacity: 1, y: 0, scale: 1 });
          reveal(data.next.container);
        },
      },
    ],
  });
})();