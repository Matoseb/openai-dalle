
export async function urlToFile(url) {

    const blob = await fetch(url).then(res => res.blob())
    const file = new File([blob], 'image.png', blob)
    return file
} 