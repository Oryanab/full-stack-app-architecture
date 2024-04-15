export const enum UserRole {
    USER = 'user',
    OWNER = 'owner',
    ADMIN = 'admin'
}

export const enum OrganizationPlan {
    BRONZE = 'bronze',
    SILVER = 'silver',
    GOLD = 'gold'
}

export const enum CategoryPriority {
    HIGH = 'high',
    MEDIUN = 'medium',
    LOW = 'low'
}

export interface User {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    verified: boolean;
    restrict: boolean;
}

export interface Organization {
    organization_name: string;
    organization_logo: string;
    organization_domain: string;
    organization_plan: OrganizationPlan;
    organization_owner: string;
    max_users: number;
    organization_telephone: string;
    organization_support_email: string;
    enabled: boolean;
}

export interface Call {
    caller_name: string;
    caller_telephone: string;
    call_desciption: string;
    caller_voice_note?: string;
}

export interface Announcement {
    announcement_title: string;
    announcement_description: string;
}

export interface Category {
    category_name: string;
    category_description: string;
    category_priority: CategoryPriority;
}
