
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

    $('.bgimg').remove();
    var street = $('#street').val();
    var city = $('#city').val();
    var imagesource = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street + ',' + city;

    $body.append('<img class="bgimg" src="'+imagesource+'">');

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


    var searchMe =  $('#city').val(); //picks the user-generated value
    var apiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchMe + '&format=json&callback=?'; // API url
    $.ajax({
      url: apiUrl,
      dataType: 'json',
      type:'GET',
      success: function(data) {
        var items = [];
        var lis = [];
        items = data;
        var labels = items[1];
        var links = items[3];
        for(var i=0; i < labels.length; i++)
        {
          lis.push( "<li> " + 	"<a href='" +links[i]+ "'" +">"+
                "<h3>" + labels[i]+ "</h3>"+"<a/>"+
                "</li>" );
        }
        $wikiElem.append(lis.join(''));
      }
    });
    return false;
};

$('#form-container').submit(loadData);

// loadData();
