$("#submitForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action"),
    dataType: 'json',
    data: JSON.stringify(data),
    // success: function (data) {
    //   alert(data);
    // },
    // error: function (data) {
    //   alert("error occured!!");
    //   console.log(data)
    // },
    complete: function (data) {
      loadEmployee('http://localhost:8080/ElectroGrid/rest/employees')
      alert('Employee Added Successfully!!')
      //form reset
      that.reset();
    }
  });
});

function loadEmployee(url) {
  $("tr:has(td)").remove();
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (response) {
      $.each(response, function (i, item) {
        var $tr = $('<tr  class="table-light">').append(
          $('<td>').text(item.name),
          $('<td>').text(item.address),
          $('<td>').text(item.phone),
          $('<td>').text(item.gender),
          $('<td>').text(item.age),
          $('<td>').text(item.email),
          $('<td>').append('<ul class="flexList"><li><a href="employeeedit.html?id=' + item.employeeId + '"><button><i class="far fa-pen"></i></button></a></li><li><button onClick="deleteitem(' + item.employeeId + ')"><i class="far fa-trash-alt"></i></button></li></ul>')
        )
          .appendTo('#tbody');
      });
    }
  });
}

function deleteitem(id) {
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:8080/ElectroGrid/rest/employees/' + id,
    dataType: 'json',
    complete: function (response) {
      loadEmployee('http://localhost:8080/ElectroGrid/rest/employees')
    }
  });
}

function getAEmployee(url){
 console.log( $.urlParam('id'));
}