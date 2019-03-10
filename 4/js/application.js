$(document).ready(function() {
	"use strict";









/******************** NAVBAR ********************/
var animationProp = $('.navbar-nemo'); //Navbar wraper

if ( matchMedia( 'only screen and (min-width: 768px)' ).matches && animationProp.hasClass('navbar-transparent') ) {
   var scrollPos = $(this).scrollTop(),
       animationEndPos = 150, //At the point background add
       logo = animationProp.find('.navbar-brand img');

   //if visitor refresh on the middle of the document
   if(scrollPos > animationEndPos) {
      animationProp.removeClass('navbar-transparent');
      logo.attr('src', 'images/logo-alt.png');
   }

   //toggle existing class
   $(document).scroll(function() {
      scrollPos = $(this).scrollTop();

      if( scrollPos > animationEndPos ) {
         animationProp.removeClass('navbar-transparent');

         //change logo into black
         logo.attr('src', 'images/logo-alt.png');
      } else {
         animationProp.addClass('navbar-transparent');

         //change logo into base
         logo.attr('src', 'images/logo.png');

      }
   });
}




/******************** GOOGLE MAP ********************/
var initMapBig = function() {
   var where = {lat: 55.797102, lng: 37.537600};
   var map = new google.maps.Map(document.getElementById('mapBig'), {
      zoom: 16,
      center: {lat: 55.799502, lng: 37.537600},
      scrollwheel: false,
      disableDefaultUI: true
   });

    //Место проведения - DI Telegraph, Москва, Тверская 7, 9 подъезд, 5 этаж.

   var contentString = '<div class="map-info-window" style="width:240px;">' +
      '<h3 class="title-text" style="font-weight:400;">Data Fest⁴</h3>' +
      '<address style="margin-bottom: 0px;">' +
      '<p style="margin-bottom: 0px;">Mail.Ru Group<br>Москва, Ленинградский пр., 39 строение 79.</p>' +
      '</address>' +
     // '<address href="" href="#" data-toggle="modal" data-target="#myModal" class="link text-color" style="margin-bottom: 0px;">' +
     // '<a href="http://datafest.ru" style="margin-bottom: 0px;">Зарегистрироваться</a>' +
      '</div>';

   var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 318,
      borderRadius: 4,
      backgroundColor: '#ffffff',
      hideCloseButton: true,
      borderWidth: 0,
      shadowStyle: 0,
      disableAutoPan: false

   });

   var marker = new google.maps.Marker({
      position: where,
      map: map,
      title: 'Where title'
   });

   marker.addListener('click', function() {
      infowindow.open(map, marker);
      $( ".gm-style" ).addClass( "round_bottom" );
   });
   
   //marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

   infowindow.open(map, marker);
   $( ".gm-style" ).addClass( "round_bottom" );

}

if( document.getElementById('mapBig') != null ) {
   // map initialize
   initMapBig();
   $( ".gm-style" ).addClass( "round_bottom" );
}



/******************** NAVBAR APPEAR ON SCROLL ********************/
if( animationProp.hasClass('appear-onscroll') ) {
   $(document).scroll(function() {
      var scrollPos = $(this).scrollTop();

      if( scrollPos > 150 ) {
         animationProp.removeClass('appear-onscroll');
      } else {
         animationProp.addClass('appear-onscroll');
      }
   });
}



/******************** ONE PAGE NAVIGATION ********************/
$('.navbar-nav').onePageNav({
   currentClass: 'active',
   scrollOffset: 74
});


/******************** NAVBAR COLLAPSE ON CLICK ********************/
$('.navbar-nav').on('click', 'a', function(event) {
   /* Act on the event */
   $('.navbar-collapse').collapse('hide');
});









});