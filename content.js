function requestData() {
  var url = 'http://data.cityofchicago.org/resource/cwig-ma7x.json?';

  // Set up an asynchronous AJAX POST request
  var xhr = new XMLHttpRequest();

  // Prepare the data to be POSTed by URLEncoding each field's contents
  var resName = document.querySelector('.biz-page-title').innerText.toUpperCase().replace(/ /g,"+");
  var resAddr = document.querySelector('.street-address').querySelector('span').innerText.toUpperCase().replace(/ /g,"+");
  resName = resName.replace(/\&/g,"%26");

  var params = 'aka_name=' + resName +
               '&address=' + resAddr + '+';

  console.log(url+params);

  xhr.open('GET', url+params, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var foodData = JSON.parse(xhr.responseText);
      callback(foodData);
    }
  }

  // Send the request
  xhr.send();
};

function callback(food) {
  var fE = food.length - 1;
  var resName = food[fE]["aka_name"];
  var address = food[fE]["address"];
  var date = food[fE]["inspection_date"];
  var iType = food[fE]["inspection_type"];
  var results = food[fE]["results"];
  var violations = food[fE]["violations"].replace(/\|/g,"<br>");

  document.querySelector('.showcase-container').innerHTML = "<div id='result-container'> <b>Name: </b>" +
  resName + "<br><b>Address: </b>" + address + "<br><b>Date: </b>" + date +
  "<br><b>Inspection Type: </b>" + iType + "<br><b>Results: </b>" + results +
  "<br><b>Violations: </b>" + violations + "<div>";
}

requestData();
