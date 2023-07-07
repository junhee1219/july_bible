// Service Worker 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker 등록 성공:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker 등록 실패:', error);
      });
  });
}



$(document).ready(function () {

    var today = new Date();

    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');

    var currentDate = `${year}-${month}-${day}`;

    $('td[data-date="' + currentDate + '"]').closest('tr').addClass('highlight');

    // 테이블 행 클릭 시 modal 창 표시
    $('td').click(function () {

        var chapter = $(this).parent('tr').find('td:nth-child(2)').text();
        var book = $(this).closest('.chapter').find('h2').text();

        $('#book-title').text(book + ' ' + chapter);
        getBibleChapterContent(book, chapter)
        //
        $('#modal').show();
    });

    // modal 창 닫기
    $('#close-btn, #modal').on('click', function (event) {
        if (event.target.id === 'modal') {
            closeModal();
        }
    });

    function closeModal() {
        $('#modal').hide();
    }

    function getBibleChapterContent(book, chapter) { // ex 골로새서 1장
        let filename = book + ' ' + chapter + ".txt"
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filename, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var data = xhr.responseText;
                let contents = data.replace(/(\S+\s*):/g, (match, p1) => '<br>' + p1 + ':');
                $('#chapter-content').html(contents);
            }
        };
        xhr.send();
    }
});
