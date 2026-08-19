"use server"
import { cookies } from "next/headers";
import { create } from "zustand";

// type AuthState = {
//   user: AuthUser | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   isBootstrapped: boolean;
//   error: string | null;
//   register: (email: string, password: string) => Promise<boolean>;
//   login: (email: string, password: string) => Promise<boolean>;
//   completeGoogleAuth: (code: string, state: string) => Promise<boolean>;
//   logout: () => Promise<void>;
//   bootstrapSession: () => Promise<void>;
//   clearError: () => void;
// };

// type AuthState = {
//   // user: AuthUser | null;
//   token: string | null;
// };
// export const useAuthStore = create<AuthState>((set) => ({

// }))
export const tengoToken = async ()=>{
    const cookie = await cookies()
    const token = cookie.get("token")?.value
    if(token){
      return true
    }
    return false
}