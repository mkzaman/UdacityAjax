
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    $('.bgImg').remove();
    var street = $('#street').val();
    var city = $('#city').val();
    var imagesource = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street + ',' + city;

    $body.append('<img class="bgImg" height=100% width=100% src="'+imagesource+'">');

    $greeting.text('So you want to live in ' + street + ' ' + city + '?');

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
