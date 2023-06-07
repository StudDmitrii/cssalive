/******************/
/*****ON_START******/
/******************/
let comb_start_settings_state = FormController.getConfigFromForm().comb;
let nano_start_settings_state = FormController.getConfigFromForm().nano;
let comb_current_settings_state = comb_start_settings_state;
let nano_current_settings_state = nano_start_settings_state;
let configComb = CSSCombConfigurator.makeConfig(comb_start_settings_state);
let configNano = CSSNanoConfigurator.makeConfig(nano_start_settings_state);

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

let settings_is_open = false;
$('.settings').on('click', () => {
    StyleController.openSettings();
    settings_is_open = true;
}); //click open settings

$('.leftcol, .rightcol, .app_nav').on('click', () => {
    if (!settings_is_open) return;
    StyleController.closeSettings();
    settings_is_open = false;
}); //click over settings block

$('.settings_block .cancel').on('click', () => {
    FormController.setSettingsToForm(comb_current_settings_state, nano_current_settings_state);
    StyleController.closeSettings();
    settings_is_open = false;
}); //click cancel but

$('.settings_block .accept').on('click', () => {
    comb_current_settings_state = FormController.getConfigFromForm().comb;
    nano_current_settings_state = FormController.getConfigFromForm().nano;
    configComb = CSSCombConfigurator.makeConfig(comb_current_settings_state);
    configNano = CSSNanoConfigurator.makeConfig(nano_current_settings_state);
    StyleController.closeSettings();
    settings_is_open = false;
}); //click accept but


/***************/
/*****START*****/
/***************/

$('.middlecol .start').on('click', () => {
    if (editor.getValue() != "" && FileController.validateCSS() == true) {
        StyleController.hideRightColHint();
        DataSender.sendRefactor(configComb, configNano, editor.getValue());
        // DataSender.sendFiles([editor.getValue(), editor2.getValue(), out.getValue()]);
    }
    else {
        $('.css').click();
        StyleController.failureStart();
    }
});


/****************************/
/*****CSS AND HTML PAGES*****/
/****************************/

let css_is_open = true;
$(".html").on("click", () => {
    StyleController.openHTML();
    css_is_open = false;
});

$(".css").on("click", () => {
    StyleController.openCSS();
    css_is_open = true;
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
    if (css_is_open == false) {
        editor2.setValue("");
        css_is_open = false;
    }
    else {
        editor.setValue("");
        css_is_open = true;
    }
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
    if (report_is_open == false) {
        StyleController.openReport();
        ReportController.start();
    }
    else
        StyleController.closeReport();
    report_is_open = !report_is_open;
});


/**************/
/*****MENU*****/
/**************/

let menu_is_open = false;
$('.menu').on('click', () => {
    if (menu_is_open) return;
    StyleController.openMenu();
    setTimeout(() => {
        menu_is_open = true;
    }, 200);
});

$('*:not(".menu_block")').on('click', () => {
    if (!menu_is_open) return;
    StyleController.closeMenu();
    setTimeout(() => {
        menu_is_open = false;
    }, 500);
});