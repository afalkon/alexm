$(document).ready(function(){

  // Day/Night switcher
    $('.switch').click(function(){
      $(this).toggleClass('night');
      $(this).toggleClass('day');
      if($(this).hasClass('day')){
        $('.switch__circle::before').show(300);
        $('.switch__circle::after').hide(300);
        console.log('day');
      }
      if ($(this).hasClass('night')){
        $('.switch__circle::before').hide(300);
        $('.switch__circle::after').show(300);
        console.log('night');
      }
    });
  });