import { EQUIPMENTType } from "../type/Backend";
import BaseObject from "./BaseObject";

/**
 * @namespace com.eliagroup.pm.pmeequipments.model
 */
export default class Equipment extends BaseObject {
    private Equipment: string;
    private CreatedByUser: string;
    private LastChangedByUser: string;
    private AuthorizationGroup: string;
    private EquipmentCategory: string;
    private SizeOrDimensionText: string;
    private AssetManufacturerName: string;
    private ManufacturerCountry: string;
    private ManufacturerSerialNumber: string;
    private ManufacturerPartTypeName: string;
    private ConstructionYear: string;
    private ConstructionMonth: string;
    private EquipUsagePeriodSequenceNumber: string;
    private MaintObjectInternalID: string;
    private CreationDate: Date;
    private LastChangeDate: Date;
    private GrossWeight: string;
    private GrossWeightUnit: string;
    private AcquisitionDate: Date;
    private AcquisitionValue: string;
    private Currency: string;
    private OperationStartDate: Date;
    private OperationEndDate: Date;
    private EquipmentName: string;
    private MaintenancePlanningPlant: string;
    private ConstructionMaterial: string;
    private WorkCenterInternalID: string;
    private TechnicalObjectSortCode: string;
    private MaintObjectLocAcctAssgmtNmbr: string;
    private ValidityStartDate: Date;
    private ValidityEndTime: string;
    private ValidityEndDate: Date;
    private MaintObjectFreeDefinedAttrib: string;
    private VWMPartnerObjectNumber: string;
    private VWPartner: string;
    private Y1MPartnerObjectNumber: string;
    private Y1Partner: string;
    private Z3MPartnerObjectNumber: string;
    private Z3Partner: string;

    constructor(data?: EQUIPMENTType) {
        super();

        if (data) {
            this.Equipment = data.Equipment;
            this.CreatedByUser = data.CreatedByUser;
            this.LastChangedByUser = data.LastChangedByUser;
            this.AuthorizationGroup = data.AuthorizationGroup;
            this.EquipmentCategory = data.EquipmentCategory;
            this.SizeOrDimensionText = data.SizeOrDimensionText;
            this.AssetManufacturerName = data.AssetManufacturerName;
            this.ManufacturerCountry = data.ManufacturerCountry;
            this.ManufacturerSerialNumber = data.ManufacturerSerialNumber;
            this.ManufacturerPartTypeName = data.ManufacturerPartTypeName;
            this.ConstructionYear = data.ConstructionYear;
            this.ConstructionMonth = data.ConstructionMonth;
            this.EquipUsagePeriodSequenceNumber = data.EquipUsagePeriodSequenceNumber;
            this.MaintObjectInternalID = data.MaintObjectInternalID;
            this.CreationDate = data.CreationDate;
            this.LastChangeDate = data.LastChangeDate;
            this.GrossWeight = data.GrossWeight;
            this.GrossWeightUnit = data.GrossWeightUnit;
            this.AcquisitionDate = data.AcquisitionDate;
            this.AcquisitionValue = data.AcquisitionValue;
            this.Currency = data.Currency;
            this.OperationStartDate = data.OperationStartDate;
            this.OperationEndDate = data.OperationEndDate;
            this.EquipmentName = data.EquipmentName;
            this.MaintenancePlanningPlant = data.MaintenancePlanningPlant;
            this.ConstructionMaterial = data.ConstructionMaterial;
            this.WorkCenterInternalID = data.WorkCenterInternalID;
            this.TechnicalObjectSortCode = data.TechnicalObjectSortCode;
            this.MaintObjectLocAcctAssgmtNmbr = data.MaintObjectLocAcctAssgmtNmbr;
            this.ValidityStartDate = data.ValidityStartDate;
            this.ValidityEndTime = data.ValidityEndTime;
            this.ValidityEndDate = data.ValidityEndDate;
            this.MaintObjectFreeDefinedAttrib = data.MaintObjectFreeDefinedAttrib;
            this.VWMPartnerObjectNumber = data.VWMPartnerObjectNumber;
            this.VWPartner = data.VWPartner;
            this.Y1MPartnerObjectNumber = data.Y1MPartnerObjectNumber;
            this.Y1Partner = data.Y1Partner;
            this.Z3MPartnerObjectNumber = data.Z3MPartnerObjectNumber;
            this.Z3Partner = data.Z3Partner;
        }
    }
}