import { VERIFICATION_TYPE } from "../enums";
import { IHandleProceed, IResponse } from "../types";
declare let loading: boolean;
declare let base64Url: string;
declare let dimecId: string;
declare let correlationId: string;
declare let existingUser: boolean;
declare let errorMessage: string;
declare const startSelfieRegistration: ({ dimecId, base64Url, }: {
    dimecId: string;
    base64Url: string;
}) => Promise<{
    status: boolean;
    errorMessage: string;
}>;
declare const dimecExisting: ({ dimecId, base64Url, channelID, }: {
    dimecId: string;
    base64Url: string;
    channelID: string;
}) => Promise<IResponse>;
declare const dimecStep: ({ channelID, bvn, nin, email, phoneNumber, useBVN, }: {
    channelID: string;
    bvn: string;
    nin: string;
    email: string;
    phoneNumber: string;
    useBVN: boolean;
}) => Promise<IResponse>;
declare const evaluateSelfie: () => Promise<{
    status: boolean;
    errorMessage: string;
}>;
declare const handleProceed: ({ verification, correlationId, nin, useBVN, }: {
    verification: VERIFICATION_TYPE;
    correlationId: string;
    nin: string;
    useBVN: boolean;
}) => Promise<IHandleProceed>;
export { loading as onboardingLoading, base64Url, dimecId, correlationId, existingUser, errorMessage as onboardingErrorMessage, startSelfieRegistration, dimecExisting, dimecStep, evaluateSelfie, handleProceed, };
//# sourceMappingURL=onboarding.d.ts.map