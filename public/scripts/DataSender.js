class DataSender {

    static sendRefactor(configComb, configNano, css) {
        console.log({ text: css, configComb: configComb, configNano: configNano });
        $.post("http://localhost:3001/app/result", { text: css, configComb: configComb, configNano: configNano }, (data) => {
            out.setValue(data);
            $('.css').click();
            StyleController.successStart();
            DataSender.sendFiles([editor.getValue(), editor2.getValue(), out.getValue()]);
        });
    }

    static sendFiles(fileTexts) {
        $.post("http://localhost:3001/app/result/save", { fileTexts: fileTexts }, (data) => {
            console.log('2 файла успешно сохранены');
        });
    }
}