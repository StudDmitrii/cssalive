/******************/
/*****ON_START******/
/******************/
let start_settings_state = FormController.getConfigFromForm();
let current_settings_state = start_settings_state;
let config = CSSCombConfigurator.makeConfig(start_settings_state);

/******************/
/*****EDITORs******/
/******************/
let ready_to_start = false;

editor.on("change", () => {

    FileController.validateCSS();

    if (editor.getValue() == '') {
        StyleController.showLeftColHintCSS();
        $('.rightcol .upload_block').html(rightcol_text.start);
        ready_to_start = false;
        return;
    }
    StyleController.hideLeftColHintCSS();
    ready_to_start = true;
    $('.rightcol .upload_block').html(rightcol_text.pre);
});

editor2.on("change", () => {
    StyleController.hideLeftColHintHTML();
    if (editor2.getValue() == '')
        StyleController.showLeftColHintHTML();
});

out.on("change", () => {
    StyleController.hideRightColHint();
    if (out.getValue() == '')
        StyleController.showRightColHint();
});


/************************/
/*****UPLOAD BLOCKs******/
/************************/

$('.css_page .upload_block').on('click', () => {
    editor.focus();
});

$('.html_page .upload_block').on('click', () => {
    editor2.focus();
});


/******************/
/*****SETTINGS*****/
/******************/

$('.settings').on('click', () => {
    StyleController.openSettings();
}); //click open settings

$('.leftcol, .rightcol, .app_nav').on('click', () => {
    StyleController.closeSettings();
}); //click over settings block

$('.settings_block .cancel').on('click', () => {
    FormController.setSettingsToForm(current_settings_state);
    StyleController.closeSettings();
}); //click cancel but

$('.settings_block .accept').on('click', () => {
    current_settings_state = FormController.getConfigFromForm();
    config = CSSCombConfigurator.makeConfig(current_settings_state);
    StyleController.closeSettings();
}); //click accept but


/***************/
/*****START*****/
/***************/

$('.middlecol .start').on('click', () => {
    if (editor.getValue() != "" && FileController.validateCSS() == true) {
        StyleController.hideRightColHint();
        CSSCombConfigurator.sendConfig(config);
    }
    else{
        $('.css').click();
        StyleController.failureStart();
    }
});


/****************************/
/*****CSS AND HTML PAGES*****/
/****************************/

$(".html").on("click", () => {
    StyleController.openHTML();
});

$(".css").on("click", () => {
    StyleController.openCSS();
});


/*****************************/
/*****UPLOAD AND DOWNLOAD*****/
/*****************************/

$('.download_but').on('click', () => {
    FileController.saveFile(out.getValue());
});

$('#id_file_html').on('change', () => {
    FileController.uploadFile($('#id_file_html').get(0));
});

$('#id_file_css').on('change', () => {
    FileController.uploadFile($('#id_file_css').get(0));
});


/***************/
/*****CLEAR*****/
/***************/

$('.clear_in').on('click', () => {
    if ($('.css_page').css('display') == 'none')
        editor2.setValue("");
    else
        editor.setValue("");
});

$('.clear_out').on('click', () => {
    out.setValue("");
});


/*******************/
/*****MOVE CODE*****/
/*******************/

$('.move_in').on('click', () => {
    if (editor.getValue() == '') return;
    out.setValue(editor.getValue());
    editor.setValue("");
}); //move left to right

$('.move_out').on('click', () => {
    if (out.getValue() == '') return;
    $('.css').click();
    editor.setValue(out.getValue());
    out.setValue("");
}); //move right to left


/****************/
/*****REPORT*****/
/****************/

let report_is_open = false;
$('.report').on('click', () => {
    if (report_is_open == false)
        StyleController.openReport();
    else
        StyleController.closeReport();
    report_is_open = !report_is_open;
});