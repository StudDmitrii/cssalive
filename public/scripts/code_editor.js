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
    tabSize: 2,
    scrollPastEnd: true,
    //minimap: true,
    //miniMapWidth: 60,
    //miniMapSide: "left",
}

var editor = CodeMirror.fromTextArea(document.getElementById('code_editor_css'), {
    mode: 'css',
    autofocus: true,
    allowDropFileTypes: ['css'],
    ...main_set
});

var editor2 = CodeMirror.fromTextArea(document.getElementById('code_editor_html'), {
    mode: 'xml',
    autofocus: false,
    allowDropFileTypes: ['html'],
    ...main_set
});

var out = CodeMirror.fromTextArea(document.getElementById('code_out'), {
    mode: 'css',
    theme: theme,
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    readOnly: true,
    scrollPastEnd: true,
});

editor.on('change', validateCSS);
// editor.on('cursorActivity', hintCSS);

// function hintCSS() {
//    editor.showHint();
// };

function validateCSS() {
    let marks = editor.getAllMarks().forEach(i => i.clear());
    let valid = csstreeValidator.validate(editor.getValue());
    if (valid == 0) return true;
    for (let err of valid) {
        let l = err.line - 1;
        let ch = err.column - 1;
        //console.log(l);
        //console.log(ch);
        try {
            let end_ch;
            if (err.property !== undefined) end_ch = ch + err.property.length;
            else if (err.css !== undefined) end_ch = ch + err.css.length;

            //console.log(end_ch);
            editor.markText(
                { line: l, ch: ch },
                { line: l, ch: end_ch },
                {
                    className: 'error_val',
                });
        }
        catch (e) {
            console.log("SyntaxError");
        }
    }
    return false;
};