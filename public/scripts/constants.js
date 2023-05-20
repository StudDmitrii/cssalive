/****************/
/*****OTHER******/
/****************/

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


/******************/
/*****EDITORs******/
/******************/

const theme = 'the-matrix';
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
}

const editor = CodeMirror.fromTextArea(document.getElementById('code_editor_css'), {
    mode: 'css',
    autofocus: true,
    allowDropFileTypes: ['css'],
    ...main_set
});

const editor2 = CodeMirror.fromTextArea(document.getElementById('code_editor_html'), {
    mode: 'xml',
    autofocus: false,
    allowDropFileTypes: ['html'],
    ...main_set
});

const out = CodeMirror.fromTextArea(document.getElementById('code_out'), {
    mode: 'css',
    theme: theme,
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    readOnly: true,
    scrollPastEnd: true,
});