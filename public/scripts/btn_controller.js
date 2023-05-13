//global
var settings_data = $('input[name="global_set"]:checked').val();



var settings_open = false;

$('.settings').on('click', function () {
    if (!settings_open) {

        $('.app_container').css('transition', 'grid-template-columns 1s');
        $('.middlecol').css('justify-content', 'stretch');
        $('.app_container').css('grid-template-columns', '1fr 40vw 1fr');
        $('.start, .report, .settings').css('display', 'none');

        $('.leftcol, .rightcol').css('opacity', '0.5');
        $('.settings_block').css('opacity', '1');

        setTimeout(function () {
            $('.app_container').css('transition', '');
            $('.accept_block').css('opacity', '0.8');
            settings_open = true;
        }, 1000);
    }
});


function closeSettings() {
    if (settings_open) {
        $('.accept_block').css('opacity', '0');

        $('.app_container').css('transition', 'grid-template-columns 1s');

        $('.app_container').css('grid-template-columns', '1fr 2vw 1fr');


        $('.leftcol, .rightcol').css('opacity', '1');
        $('.settings_block').css('opacity', '0');

        setTimeout(function () {

            $('.app_container').css('transition', '');
            $('.middlecol').css('justify-content', 'center');
            $('.start, .report, .settings').css('display', 'block');
            settings_open = false;
        }, 1000);
    }
};
$('.settings_block .accept, .settings_block .cancel').on('click', () => closeSettings());


$('.middlecol .start').on('click', function () {
    if (editor.getValue() != "") {
        $('.rightcol .upload_block').fadeOut(100, 'linear');

        $.post("http://localhost:3001/app/result", { text: editor.getValue(), settings: settings_data }, function (data) {
            out.setValue(data);
        });
    }
});




$('.settings_block .accept').on('click', () => {
    settings_data = $('input[name="global_set"]:checked').val();
});




var report_is_open = false;

$('.middlecol .report').on('click', () => {

    if (report_is_open == false) {
        $('.report_block').css('display', 'block');
        report_is_open = true;
    }
    else {
        $('.report_block').css('display', 'none');
        report_is_open = false;
    }

});




var css_win_open = true;

$(".html").on("click", () => {
    if (css_win_open) {
        $('.move_in').css('display', 'none');
        $(".html").css("background-color", "rgba(37, 56, 54, 0.5)");
        $(".css").css("background-color", "rgba(37, 56, 54, 0.3)");
        $('.html_page').css('visibility', 'visible');
        //$('.css_page').css('visibility', 'hidden');
        $('.html_page').css('display', 'grid');
        $('.css_page').css('display', 'none');
        css_win_open = false;
    }
});

$(".css").on("click", () => {
    if (!css_win_open) {
        $('.move_in').css('display', 'unset');
        $(".css").css("background-color", "rgba(37, 56, 54, 0.5)");
        $(".html").css("background-color", "rgba(37, 56, 54, 0.3)");
        $('.css_page').css('display', 'grid');
        $('.html_page').css('display', 'none');
        css_win_open = true;
    }
});




$('.download_but').on('click', () => {
    if (out.getValue() != '') {
        let content = out.getValue();
        let fname = $('input[name="out_file_name"]').val();
        if (fname == undefined || fname == '') fname = $('input[name="out_file_name"]').attr('placeholder');

        let blob = new Blob([content], { type: "text/css;charset=utf-8" });
        saveAs(blob, fname);
    }
});




$('.clear_in').on('click', () => {
    if ($('.css_page').css('display') == 'none')
        editor2.setValue("");
    else
        editor.setValue("");
});

$('.clear_out').on('click', () => {
    out.setValue("");
});




$('.move_in').on('click', () => {
    if (editor.getValue() == '') return;
    out.setValue(editor.getValue());
    editor.setValue("");
});
$('.move_out').on('click', () => {
    if (out.getValue() == '') return;
    $('.css').click();
    editor.setValue(out.getValue());
    out.setValue("");
});