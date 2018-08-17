import sayHello from './lib/sayHello.js';
// import User from './lib/fullSideNav.js';
import './lib/jquery.mousewheel.js';

sayHello();


var user = new User('User-1');
user.sayHi();


$(document).ready(function() {

  // $('.link').on('click', function(e) {
  //   e.preventDefault();

  //   // showSection($(this).attr('href'), true);
  //   // mousescroll(300);
  // });

  showSection(window.location.hash, false);

});


$(window).scroll(function() {
  checkSection();
});


function showSection(section, isAnimate) {
  var direction = section.replace(/#/, '');
  var reqSection = $('section[data-section="'+ direction +'"]'); //$('.section[data-section="'+ direction +'"]'); 
  // var reqSection = $('section[data-section="one"]').filter('[data-section="'+ direction +'"]');

  var reqSectionPos = reqSection.offset().top;

  // var reqSectionPos = 10;

  if (isAnimate) {
    $('body, html').animate({scrollTop: reqSectionPos}, 600);
  } else {
    $('body, html').scrollTop(reqSectionPos);
  }
}


function checkSection() {
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
    }
  });
}







$(document).ready(function() {

  var
    screen = 0,
    container = $('.maincontent'),
    pages = $('.page'),
    inscroll = false;

  // $('.page:first-child').addClass('active');

  // using on
  $('body').on('mousewheel', function(event) {
  	mousescroll(event.deltaY);
  	checkSection();
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

  });



  function mousescroll(eventdeltaY) {

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
    	inscroll = false;
    }, 1300);

  }



  $('#fp-nav').on('click','a', function(event) {

    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);

  });


});
