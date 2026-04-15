import { LOCATION_STATUS } from "@/constants/status";
import { LocationStatus } from "@/types/status";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface LocationState {
  coords: { latitude: number; longitude: number } | null;
  status: LocationStatus;
}

export function useLocation(): LocationState {
  const [state, setState] = useState<LocationState>({
    coords: null,
    status: LOCATION_STATUS.PENDING,
  });

  useEffect(() => {
    (async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setState({
          coords: { latitude: coords.latitude, longitude: coords.longitude },
          status: LOCATION_STATUS.GRANTED,
        });
      } catch (err) {
        console.error("위치 조회 실패:", err);
        setState({ coords: null, status: LOCATION_STATUS.DENIED });
      }
    })();
  }, []);

  return state;
}
