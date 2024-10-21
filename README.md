# Cloudinary Signed Uploads Demo

This project demonstrates how to implement signed uploads to Cloudinary using the Upload Widget in a Node.js and Express application.

## Setup

1. Clone the repository:
`git clone https://github.com/your-username/cld-signed-uploads.git`
2. Change into the cloned directory:
`cd cld-signed-uploads`
3. Install dependencies:
`npm install`
4. Create an `.env` file in the root directory and add your Cloudinary credentials:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### How to Run
Start the server:
`npm start`

The application will be available at `http://localhost:3000` (or the port specified in your environment variables).

## Project Structure
- `app.js`: Main server file
- `public/`: Static files directory
    - `js/uploadClientWidget.js`: Client-side JavaScript for the Upload Widget
    - `index.html`: Main HTML file

## How It Works

### Server-side (app.js)
1. The server uses Express.js and configures Cloudinary with environment variables.
2. It provides an API endpoint `/api/signuploadwidget` that generates a signature for secure uploads.
3. The signature is created using the Cloudinary SDK and includes properties for a timestamp, source, and destination folder.
4. The server serves static files from the public directory.

### Client-side (uploadClientWidget.js)
1. When the DOM is loaded, it fetches the upload signature from the server. This signature is valid for 1 hour from time of creation.
2. It configures the Cloudinary Upload Widget with the received signature and other options.
3. The widget is initialized and attached to a button with the ID 'upload_widget'.
4. On successful upload, it displays the uploaded image and the response data.

### Key Components
1. Cloudinary Configuration: The server configures Cloudinary using a Cloudinary Cloud Name, API key, and API secret which are stored in environment variables for secure access.

2. Signature Generation: The `/api/signuploadwidget` endpoint creates a signed request for secure uploads.

3. Upload Widget: The client-side code initializes and manages the Cloudinary Upload Widget.

4. Result Handling: After a successful upload, the client-side code displays the uploaded image and response data.

### How It's All Connected
1. The server provides the necessary API for signature generation which facilitates secure uploads.
2. The client-side JavaScript fetches the upload signature from the server.
3. The Upload Widget uses this signature to securely upload files to Cloudinary.
4. The uploaded image is then displayed on the page.

This setup ensures that uploads are secure and authenticated, preventing unauthorized access to your Cloudinary account.

### Environment Variables
- `NODE_ENV`: Not included in development, but set to 'production' in production environments
- `PORT`: The port on which the server runs (default: 3000)
- `HOST`: The host address (default: 'localhost')
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret