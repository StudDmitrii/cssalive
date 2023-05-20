const configVals = {
    caseVals: { true: 'lower', false: 'upper' },
    quotesVals: { true: 'single', false: 'double' },
    logicVals: { true: true, false: false },
};

let start_settings_state = getConfigFromForm();
let current_settings_state = start_settings_state;
let config = makeConfig(start_settings_state);

function makeConfig(settings) {
    let c = config_template;
    for (let set in c) {
        if (settings[set] !== undefined)
            c[set] = settings[set];
    }
    return JSON.stringify(c);
}

function setCheckInput(obj, b) {
    $(obj).prop('checked', b);
}

function getCheckInput(obj) {
    return $(obj).prop('checked');
}

function formatToCSSComb(settings) {
    settings['color-case'] = configVals.caseVals[settings['color-case']];
    settings['element-case'] = configVals.caseVals[settings['element-case']];
    settings['quotes'] = configVals.quotesVals[settings['quotes']];
    if (settings['block-indent'].match(/[0-9]/) == null) {
        settings['block-indent'] = '2';
        $('#id_block-indent').val(settings['block-indent']);
    }
    return settings;
}

function getConfigFromForm() {
    let settings = {
        "always-semicolon": getCheckInput('#id_always-semicolon'),
        "block-indent": $('#id_block-indent').val(),
        "color-case": getCheckInput('#id_color-case'),
        "color-shorthand": getCheckInput('#id_color-shorthand'),
        "element-case": getCheckInput('#id_element-case'),
        "eof-newline": getCheckInput('#id_eof-newline'),
        "leading-zero": getCheckInput('#id_leading-zero'),
        "quotes": getCheckInput('#id_quotes'),
        "remove-empty-rulesets": getCheckInput('#id_remove-empty-rulesets'),
        "strip-spaces": getCheckInput('#id_strip-spaces'),
        "unitless-zero": getCheckInput('#id_unitless-zero'),
        "vendor-prefix-align": getCheckInput('#id_vendor-prefix-align'),
    };
    return formatToCSSComb(settings);
}

function setSettingsToForm(settings) {
    for (let element in settings) {
        let obj = '#id_' + element;
        let val;
        for (let subval in configVals) {
            val = Object.keys(configVals[subval]).find(key => configVals[subval][key] == settings[element]);
        }
        setCheckInput(obj, val);
        // if (settings[element] == true) setCheckInput(obj, true);
        // if (settings[element] == false) setCheckInput(obj, false);
        // if (settings[element] == 'lower') setCheckInput(obj, true);
        // if (settings[element] == 'upper') setCheckInput(obj, false);
        // if (settings[element] == 'single') setCheckInput(obj, true);
        // if (settings[element] == 'double') setCheckInput(obj, false);
        if (element == 'block-indent') $('#id_' + element).val(settings[element]);
    }
}


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
    setSettingsToForm(current_settings_state);
    StyleController.closeSettings();
}); //click cancel but

$('.settings_block .accept').on('click', () => {
    current_settings_state = getConfigFromForm();
    config = makeConfig(current_settings_state);
    StyleController.closeSettings();
}); //click accept but


/***************/
/*****START*****/
/***************/

$('.middlecol .start').on('click', () => {
    if (editor.getValue() != "" && FileController.validateCSS() == true) {
        StyleController.hideRightColHint();
        $.post("http://localhost:3001/app/result", { text: editor.getValue(), config: config }, (data) => {
            out.setValue(data);
            $('.css').click();
            StyleController.successStart();
        });
        return;
    }
    $('.css').click();
    StyleController.failureStart();
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