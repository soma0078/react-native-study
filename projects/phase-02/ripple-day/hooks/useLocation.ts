import { useState, useEffect } from "react";
import * as Location from "expo-location";

export type LocationPermissionStatus = "undetermined" | "granted" | "denied";

export function useLocation() {
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("undetermined");
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => {
      if (status === "granted") {
        setPermissionStatus("granted");
      } else if (status === "denied") {
        setPermissionStatus("denied");
      }
      setIsChecking(false);
    });
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const granted = status === "granted";
    setPermissionStatus(granted ? "granted" : "denied");
    return granted;
  };

  return { permissionStatus, isChecking, requestPermission };
}
