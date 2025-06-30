import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { isTokenValid } from "@/lib/utils/jwt"

export default async function Page() {
    const cookieStore = await cookies()
    const token = cookieStore.get('Authentication')?.value

    if (!token || !isTokenValid(token)) {
        redirect('/admin/login')
    } else {
        redirect('/admin/dashboards')
    }
}