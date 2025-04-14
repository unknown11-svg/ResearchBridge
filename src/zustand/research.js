import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(persist((set) => ({
  profile: null,  
  setProfile: (payload) => set({ profile: payload }),  
  setAuthData: (token, userId, role) => set({ token, userId, role }),
}), {
  name: 'sys-storage',  
}))

export default useStore
