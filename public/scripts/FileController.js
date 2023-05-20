class FileController {

    static saveFile(content) {
        if (out.getValue() == '') return;

        let fname = $('input[name="out_file_name"]').val();
        if (fname == undefined || fname == '') fname = $('input[name="out_file_name"]').attr('placeholder');
        let blob = new Blob([content], { type: "text/css;charset=utf-8" });
        saveAs(blob, fname);
    }

    static uploadFile(input) {

        const send = (msg) => {
            if (input.name.includes("css"))
                editor.setValue(msg);
            else
                editor2.setValue(msg);
        };

        let file = input.files[0];

        if (input.name.includes("css") && file.name.match(/\.([^.]+)$|$/)[1] != "css") return;
        else if (input.name.includes("html") && file.name.match(/\.([^.]+)$|$/)[1] != "html") return;

        let fileReader = new FileReader();

        fileReader.readAsText(file);

        fileReader.onload = () => {
            send(fileReader.result);
        };

        fileReader.onerror = () => {
            send("ОШИБКА ЗАГРУЗКИ ФАЙЛА!");
        };
    }

    static validateCSS() {
        let marks = editor.getAllMarks().forEach(i => i.clear());
        let valid = csstreeValidator.validate(editor.getValue());
        if (valid == 0) return true;
        for (let err of valid) {
            let l = err.line - 1;
            let ch = err.column - 1;
            try {
                let end_ch;
                if (err.property !== undefined) end_ch = ch + err.property.length;
                else if (err.css !== undefined) end_ch = ch + err.css.length;

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
    }
}