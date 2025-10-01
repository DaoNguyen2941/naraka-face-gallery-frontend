import { jwtDecode } from "jwt-decode"

export interface JwtPayload {
  exp: number // thời gian hết hạn (giây)
  [key: string]: unknown 
}

export function isTokenValid(token: string): boolean {
  try {    
    const decoded = jwtDecode<JwtPayload>(token)
    const now = Date.now() / 1000 // thời gian hiện tại (giây)
    return decoded.exp > now
  } catch {
    return false
  }
}
