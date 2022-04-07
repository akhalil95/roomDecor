// make a room decor object
const decorRoom = {};

// cache selectors
decorRoom.$bedInput = $('input#bed-1');
// decorRoom.$coffeeTableInput = $('input#coffeeTable');

// make function to show the photo on the canvas and pass value selected
decorRoom.showPhoto = function(value){
    // make variable for the selected photo 
    let chosenPhoto = $(`.canvas .img-container.${value}`);
    
    // toggle the show class on the chosen photo
    chosenPhoto.toggleClass('show');
}

// make function that checks if there is a sibling already checked
decorRoom.checkSiblings = function (value, category) {

    // if one element is selected, check if something in same category is checked
    if ($(`input#${value}`).siblings(`.${category}`).prop('checked')) {

        // throw alert that only one can be selected
        swal({
            title: `You can only have one ${category}!`,
            button: 'Okay.',

            // remove the checked property after alert
        }).then(() => {
            $(`input#${value}`).prop('checked', false);
        });

        // if not selected, show it
    } else {
        // then call function to show the photos
        decorRoom.showPhoto(value);
    }
}

// make function to clear all table top items
decorRoom.clearTableTop = function(){

    // take off checked of the table items
    $(`input#notebook`).prop('checked', false);
    $(`input#laptop`).prop('checked', false);

    // remove the show class on the images
    $(`.canvas .imageContainer.notebook`).removeClass('show');
    $(`.canvas .imageContainer.laptop`).removeClass('show');
    $(`.canvas .img-container.desk`).removeClass('show');
    $(`.canvas .imageContainer.coffeeTable`).removeClass('show');
}

// make function to initialize the events
decorRoom.eventListeners = function(){
    // when click the start button, scroll down to the main
    $('.startButton').on('click', function () {
        // animate the body to scroll to the main
        $('html, body').animate(
            {
                scrollTop: $('main').offset().top,
            },
            'slow',
        );
    })

    // when the radio buttons chosen, collect value and show the selected photo
    $('input[type=radio]').on('change', function () {
        // store the base pics in variable
        let sleeping = $('.canvas .img-container.radio');
        // clear it before showing a new one
        sleeping.removeClass('show');

        // store the selected value in variable
        let selectedValue = $(this).val();

        // if select desk, and coffee table is checked, send alert
        if (selectedValue === 'desk' && decorRoom.$coffeeTableInput.prop('checked')) {
            // call function to check if other table is selected
            decorRoom.alertTabletop(selectedValue);

            // if input of desk is not checked, clear table top items
        } else if (!$('input#desk').prop('checked')){
            // call function to clear the table top items
            decorRoom.clearTableTop();
            // call function to show photo of selected item
            decorRoom.showPhoto(selectedValue);
            
            // or else, show photo as normal
        } else {
            // call function to show the selected photo
            decorRoom.showPhoto(selectedValue);
        }
    })

    // when the checkbox is clicked, collect the value
    $('input[type=checkbox]').on('click', function () {

        // set a variable for the value selected
        let selectedValue = $(this).val();

        if (selectedValue === 'cat' || selectedValue === 'dog') {
            decorRoom.checkSiblings(selectedValue, 'animal');
        } 
        else {
            // call function that shows the photo
            decorRoom.showPhoto(selectedValue);
        }

    });
}

// initializing function
decorRoom.init = function(){

    // if the width of the screen is less than 750 tell them to turn their phone
    if($(window).width() <= 750){
        // add a sweet alert
        swal({
            title: 'Please turn your phone to landscape to enjoy!',
            button: 'Okay.',
        });
    }

    // clear values on reload
    $(`input`).prop('checked', false);

    // call the function to initialize event listeners
    decorRoom.eventListeners();
}

// document ready
$(function(){

    // call initializing function
    decorRoom.init();

});