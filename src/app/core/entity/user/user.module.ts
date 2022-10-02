export interface user {
    email: string;
    password: string;
    name: string;
    lastName: string;
}

export interface userdb{
    email: string;
    name: string;
    lastName: string;
    roles: string;
    uid: string
}

export interface service{
    urlImage:string;
    title: string;
    detail: string;
}

export interface IUserData{
    roles:string,
    name: string,
    email:string,
    lastName: string,
    uid: string,
}

