
export async function urlToFile(url) {
    const blob = await fetch(url).then(res => res.blob())
    return blobToFile(blob)
}

// function to convert canvas to file
export async function canvasToFile(canvas) {
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    return blobToFile(blob)
}

export function blobToFile(blob) {
    const file = new File([blob], 'image.png', blob)
    return file
}