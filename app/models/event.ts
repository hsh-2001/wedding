import datetimeFormatHelper from "../utils/datetimeFormatHelper";

export interface IWeddingEventList {
    id: string; // UUID
    company_id: number;
    bride_name?: string;
    groom_name?: string;
    wedding_date?: Date;
    venue_name?: string;
    venue_address?: string;
    description?: string;
    event_name?: string;
    event_date?: Date;
    location?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class WeddingEventList implements IWeddingEventList {
    id: string;
    company_id: number;
    bride_name?: string;
    groom_name?: string;
    wedding_date?: Date;
    venue_name?: string;
    venue_address?: string;
    description?: string;
    event_name?: string;
    event_date?: Date;
    location?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data: IWeddingEventList) {
        this.id = data.id;
        this.company_id = data.company_id;
        this.bride_name = data.bride_name;
        this.groom_name = data.groom_name;
        this.wedding_date = data.wedding_date;
        this.venue_name = data.venue_name;
        this.venue_address = data.venue_address;
        this.description = data.description;
        this.event_name = data.event_name;
        this.event_date = data.event_date;
        this.location = data.location;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    get getWeddingDateForDisplay(): string {
        return datetimeFormatHelper.dateForDisplay(this.wedding_date || '');
    }
}