// load  current likes from server
$.get('https://api.paulina.tech/v1/blogposts/93f29652d1e011ebabcf396dbf62158f/likes',
  function (data, textStatus, jqXHR) {
    $("#like-count").text(data);
});

// set up onclick for like button   
$("#like-button").click(function () {

  // only allow one like per browser 
  if (localStorage.getItem("hasLiked") !== "true") {
    
    localStorage.setItem("hasLiked", "true");

    $.post('https://api.paulina.tech/v1/blogposts/93f29652d1e011ebabcf396dbf62158f/likes',
      function (data, textStatus, jqXHR) {
        $("#like-count").text(data);
      });
  }

});