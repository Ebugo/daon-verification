const ADD_NIN_TRUSTED_FACE_URL = "/v2/Onboarding/add/nin/trusted_face";
const DIMEC_WEB_REG = "/WebReg/User";
const DIMEC_WEB_SELFIE_EVALUATION = "/WebReg/evaluate/bvn";
const DIMEC_WEB_SELFIE_REG = "/WebReg/selfie";
const  DIMEC_WEB_AUTH = "/Identity/authenticate/web";
const  DIMEC_STEP_URL = (uniqueIdentifier:string) => `/Registration/step/identifier/${uniqueIdentifier}/imei/web`;

export {
  ADD_NIN_TRUSTED_FACE_URL,
  DIMEC_WEB_REG,
  DIMEC_WEB_SELFIE_EVALUATION,
  DIMEC_WEB_SELFIE_REG,
  DIMEC_WEB_AUTH,DIMEC_STEP_URL
};
