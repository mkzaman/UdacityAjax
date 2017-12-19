
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

    var requestNYtimes = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=30af9cbcd1094c05979ae76a864cad7e&q="+ city;

    $.getJSON(requestNYtimes,function(data){
      $nytHeaderElem.text("NYtimes news about " + city);
      var items = [];
      $.each(data.response.docs, function(key, value){
          items.push( "<li id='" + key + "'>" + 	"<a href='" +value.web_url+ "'" +">"+
                "<h3>" + value.headline.main+ "</h3>"+"<a/>"+
                "<p>"+ value.snippet +"</p>"+
                "</li>" );
      });
      $nytElem.append(items.join(''));
    }).error(function(e){
      $nytHeaderElem.text("nytimes can't be loaded");
    });

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
