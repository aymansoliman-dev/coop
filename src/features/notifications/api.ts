export async function getNotifications() {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
        controller.abort()
    }, 10000)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        const data = await response.json()

        if (!response.ok) throw new Error(data.error || "Failed to fetch notifications!")

        return data
    }
    catch(err) {
        throw err
    }
    finally {
        clearTimeout(timeoutId)
    }
}