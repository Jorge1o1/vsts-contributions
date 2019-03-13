import { IConfigurableWidget, WidgetSettings } from "TFS/Dashboards/WidgetContracts";
import * as WidgetHelpers from "TFS/Dashboards/WidgetHelpers";
import { IContributionFilter, defaultFilter } from "./filter";
import { renderGraphs } from "./controls/showGraphs";

//Executed in script tag in contributionsWidgetSingle.html
VSS.register("contributions-widget-single", () => {
    const widgetInstance = new ContributionsWidgetSingle();
    return widgetInstance;
});

VSS.notifyLoadSucceeded();

export class ContributionsWidgetSingle implements IConfigurableWidget {
    public preload() {
        return WidgetHelpers.WidgetStatusHelper.Success();
    }

    public async load(widgetSettings : WidgetSettings) {
        WidgetHelpers.IncludeWidgetStyles();

        let data : {filter : IContributionFilter | null} = JSON.parse(widgetSettings.customSettings.data);

        if (data === null) {
            data = {filter : null};
        }
        if (data.filter === null) {
           defaultFilter.getValue().then((f) => {
                console.log(f);
                renderGraphs(f);
           });
        }

        return WidgetHelpers.WidgetStatusHelper.Success();
    }

    public reload(newWidgetSettings: WidgetSettings) {
        console.log(newWidgetSettings);
        return WidgetHelpers.WidgetStatusHelper.Success();
    }
}
