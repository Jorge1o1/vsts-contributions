import { IWidgetConfiguration, CustomSettings } from "TFS/Dashboards/WidgetContracts";
import * as WidgetHelpers from "TFS/Dashboards/WidgetHelpers";
import { defaultFilter } from "./filter";

//Executed in script tag in contributionsWidgetSingleConfiguration.html
VSS.register("contributions-widget-single-configuration", () => {
    const configInstance = new ContributionsWidgetSingleConfiguration();
    return configInstance;
});

VSS.notifyLoadSucceeded();

export class ContributionsWidgetSingleConfiguration implements IWidgetConfiguration {
    //public load(widgetSettings : WidgetSettings, context: IWidgetConfigurationContext) {
    public load() {
        WidgetHelpers.IncludeWidgetConfigurationStyles();
        return WidgetHelpers.WidgetStatusHelper.Success();
    }

    public async onSave() {
        let customSettings : CustomSettings = {
            data: JSON.stringify({
                foo: "",
                filter: await defaultFilter.getValue()
            })
        };
        return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
    }
}
