import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import Router from "sap/ui/core/routing/Router";
import Component from "sap/ui/core/Component";
import UIComponent from "sap/ui/core/UIComponent";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

import UI5Element from "sap/ui/core/Element";
import Control from "sap/ui/core/Control";

import DialogController from "./DialogController";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";
import Popover from "sap/m/Popover";
import View from "sap/ui/core/mvc/View";
import MyComponent from "../Component";


export type frag = {
	controller: DialogController,
	fragment: Fragment
};

type frags = Record<string, frag>;
const _fragments: frags = {};



/**
 * @namespace be.thevaluechain.fioriadvanced.controller
 */
export default class BaseController extends Controller {
	[x: string]: any;
	/**
	 * Convenience method for accessing the router in every controller of the application.
	 * @public
	 * @returns {sap.ui.core.routing.Router} the router for this component
	 */
	public getRouter(): Router {
		return this.getComponent().getRouter();
		// return (this.getOwnerComponent() as UIComponent).getRouter();

	}


	/**
	 * Convenience method for getting the view model by name in every controller of the application.
	 * @public
	 * @param {string} sName the model name
	 * @returns {sap.ui.model.Model} the model instance
	 */
	public getModel(name?: string): Model {
		return this.getView().getModel(name);
	}


	/**
	 * Convenience method for setting the view model in every controller of the application.
	 * @public
	 * @param {sap.ui.model.Model} oModel the model instance
	 * @param {string} sName the model name
	 * @returns {sap.ui.mvc.View} the view instance
	 */
	public setModel(model: Model, name?: string): void {
		this.getView().setModel(model, name);
	}

	/**
	 * Convenience method for getting the resource bundle.
	 * @public
	 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
	 */
	public getResourceBundle(): ResourceBundle {
		return ((this.getComponent().getModel("i18n")  as ResourceModel).getResourceBundle() as ResourceBundle);
	}

	/**
	 * Event handler for navigating back.
	 * It there is a history entry we go one step back in the browser history
	 * If not, it will replace the current entry of the browser history with the master route.
	 * @public
	 */
	public onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();

		if (sPreviousHash !== undefined) {
			// eslint-disable-next-line
			history.go(-1);
		} else {
			this.getRouter().navTo("master", {}, {}, true);
		}
	}

	
	/**
	 * Opens a new Dialog via "openFragment" in the Base Controller.
	 * 
	 * @param fragmentName The path to the XML view to be opened
	 * @param data Optional data to pass along to the new view
	 * @param parentController An optional reference to the controller that called the view 
	 */
	protected async openDialog(fragmentName: string, data?: unknown, parentController?:BaseController): Promise<void> {
        await this.openFragment({ fragmentName: fragmentName, data: data }, parentController ) as string;
    }

	/**
	 * Opens a new Pop-over via "openFragment" in the Base Controller.
	 * 
	 * @param fragmentName The path to the XML view to be opened
	 * @param popoverSource The UI5 element on which the the pop-over is connected
	 * @param data Optional data to pass along to the new view
	 * @param parentController An optional reference to the controller that called the view
	 */
	protected async openPopOver(fragmentName: string, popoverSource: Control, data?: unknown, parentController?:BaseController): Promise<void> {
        await this.openFragment({ fragmentName: fragmentName, data: data, popoverSource: popoverSource}, parentController ) as string;
    }

    private async openFragment(config: { fragmentName: string, data?: unknown, popoverSource?: Control }, parentController?:BaseController): Promise<unknown> {
		let ViewpathComponents: string[];
        const view:View = parentController ? parentController.getView() : this.getView();
        const controller: BaseController = parentController ? parentController : this as unknown as BaseController;
        
        ViewpathComponents =  view.getViewName().split(".");
        // ViewpathComponents = this.getView().getViewName().split(".");
        ViewpathComponents.pop();
		if (config.fragmentName.indexOf(".") > 0) {//full path
             ViewpathComponents = ViewpathComponents.concat(config.fragmentName.split("."));
		} else { //current folder
			ViewpathComponents.push(config.fragmentName);
		}
		const viewPath = ViewpathComponents.join("."),
			controllerPath = viewPath.replace("view", "controller"),
			id = view.getId() + "--" + config.fragmentName;
		if (!_fragments[id]) {
			let newController: Controller;
			try {
				newController = (await Controller.create({
					name: controllerPath
				}) as Controller);
			} catch (error) {
				console.log("Dialog without controller. Just continue with the current controller for the dialog")
				newController = controller;
			}
			const newFragment = (await Fragment.load({
				id: id,
				name: viewPath,
				controller: newController
			})  as unknown as Fragment); //fragment.load wants to return a control in this version
			_fragments[id] = { controller: (newController as DialogController), fragment: newFragment };
			view.addDependent((_fragments[id].fragment as unknown as UI5Element));
		}
		const closedPromise = new Promise((resolve, reject) => {
			if (_fragments[id].controller && (_fragments[id].controller as Controller) !== this) {
				if ("onBeforeShow" in _fragments[id].controller) {
                    if(!parentController){
                        _fragments[id].controller.onBeforeShow(controller, _fragments[id], resolve, config.data, config.popoverSource);
                    }else{
                        _fragments[id].controller.onBeforeShow(controller, _fragments[id], resolve, config.data, config.popoverSource, this);
                    }
				}
			}
		});
		if (config.popoverSource) {
			(_fragments[id].fragment as unknown as Popover).openBy(config.popoverSource, false);
		} else {
			(_fragments[id].fragment as Dialog).open();
		}
		return closedPromise;//_fragments[id].fragment;
	}

	///Fixes for Typescript
	//Some methods are not recognized, so we declare them again and forwar the call via super
	//=======================================================================================

	/**
	 * @returns  {sap.ui.core.UIComponent} Component.js
	 */
	getComponent(): MyComponent {
		return (super.getOwnerComponent() as Component as unknown as MyComponent);
	}


	// getOwnerComponent(): MyComponent {
	// 	return (super.getOwnerComponent() as Component as unknown as MyComponent);
	// }
}