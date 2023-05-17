//global

var start_settings_state = getSettings();
var current_settings_state = start_settings_state;
var config = makeConfig(start_settings_state)
//console.log(start_settings_state);

function makeConfig(settings) {
    let c = config_template;
    for (let set in c) {
        if (settings[set] !== undefined)
            c[set] = settings[set];
    }
    return JSON.stringify(c);
}

function getSettings() {
    let settings = {
        "always-semicolon": $('#id_always-semicolon').prop('checked'),
        "block-indent": $('#id_block-indent').val(),
        "color-case": $('#id_color-case').prop('checked'),
        "color-shorthand": $('#id_color-shorthand').prop('checked'),
        "element-case": $('#id_element-case').prop('checked'),
        "eof-newline": $('#id_eof-newline').prop('checked'),
        "leading-zero": $('#id_leading-zero').prop('checked'),
        "quotes": $('#id_quotes').prop('checked'),
        "remove-empty-rulesets": $('#id_remove-empty-rulesets').prop('checked'),
        "strip-spaces": $('#id_strip-spaces').prop('checked'),
        "unitless-zero": $('#id_unitless-zero').prop('checked'),
        "vendor-prefix-align": $('#id_vendor-prefix-align').prop('checked'),
    };
    for (let element in settings) {
        if (settings[element] == 'checked') settings[element] = true;
        if (settings[element] == undefined || settings[element] == 'off') settings[element] = false;
    }
    if (settings['color-case'] == true) settings['color-case'] = 'lower';
    else settings['color-case'] = 'upper';
    if (settings['element-case'] == true) settings['element-case'] = 'lower';
    else settings['element-case'] = 'upper';
    if (settings['quotes'] == true) settings['quotes'] = 'single';
    else settings['quotes'] = 'double';
    if (settings['block-indent'].match(/[0-9]/) == null) {
        settings['block-indent'] = '2';
        $('#id_block-indent').val(settings['block-indent']);
    }
    return settings;
}

function setSettings(settings) {
    for (let element in settings) {
        if (settings[element] == true) $('#id_' + element).prop('checked', true);
        if (settings[element] == false) $('#id_' + element).prop('checked', false);
        if (settings[element] == 'lower') $('#id_' + element).prop('checked', true);
        if (settings[element] == 'upper') $('#id_' + element).prop('checked', false);
        if (settings[element] == 'single') $('#id_' + element).prop('checked', true);
        if (settings[element] == 'double') $('#id_' + element).prop('checked', false);
        if (element == 'block-indent') $('#id_' + element).val(settings[element]);
    }
}

var settings_open = false;

$('.settings').on('click', function () {
    if (!settings_open) {

        $('.app_container').css('transition', 'grid-template-columns 0.5s');
        $('.middlecol').css('justify-content', 'stretch');
        $('.app_container').css('grid-template-columns', '1fr 40vw 1fr');
        $('.start, .report, .settings').css('display', 'none');

        $('.leftcol, .rightcol, .app_nav').css('opacity', '0.5');
        $('.settings_block').css('opacity', '1');

        setTimeout(function () {
            $('.app_container').css('transition', '');
            $('.accept_block').css('opacity', '1');
            settings_open = true;
        }, 500);
    }
});


function closeSettings() {
    if (settings_open) {
        $('.accept_block').css('opacity', '0');

        $('.app_container').css('transition', 'grid-template-columns 0.5s');

        $('.app_container').css('grid-template-columns', '1fr 2vw 1fr');


        $('.leftcol, .rightcol, .app_nav').css('opacity', '1');
        $('.settings_block').css('opacity', '0');

        setTimeout(function () {

            $('.app_container').css('transition', '');
            $('.middlecol').css('justify-content', 'center');
            $('.start, .report, .settings').css('display', 'block');
            settings_open = false;
        }, 500);
    }
};
$('.leftcol, .rightcol, .app_nav').on('click', () => {
    closeSettings();
});
$('.settings_block .cancel').on('click', () => {
    setSettings(current_settings_state);
    closeSettings();
});
$('.settings_block .accept').on('click', () => {
    current_settings_state = getSettings();
    config = makeConfig(current_settings_state);
    closeSettings();
});




$('.middlecol .start').on('click', function () {
    if (editor.getValue() != "" && validateCSS() == true) {
        $('.rightcol .upload_block').fadeOut(100, 'linear');

        $.post("http://localhost:3001/app/result", { text: editor.getValue(), config: config }, (data) => {

            out.setValue(data);

            $('.rightcol .main_col').css('transition', 'none');
            $('.rightcol .main_col').css('background-color', 'rgba(0,80,0,0.2)');
            setTimeout(() => {
                $('.rightcol .main_col').css('transition', 'background-color 0.3s ease-in');
                $('.rightcol .main_col').css('background-color', 'transparent');
            }, 200);
        });


    }
    else {
        $('.css').click();
        $('.leftcol .main_col').css('transition', 'none');
        $('.leftcol .main_col').css('background-color', 'rgba(255,0,0,0.2)');
        setTimeout(() => {
            $('.leftcol .main_col').css('transition', 'background-color 0.3s ease-in');
            $('.leftcol .main_col').css('background-color', 'transparent');
        }, 200);
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




let report_is_open = false;

$('.report').on('click', () => {
    if (report_is_open == false) {
        $('.start, .settings').css('display', 'none');
        $('.main_col').css('display', 'none');
        $('.main_col.report_page').css('display', 'grid');
        //$('.cssalive_grid').css('grid-template-rows', '0 100vh');
        $('.app_nav').animate({ opacity: '0' }, 0, () => {
            $('.app_nav').css('display', 'none');
        });
        startPreview();

        report_is_open = true;
    }
    else {
        $('.start, .settings').css('display', 'unset');
        $('.main_col').css('display', 'grid');
        $('.html').click();
        $('.css').click();
        $('.main_col.report_page').css('display', 'none');
        //$('.cssalive_grid').css('grid-template-rows', '8vh 92vh');
        $('.app_nav').css('display', 'grid');
        $('.app_nav').animate({ opacity: '1' }, "fast");
        report_is_open = false;
    }
});

function startPreview() {
    // let css_in = editor.getValue();
    // let html_in = editor2.getValue();
    // let css_out = out.getValue();

    // console.log(html_in + '\n<style>' + css_in + '</style>');
    // $('.leftcol .preview iframe').html('<h1>GHBDDDD</h1>');
    // $('.rightcol .preview iframe').html(html_in + '\n<style>' + css_out + '</style>');
};