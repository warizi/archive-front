import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoryFilterState {
  selectedCategories: number[];
  isSelectedCategory: (category: number) => boolean;
  addSelectedCategory: (category: number) => void;
  removeSelectedCategory: (category: number) => void;
  removeDirtyCategories: (categories: number[]) => void;
}

export const useCategoryFilter = create<CategoryFilterState>()(
  persist(
    (set, get) => ({
      selectedCategories: [],
      isSelectedCategory: (category) => {
        const state = get();
        return state.selectedCategories.includes(category);
      },
      addSelectedCategory: (category) => set((state) => ({
        selectedCategories: [...state.selectedCategories, category]
      })),
      removeSelectedCategory: (category) => set((state) => ({
        selectedCategories: state.selectedCategories.filter(id => id !== category)
      })),
      removeDirtyCategories: (categories) => set((state) => ({
        selectedCategories: state.selectedCategories.filter(id => categories.includes(id))
      })),
    }),
    {
      name: "category-filter-storage",
    }
  )
)