import { create } from 'zustand';

export interface FormState {
  // Main Order
  designPurpose: string;
  platform: string;
  platformOther: string;
  textContent: string;
  likedReferences: File[];
  dislikedReferences: File[];

  // Detailed Order
  businessName: string;
  logo: File | null;
  customWidth: string;
  customHeight: string;
  customUnit: string;
  focusTags: string;
  ctaTags: string;

  setFormData: (data: Partial<FormState>) => void;
  resetForm: () => void;
}

const initialState = {
  designPurpose: '',
  platform: '',
  platformOther: '',
  textContent: '',
  likedReferences: [],
  dislikedReferences: [],
  businessName: '',
  logo: null,
  customWidth: '',
  customHeight: '',
  customUnit: 'px',
  focusTags: '',
  ctaTags: '',
};

export const useFormStore = create<FormState>((set) => ({
  ...initialState,
  setFormData: (data) => set((state) => ({ ...state, ...data })),
  resetForm: () => set(initialState),
}));
