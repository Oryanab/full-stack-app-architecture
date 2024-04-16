type ApiMapPathType =
    | 'Register'
    | 'Login'
    | 'GetSession'
    | 'GetUsersGeneral'
    | 'GetUsersOrganization'
    | 'CreateOrganiztion'
    | 'GetOrganizations'
    | 'GetOrganization'
    | 'ToggleOrganiztion'
    | 'EditOrganization'
    | 'CreateCategory'
    | 'GetCategories'
    | 'GetCategory'
    | 'DeleteCategory'
    | 'EditCategory'
    | 'CreateAnnouncement'
    | 'GetAnnouncements'
    | 'GetAnnouncement'
    | 'DeleteAnnouncement'
    | 'EditAnnouncement';

type ApiMapPath = Record<ApiMapPathType, (...rest: any[]) => string>;

export const API_MAP: ApiMapPath = {
    /*
        User Management
    */
    Login: () => `api/login`,
    Register: () => `api/register`,
    GetSession: () => `api/session`,
    GetUsersGeneral: () => `api/users/general`,
    GetUsersOrganization: () => `api/users/organization`,

    /*
        Orgnizations
    */
    CreateOrganiztion: () => `api/orgnizations`,
    GetOrganizations: () => `api/orgnizations`,
    GetOrganization: (id: string) => `api/orgnizations/${id}`,
    ToggleOrganiztion: (id: string) => `api/orgnizations/${id}`,
    EditOrganization: (id: string) => `api/orgnizations/${id}`,

    /*
        Categories
    */
    CreateCategory: () => `api/categories`,
    GetCategories: () => `api/categories`,
    GetCategory: (id: string) => `api/categories/${id}`,
    DeleteCategory: (id: string) => `api/categories/${id}`,
    EditCategory: (id: string) => `api/categories/${id}`,

    /*
        Announcements
    */
    CreateAnnouncement: () => `api/announcements`,
    GetAnnouncements: () => `api/announcements`,
    GetAnnouncement: (id: string) => `api/announcements/${id}`,
    DeleteAnnouncement: (id: string) => `api/announcements/${id}`,
    EditAnnouncement: (id: string) => `api/announcements/${id}`
};
