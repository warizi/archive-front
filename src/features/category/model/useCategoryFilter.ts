import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkspaceId = string;
type CategoryMap = Record<WorkspaceId, number[]>;
const DEFAULT_WS = "__default__";

interface CategoryFilterState {
  byWs: CategoryMap;                 // 핵심: 워크스페이스별 선택 목록
  activeWsId: WorkspaceId | null;    // 현재 활성 워크스페이스

  // 조회(파생)
  getSelectedCategories: () => number[];
  isSelectedCategory: (category: number) => boolean;

  // 조작(활성 워크스페이스 대상)
  setWorkspace: (id: WorkspaceId | null) => void;
  addSelectedCategory: (category: number) => void;
  removeSelectedCategory: (category: number) => void;
  removeDirtyCategories: (valid: number[]) => void;
  replaceSelectedCategories: (categories: number[]) => void;

  // // 관리
  // clearWorkspace: (id?: WorkspaceId) => void; // 해당 워크스페이스 키 삭제
}

export const useCategoryFilter = create<CategoryFilterState>()(
  persist(
    (set, get) => ({
      byWs: {},
      activeWsId: null,

      getSelectedCategories: () => {
        const { byWs, activeWsId } = get();
        const key = activeWsId ?? DEFAULT_WS;
        return byWs[key] ?? [];
      },

      isSelectedCategory: (category) => {
        return get().getSelectedCategories().includes(category);
      },

      setWorkspace: (id) => set({ activeWsId: id }),

      addSelectedCategory: (category) =>
        set((state) => {
          const key = state.activeWsId ?? DEFAULT_WS;
          const prev = state.byWs[key] ?? [];
          if (prev.includes(category)) return state; // 중복 방지
          return { byWs: { ...state.byWs, [key]: [...prev, category] } };
        }),

      removeSelectedCategory: (category) =>
        set((state) => {
          const key = state.activeWsId ?? DEFAULT_WS;
          const prev = state.byWs[key] ?? [];
          return { byWs: { ...state.byWs, [key]: prev.filter((id) => id !== category) } };
        }),

      removeDirtyCategories: (valid) =>
        set((state) => {
          const key = state.activeWsId ?? DEFAULT_WS;
          const prev = state.byWs[key] ?? [];
          const next = prev.filter((id) => valid.includes(id));
          if (next.length === prev.length) return state;
          return { byWs: { ...state.byWs, [key]: next } };
        }),

      replaceSelectedCategories: (categories) =>
        set((state) => {
          const key = state.activeWsId ?? DEFAULT_WS;
          return { byWs: { ...state.byWs, [key]: Array.from(new Set(categories)) } };
        }),

      // clearWorkspace: (id) =>
      //   set((state) => {
      //     const key = (id ?? state.activeWsId) ?? DEFAULT_WS;
      //     const { [key]: _, ...rest } = state.byWs;
      //     return { byWs: rest };
      //   }),
    }),
    {
      name: "category-filter-storage-v2",
    }
  )
);