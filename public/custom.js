
$(document).ready(function () {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
    $('.kep-login-facebook metro').html("<i class='fa fa-facebook'></i>")
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        console.log(this.lastChild)
        console.log(this.firstChild.lastChild)
        var dropdownContent = this.lastChild;
        console.log(this.lastChild)
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
          this.firstChild.lastChild.classList.toggle("la-angle-right")
          this.firstChild.lastChild.classList.toggle("la-angle-down")
        } else {
          dropdownContent.style.display = "block";
          this.firstChild.lastChild.classList.toggle("la-angle-right")
          this.firstChild.lastChild.classList.toggle("la-angle-down")
        }
      });
    }

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