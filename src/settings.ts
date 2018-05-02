/*
 *  Power BI Visualizations
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

module powerbi.extensibility.visual {
    "use strict";
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

   export class VisualSettings extends DataViewObjectsParser {
      public settings_funnel_params: SettingsFunnelParams = new SettingsFunnelParams();
      public settings_scatter_params: SettingsScatterParams = new SettingsScatterParams();
      public settings_axes_params: SettingsAxesParams = new SettingsAxesParams();
      public settings_export_params: SettingsExportParams = new SettingsExportParams();
      
      }

 
    export class SettingsFunnelParams {
      public lineColor: string = "blue";   
      public conf1: string = "0.95";
      public conf2: string = "0.99";
    }

    export class SettingsScatterParams {
      public pointColor: string = "orange";   
      public weight: number = 10;
      public percentile: number = 40;
      public sparsify: boolean = true;
    }

    export class SettingsAxesParams {
      public colLabel: string = "gray";   
      public textSize: number = 12;
      public axisXisPercentage: boolean = true;
      public scaleXformat: string = "comma";
      public scaleYformat: string = "none";
      public sizeTicks: string = "6";  
    }
    export class SettingsExportParams {
      public show: boolean = false;
      public limitExportSize: string = "10000";
      public method: string = "copy";
    }
}
