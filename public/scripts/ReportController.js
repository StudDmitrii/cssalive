class ReportController {
    static start() {
        if (editor2.getValue() != "") {
            $('.leftcol .preview iframe').attr('srcdoc', editor2.getValue() + "<style>" + editor.getValue() + "</style>");
        }
        if (editor.getValue() != "") {
            let size = this.sizeOf(editor);
            alert(size);
        }
        if (out.getValue() != "") {
            $('.rightcol .preview iframe').attr('srcdoc', editor2.getValue() + "<style>" + out.getValue() + "</style>");
            let size = this.sizeOf(out);
            alert(size);
        }
    }

    /*static async getTimeLoad(elem) {
        let start = new Date();
        $(elem).load(() => {
            let end = new Date();
        });
        return start - end;
    }*/

    static sizeOf(item) {
        let size = item.getValue().length;
        if (size >= 1024) {
            size /= 1024.0;
            size = size.toFixed(3);
            size += " KB";
        }
        else {
            size += " bytes";
        }
        return size;
    }
}