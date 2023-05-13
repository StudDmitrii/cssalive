var ready_to_start = false;

const rightcol_text = {
    start: `
    <p>Здесь появится результат,</p>
    <p>когда введете CSS в соответствующее окно слева</p>
    <p>и нажмёте CТАРТ</p>
    `,
    pre: `
    <p>Здесь будет исправленный CSS код,</p>
    <p>когда нажмёте CТАРТ</p>
    `,
};
$('.rightcol .upload_block').html(rightcol_text.start);


$('.css_page .upload_block').on('click', function () {
    editor.focus();
});

$('.html_page .upload_block').on('click', function () {
    editor2.focus();
});

editor.on("change", function () {
    if (editor.getValue() == '') {
        $('.leftcol .css_page .upload_block, .leftcol .css_page .mini_description').fadeIn(10, 'linear');
        //if (out.getValue() == '')
        //    $('.rightcol .upload_block, .rightcol .mini_description').fadeIn(10, 'linear');

        $('.rightcol .upload_block').html(rightcol_text.start);
        $('.rightcol textarea').val('');
        ready_to_start = false;
    }
    else {
        $('.leftcol .css_page .upload_block, .leftcol .css_page .mini_description').fadeOut(100, 'linear');
        ready_to_start = true;
        $('.rightcol .upload_block').html(rightcol_text.pre);
    }
});

editor2.on("change", function () {
    if (editor2.getValue() == '') {
        $('.leftcol .html_page .upload_block, .leftcol .html_page .mini_description').fadeIn(10, 'linear');
    }
    else {
        $('.leftcol .html_page .upload_block, .leftcol .html_page .mini_description').fadeOut(100, 'linear');
    }
});

out.on("change", function () {
    if (out.getValue() == '') {
        $('.rightcol .upload_block, .rightcol .mini_description').fadeIn(10, 'linear');
    }
    else {
        $('.rightcol .upload_block, .rightcol .mini_description').fadeOut(10, 'linear');
    }
});

/*
$('#id_file_css').on('change', function () {
    if ($(this).val() > 0) {
        //alert();
        $(this).reset();
        //alert(selectedfile);
    }
});

$('#id_file_html').on('change', function () {
    if (!$(this).val()) {
        //alert();
        var selectedfile = $(this).file;
        //alert(selectedfile);
    }
});*/