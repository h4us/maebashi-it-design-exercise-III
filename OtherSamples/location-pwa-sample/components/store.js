import create from 'zustand';

const useStore = create((set) => ({
  activeView: 0,
  now: Date.now(),
  toggleAnimationView: () => set((state) => ({ activeView: (state.activeView != 1 ? 1 : 0) })),
  popAnimationView: () => set({ activeView: 1 }),
  toggleArchiveView: () => set((state) => ({ activeView: (state.activeView != 2 ? 2 : 0) })),
  updateNow: () => set({ now: Date.now() }),
  neaestMarker: null,
  setNearestMarker: (m) => set({ nearestMarker: m }),
}));

export default useStore;
