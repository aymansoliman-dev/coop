type RolesResponse =
    | string[]
    | { enum_array: string[] }
    | Array<{ enum_array: string[] }>

export async function getRoles(): Promise<string[]> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
        controller.abort()
    }, 5000)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            signal: controller.signal
        })

        clearTimeout(timeoutId)
        const data = await response.json()

        if (!response.ok) throw new Error(data.error || "Failed to fetch roles!")

        const roles = data as RolesResponse

        if (Array.isArray(roles) && roles.every((role) => typeof role === "string")) {
            return roles
        }

        if (!Array.isArray(roles) && Array.isArray(roles.enum_array)) {
            return roles.enum_array
        }

        if (Array.isArray(roles) && roles.length === 1 && Array.isArray(roles[0]?.enum_array)) {
            return roles[0].enum_array
        }

        throw new Error("Invalid roles response")
    }
    catch(err) {
        throw err
    }
    finally {
        clearTimeout(timeoutId)
    }
}