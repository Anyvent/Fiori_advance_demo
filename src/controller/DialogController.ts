import UI5Event from "sap/ui/base/Event";
import BaseController, { frag } from "./BaseController";
import SelectDialog from "sap/m/SelectDialog";
import State from "../state/State";
import Control from "sap/ui/core/Control";
import myComponent from "../Component";

/**
 * @namespace be.thevaluechain.fioriadvanced.controller
 */
export default abstract class Dialog extends BaseController {
    
    protected _state: State;
    protected _parentController: BaseController

    public onBeforeShow(parentController: BaseController, dialog: frag, resolve: (value: unknown) => void, data?: unknown, popoverSource?: Control): void {
        this._parentController = parentController;
        const component = this._parentController.getComponent();
		this._state = component.state;
        return;
    }
    protected getSearchHelpItem(oEvent: UI5Event): void {
        return;
    }

    public fragmentById(viewController: Controller, fragment: string, id: string): void {
        return;
    }

    public setFilters(sField: string): void {
        return;
    }

    public onValueHelpConfirm(oEvent: UI5Event): void {
        return;
    }

    private onDialogClose() {
        return;
    }

    public onValueHelpSearch(oEvent: UI5Event): void {
        const SelectDialog: SelectDialog = (oEvent.getSource() as SelectDialog);
        return;
    }

}