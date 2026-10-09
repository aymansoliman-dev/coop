export type SignupData = {
  name: string
  email: string
  username: string
  password: string
}

export async function signup (data: SignupData) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const responseData = await response.json()
    if (!response.ok) {
      throw new Error(responseData.error || 'Signup failed!')
    }

    return responseData
  }
  catch(err) {
    throw err
  }
  finally {
    clearTimeout(timeoutId)
  }
}

type UsernameCheckResponse = {
  available: boolean
}

let usernameCheckTimer: ReturnType<typeof setTimeout> | undefined
let pendingUsernameCheck: ((result: UsernameCheckResponse) => void) | undefined

export function checkUsername(username: string): Promise<UsernameCheckResponse> {
  if (usernameCheckTimer) clearTimeout(usernameCheckTimer)
  pendingUsernameCheck?.({ available: true })

  return new Promise((resolve, reject) => {
    pendingUsernameCheck = resolve
    usernameCheckTimer = setTimeout(async () => {
      pendingUsernameCheck = undefined

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usernames/verify?username=${encodeURIComponent(username)}`,
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify username")
        }

        resolve(data as UsernameCheckResponse)
      } catch (error) {
        reject(error)
      }
    }, 400)
  })
}

export async function login ({ email, password } : { email: string, password: string }) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 10000)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed!')
      }

      return data
    }
    catch(err) {
      clearTimeout(timeoutId)
      throw err
    }
}

export async function fetchLoggedInUser() {

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
        controller.abort()
    }, 10000)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        clearTimeout(timeoutId)
        const data = await response.json()

        if (!response.ok) throw new Error(data.error || "Failed to fetch user!")

        return data
    }
    catch(err) {
      clearTimeout(timeoutId)
      throw err
    }
}