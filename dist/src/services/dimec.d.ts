declare let selfieEvaluationData: null;
declare let selfieRegistrationData: null;
declare let loading: boolean;
declare let errorMessage: string;
declare let dimecError: null;
declare let dimecData: any;
declare const dimecWebRegistration: (payload: any) => Promise<void>;
declare const selfieEvaluate: (payload: any) => Promise<void>;
declare const selfieRegistration: (payload: any) => Promise<void>;
declare const clearDimecError: () => null;
declare const clearData: () => void;
declare const clearErrors: () => void;
export { selfieEvaluationData, selfieRegistrationData, loading, errorMessage, dimecError, dimecData, dimecWebRegistration, selfieEvaluate, selfieRegistration, clearDimecError, clearData, clearErrors, };
//# sourceMappingURL=dimec.d.ts.map