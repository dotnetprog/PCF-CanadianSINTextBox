import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { INasTextFieldProps,NASTextField } from "./Components/NASTextBoxComponent";
import * as React from "react";
import * as ReactDOM from "react-dom";

export class NASControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}
	private notifyOutputChanged: () => void;
	// reference to the container div
	private theContainer: HTMLDivElement;
	private props: INasTextFieldProps = {
		valueChanged:this.valueChanged.bind(this)
	}
	private _context: ComponentFramework.Context<IInputs>;
	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
		this.notifyOutputChanged = notifyOutputChanged;
		this.props.value = context.parameters.NAS_Field.raw || "";
		this.props.lang = context.userSettings.languageId == 1036 ? "fr" : "en";
		this.props.isRequired = this._context.parameters.NAS_Field.attributes?.RequiredLevel === 2;
		this.props.isEditable = true;
		this.props.isReadable = true;
		if(this._context.parameters.NAS_Field.security?.secured === true){
			this.props.isReadable = this._context.parameters.NAS_Field.security.readable;
			this.props.isEditable = this._context.parameters.NAS_Field.security.editable;
			if(this._context.parameters.NAS_Field.security.readable === false)
			{
				this.props.isEditable = false;
				
			}
		}
		if(this.props.isEditable){
			this.props.isEditable = !this._context.mode.isControlDisabled;
		}
    	this.theContainer = container;
		
		
	}

	private valueChanged(val:string,isValid:boolean):void {
		if(this.props.value !== val){
			this.props.value = val;
			this.notifyOutputChanged();
		}
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		ReactDOM.render(
			// Create the React component
			React.createElement(
			  NASTextField, // the class type of the React component found in Facepile.tsx
			  this.props
			),
			this.theContainer
		  );
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			NAS_Field: this.props.value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
