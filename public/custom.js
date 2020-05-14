const $ = window.$
$(document).ready(function () {
    
    $(".submenu-dropdown").click(function(){
      $('.ul').hide();
      $(".submenu-dropdown").children("i").removeClass("la-angle-down")
      $(".submenu-dropdown").children("i").addClass("la-angle-right")
      $(this).next().slideToggle();
      if($(this).children("i").hasClass("la-angle-right")){
        $(this).children("i").removeClass("la-angle-right")
        $(this).children("i").addClass("la-angle-down")
      }else{
        $(this).children("i").removeClass("la-angle-down")
        $(this).children("i").addClass("la-angle-right")
      }
     

    });
   
    

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    $('.sidebar-link').on('click', function () {
      $('.sidebar-link').removeClass('sidebar-active');
      $(this).toggleClass('sidebar-active');
      
  });
    $(".v-code input").keyup(function () {
      console.log(this.value.length)
      console.log(this.maxLength)
        if (this.value.length == this.maxLength) {
            console.log( $(this).next('.v-code input'))
          $(this).next('.v-code input').focus();
        }
    });
});