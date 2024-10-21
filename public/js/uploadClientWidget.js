document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/signuploadwidget')
  const data = await response.json()

  const options = {
    cloudName: data.cloudname,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    folder: 'signed_upload_demo_uw',
  }

  const processResults = (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log(result)
      
      const str = JSON.stringify(result, null, 4)
      document.getElementById("uwdata").innerHTML += str

      const uploadPreview = document.getElementById("upload_preview")
      uploadPreview.innerHTML = ""

      const img = document.createElement("img")
      img.src = result.info.secure_url
      img.alt = "Preview of image uploaded to Cloudinary via the Upload Widget"
      img.style.width = "300px"

      uploadPreview.appendChild(img)
    }
  }

  const myWidget = cloudinary.createUploadWidget(
    options,
    processResults
  )
  document
    .getElementById('upload_widget')
    .addEventListener('click', () => myWidget.open(), false)
})
