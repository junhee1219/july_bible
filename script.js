$(document).ready(function () {

    var currentDate = new Date().toISOString().split('T')[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옴
    $('td[data-date="' + currentDate + '"]').closest('tr').addClass('highlight');

    // 테이블 행 클릭 시 modal 창 표시
    $('td').click(function () {
        
        //var date = $(this).parent('tr').data('date');
        var chapter = $(this).parent('tr').find('td:nth-child(2)').text();
        var book = $(this).closest('.chapter').find('h2').text();

        $('#book-title').text(book + ' ' + chapter);
        getBibleChapterContent(book, chapter)
        //
        $('#modal').show();
    });

    // modal 창 닫기
    $('#close-btn, #modal').on('click', function(event) {
        if (event.target.id === 'modal') {
          closeModal();
        }
      });

      function closeModal() {
        $('#modal').hide();
      }

    function getBibleChapterContent(book, chapter) { // ex 골로새서 1장
        let filename = book+' '+chapter+".txt"
        $.ajax({
            url: filename,
            dataType: 'text',
            success: function(data) {
              console.log(data); // 읽어온 텍스트 출력 또는 원하는 처리 수행
            },
            error: function(xhr, status, error) {
              console.log('파일을 읽어오는 중 에러 발생:', error);
            }
          });
          
        let content ="";
        content = readTextFile("file:///C:/bible-schedule/"+filename);

        $('#chapter-content').text(content);
        
    }
});

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                return allText;
            }
        }
    }
    rawFile.send(null);
}

