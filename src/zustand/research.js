import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(persist((set) => ({
  profile: null,  
  setProfile: (payload) => set({ profile: payload }),  
}), {
  name: 'sys-storage',  
}))

export default useStore
