// load  current likes from server
$.get('https://api.paulina.tech/v1/blogposts/93f29652d1e011ebabcf396dbf62158f/likes',
  function (data) {
    $("#like-count").text(data);
});


// check if user has already liked
if (localStorage.getItem("hasLiked") === "true") {
   // remove outlined heart, add filled heart
   $("#heart").removeClass("fa-heart-o").addClass("fa-heart");
}

// set up onclick for like button   
$("#like-button").click(function () {
  if (localStorage.getItem("hasLiked") !== "true") {
    // only allow one like per browser 
    localStorage.setItem("hasLiked", "true");
    
    $.post('https://api.paulina.tech/v1/blogposts/93f29652d1e011ebabcf396dbf62158f/likes',
      function (data) {
    
        // set updated like count
        $("#like-count").text(data);
    
        // remove outlined heart, add filled heart
        $("#heart").removeClass("fa-heart-o").addClass("fa-heart");
    });   
  }
});


// load current comments from server
$.getJSON('https://api.paulina.tech/v1/blogposts/93f29652d1e011ebabcf396dbf62158f/comments',
  
  function (data) {
    data.forEach(element => {
      $("#published-comments").append('<div class="container col-lg-6 d-flex flex-column justify-content-center" style="background-color: white; padding: 2%; margin-bottom: 1%;"><h6>' + element.name + '</h6><p>' + element.comment + '</p></div>');
    });
  });

  // publish new comment
  $("#comment-form").submit(function (event) {
    $.post('https://api.paulina.tech/v1/blogposts/93f29652d1e011ebabcf396dbf62158f/comments', $("#comment-form").serialize(),
      function (data) {
        $("#published-comments").append('<div class="container col-6 d-flex flex-column justify-content-center" style="background-color: white; padding: 2%; margin-bottom: 1%;"><h6>' + data.name + '</h6><p>' + data.comment + '</p></div>');
      });
    event.preventDefault();
    $("#comment-form").trigger("reset");
});