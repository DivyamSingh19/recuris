export type Patient={
    name: string,
    email:string,
    password: string
}

export type Doctor={ 
    name : string,
    email :string,
    password:string
    h_id :string ,
    hospital : string,
    specialization :string
}
export type Admin={
    name : string,
    email :string,
    password:string,
    hospital : string,
    h_id :string
}
export type DiagnosticCenter = {
    name : string,
    email : string,
    password : string,
    specialization : string
    phoneNumber : number
    location :string
}

export enum UserRole {
    PATIENT = "patient",
    DOCTOR = "doctor",
    DIAGNOSTIC_CENTER = "diagnostic center",
    ADMIN = "admin",
}

export type UserByRole = Patient | Doctor | DiagnosticCenter | Admin;