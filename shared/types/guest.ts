export interface IGuest {
    id?: string;
    wedding_id: string;
    group_id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    invitation_code: string;
    remark: string;
    is_invited?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export type IUpsertGuestRequest = Omit<IGuest, 'created_at' | 'updated_at'>;

export class GuestResponse implements IGuest {
    id?: string;
    wedding_id: string;
    group_id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    invitation_code: string;
    remark: string;
    is_invited?: boolean;
    created_at?: Date;
    updated_at?: Date;
    row_number?: number;
    total_page: number;
    current_page: number;

    constructor(data: IGuest & { row_number?: number, total_page: number, current_page: number }) {
        this.id = data.id;
        this.wedding_id = data.wedding_id;
        this.group_id = data.group_id;
        this.name = data.name;
        this.title = data.title;
        this.phone = data.phone;
        this.email = data.email;
        this.invitation_code = data.invitation_code;
        this.remark = data.remark;
        this.is_invited = data.is_invited;
        this.created_at = data.created_at ? new Date(data.created_at) : undefined;
        this.updated_at = data.updated_at ? new Date(data.updated_at) : undefined;
        this.row_number = data.row_number;
        this.total_page = data.total_page;
        this.current_page = data.current_page;
    }
}