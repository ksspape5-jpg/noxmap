import type { FloodReport } from "./types";

// Données de démonstration, en attendant une vraie source de signalements.
export const DEMO_PHOTO_URL =
  "https://images.unsplash.com/photo-1569103470612-0414542f9355?auto=format&fit=crop&w=720&q=75";

export const reports: FloodReport[] = [
  { id: 1, place: "Keur Massar", detail: "Unité 14, route de Jaxaay", time: "il y a 8 min", level: "waist", lat: 14.786, lng: -17.311, confirms: 3, photo: true },
  { id: 2, place: "Pikine", detail: "Rue 10, près du marché", time: "il y a 12 min", level: "knee", lat: 14.755, lng: -17.391, confirms: 2, photo: false },
  { id: 3, place: "Thiaroye", detail: "Route de la gare", time: "il y a 24 min", level: "ankle", lat: 14.746, lng: -17.36, confirms: 1, photo: false },
  { id: 4, place: "Guédiawaye", detail: "Cité Cheikh Wade", time: "il y a 37 min", level: "knee", lat: 14.775, lng: -17.411, confirms: 4, photo: true },
  { id: 5, place: "Rufisque", detail: "Canal de l'Ouest", time: "il y a 2 h", level: "waist", lat: 14.72, lng: -17.27, confirms: 5, photo: false },
  { id: 6, place: "Diamaguène", detail: "Route des Niayes", time: "il y a 3 h", level: "ankle", lat: 14.766, lng: -17.346, confirms: 2, photo: false },
];
