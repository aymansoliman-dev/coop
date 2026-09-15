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