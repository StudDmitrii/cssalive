const theme = 'the-matrix';

$('.html_page').css('visibility', 'hidden');


const main_set = {
    theme: theme,
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    spellcheck: true,
    matchBrackets: true,
    continueComments: true,
    tabSize: 2
}

var editor = CodeMirror.fromTextArea(document.getElementById('code_editor_css'), {
    mode: 'css',
    autofocus: true,
    ...main_set
});

var editor2 = CodeMirror.fromTextArea(document.getElementById('code_editor_html'), {
    mode: 'xml',
    autofocus: false,
    ...main_set
});

var out = CodeMirror.fromTextArea(document.getElementById('code_out'), {
    mode: 'css',
    theme: theme,
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    readOnly: true
});

/*function resetTheme (theme_in){
    let textin = editor.getValue();
    editor = CodeMirror.fromTextArea(document.getElementById('code_editor'), {
        mode: 'css',
        theme: theme_in,
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        autofocus: true,
        spellcheck: true,
        matchBrackets: true,
        continueComments: true,
        tabSize: 2
    });
    editor.setValue(textin);

    let textout = out.getValue();
    out = CodeMirror.fromTextArea(document.getElementById('code_out'), {
        mode: 'css',
        theme: theme_in,
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        readOnly: true
    });
    out.setValue(textout);
}*/