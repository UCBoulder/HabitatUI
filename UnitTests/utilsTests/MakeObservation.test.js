import { sendLocationPin } from "../../utils/APICalls";
import { makeObservation } from "../../utils/MakeObservation";
import Geolocation from "react-native-geolocation-service"; // something is wrong with jest and the import 

// Mock the Geolocation module
jest.mock("react-native-geolocation-service");

// Mock the sendLocationPin function
jest.mock("../../utils/APICalls", () => ({
  sendLocationPin: jest.fn(),
}));

describe("makeObservation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should set user location and call sendLocationPin", () => {
    const setUserLocationMock = jest.fn();
    const text = "Your observation text";

    // Set a mock position for getCurrentPosition
    const mockPosition = {
      coords: {
        latitude: 123,
        longitude: 456,
      },
    };

    // Mock the getCurrentPosition function to call the success callback with the mock position
    Geolocation.getCurrentPosition.mockImplementationOnce((successCallback) => {
      successCallback(mockPosition);
    });

    // Call the makeObservation function
    makeObservation(setUserLocationMock, text);

    // Verify that setUserLocation was called with the mock position
    expect(setUserLocationMock).toHaveBeenCalledWith(mockPosition);

    // Verify that sendLocationPin was called with the mock position and text
    expect(sendLocationPin).toHaveBeenCalledWith(mockPosition, text);
  });
});
