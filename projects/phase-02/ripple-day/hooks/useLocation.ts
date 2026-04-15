import { useState, useEffect } from "react";
import * as Location from "expo-location";

export type LocationPermissionStatus = "undetermined" | "granted" | "denied";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// 서울시청 기본 좌표 (권한 미허용 시 fallback)
const DEFAULT_COORDS: Coordinates = {
  latitude: 37.5665,
  longitude: 126.978,
};

async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const [result] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (result) {
      const district = result.district ?? result.subregion ?? "";
      const city = result.city ?? result.region ?? "";
      return district ? `${city} ${district}` : city || "알 수 없는 위치";
    }
  } catch {}
  return "서울";
}

export function useLocation() {
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("undetermined");
  const [isChecking, setIsChecking] = useState(true);
  const [coords, setCoords] = useState<Coordinates>(DEFAULT_COORDS);
  const [locationName, setLocationName] = useState("서울");

  useEffect(() => {
    Location.getForegroundPermissionsAsync()
      .then(async ({ status }) => {
        if (status === "granted") {
          setPermissionStatus("granted");
          const location = await Location.getLastKnownPositionAsync();
          if (location) {
            const { latitude, longitude } = location.coords;
            setCoords({ latitude, longitude });
            setLocationName(await reverseGeocode(latitude, longitude));
          }
        } else if (status === "denied") {
          setPermissionStatus("denied");
        }
        setIsChecking(false);
      })
      .catch(() => {
        setPermissionStatus("denied");
        setIsChecking(false);
      });
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const granted = status === "granted";
    setPermissionStatus(granted ? "granted" : "denied");
    if (granted) {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;
      setCoords({ latitude, longitude });
      setLocationName(await reverseGeocode(latitude, longitude));
    }
    return granted;
  };

  return { permissionStatus, isChecking, coords, locationName, requestPermission };
}
