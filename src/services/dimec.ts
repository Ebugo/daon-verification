import {
  DIMEC_WEB_REG,
  DIMEC_WEB_SELFIE_EVALUATION,
  DIMEC_WEB_SELFIE_REG,
} from "../constants";
import { daonRequest } from "../utils";

let selfieEvaluationData = null;
let selfieRegistrationData = null;
let loading = false;
let errorMessage = "";
let dimecError = null;
let dimecData: any = null;

// start dimec registration
const dimecWebRegistration = async (payload: any) => {
  loading = true;
  try {
    const response = await daonRequest.post(DIMEC_WEB_REG, payload);
    dimecData = response;
    loading = false;
  } catch (error) {
    dimecError = error;
    // showError(responseMessageHandler({ error }));
    loading = false;
  }
};

// evaluate selfie with bvn provided
const selfieEvaluate = async (payload: any) => {
  loading = true;
  try {
    const response = await daonRequest.post(
      DIMEC_WEB_SELFIE_EVALUATION,
      payload
    );
    dimecData = null;
    selfieRegistrationData = null;
    selfieEvaluationData = response;
    loading = false;
  } catch (error) {
    loading = false;
    // showError(responseMessageHandler({ error }));
    // setError(error);
  }
};

// upload selfie provided
const selfieRegistration = async (payload: any) => {
  loading = true;
  try {
    const response = await daonRequest.post(DIMEC_WEB_SELFIE_REG, payload);
    selfieRegistrationData = response;
    loading = false;
  } catch (error) {
    // setError(error);
    // showError(responseMessageHandler({ error }));
    loading = false;
  }
};

const clearDimecError = () => (dimecError = null);

const clearData = () => {
  selfieEvaluationData = null;
  selfieRegistrationData = null;
  dimecData = null;
};

const clearErrors = () => {
  dimecError = null;
  errorMessage = "";
};

export {
  selfieEvaluationData,
  selfieRegistrationData,
  loading,
  errorMessage,
  dimecError,
  dimecData,
  dimecWebRegistration,
  selfieEvaluate,
  selfieRegistration,
  clearDimecError,
  clearData,
  clearErrors,
};
