"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { BASE_LAT, BASE_LNG, type Restaurant } from "@/lib/data"

function makeIcon(color: string, active: boolean) {
  const size = active ? 42 : 34
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;transform:translate(-50%,-100%);
      display:flex;align-items:center;justify-content:center;
    ">
      <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="white" stroke-width="1.5">
        <path d="M12 2C7.8 2 4.5 5.3 4.5 9.5c0 5.2 6.3 11.3 7 11.9.3.3.8.3 1.1 0 .7-.6 7-6.7 7-11.9C19.5 5.3 16.2 2 12 2z"/>
        <circle cx="12" cy="9.5" r="3" fill="white"/>
      </svg>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [0, 0],
  })
}

function MapController({
  center,
  selectedId,
  restaurants,
}: {
  center: [number, number]
  selectedId: string | null
  restaurants: Restaurant[]
}) {
  const map = useMap()
  useEffect(() => {
    // Container may not have full dimensions on first paint.
    const timers = [0, 150, 400, 800].map((t) =>
      setTimeout(() => map.invalidateSize(), t),
    )
    const onResize = () => map.invalidateSize()
    window.addEventListener("resize", onResize)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("resize", onResize)
    }
  }, [map])
  useEffect(() => {
    if (selectedId) {
      const r = restaurants.find((x) => x.id === selectedId)
      if (r) map.flyTo([r.lat, r.lng], 16, { duration: 0.6 })
    } else {
      map.flyTo(center, 15, { duration: 0.6 })
    }
  }, [selectedId, center, restaurants, map])
  return null
}

export default function RestaurantMap({
  restaurants,
  selectedId,
  onSelect,
}: {
  restaurants: Restaurant[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const center: [number, number] = [BASE_LAT, BASE_LNG]

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: "#e8e4dc" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* Current location marker */}
      <Marker
        position={center}
        icon={L.divIcon({
          className: "",
          html: `<div style="transform:translate(-50%,-50%);">
            <div style="width:18px;height:18px;border-radius:9999px;background:#2563eb;border:3px solid white;box-shadow:0 0 0 4px rgba(37,99,235,.25)"></div>
          </div>`,
          iconSize: [18, 18],
          iconAnchor: [0, 0],
        })}
      >
        <Popup>현재 위치</Popup>
      </Marker>

      {restaurants.map((r) => {
        const active = r.id === selectedId
        return (
          <Marker
            key={r.id}
            position={[r.lat, r.lng]}
            icon={makeIcon(active ? "#e8563f" : "#FF6B6B", active)}
            eventHandlers={{ click: () => onSelect(r.id) }}
          >
            <Popup>
              <div style={{ minWidth: 140 }}>
                <strong style={{ fontSize: 14 }}>{r.name}</strong>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  ⭐ {r.rating} · {r.distance}m · {r.price}
                </div>
                <a
                  href={`https://map.kakao.com/link/search/${encodeURIComponent(
                    r.name,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: "#e8563f", fontWeight: 700 }}
                >
                  길찾기 →
                </a>
              </div>
            </Popup>
          </Marker>
        )
      })}

      <MapController
        center={center}
        selectedId={selectedId}
        restaurants={restaurants}
      />
    </MapContainer>
  )
}
