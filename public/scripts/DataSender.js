class DataSender {

    static sendRefactor(configComb, configNano, css) {
        // console.log({ text: css, configComb: configComb, configNano: configNano });
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

    static getFiles() {
        $.get('http://localhost:3001/rep', (data) => {
            $('.files_form .files_list').html('');
            // console.log(data);
            data = data.map((item) => {
                let date = new Date(item.date).toLocaleString('ru', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                });
                let name = item.name;
                let id = item.id;
                item = { date: date, name: name, id: id };
                return item;
            });
            //console.log(data);
            data.slice().reverse().forEach((item) => {
                $('.files_form .files_list').append(`
                <div class="file_line">
                    <div class="file_time">`+ item.date + `</div>
                    <div class="file_name">`+ item.name + `</div>
                    <div class="load_file" onclick="load_file_click(this)" data-id="` + item.id + `">ЗАГРУЗИТЬ</div>
                </div>
                `);
            });
        });
    }

    static loadFile(id) {
        $.get('http://localhost:3001/rep?id=' + id, (data) => {
            // console.log(data);
            editor.setValue(data.before);
            out.setValue(data.after);
            $('.control_line').click();
        });
    }
}