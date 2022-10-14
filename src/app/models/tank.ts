export interface ITank {
    _id?: string,
    id?: string,
    type: string,
    area: string | number,
    date_start: string | number,
    cycle: string | number,
    fish_start: string | number,
    weight_start: string | number,
    food_cycle?: string | number,
    date_end?: string | number,
    fish_end?: string | number,
    weight_end?: string | number,
    create_at?: string | number,
    update_at?: string | number,
    food?: object,
    revenue?: Array<any>,
    expenses?: object
}