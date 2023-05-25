class CSSNanoConfigurator {

    static makeConfig(settings) {
        let template = CSSNanoConfigurator.config_template;
        for (let set in settings) {
            template[set] = settings[set];
        }
        return JSON.stringify(template);
    }

    // static formatToCSSNano(settings) {
    //     settings['color-case'] = String(configVals.caseVals[settings['color-case']]);
    //     settings['element-case'] = configVals.caseVals[settings['element-case']];
    //     settings['quotes'] = configVals.quotesVals[settings['quotes']];
    //     if (String(settings['block-indent']).match(/[0-9]/) == null) {
    //         settings['block-indent'] = 2;
    //         $('#id_block-indent').val(settings['block-indent']);
    //     }
    //     return settings;
    // }

    static config_template = {
        cssDeclarationSorter: false,
        mergeIdents: false,
        reduceIdents: false,
        discardUnused: false,
    };
}