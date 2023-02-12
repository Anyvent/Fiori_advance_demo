import BaseController from "./BaseController";
import { system } from "sap/ui/Device";
import UI5Event from "sap/ui/base/Event";
import Component, { UIState } from "../Component";
import List from "sap/m/List";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataListBinding from "sap/ui/model/odata/v2/ODataListBinding";
import ObjectListItem from "sap/m/ObjectListItem";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Sorter from "sap/ui/model/Sorter";
import EEquipmentState from "../state/EEquipmentState";
import State from "../state/State";

/**
 * @namespace be.thevaluechain.fioriadvanced.controller
 */
export default class Master extends BaseController {
	private descendingSort = false;
	private state: State;

	public async onInit(): Promise<void> {
		const component = (this.getOwnerComponent() as Component);
		this.state = component.state;


	

	}

	private onMasterMatched() {
		(this.getModel("appView") as JSONModel).setProperty("/layout", "OneColumn");



	}

	private async onCreateNew(event: UI5Event) {
		const id = "0";
		this.navigateToDetail(id);
	}

	private async onListItemPress(event: UI5Event) {
		const id = ((event.getSource() as ObjectListItem).getBindingContext().getProperty("PersonId") as string),
		this.navigateToDetail(id);
	}

	private async navigateToDetail(id: string) {
		const replace = !system.phone;
		const helper = await (this.getOwnerComponent() as Component).getHelper(),
		const nextUIState = (helper.getNextUIState(1) as UIState);
		//navigate
		this.getRouter().navTo("detail", { id: id, layout: nextUIState.layout }, {}, replace);
	}

	private onSearch(event: UI5Event) {
		const query = event.getParameter("query") as string;
		let tableSearchState: Array<Filter> = [];

		if (query && query.length > 0) {
			tableSearchState = [new Filter("Name", FilterOperator.Contains, query)];
		}

		((this.getView().byId("productsTable") as List).getBinding("items") as ODataListBinding).filter(tableSearchState, "Application");
	}

	private onSort(event: UI5Event) {
		this.descendingSort = !this.descendingSort;
		const view = this.getView(),
			table = (view.byId("productsTable") as List),
			binding = (table.getBinding("items") as ODataListBinding),
			sorter = new Sorter("Name", this.descendingSort);

		binding.sort(sorter);
	}
}