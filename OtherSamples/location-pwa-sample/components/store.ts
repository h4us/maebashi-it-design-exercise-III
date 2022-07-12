import create from 'zustand';

interface LeafletLatLng {
  lat: number,
  lng: number
}

interface Marker {
  location: LeafletLatLng,
  name: string,
  media: string
}

interface State {
  activeView: number,
  now: number,
  nearestMarker: Marker | null,
  //
  toggleAnimationView: () => void,
  popAnimationView: () => void,
  toggleArchiveView: () => void,
  updateNow: () => void,
  setNearestMarker: (m: Marker | null) => void,
}

const useStore = create<State>((set) => ({
  activeView: 0,
  now: Date.now(),
  nearestMarker: null,
  //
  toggleAnimationView: () => set((state: State) => ({ activeView: (state.activeView != 1 ? 1 : 0) })),
  popAnimationView: () => set({ activeView: 1 }),
  toggleArchiveView: () => set((state: State) => ({ activeView: (state.activeView != 2 ? 2 : 0) })),
  updateNow: () => set({ now: Date.now() }),
  setNearestMarker: (m: Marker | null) => set({ nearestMarker: m }),
}));

export default useStore;
