export type Patient = {
  name: string;
  email: string;
  password: string;
};

export type Doctor = {
  name: string;
  email: string;
  password: string;
  h_id: string;
  hospital: string;
  specialization: string;
};
export type Admin = {
  name: string;
  email: string;
  password: string;
  hospital: string;
  h_id: string;
};
export type DiagnosticCenter = {
  name: string;
  email: string;
  password: string;
  specialization: string;
  phoneNumber: number;
  location: string;
};

export type InsuranceProvider = {
  name: string;
  email: string;
  password: string;
  location: string;
}

export enum UserRole {
  PATIENT = "patient",
  DOCTOR = "doctor",
  DIAGNOSTIC_CENTER = "diagnostic_center",
  // ADMIN = "admin",
  INSURANCE_COMPANY = "insurance_provider"
}

export interface Appointment {
  id?: string;
  patientId: string;
  doctorId?: string;
  diagnosticCenterId?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  name?: string;
}

export type appointment = Appointment;

export type UserByRole = Patient | Doctor | DiagnosticCenter | Admin | InsuranceProvider;
