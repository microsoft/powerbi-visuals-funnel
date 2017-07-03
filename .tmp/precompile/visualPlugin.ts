module powerbi.visuals.plugins {
    export var RHTML_FUNNEL_978302916642 = {
        name: 'RHTML_FUNNEL_978302916642',
        displayName: 'Funnel plot',
        class: 'Visual',
        version: '1.0.0',
        apiVersion: '1.6.0',
        create: (options: extensibility.visual.VisualConstructorOptions) => new powerbi.extensibility.visual.RHTML_FUNNEL_978302916642.Visual(options),
        custom: true
    };
}
