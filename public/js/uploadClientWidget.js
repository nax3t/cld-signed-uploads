document.addEventListener("DOMContentLoaded", async () => {
  let data;
  try {
    const response = await fetch("/api/signuploadwidget")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = await response.json()
  } catch (error) {
    console.error("Failed to fetch upload widget signature:", error)
    return
  }

  const options = {
    cloudName: data.cloudname,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    folder: "signed_upload_demo_uw",
  }

  const myWidget = cloudinary.createUploadWidget(options, processResults)

  document
    .getElementById("upload_widget")
    .addEventListener("click", () => myWidget.open(), false)
})

const processResults = (error, result) => {
  if (error) {
    console.error("Failed to upload media:", error)
  } else if (result && result.event === "success") {
    const str = JSON.stringify(result, null, 4)
    const preElement = document.getElementById("uwdata")
    preElement.textContent = str

    const uploadPreview = document.getElementById("upload_preview")
    uploadPreview.innerHTML = ""

    if (result.info.resource_type === "video") {
      const video = document.createElement("video")
      video.src = result.info.secure_url
      video.controls = true
      video.style.width = "300px"
      uploadPreview.appendChild(video)
    } else if (result.info.resource_type === "image") {
      const img = document.createElement("img")
      img.src = result.info.secure_url
      img.alt = "Preview of media uploaded to Cloudinary via the Upload Widget"
      img.style.width = "300px"
      uploadPreview.appendChild(img)
    }
  }
}