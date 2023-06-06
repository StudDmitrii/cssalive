//styles on start
$('.html_page').css('visibility', 'hidden');
$('.rightcol .upload_block').html(rightcol_text.start);

class StyleController {

    static openMenu() {
        $('.menu_block').css('visibility', 'visible');
        $('.menu_block').css('width', '15vw');
        $('.menu').css('visibility', 'hidden');
    }

    static closeMenu() {
        $('.menu_block').css('visibility', 'unset');
        $('.menu_block').css('width', '0');
        $('.menu').css('visibility', 'unset');
    }

    static openReport() {
        $('.start, .settings').css('display', 'none');
        $('.main_col').css('display', 'none');
        $('.main_col.report_page').css('display', 'grid');
        $('.app_nav').animate({ opacity: '0' }, 0, () => {
            $('.app_nav').css('display', 'none');
        });
    }

    static closeReport() {
        $('.start, .settings').css('display', 'grid');
        $('.main_col').css('display', 'grid');
        $('.main_col.report_page').css('display', 'none');
        $('.app_nav').css('display', 'grid');
        $('.app_nav').animate({ opacity: '1' }, "fast");
    }

    static openSettings() {
        $('.app_container').css('transition', 'grid-template-columns 0.5s');
        $('.middlecol').css('justify-content', 'stretch');
        $('.app_container').css('grid-template-columns', '1fr 40vw 1fr');
        $('.start, .report, .settings').css('display', 'none');
        $('.leftcol, .rightcol, .app_nav').css('opacity', '0.5');
        $('.settings_block').css('opacity', '1');
        setTimeout(function () {
            $('.app_container').css('transition', '');
            $('.accept_block').css('opacity', '1');
        }, 500);
    }

    static closeSettings() {
        $('.accept_block').css('opacity', '0');
        $('.app_container').css('transition', 'grid-template-columns 0.5s');
        $('.app_container').css('grid-template-columns', '1fr 2vw 1fr');
        $('.leftcol, .rightcol, .app_nav').css('opacity', '1');
        $('.settings_block').css('opacity', '0');
        setTimeout(function () {
            $('.app_container').css('transition', '');
            $('.middlecol').css('justify-content', 'center');
            $('.start, .report, .settings').css('display', 'block');
        }, 500);
    }

    static successStart() {
        $('.rightcol .main_col').css('transition', 'none');
        $('.rightcol .main_col').css('background-color', 'rgba(0,80,0,0.2)');
        setTimeout(() => {
            $('.rightcol .main_col').css('transition', 'background-color 0.3s ease-in');
            $('.rightcol .main_col').css('background-color', 'transparent');
        }, 200);
    }

    static failureStart() {
        $('.leftcol .main_col').css('transition', 'none');
        $('.leftcol .main_col').css('background-color', 'rgba(255,0,0,0.2)');
        setTimeout(() => {
            $('.leftcol .main_col').css('transition', 'background-color 0.3s ease-in');
            $('.leftcol .main_col').css('background-color', 'transparent');
        }, 200);
    }

    static openHTML() {
        $('.move_in').css('display', 'none');
        $(".html").css("background-color", "rgba(37, 56, 54, 0.5)");
        $(".css").css("background-color", "rgba(37, 56, 54, 0.3)");
        $('.html_page').css('visibility', 'visible');
        $('.css_page').css('visibility', 'hidden');
    }

    static openCSS() {
        $('.move_in').css('display', 'unset');
        $(".css").css("background-color", "rgba(37, 56, 54, 0.5)");
        $(".html").css("background-color", "rgba(37, 56, 54, 0.3)");
        $('.css_page').css('visibility', 'visible');
        $('.html_page').css('visibility', 'hidden');
    }

    static hideRightColHint() {
        $('.rightcol .upload_block, .rightcol .mini_description').fadeOut(100, 'linear');
    }

    static showRightColHint() {
        $('.rightcol .upload_block, .rightcol .mini_description').fadeIn(10, 'linear');
    }

    static showLeftColHintCSS() {
        $('.leftcol .css_page .upload_block, .leftcol .css_page .mini_description').fadeIn(10, 'linear');
    }

    static hideLeftColHintCSS() {
        $('.leftcol .css_page .upload_block, .leftcol .css_page .mini_description').fadeOut(100, 'linear');
    }

    static showLeftColHintHTML() {
        $('.leftcol .html_page .upload_block, .leftcol .html_page .mini_description').fadeIn(10, 'linear');
    }

    static hideLeftColHintHTML() {
        $('.leftcol .html_page .upload_block, .leftcol .html_page .mini_description').fadeOut(100, 'linear');
    }
}