import {
  ADD_NIN_TRUSTED_FACE_URL,
  DIMEC_STEP_URL,
  DIMEC_WEB_AUTH,
} from "../constants";
import { SELFSERVICE, VERIFICATION_TYPE } from "../enums";
import { IHandleProceed, IResponse } from "../types";
import { apiRequest, daonRequest, responseMessageHandler } from "../utils";
import {
  dimecData,
  dimecWebRegistration,
  selfieEvaluate,
  selfieRegistration,
} from "./dimec";

let loading = false;
let base64Url = "";
let dimecId = "";
let correlationId = "";
let existingUser = false;
let errorMessage = "";

// lets call this function to start selfie upload
const startSelfieRegistration = async ({
  dimecId,
  base64Url,
}: {
  dimecId: string;
  base64Url: string;
}) => {
  loading = true;
  try {
    await selfieRegistration({
      dimecId,
      fileBase64String: base64Url?.split(",")[1],
      fileExtension: "PNG",
    });
    loading = false;
    errorMessage = "";

    return {
      status: true,
      errorMessage,
    };
  } catch (error) {
    errorMessage = responseMessageHandler({ error });
    loading = false;

    return {
      status: false,
      errorMessage,
    };
  }
};

// we call this endpoint if there is an existing user
const dimecExisting = async ({
  dimecId,
  base64Url,
  channelID,
}: {
  dimecId: string;
  base64Url: string;
  channelID: string;
}): Promise<IResponse> => {
  loading = true;
  const payload = {
    channelID,
    dimecId,
    facialBase64String: base64Url,
  };
  try {
    const res = await daonRequest.post(DIMEC_WEB_AUTH, payload);
    loading = false;
    if (res?.data?.responseObject?.isFaceAuthenticated) {
      if (res?.data?.responseObject?.correlationId) {
        correlationId = res?.data?.responseObject?.correlationId;
      }
      // history.push(APP_PATHS.ONBOARDING_CREATE_PASSWORD, { authenticated: true, existing: true, ...state });
      existingUser = true;
      //   toggleShowModal();
      return {
        status: true,
        existing: existingUser,
        authenticated: true,
      };
    } else {
      //   toggleShowFailedModal();
      return {
        status: false,
        existing: existingUser,
        authenticated: false,
      };
    }
  } catch (error) {
    // showError(responseMessageHandler({ error }));
    correlationId = "";
    existingUser = false;
    loading = false;

    return {
      status: false,
      existing: existingUser,
      authenticated: false,
    };
  }
};

// this will check if user has an existing dimec record
const dimecStep = async ({
  channelID,
  bvn,
  nin,
  email,
  phoneNumber,
  useBVN = true,
}: {
  channelID: string;
  bvn: string;
  nin: string;
  email: string;
  phoneNumber: string;
  useBVN: boolean;
}): Promise<IResponse> => {
  loading = true;
  try {
    const response = await daonRequest.get(
      DIMEC_STEP_URL(encodeURIComponent(useBVN === false ? nin : bvn))
    );
    if (!response?.data?.responseObjectExists) {
      errorMessage = response?.data?.message;
    }
    if (response?.data?.responseObject.regStep === "Verify_Identity") {
      existingUser = true;
      dimecId = response?.data?.responseObject?.dimecID;
      loading = false;
      await dimecExisting(response?.data?.responseObject?.dimecID);
    }
    if (response?.data?.responseObject?.regStep === "Start_Registration") {
      existingUser = false;
      await dimecWebRegistration({
        bvn,
        channel: channelID,
        cif: "",
        device: 0,
        email,
        isSwitchDeviceChangePasswordOrALATPIN: false,
        nin,
        phoneNumber,
      });
      loading = false;
    }

    return {
      status: true,
      existing: existingUser,
      dimecId,
    };
  } catch (error) {
    dimecId = "";
    errorMessage = responseMessageHandler({ error });
    loading = false;

    return {
      status: false,
      dimecId,
      errorMessage,
    };
  }
};

// lets call this function to evaluate selfie with bvn
const evaluateSelfie = async () => {
  loading = true;
  try {
    await selfieEvaluate({
      dimecId: dimecData?.data?.responseObject?.dimecId,
      reason: SELFSERVICE.NotAvailable,
    });
    loading = false;
    errorMessage = "";

    return {
      status: true,
      errorMessage,
    };
  } catch (error) {
    loading = false;
    errorMessage = responseMessageHandler({ error });

    return {
      status: false,
      errorMessage,
    };
  }
};

const handleProceed = async ({
  verification,
  correlationId,
  nin,
  useBVN = true,
}: {
  verification: VERIFICATION_TYPE;
  correlationId: string;
  nin: string;
  useBVN: boolean;
}): Promise<IHandleProceed> => {
  try {
    // toggleShowModal();
    loading = true;
    let redirectUrl = "";

    if (
      verification === VERIFICATION_TYPE.Nin ||
      verification === VERIFICATION_TYPE.PhoneNumber
    ) {
      if (useBVN !== false) {
        const response = await apiRequest.post(ADD_NIN_TRUSTED_FACE_URL, {
          biometricCorrelationID: correlationId,
          nin,
        });

        if (response.status !== 200) {
          //   return showError(response.data.message);
          return {
            status: false,
            errorMessage: response?.data?.message || "",
          };
        }
      }

      //   redirectUrl =
      //     useBVN === false
      //       ? APP_PATHS.ONBOARDING_CREATE_PASSWORD
      //       : APP_PATHS.ONBOARDING_ADD_ADDRESS;
      return {
        status: true,
      };
    } else {
      //   redirectUrl = APP_PATHS.ONBOARDING_SELECT_ACCOUNT_OPTION;
    }
    loading = false;

    // return history.push(redirectUrl, {
    //   ...state,
    //   authenticated: true,
    //   dimecId,
    //   existing: existingUser,
    // });
    return {
      status: true,
      authenticated: true,
      dimecId,
      existing: existingUser,
    };
  } catch (error: any) {
    loading = false;

    if (
      error?.response?.data?.message?.includes("000") ||
      error?.response?.data?.message?.includes("001")
    ) {
      //   setErrorMessage(error?.response?.data?.message?.split(" - ")?.[0] || "");
      //   setErrorCode(error?.response?.data?.message?.split(" - ")?.[1] || "");
      //   return toggleShowSkipModal();
      return {
        status: false,
        errorCode: error?.response?.data?.message?.split(" - ")?.[1] || "",
        errorMessage: error?.response?.data?.message?.split(" - ")?.[0] || "",
      };
    }
    // return showError(responseMessageHandler({ error }));
    return {
      status: false,
      errorMessage: responseMessageHandler({ error }),
    };
  }
};

export {
  loading as onboardingLoading,
  base64Url,
  dimecId,
  correlationId,
  existingUser,
  errorMessage as onboardingErrorMessage,
  startSelfieRegistration,
  dimecExisting,
  dimecStep,
  evaluateSelfie,
  handleProceed,
};
