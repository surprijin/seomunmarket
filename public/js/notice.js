// 검색 기능 구현


function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let listInner = document.getElementsByClassName("listInner");

  for (let i = 0; i < listInner.length; i++) {
    title = listInner[i].getElementsByClassName("notice_tit");
    date = listInner[i].getElementsByClassName("date");
    if (title[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
      date[0].innerHTML.toLowerCase().indexOf(search) != -1
    ){
      listInner[i].style.display = "content"
    } else {
      listInner[i].style.display = "none"
    }
  }
}

// 페이지네이션 구현

function pagination() {
  var req_num_row = 10; //화면에 표시할 목록 개수
  var $tr = jQuery(".paging"); // paging 대상 class 명
  var total_num_row = $tr.length;
  var num_pages = 0;
  if (total_num_row % req_num_row == 0) {
    num_pages = total_num_row / req_num_row;
  }
  if (total_num_row % req_num_row >= 1) {
    num_pages = total_num_row / req_num_row;
    num_pages++;
    num_pages = Math.floor(num_pages++);
  }

  for (var i = 1; i <= num_pages; i++) {
    jQuery(".pagination").append(
      '<li class="page-item "><a class="page-link" href="#">' + i + "</a></li>"
    );
    /*
    jQuery(".pagination li:nth-child(1)").addClass("active");
    jQuery(".pagination a").addClass("pagination-link");*/
  }

  jQuery(".pagination a").removeClass("active");
  jQuery(this).addClass("active");

  $tr.each(function (i) {
    jQuery(this).hide();
    if (i + 1 <= req_num_row) {
      $tr.eq(i).show();
    }
  });

  jQuery(".pagination a").click(".pagination-link", function (e) {
    e.preventDefault();
    $tr.hide();
    var page = jQuery(this).text();
    var temp = page - 1;
    var start = temp * req_num_row;
    var current_link = temp;

    for (var i = 0; i < req_num_row; i++) {
      $tr.eq(start + i).show();
    }

    if (temp >= 1) {
      jQuery(".pagination li:first-child").removeClass("disabled");
    } else {
      jQuery(".pagination li:first-child").addClass("disabled");
    }
  });

  jQuery(".prev").click(function (e) {
    e.preventDefault();
    jQuery(".pagination li:first-child").removeClass("active");
  });

  jQuery(".next").click(function (e) {
    e.preventDefault();
    jQuery(".pagination li:last-child").removeClass("active");
  });
}

jQuery("document").ready(function () {
  pagination();

  jQuery(".pagination li:first-child").addClass("disabled");
});
