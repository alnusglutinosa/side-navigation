// 'use strict';

var
  screen = 0,
  container = $('.maincontent'),
  pages = $('.page'),
  inscroll = false;


class Navigation {

  constructor(name, function_start=false) {
    this.name = name;

    console.log('Create: '+ this.name);

    if (function_start) {
      Navigation.func_start();
    }
  }

  static func_start() {
    console.log('function_start');
  }

  static checkSection() {
    $('.page').each(function() {
      var
        $this = $(this),
        topEdge = $this.offset().top - 200, // верх секции
        bottomEdge = topEdge + $this.height(), //низ секции
        wScroll = $(window).scrollTop(); // на сколько проскролили страницу

      if (topEdge < wScroll && bottomEdge > wScroll) { // если видим эту цеккцию
        var currentId = $this.data('section');
        // console.log($this.data('section'));

        var reqLink = $('.link[href="#'+ currentId +'"]');
        var rightLink = $('.fp-nav__link[href="#'+ currentId +'"]');

        //выделяем активный линк топ
        $('.link').removeClass('active');
        reqLink.addClass('active');

        //выделяем активный линк боковой
        $('.fp-nav__link').removeClass('active');
        rightLink.addClass('active');

        window.location.hash = currentId;

        // showSection(window.location.hash, false);
      }
    });
  }


  show() {
    // alert(this.name);

    Navigation.checkSection();

    $('body').on('mousewheel', function(event) {
      Navigation.mousescroll(event.deltaY);
      Navigation.checkSection();
    });


    $('.link').on('click', function(e) {
      e.preventDefault();

      var idsect = $(this).attr('href');
      var direction = idsect.replace(/#/, '');
      var reqSection = $('section[data-section="'+ direction +'"]');
      var reqSectionPos = reqSection.offset().top;

      var reqLink = $('.link[href="#'+ idsect +'"]');
      $('.link').removeClass('active');
      $(this).addClass('active');

      // активный боковой нав
      var topLink = $('.fp-nav__link[href="#'+ direction +'"]');
      $('.fp-nav__link').removeClass('active');
      topLink.addClass('active');


      var link_index = $(this).parent().index();

      var screen = link_index;
      var position = (-screen * 100) + '%';
      container.css('top', position);
      window.location.hash = direction;

    });

    $('.fp-nav__link').on('click', function(e) {
      e.preventDefault();

      var idsect = $(this).attr('href');
      var direction = idsect.replace(/#/, '');
      var reqSection = $('section[data-section="'+ direction +'"]');
      var reqSectionPos = reqSection.offset().top;

      var reqLink = $('.fp-nav__link[href="#'+ idsect +'"]');
      $('.fp-nav__link').removeClass('active');
      $(this).addClass('active');

      // активный топ нав
      var topLink = $('.link[href="#'+ direction +'"]');
      $('.link').removeClass('active');
      topLink.addClass('active');

      var link_index = $(this).parent().index();

      var screen = link_index;
      var position = (-screen * 100) + '%';
      container.css('top', position);
      window.location.hash = direction;

    });


  }









  static mousescroll(eventdeltaY) {

    console.log(eventdeltaY);

    var activePage = $('.page.active'); //pages.filter('active');

    if(!inscroll) {
      inscroll = true;

      // console.log(event.deltaX, event.deltaY, event.deltaFactor);

      if (eventdeltaY > 0) {

        if (activePage.prev().length) {
          screen--;
        }

      } else {

        if (activePage.next().length) {
          screen++;
        }
      }
    }


    var
      position = (-screen * 100) + '%';

    pages.eq(screen).addClass('active').siblings().removeClass('active');
    container.css('top', position);


    setTimeout(function() {
      Navigation.checkSection();
      inscroll = false;

    }, 1100);



  }






}

module.exports = Navigation;



