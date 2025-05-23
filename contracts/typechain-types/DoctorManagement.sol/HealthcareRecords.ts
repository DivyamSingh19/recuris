/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace HealthcareRecords {
  export type PrescriptionStruct = {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: BigNumberish;
    endDate: BigNumberish;
    doctorAddress: AddressLike;
    isActive: boolean;
  };

  export type PrescriptionStructOutput = [
    medication: string,
    dosage: string,
    frequency: string,
    startDate: bigint,
    endDate: bigint,
    doctorAddress: string,
    isActive: boolean
  ] & {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: bigint;
    endDate: bigint;
    doctorAddress: string;
    isActive: boolean;
  };

  export type HealthRecordStruct = {
    recordHash: string;
    timestamp: BigNumberish;
    doctorAddress: AddressLike;
    isActive: boolean;
  };

  export type HealthRecordStructOutput = [
    recordHash: string,
    timestamp: bigint,
    doctorAddress: string,
    isActive: boolean
  ] & {
    recordHash: string;
    timestamp: bigint;
    doctorAddress: string;
    isActive: boolean;
  };
}

export interface HealthcareRecordsInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "authorizeDocterForPatient"
      | "authorizeDoctor"
      | "createPrescription"
      | "deauthorizeDoctor"
      | "deauthorizeDoctorForPatient"
      | "getPatientPrescriptions"
      | "viewMyPrescriptions"
      | "viewMyRecords"
      | "viewPatientRecords"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "PrescriptionAdded" | "RecordViewed"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "authorizeDocterForPatient",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizeDoctor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createPrescription",
    values: [AddressLike, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deauthorizeDoctor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deauthorizeDoctorForPatient",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPatientPrescriptions",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "viewMyPrescriptions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "viewMyRecords",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "viewPatientRecords",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeDocterForPatient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizeDoctor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createPrescription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deauthorizeDoctor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deauthorizeDoctorForPatient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPatientPrescriptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewMyPrescriptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewMyRecords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewPatientRecords",
    data: BytesLike
  ): Result;
}

export namespace PrescriptionAddedEvent {
  export type InputTuple = [
    doctor: AddressLike,
    patient: AddressLike,
    medication: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    doctor: string,
    patient: string,
    medication: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    doctor: string;
    patient: string;
    medication: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RecordViewedEvent {
  export type InputTuple = [
    doctor: AddressLike,
    patient: AddressLike,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    doctor: string,
    patient: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    doctor: string;
    patient: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface HealthcareRecords extends BaseContract {
  connect(runner?: ContractRunner | null): HealthcareRecords;
  waitForDeployment(): Promise<this>;

  interface: HealthcareRecordsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  authorizeDocterForPatient: TypedContractMethod<
    [doctor: AddressLike],
    [void],
    "nonpayable"
  >;

  authorizeDoctor: TypedContractMethod<
    [doctor: AddressLike],
    [void],
    "nonpayable"
  >;

  createPrescription: TypedContractMethod<
    [
      patient: AddressLike,
      medication: string,
      dosage: string,
      frequency: string,
      durationDays: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  deauthorizeDoctor: TypedContractMethod<
    [doctor: AddressLike],
    [void],
    "nonpayable"
  >;

  deauthorizeDoctorForPatient: TypedContractMethod<
    [doctor: AddressLike],
    [void],
    "nonpayable"
  >;

  getPatientPrescriptions: TypedContractMethod<
    [patient: AddressLike],
    [HealthcareRecords.PrescriptionStructOutput[]],
    "view"
  >;

  viewMyPrescriptions: TypedContractMethod<
    [],
    [HealthcareRecords.PrescriptionStructOutput[]],
    "view"
  >;

  viewMyRecords: TypedContractMethod<
    [],
    [HealthcareRecords.HealthRecordStructOutput[]],
    "view"
  >;

  viewPatientRecords: TypedContractMethod<
    [patient: AddressLike],
    [HealthcareRecords.HealthRecordStructOutput[]],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "authorizeDocterForPatient"
  ): TypedContractMethod<[doctor: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "authorizeDoctor"
  ): TypedContractMethod<[doctor: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createPrescription"
  ): TypedContractMethod<
    [
      patient: AddressLike,
      medication: string,
      dosage: string,
      frequency: string,
      durationDays: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "deauthorizeDoctor"
  ): TypedContractMethod<[doctor: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deauthorizeDoctorForPatient"
  ): TypedContractMethod<[doctor: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getPatientPrescriptions"
  ): TypedContractMethod<
    [patient: AddressLike],
    [HealthcareRecords.PrescriptionStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "viewMyPrescriptions"
  ): TypedContractMethod<
    [],
    [HealthcareRecords.PrescriptionStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "viewMyRecords"
  ): TypedContractMethod<
    [],
    [HealthcareRecords.HealthRecordStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "viewPatientRecords"
  ): TypedContractMethod<
    [patient: AddressLike],
    [HealthcareRecords.HealthRecordStructOutput[]],
    "nonpayable"
  >;

  getEvent(
    key: "PrescriptionAdded"
  ): TypedContractEvent<
    PrescriptionAddedEvent.InputTuple,
    PrescriptionAddedEvent.OutputTuple,
    PrescriptionAddedEvent.OutputObject
  >;
  getEvent(
    key: "RecordViewed"
  ): TypedContractEvent<
    RecordViewedEvent.InputTuple,
    RecordViewedEvent.OutputTuple,
    RecordViewedEvent.OutputObject
  >;

  filters: {
    "PrescriptionAdded(address,address,string,uint256)": TypedContractEvent<
      PrescriptionAddedEvent.InputTuple,
      PrescriptionAddedEvent.OutputTuple,
      PrescriptionAddedEvent.OutputObject
    >;
    PrescriptionAdded: TypedContractEvent<
      PrescriptionAddedEvent.InputTuple,
      PrescriptionAddedEvent.OutputTuple,
      PrescriptionAddedEvent.OutputObject
    >;

    "RecordViewed(address,address,uint256)": TypedContractEvent<
      RecordViewedEvent.InputTuple,
      RecordViewedEvent.OutputTuple,
      RecordViewedEvent.OutputObject
    >;
    RecordViewed: TypedContractEvent<
      RecordViewedEvent.InputTuple,
      RecordViewedEvent.OutputTuple,
      RecordViewedEvent.OutputObject
    >;
  };
}
