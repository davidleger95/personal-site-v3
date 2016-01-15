/**************************************************
 *
 * Functions for Personal Website
 * AUTHOR   David Leger
 *          www.davidleger.me
 *
 **************************************************/

$(document).ready(function(){

    mobileNav();
    modal();
});

// Mobile navigation view controls
function mobileNav(){
    $('.nav-menu-btn').on('click', function(){
        $('.nav-menu-btn, .nav-menu').toggleClass('open');
    });
} // mobileNav()

// Modal view controls
function modal(){
    
    // opens modal with href matching modal id
    $('.modal-open-ctrl').on('click', function(){
        
        var id = $(this).attr('href');
        $(id + ', .modal-splash, .modal-wrapper, body').addClass('modal-open');
        
        return false;
    });
    
    //closes all open modals
    $('.modal-close-ctrl').on('click', function(){
        $('.modal-open, .modal-splash, .modal-wrapper, body').removeClass('modal-open');
    });
} // modal()

// sends validates and sends contact form to Bev Bramble
function contact(){
    
    var contact = $('#contact-form').serializeObject();
    
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    
    var isValid = true;
    var msg = "";
    $('.validation-msg').text("");
    if(contact.name == ""){
        msg += " Please enter your name.<br/>";
        isValid = false;
    }
    
    if(!emailRegex.test(contact.email) || contact.email == ""){
        msg += " Please enter a valid email address.<br/>";
        isValid = false;
    }
    
    if(contact.message == ""){
        msg += " Please fill the message field.";
        isValid = false;
    }
    
    if(!isValid){
        $('.validation-msg').append("YOU SEEM TO HAVE MISSED SOMETHING...<br/>" + msg);
        return false;
    }
    
    $.ajax({
        url: "//formspree.io/davidleger95@me.com", 
        method: "POST",
        data: contact,
        dataType: "json",
        success: function(){
            
            $('#contact-form')[0].reset();
            
            $('.modal').css({
                "top": "100vh",
                "opacity": 0
            });
            
            $('.sent-message').css({
                "transform": 'scale(1)',
                "transition": '500ms all ease-in-out'
            });
            
            setTimeout(function(){
                $('.modal-open, .modal-splash, .modal-wrapper, body').removeClass('modal-open');
                $('.sent-message').removeAttr('style');
                $('.modal').css({
                    "top": "-100vh"
                });
            }, 3000);
            setTimeout(function(){
                $('.modal').removeAttr('style');

            }, 3500);
            
            return false;
        }
    });
    
    
    return false;
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};