/**
 * gsap-custom.js · v1.2
 * Helpers:
 *   • splitChars()   – character SplitText
 *   • splitLines()   – line  SplitText
 *   • fadeUp()       – fade / slide
 *   • scaleIn()      – zoom-pop
 *   • morphSvg()     – MorphSVG path-to-path tween
 *
 * All helpers replay every time their element scrolls back into view.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------- */
  /* 0. GSAP + plugin setup                                         */
  /* -------------------------------------------------------------- */
  gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

  const DEFAULT_TRIGGER = {
    start: 'top 80%',
    toggleActions: 'restart none restart reset' // replay on re-enter
  };

  /* -------------------------------------------------------------- */
  /* 1. SplitText – characters                                      */
  /* -------------------------------------------------------------- */
  function splitChars(selector = '.gsap-split-chars', vars = {}) {
    document.querySelectorAll(selector).forEach(el => {
      const split = new SplitText(el, { type: 'chars' });
      gsap.timeline({
        scrollTrigger: { trigger: el, ...DEFAULT_TRIGGER }
      }).from(split.chars, {
        rotation: 0,
        yPercent: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.out',
        ...vars
      });
    });
  }

/* -------------------------------------------------------------- */
/* 2. SplitText – lines  (class-based rotate-X support)           */
/* -------------------------------------------------------------- */
function splitLines(selector = '.gsap-split-lines', vars = {}) {
  document.querySelectorAll(selector).forEach(el => {

    const split = new SplitText(el, { type: 'lines' });

    /* -- NEW: look for a class that starts with "rotate-" -------- */
    let classRotate = null;
    const angleClass = [...el.classList].find(c => c.startsWith('rotate-'));
    if (angleClass) {
      const number = parseFloat(angleClass.split('-')[1]);
      if (Number.isFinite(number)) {
        /* hinge direction is usually negative (-18° default)       */
        classRotate = -number;      // rotate-20  ➜  -20
      }
    }

    /* precedence:  JS override > class angle > default -18 */
    const defaultRotate = (vars.rotation !== undefined)
      ? vars.rotation
      : (classRotate ?? -18);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, ...DEFAULT_TRIGGER }
    });

    tl.from(split.lines, {
      rotation: defaultRotate,
      transformOrigin: 'top left',
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      ...vars         // allows callers to override anything
    });
  });
}



  /* -------------------------------------------------------------- */
  /* 3. Fade-up helper                                              */
  /* -------------------------------------------------------------- */
  function fadeUp(selector = '.gsap-fade-up', vars = {}) {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, ...DEFAULT_TRIGGER },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        ...vars
      });
    });
  }

  /* -------------------------------------------------------------- */
  /* 4. Scale-in helper                                             */
  /* -------------------------------------------------------------- */
  function scaleIn(selector = '.gsap-scale-in', vars = {}) {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, ...DEFAULT_TRIGGER },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        ...vars
      });
    });
  }

  /* -------------------------------------------------------------- */
  /* 5. MorphSVG helper                                             */
  /*    HTML pattern:                                               */
  /*      <svg class="gsap-morph">                                  */
  /*        <path class="morph-from" d="…"/>                        */
  /*        <path class="morph-to"   d="…" style="display:none"/>   */
  /*      </svg>                                                    */
  /* -------------------------------------------------------------- */
 /* 5. MorphSVG helper – now picks up data-delay on each SVG
   ---------------------------------------------------------------- */
function morphSvg(wrapperSel = '.gsap-morph', vars = {}) {

  gsap.utils.toArray(wrapperSel).forEach(svg => {

    const fromPath = svg.querySelector('.morph-from');
    const toPath   = svg.querySelector('.morph-to');
    if (!fromPath || !toPath) return;

    /* read colours for the fill-tween */
    const startFill = getComputedStyle(fromPath).fill || '#000';
    const endFill   = toPath.getAttribute('fill') ||
                      getComputedStyle(toPath).fill || startFill;

    /* NEW: read data-delay (e.g. data-delay="0.75") */
    const attrDelay = parseFloat(svg.dataset.delay) || 0;

    gsap.fromTo(
      fromPath,
      { morphSVG: fromPath, fill: startFill },
      {
        scrollTrigger: { trigger: svg, ...DEFAULT_TRIGGER },
        morphSVG: toPath,
        fill: endFill,
        duration: 1.2,
        delay: vars.delay ?? attrDelay,   // caller override > data-delay > 0
        ease: 'power2.inOut',
        ...vars                           // merge any other overrides
      }
    );
  });
}


/* -------------------------------------------------------------- */
/* 6. Kick everything off                                         */
/* -------------------------------------------------------------- */

/* helpers that DON’T care about font metrics can run right away */
fadeUp();
scaleIn();
morphSvg();

/* helpers that DO care must wait until all fonts are ready */
function initSplitText() {
  splitChars();
  splitLines();
}

/* Modern browsers: use the Font Loading API promise */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(initSplitText);
} else {
  /* Fallback for very old browsers: defer until window.onload */
  window.addEventListener('load', initSplitText);
}


  /* -------------------------------------------------------------- */
  /* 7. Global export for ad-hoc use                                */
  /* -------------------------------------------------------------- */
  window.GSAPHelpers = {
    splitChars,
    splitLines,
    fadeUp,
    scaleIn,
    morphSvg
  };
});
