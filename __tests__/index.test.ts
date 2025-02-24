import { responseMessageHandler } from "../src/utils";

// jest.mock("../../helpers/toastNotify", () => ({
//   ToastNotify: jest.fn(),
// }));
describe("responseMessageHandler", () => {
  it("should return the appropriate response success message", () => {
    const response = {
      status: 200,
      data: {
        httpStatusCode: 200,
        responseCode: 1,
        responseMessage: {
          title: "Success",
          actionMessage: null,
        },
        hasError: false,
        data: "Success",
      },
    };

    const result = responseMessageHandler({ response });
    expect(result).toBe("Success");
  });
});
