import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import formatter from "../core/formatter";
import UI5Event from "sap/ui/base/Event";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { inputParameters } from "./App.controller";
import State from "../state/State";

/**
 * @namespace be.thevaluechain.fioriadvanced.controller
 */
export default class Detail extends BaseController {
	private formatter = formatter;
	private state: State;

	public onInit(): void {
		const component = this.getComponent();
		this.state = component.state;

		//Enable navigation to the detail page
		this.getRouter().getRoute("detail").attachPatternMatched((event: UI5Event) => this.onObjectMatched(event), this);
	}

	private onObjectMatched(event: UI5Event): void {
		//Navigation entry point
		let id:string = (event.getParameter("arguments") as inputParameters).id || this.id || "0";
		void (this.getModel() as ODataModel).metadataLoaded().then(() => {

			// Binding to oDataModel
			// const path = (this.getModel() as ODataModel).createKey("/Person", {
			// 	PersonId: id
			// });
			// this.getView().bindElement({
			// 	path: path,
			// 	events: {
			// 		change: () => this.onBindingChange(),
			// 		dataRequested: () => {
			// 			this.state.setDetailScreenBusy(true)
			// 		},
			// 		dataReceived: () => {
			// 			this.state.setDetailScreenBusy(false)
			// 		}
			// 	}
			// });

			//Binding to Custom Model
			let person = this.state.getPersonById(id);

		});
	}





	private onBindingChange() {
		const elementBinding = this.getView().getElementBinding();
		// No data for the binding
		if (!elementBinding.getBoundContext()) {
			void this.getRouter().getTargets().display("detailObjectNotFound");
		}
	}

	public onCloseDetailPress(): void {
		(this.getModel("appView") as JSONModel).setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
		this.getRouter().navTo("master");
	}

	public handleFullScreen(): void {
		const nextLayout = ((this.getModel("appView") as JSONModel).getProperty("/actionButtonsInfo/midColumn/fullScreen") as string);
		this.getRouter().navTo("detail", { layout: nextLayout, id: this.id });
	}

	public handleExitFullScreen(): void {
		const nextLayout = ((this.getModel("appView") as JSONModel).getProperty("/actionButtonsInfo/midColumn/exitFullScreen") as string);
		this.getRouter().navTo("detail", { layout: nextLayout, id: this.id });
	}

	public handleClose(): void {
		const nextLayout = ((this.getModel("appView") as JSONModel).getProperty("/actionButtonsInfo/midColumn/closeColumn") as string);
		this.getRouter().navTo("master", { layout: nextLayout });
	}
}