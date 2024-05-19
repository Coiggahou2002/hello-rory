export namespace Profile {
    export type TechStackConfig = TechStackField[];
    export interface TechStackField {
        title: string;
        tags: TechStackItemTag[];
    }
    export interface TechStackItemTag {
        text: string;
        icon: string;
    }
}

export namespace Navigations {
    export interface NavItem {
        text: string;
        to: string;
    }
}