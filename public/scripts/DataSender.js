class DataSender {

    static sendConfig(configComb, configNano) {
        let css = editor.getValue();
        $.post("http://localhost:3001/app/result", { text: css, configComb: configComb, configNano: configNano }, (data) => {
            out.setValue(data);
            $('.css').click();
            StyleController.successStart();
        });
    }
}