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

$('#settings_but').on('click', function(){
    if (!settings_open){

        $('#page_cssalive #content').css('transition','grid-template-columns 1s');

        $('#page_cssalive #content').css('grid-template-columns','1fr 40vw 1fr');
        $('#start_but, #report_but, #settings_but, .sidewalls_top, .sidewalls_bottom').css('display', 'none');
        $('#settings_block').css({'display':'grid','opacity':'1'});

        setTimeout(function(){
            $('#page_cssalive #content').css('transition','');
        }, 1000);

        settings_open = true;
    }
});

$('#settings_block .close').on('click', function(){
    if (settings_open){

        $('#page_cssalive #content').css('transition','grid-template-columns 1s');

        $('#page_cssalive #content').css('grid-template-columns','1fr 7vw 1fr');
        $('#start_but, #report_but, #settings_but, .sidewalls_top, .sidewalls_bottom').css('display', 'block');
        $('#settings_block').css({'display':'none','opacity':'0'});

        setTimeout(function(){
            $('#page_cssalive #content').css('transition','');
        }, 1000);

        settings_open = false;
    }
});





$('.middlecol .start').on('click', function(){
    if (editor.getValue() != "") {
        $('.rightcol .upload_block').fadeOut(100, 'linear');
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