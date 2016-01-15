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
        $(id + ', .modal-splash').addClass('modal-open');
        
        return false;
    });
    
    //closes all open modals
    $('.modal-close-ctrl').on('click', function(){
        $('.modal-open, .modal-splash').removeClass('modal-open');
    });
} // modal()

// sends validates and sends contact form to Bev Bramble
function contact(){
    
    var contact = $('#contact-form').serializeObject();
    
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    
    if(contact.message == ""){
        alert("ERROR: Please fill the message field.");
        return false;
    }
    
    if(!emailRegex.test(contact.email) && contact.email != ""){
        alert("ERROR: Please enter a valid email address.");
        return false;
    }
    
    $.ajax({
        url: "//formspree.io/davidleger95@me.com", 
        method: "POST",
        data: contact,
        dataType: "json",
        success: function(){
            alert("SUCCESS! Message sent!");
            $('#contact-form')[0].reset();
            return false;
        }
    });
    
    
    return false;
}