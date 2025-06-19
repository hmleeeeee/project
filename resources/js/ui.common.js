(function () {
  "use strict";

  const EE = {
    init() {
      this.cacheDom();
      this.bindEvents();
      this.navOverlay();
      this.stickyHeader();
      this.enableGridGallery();
      this.enablePopupGallery();
      this.footerTxt();
    },

    cacheDom() {
      this._body = $('body');
      this.eeMenuTrigger = $('.ee-hamburger-trigger');
      this.eeMainMenu = $('.ee-nav-overlay-main-nav');
      this.eeOverlayMenuHolder = $('.ee-nav-overlay');
      this.eeOverlayMenuClose = $('.ee-nav-overlay-close');
      this.eeMenuLinks = $('.ee-nav-overlay-main-nav li a');
      this.eeGalleryTabs = $('.ee-toolbar-item');
      this.eeGalleryItem = $('.ee-gallery-item');
    },

    bindEvents() {
      this.eeGalleryTabs.on('click', (e) => {
        this.changeActiveTab.call(e.currentTarget);
        this.addGalleryFilter.call(e.currentTarget);
      });
    },

    /* ======= popup gallery ======= */
    enablePopupGallery() {
      if (!$.fn.magnificPopup) return;
      $('.ee-popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: { enabled: true }
      });
    },

    /* ======= gallery tab ======= */
    changeActiveTab() {
      $(this).closest('.ee-gallery-toolbar').find('.active').removeClass('active');
      $(this).addClass('active');
    },

    /* ======= gallery filter ======= */
    addGalleryFilter() {
      const value = $(this).data('filter');
      if (value === 'all') {
        EE.eeGalleryItem.show(300);
      } else {
        EE.eeGalleryItem.hide(300).filter(`.${value}`).show(300);
      }
    },

    /* ======= navigation overlay ======= */
    navOverlay() {
      if (!this.eeMainMenu.length) return;
      const self = this;

      const closeMenu = () => {
        self.eeOverlayMenuHolder.removeClass('is-active').addClass('ee-nav-overlay-closed');
        self.eeMenuTrigger.removeClass('is-active');
        setTimeout(() => self._body.css('overflow', ''), 700);
      };

      const openMenu = () => {
        self.eeOverlayMenuHolder.addClass('is-active').removeClass('ee-nav-overlay-closed');
        self.eeMenuTrigger.addClass('is-active');
        self._body.css('overflow', 'hidden');
      };

      const toggleMenu = () => {
        self.eeOverlayMenuHolder.hasClass('is-active') ? closeMenu() : openMenu();
      };

      self.eeMenuTrigger.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
      });

      self.eeOverlayMenuClose.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
      });

      self.eeMenuLinks.on('click', function (e) {
        self.eeMainMenu.find('li .active').removeClass('active');
        $(this).addClass('active');
        toggleMenu();

        const targetId = $(this).attr('href');
        const $target = $(targetId);
        if ($target.length) {
          e.preventDefault();
          let top = $target.offset().top + ($(this).data('offset') || 0);
          $('html, body').animate({ scrollTop: top }, 'slow');
        }
      });
    },

    /* ======= sticky header ======= */
    stickyHeader() {
      const $header = $(".ee-sticky-header");
      const headerHeight = $header.find('.ee-navbar-container').outerHeight();

      $(window).on('scroll', () => {
        const scrolled = $(window).scrollTop() > headerHeight;
        $header.toggleClass('ee-header-is-sticked', scrolled);
        $header.toggleClass('ee-header-not-sticked', !scrolled);
      });
    },

    /* ======= grid gallery ======= */
    enableGridGallery() {
      if (!$.fn.masonry) return;
      $('.ee-grid-gallery').each(function () {
        $(this).masonry({
          itemSelector: '.ee-grid-item',
          columnWidth: '.ee-grid-item',
          horizontalOrder: true
        });
      });
    },

    footerTxt() {
      $('footer .this-year').text(new Date().getFullYear());
    }
  };

  // expose to window (optional)
  window.EE = EE;

  // burger menu
  $(".burgermenu").on("click", function () {
    $(".burger").toggleClass('burger-active');
    $('.nav').toggleClass('nav-active');
  });

  // menu hover background class toggle
  const hoverMap = {
    'home': 'grey',
    'about': 'khaki',
    'portfolio': 'green',
    'blog': 'pink',
    'contact': 'blue'
  };

  Object.entries(hoverMap).forEach(([key, color]) => {
    $(`.ee-nav-list-${key}`).on('mouseenter', () => {
      $('.ee-block-nav').addClass(color);
    }).on('mouseleave', () => {
      $('.ee-block-nav').removeClass(color);
    });
  });

  // AOS & Scroll to Top
  $(document).ready(function () {
    if (window.AOS) {
      AOS.init({ duration: 50 });
    }

    $(window).on('scroll', function () {
      $('.scrolltotop').toggle($(this).scrollTop() > $(window).height() * 0.7);
    });

    $('.scrolltotop').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 800);
      return false;
    });
  });

  // Initialize EE
  EE.init();

})();