import UIComponent from "sap/ui/core/UIComponent";
import deviceModel from "./core/DeviceModel";
import { support } from "sap/ui/Device";
import FlexibleColumnLayoutSemanticHelper from "sap/f/FlexibleColumnLayoutSemanticHelper";
import { LayoutType } from "sap/f/library";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import JSONModel from "sap/ui/model/json/JSONModel";
import UI5Event from "sap/ui/base/Event";
import View from "sap/ui/core/mvc/View";
import ErrorHandler from "./controller/ErrorHandler";
import State from "./state/State";
import Service from "./service/Service";
import ODataModelV4 from "sap/ui/model/odata/v4/ODataModel";
import ODataModelV2 from "sap/ui/model/odata/v2/ODataModel";
import Model from "sap/ui/Model";


type routeParameters = {
	arguments: {
		layout: string;
	}
};
type startupParameters = {
	appType:string[]
}
type componentData = {
	startupParameters: startupParameters
};
type routeInfo = {
	name:string;
};

export type UIState = {
	"layout": string;
	"maxColumnsCount": number;
	"columnsSizes": {
		"beginColumn": number;
		"midColumn": number;
		"endColumn": number;
	},
	"columnsVisibility": {
		"beginColumn": boolean;
		"midColumn": boolean;
		"endColumn": boolean;
	},
	"isFullScreen": boolean;
	"isLogicallyFullScreen": boolean;
	"actionButtonsInfo": {
		"midColumn": {
			"fullScreen": string;
			"exitFullScreen": string;
			"closeColumn": string;
		},
		"endColumn": {
			"fullScreen": string;
			"exitFullScreen": string;
			"closeColumn": string;
		}
	}
}

/**
 * @namespace be.thevaluechain.fioriadvanced
 */
export default class Component extends UIComponent {
	private contentDensityClass: string | undefined;
	private errorHandler: ErrorHandler;
	public state:State;   
	public service:Service;   

	public static metadata = {
		manifest: "json"
	};

	

	public init(): void {
		// this.errorHandler = new ErrorHandler(this);
		super.init();

        
        // this.service = new service(this.getModel() as ODataModelV4);
		this.service = new Service(this.getModel() as ODataModelV2);
        this.state = new State(this.service);
		this.setModel(this.state.getModel(), "state");


		this.setModel(deviceModel.createDeviceModel(), "device");
		this.setModel(new JSONModel(), "appView");
		this.getRouter().attachBeforeRouteMatched((event: UI5Event) => this.onBeforeRouteMatched(event), this)
		this.getRouter().initialize();
	}
	


	public destroy(): void {
		this.getRouter().detachBeforeRouteMatched((event: UI5Event) => this.onBeforeRouteMatched(event), this);
		super.destroy();
	}

	public getContentDensityClass(): string {
		if (this.contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			// eslint-disable-next-line
			if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
				this.contentDensityClass = "";
			} else if (!support.touch) { // apply "compact" mode if touch is not supported
				this.contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.contentDensityClass;
	}

	private async onBeforeRouteMatched(oEvent: UI5Event) {
		const model = (this.getModel("appView") as JSONModel),
			layout = (oEvent.getParameters() as routeParameters).arguments.layout;

		// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
		if (!layout) {
			const helper = await this.getHelper() ;
			const nextUIState = (helper.getNextUIState(0) as UIState);
			model.setProperty("/layout", nextUIState.layout);
			return;
		}

		model.setProperty("/layout", layout);
	}

	public async getHelper(): Promise<FlexibleColumnLayoutSemanticHelper> {
		const fcl = await this.getFcl(),
			settings = {
				defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
				defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded
			};
		return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(fcl, settings));
	}

	private getFcl(): Promise<FlexibleColumnLayout> {
		return new Promise((resolve, reject) => {
			const FCL = ((this.getRootControl() as View).byId('fcl') as FlexibleColumnLayout);
			if (!FCL) {
				(this.getRootControl() as View).attachAfterInit((oEvent: UI5Event) => {
					resolve(((oEvent.getSource() as View).byId('fcl') as FlexibleColumnLayout));
				});
				return;
			}
			resolve(FCL);
		});
	}




	///Fixes for Typescript
	//Some methods are not recognized, so we declare them again and forwar the call via super
	//=======================================================================================


	/**
	 * Sets or unsets a model for the given model name for this ManagedObject.
	 * @param model Model to be set or null or undefined
	 * @param modelName the name of the model or undefined
	 */
	setModel(model: Model, modelName: string) {
		super.setModel(model, modelName);
	}

	/**
	 * Get the model to be used for data bindings with the given model name.
	 * @param modelName name of the model to be retrieved
	 * @returns {sap.ui.model.Model}
	 */
	getModel(modelName?: string):Model {
		return super.getModel(modelName);
	}


	// getRouter():Model {
	// 	return super.getRouter();
	// }
}