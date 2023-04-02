/*var histery_open = false;

$('#history_but').on('click', function(){
    if (!histery_open){
        $('#uppercol').animate({'grid-template-rows': '30vh'}, 500);
        histery_open = true;
    }
    else{
        $('#uppercol').animate({'grid-template-rows': '0'}, 500);
        histery_open = false;
    }
});

editor.on('focus', function(){
    if (histery_open){
        $('#uppercol').css({'grid-template-rows': '0'});
        histery_open = false;
    }
});
*/




var settings_open = false;

$('.settings').on('click', function(){
    if (!settings_open){

        $('.app_container').css('transition', 'grid-template-columns 1s');
        $('.middlecol').css('justify-content','stretch');
        $('.app_container').css('grid-template-columns', '1fr 40vw 1fr');
        $('.start, .report, .settings').css('display', 'none');

        $('.settings_block').css('opacity','1');

        setTimeout(function(){
            $('.app_container').css('transition', '');
            settings_open = true;
        }, 1000);
    }
});

$('.settings').on('click', function(){
    if (settings_open){

        $('.app_container').css('transition','grid-template-columns 1s');
        $('.middlecol').css('justify-content','center');
        $('.app_container').css('grid-template-columns','1fr 2vw 1fr');
        $('.start, .report, .settings').css('display', 'block');

        setTimeout(function(){
            $('.app_container').css('transition', '');
            settings_open = false;
        }, 1000);
    }
});





$('.middlecol .start').on('click', function(){
    if (editor.getValue() != "") {
        $('.rightcol .upload_block').fadeOut(100, 'linear');

        /*let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                sender(xhttp.responseText);
            }
        }

        xhttp.open("GET", "http://localhost:3001/app/result", true);
        xhttp.send();*/
        $.post("http://localhost:3001/app/result", { text: editor.getValue() }, function(data) {
            //alert(data);
            //console.log(data);
            out.setValue(data);
        });
    }
});







$('#report_but').on('click', function(){
    $('.CodeMirror').css('filter','blur(40px)');
    $('#start_but, #settings_but, .upload_block').css('visibility','hidden');
    $(this).css('display','none');
    $('.report').css('display','grid');
    $('#close_report_but').css('display','block');
});

$('#close_report_but').on('click', function(){
    $('.CodeMirror').css('filter','blur(0)');
    $('#start_but, #settings_but, .upload_block').css('visibility','visible');
    $(this).css('display','none');
    $('.report').css('display','none');
    $('#report_but').css('display','block');
});