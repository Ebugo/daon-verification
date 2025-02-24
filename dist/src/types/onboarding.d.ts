interface IResponse {
    errorCode?: string;
    errorMessage?: string;
    status: boolean;
    authenticated?: boolean;
    dimecId?: string;
    existing?: boolean;
}
interface IHandleProceed extends IResponse {
    shouldSkip?: boolean;
}
export { type IResponse, type IHandleProceed };
