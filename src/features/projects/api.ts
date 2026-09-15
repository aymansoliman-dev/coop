export async function fetchProjects() {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 1000)

  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
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

// export async function fetchProjectById(projectId: string) {
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), 5000); // Increased to 5s (1s is too aggressive for slow networks)

//   try {
//     const response = await fetch(`http://localhost:1608/projects/${projectId}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       signal: controller.signal
//     });

//     clearTimeout(timeoutId);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || 'Failed to fetch project');
//     }

//     return data;
//   }
//   catch(err) {
//     clearTimeout(timeoutId);
//     throw err;
//   }
// }

export async function fetchFullProjectData(projectId: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 1000)

  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
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