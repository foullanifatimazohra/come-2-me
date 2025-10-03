"use client";

import { useState, useCallback } from "react";

export default function useGeolocationAddress() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // ✅ Reverse geocode coordinates to address
  const fetchAddress = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          {
            headers: {
              "User-Agent": "ur-docto/1.0 (contact@yourapp.com)",
            },
          }
        );

        if (!response.ok) throw new Error("Erreur API Nominatim");

        const data = await response.json();

        if (data?.display_name) {
          setAddress(data.display_name);
          setLatlng({ lat: latitude, lng: longitude }); // ✅ store coords
        } else {
          setError("Adresse introuvable");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération de l’adresse");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ✅ Trigger geolocation
  const getMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n’est pas supportée par votre navigateur.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchAddress(latitude, longitude);
      },
      (err) => {
        console.error("Erreur géolocalisation:", err);
        setError("Impossible de récupérer votre position.");
        setLoading(false);
      }
    );
  }, [fetchAddress]);

  // ✅ return coords + address
  return { address, latlng, error, loading, getMyLocation };
}
