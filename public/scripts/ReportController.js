class ReportController {
    static start() {
        if (editor2.getValue() != "")
            $('.leftcol .preview iframe').attr('srcdoc', editor2.getValue() + "<style>" + editor.getValue() + "</style>");
        if (out.getValue() != "")
            $('.rightcol .preview iframe').attr('srcdoc', editor2.getValue() + "<style>" + out.getValue() + "</style>");
    }
}