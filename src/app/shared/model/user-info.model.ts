/**
 * 用户信息模型
 */
export interface UserInfo {
    description?: string;
    id?: string;
    isAdmin?: boolean;
    isLocked?: boolean;
    manageDomainId?: string;
    password?: string;
    roleType?: string;
    staffName?: string;
    staffNum?: string;
    userName: string;
    groupIds?: Array<number>;
}
