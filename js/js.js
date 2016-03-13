document.addEventListener('DOMContentLoaded', function(){
  var first_image = document.getElementById('img1');
  var second_image = document.getElementById('img2');
  var third_image = document.getElementById('img3');
  var fourth_image = document.getElementById('img4');
  var fifth_image = document.getElementById('img5');
  var sixth_image = document.getElementById('img6');
  var first_space = document.getElementById('savebox1');
  var second_space = document.getElementById('savebox2');
  var third_space = document.getElementById('savebox3');
  var fourth_space = document.getElementById('savebox4');
  var fifth_space = document.getElementById('savebox5');
  var sixth_space = document.getElementById('savebox6');
  var random = document.getElementById('random');

  window.addEventListener('load', function() {
    var request = new XMLHttpRequest();
    var url = "http://ec2-54-175-171-191.compute-1.amazonaws.com/randomsix.php";
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          var response = request.responseText;

          obj = JSON.parse(response);
          update_all_image(obj, "foreground");
          save_all_background();
        }
      }
      request.open("GET", url, true);
      request.send();
    }
  )

  function update_all_image(json, signal) {
    if (signal == "foreground"){
      first_image.src = json.one;
      second_image.src = json.two;
      third_image.src = json.three;
      fourth_image.src = json.four;
      fifth_image.src = json.five;
      sixth_image.src = json.six;
      update_all_hashtags();
    } else {
      first_space.src = json.one;
      second_space.src = json.two;
      third_space.src = json.three;
      fourth_space.src = json.four;
      fifth_space.src = json.five;
      sixth_space.src = json.six;
      update_all_hashtags();
    }
  }

  function update_all_hashtags(){
    get_hashtag("proj1", first_image);
    get_hashtag("proj2", second_image);
    get_hashtag("proj3", third_image);
    get_hashtag("proj4", fourth_image);
    get_hashtag("proj5", fifth_image);
    get_hashtag("proj6", sixth_image);
  }

  function get_hashtag(id, image){
    var request = new XMLHttpRequest();
    var url = "http://ec2-54-175-171-191.compute-1.amazonaws.com/api.php?";
    var image = "url=" + image.src;
    var face = "&face=False";
    var furl = url + image + face;
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          var response = request.responseText;
          var json = JSON.stringify(response.split("\'").join("\""));

          obj = JSON.parse(JSON.parse(json));
          update(obj, id);
        }
    } 
    request.open("GET", furl, true);
    request.send();
  }

  function update(json, id) {
  var edit = document.getElementById(id);
  edit.innerHTML = " ";
  try { 
    var face = json.facial;
    //for (var emoticon in face) {
    //  if (face.hasOwnProperty(emoticon)) {
    //edit.innerHTML += "#" + face. + " ";
    //  }
    //}
  } finally {
    var landscape = json.landscape;
    for (var land in landscape) {
      if (landscape.hasOwnProperty(land)) {
        edit.innerHTML += "#" + land + " ";
      }
    }
    if (edit.innerHTML == " "){
      edit.innerHTML = "#Swag";
    }
  }
}
  function save_all_background() {
    var request = new XMLHttpRequest();
    var url = "http://ec2-54-175-171-191.compute-1.amazonaws.com/randomsix.php";
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          var response = request.responseText;

          obj = JSON.parse(response);
          update_all_image(obj, "backgournd");

        }
      }
      request.open("GET", url, true);
      request.send();
  }

  random.addEventListener('click', function() {
    var request = new XMLHttpRequest();

    first_image.src = first_space.src;
    second_image.src = second_space.src;
    third_image.src = third_space.src;
    fourth_image.src = fourth_space.src;
    fifth_image.src = fifth_space.src;
    sixth_image.src = sixth_space.src;

    var url = "http://ec2-54-175-171-191.compute-1.amazonaws.com/randomsix.php";
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          var response = request.responseText;

          obj = JSON.parse(response);
          update_all_image(obj);

        }
      }
      request.open("GET", url, true);
      request.send();
    }
  )


  iOS.addEventListener('click', function() {
      alert("Available at App Store");
      alert("soon...");
    }
  )

})
  /*
  random.addEventListener('click', function() {
    var request = new XMLHttpRequest();
    var url = "http://ec2-54-175-171-191.compute-1.amazonaws.com/api.php?";
    var image = "url=" + first_image.src;
    var face = "&face=False";
    var furl = url + image + face;
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            var json = JSON.stringify(response.split("\'").join("\""));

        obj = JSON.parse(JSON.parse(json));

          update(obj, "first_popup");
        }
    } 
    request.open("GET", furl, true);
    request.send();
  })
*/