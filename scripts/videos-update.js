const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

// initialize the Youtube API library
const youtube = google.youtube("v3");

uploadDirectory("/Users/upstateinteractive/Desktop/videos/july-4-2020");

// very basic example of uploading a video to youtube
async function uploadDirectory(dir) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: [
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtube",
    ],
  });

  google.options({ auth });
  try {
    const video = await youtube.videos.update(
      {
        part: "id,snippet,status",
        requestBody: {
          id: 'FIPDcWmkmw4',
          kind: 'youtube#video',
          status: {
            privacyStatus: 'unlisted',
            selfDeclaredMadeForKids: false
          },
          snippet: {
            title: 'testing1?',
            categoryId: '22',
          },
        }
      }
    );
  } catch (e) {
    console.error(e)
    throw e
  }
  
  return;
}
