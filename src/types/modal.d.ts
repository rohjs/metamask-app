export enum ModalType {
  ImportTokenSuccess = 'ImportTokenSuccess',
  ImportTokenFail = 'ImportTokenFail',
  TransactionCanceled = 'TransactionCanceled',
  TransactionSubmitted = 'TransactionSubmitted',
}

export type Modal = {
  type: ModalType
  props?: any
}
