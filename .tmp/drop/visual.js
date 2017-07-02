var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var RHTML_FUNNEL_978302916642;
            (function (RHTML_FUNNEL_978302916642) {
                var injectorCounter = 0;
                function ResetInjector() {
                    injectorCounter = 0;
                }
                RHTML_FUNNEL_978302916642.ResetInjector = ResetInjector;
                function injectorReady() {
                    return injectorCounter === 0;
                }
                RHTML_FUNNEL_978302916642.injectorReady = injectorReady;
                function ParseElement(el, target) {
                    var arr = [];
                    if (!el || !el.hasChildNodes())
                        return;
                    var nodes = el.children;
                    for (var i = 0; i < nodes.length; i++) {
                        var tempNode = void 0;
                        if (nodes.item(i).nodeName.toLowerCase() === 'script') {
                            tempNode = createScriptNode(nodes.item(i));
                        }
                        else {
                            tempNode = nodes.item(i).cloneNode(true);
                        }
                        target.appendChild(tempNode);
                        arr.push(tempNode);
                    }
                    return arr;
                }
                RHTML_FUNNEL_978302916642.ParseElement = ParseElement;
                function createScriptNode(refNode) {
                    var script = document.createElement('script');
                    var attr = refNode.attributes;
                    for (var i = 0; i < attr.length; i++) {
                        script.setAttribute(attr[i].name, attr[i].textContent);
                        if (attr[i].name.toLowerCase() === 'src') {
                            // waiting only for src to finish loading
                            injectorCounter++;
                            script.onload = function () {
                                injectorCounter--;
                            };
                        }
                    }
                    script.innerHTML = refNode.innerHTML;
                    return script;
                }
                function RunHTMLWidgetRenderer() {
                    var intervalVar = window.setInterval(function () {
                        if (injectorReady()) {
                            window.clearInterval(intervalVar);
                            if (window.hasOwnProperty('HTMLWidgets') && window['HTMLWidgets'].staticRender) {
                                window['HTMLWidgets'].staticRender();
                            }
                        }
                    }, 100);
                }
                RHTML_FUNNEL_978302916642.RunHTMLWidgetRenderer = RunHTMLWidgetRenderer;
            })(RHTML_FUNNEL_978302916642 = visual.RHTML_FUNNEL_978302916642 || (visual.RHTML_FUNNEL_978302916642 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var RHTML_FUNNEL_978302916642;
            (function (RHTML_FUNNEL_978302916642) {
                /**
                 * Gets property value for a particular object.
                 *
                 * @function
                 * @param {DataViewObjects} objects - Map of defined objects.
                 * @param {string} objectName       - Name of desired object.
                 * @param {string} propertyName     - Name of desired property.
                 * @param {T} defaultValue          - Default value of desired property.
                 */
                function getValue(objects, objectName, propertyName, defaultValue) {
                    if (objects) {
                        var object = objects[objectName];
                        if (object) {
                            var property = object[propertyName];
                            if (property !== undefined) {
                                return property;
                            }
                        }
                    }
                    return defaultValue;
                }
                RHTML_FUNNEL_978302916642.getValue = getValue;
                /**
                 * Gets property value for a particular object in a category.
                 *
                 * @function
                 * @param {DataViewCategoryColumn} category - List of category objects.
                 * @param {number} index                    - Index of category object.
                 * @param {string} objectName               - Name of desired object.
                 * @param {string} propertyName             - Name of desired property.
                 * @param {T} defaultValue                  - Default value of desired property.
                 */
                function getCategoricalObjectValue(category, index, objectName, propertyName, defaultValue) {
                    var categoryObjects = category.objects;
                    if (categoryObjects) {
                        var categoryObject = categoryObjects[index];
                        if (categoryObject) {
                            var object = categoryObject[objectName];
                            if (object) {
                                var property = object[propertyName];
                                if (property !== undefined) {
                                    return property;
                                }
                            }
                        }
                    }
                    return defaultValue;
                }
                RHTML_FUNNEL_978302916642.getCategoricalObjectValue = getCategoricalObjectValue;
                // returns value in range 
                function inMinMax(a, mi, ma) {
                    if (a < mi)
                        return mi;
                    if (a > ma)
                        return ma;
                    return a;
                }
                RHTML_FUNNEL_978302916642.inMinMax = inMinMax;
            })(RHTML_FUNNEL_978302916642 = visual.RHTML_FUNNEL_978302916642 || (visual.RHTML_FUNNEL_978302916642 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var RHTML_FUNNEL_978302916642;
            (function (RHTML_FUNNEL_978302916642) {
                // in order to improve the performance, one can update the <head> only in the initial rendering.
                // set to 'true' if you are using different packages to create the widgets
                var updateHTMLHead = false;
                var renderVisualUpdateType = [powerbi.VisualUpdateType.Resize, powerbi.VisualUpdateType.ResizeEnd, powerbi.VisualUpdateType.Resize + powerbi.VisualUpdateType.ResizeEnd];
                var Visual = (function () {
                    function Visual(options) {
                        if (options && options.element)
                            this.rootElement = options.element;
                        this.headNodes = [];
                        this.bodyNodes = [];
                        // default parameters
                        this.settings_funnel = {
                            lineColor: "blue",
                            conf1: "0.95",
                            conf2: "0.999"
                        };
                        this.settings_scatter = {
                            pointColor: "orange",
                            weight: 10,
                            percentile: 40,
                            sparsify: true
                        };
                        this.settings_axes = {
                            colLabel: "gray",
                            textSize: 12,
                            scaleXformat: "comma",
                            scaleYformat: "none",
                            sizeTicks: "8",
                            axisXisPercentage: true
                        };
                    }
                    Visual.prototype.update = function (options) {
                        if (!options || !options.type || !options.viewport)
                            return;
                        var dataViews = options.dataViews;
                        if (!dataViews || dataViews.length === 0)
                            return;
                        var dataView = dataViews[0];
                        if (!dataView || !dataView.metadata)
                            return;
                        this.updateObjects(dataView.metadata.objects);
                        var payloadBase64 = null;
                        if (dataView.scriptResult && dataView.scriptResult.payloadBase64) {
                            payloadBase64 = dataView.scriptResult.payloadBase64;
                        }
                        if (renderVisualUpdateType.indexOf(options.type) === -1) {
                            if (payloadBase64) {
                                this.injectCodeFromPayload(payloadBase64);
                            }
                        }
                        this.onResizing(options.viewport);
                    };
                    Visual.prototype.onResizing = function (finalViewport) {
                        /* add code to handle resizing of the view port */
                    };
                    Visual.prototype.injectCodeFromPayload = function (payloadBase64) {
                        // Inject HTML from payload, created in R
                        // the code is injected to the 'head' and 'body' sections.
                        // if the visual was already rendered, the previous DOM elements are cleared
                        RHTML_FUNNEL_978302916642.ResetInjector();
                        if (!payloadBase64)
                            return;
                        // create 'virtual' HTML, so parsing is easier
                        var el = document.createElement('html');
                        try {
                            el.innerHTML = window.atob(payloadBase64);
                        }
                        catch (err) {
                            return;
                        }
                        // if 'updateHTMLHead == false', then the code updates the header data only on the 1st rendering
                        // this option allows loading and parsing of large and recurring scripts only once.
                        if (updateHTMLHead || this.headNodes.length === 0) {
                            while (this.headNodes.length > 0) {
                                var tempNode = this.headNodes.pop();
                                document.head.removeChild(tempNode);
                            }
                            var headList = el.getElementsByTagName('head');
                            if (headList && headList.length > 0) {
                                var head = headList[0];
                                this.headNodes = RHTML_FUNNEL_978302916642.ParseElement(head, document.head);
                            }
                        }
                        // update 'body' nodes, under the rootElement
                        while (this.bodyNodes.length > 0) {
                            var tempNode = this.bodyNodes.pop();
                            this.rootElement.removeChild(tempNode);
                        }
                        var bodyList = el.getElementsByTagName('body');
                        if (bodyList && bodyList.length > 0) {
                            var body = bodyList[0];
                            this.bodyNodes = RHTML_FUNNEL_978302916642.ParseElement(body, this.rootElement);
                        }
                        RHTML_FUNNEL_978302916642.RunHTMLWidgetRenderer();
                    };
                    /**
                     * This function gets called by the update function above. You should read the new values of the properties into
                     * your settings object so you can use the new value in the enumerateObjectInstances function below.
                     *
                     * Below is a code snippet demonstrating how to expose a single property called "lineColor" from the object called "settings"
                     * This object and property should be first defined in the capabilities.json file in the objects section.
                     * In this code we get the property value from the objects (and have a default value in case the property is undefined)
                     */
                    Visual.prototype.updateObjects = function (objects) {
                        /*this.settings = <VisualSettings>{
                            lineColor: getFillValue(object, 'settings', 'lineColor', "#333333")
                        };*/
                        this.settings_funnel = {
                            lineColor: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_funnel_params', 'lineColor', 'blue'),
                            conf1: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_funnel_params', 'conf1', "0.95"),
                            conf2: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_funnel_params', 'conf2', "0.999")
                        };
                        this.settings_scatter = {
                            pointColor: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_scatter_params', 'pointColor', 'orange'),
                            weight: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_scatter_params', 'weight', 10),
                            percentile: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_scatter_params', 'percentile', 40),
                            sparsify: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_scatter_params', 'sparsify', true)
                        };
                        this.settings_axes = {
                            colLabel: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_axes_params', 'colLabel', "gray"),
                            textSize: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_axes_params', 'textSize', 12),
                            scaleXformat: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_axes_params', 'scaleXformat', "comma"),
                            scaleYformat: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_axes_params', 'scaleYformat', "none"),
                            sizeTicks: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_axes_params', 'sizeTicks', "8"),
                            axisXisPercentage: RHTML_FUNNEL_978302916642.getValue(objects, 'settings_axes_params', 'axisXisPercentage', true)
                        };
                    };
                    Visual.prototype.enumerateObjectInstances = function (options) {
                        var objectName = options.objectName;
                        var objectEnumeration = [];
                        switch (objectName) {
                            case 'settings_funnel_params':
                                objectEnumeration.push({
                                    objectName: objectName,
                                    properties: {
                                        lineColor: this.settings_funnel.lineColor,
                                        conf1: this.settings_funnel.conf1,
                                        conf2: this.settings_funnel.conf2
                                    },
                                    selector: null
                                });
                                break;
                            case 'settings_scatter_params':
                                objectEnumeration.push({
                                    objectName: objectName,
                                    properties: {
                                        pointColor: this.settings_scatter.pointColor,
                                        weight: RHTML_FUNNEL_978302916642.inMinMax(this.settings_scatter.weight, 1, 50),
                                        percentile: this.settings_scatter.percentile,
                                        sparsify: this.settings_scatter.sparsify,
                                    },
                                    selector: null
                                });
                                break;
                            case 'settings_axes_params':
                                objectEnumeration.push({
                                    objectName: objectName,
                                    properties: {
                                        colLabel: this.settings_axes.colLabel,
                                        textSize: this.settings_axes.textSize,
                                        sizeTicks: this.settings_axes.sizeTicks,
                                        scaleXformat: this.settings_axes.scaleXformat,
                                        axisXisPercentage: this.settings_axes.axisXisPercentage,
                                        scaleYformat: this.settings_axes.scaleYformat
                                    },
                                    selector: null
                                });
                                break;
                        }
                        ;
                        return objectEnumeration;
                    };
                    return Visual;
                }());
                RHTML_FUNNEL_978302916642.Visual = Visual;
            })(RHTML_FUNNEL_978302916642 = visual.RHTML_FUNNEL_978302916642 || (visual.RHTML_FUNNEL_978302916642 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.RHTML_FUNNEL_978302916642 = {
                name: 'RHTML_FUNNEL_978302916642',
                displayName: 'Funnel plot',
                class: 'Visual',
                version: '1.0.0',
                apiVersion: '1.6.0',
                create: function (options) { return new powerbi.extensibility.visual.RHTML_FUNNEL_978302916642.Visual(options); },
                custom: true
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map