import os
import time
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Scope required for full read/write access to YouTube playlists
SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"]
CLIENT_SECRETS_FILE = "client_secrets.json"
PLAYLIST_ID = "PLFI42t-MaN-o"

SONGS = [
    "Alan Walker Faded",
    "Alan Walker Alone",
    "Alan Walker On My Way",
    "Alan Walker The Spectre",
    "Alan Walker Darkside",
    "The Weeknd Blinding Lights",
    "The Weeknd Starboy",
    "The Weeknd Save Your Tears",
    "The Weeknd The Hills",
    "The Weeknd Die For You",
    "Michael Jackson Billie Jean",
    "Michael Jackson Beat It",
    "Michael Jackson Smooth Criminal",
    "Michael Jackson Thriller",
    "Michael Jackson Man in the Mirror",
    "TheFatRat Unity",
    "TheFatRat Monody",
    "TheFatRat Fly Away",
    "TheFatRat The Calling",
    "TheFatRat Xenogenesis",
    "Srivalli Pushpa",
    "Kadhaippoma Oh My Kadavule",
    "Samajavaragamana Ala Vaikunthapurramuloo",
    "Inkem Inkem Geetha Govindam",
    "Ennodu Nee Irundhaal I"
]

def get_authenticated_service():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
    credentials = flow.run_local_server(port=0)
    return build("youtube", "v3", credentials=credentials)

def search_video(youtube, query):
    request = youtube.search().list(
        part="snippet",
        q=query,
        type="video",
        maxResults=1
    )
    response = request.execute()
    items = response.get("items", [])
    if items:
        return items[0]["id"]["videoId"], items[0]["snippet"]["title"]
    return None, None

def add_video_to_playlist(youtube, playlist_id, video_id):
    request = youtube.playlistItems().insert(
        part="snippet",
        body={
            "snippet": {
                "playlistId": playlist_id,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": video_id
                }
            }
        }
    )
    request.execute()

def main():
    if not os.path.exists(CLIENT_SECRETS_FILE):
        print(f"Error: '{CLIENT_SECRETS_FILE}' not found. Download it from Google Cloud Console.")
        return

    youtube = get_authenticated_service()

    for song in SONGS:
        try:
            video_id, title = search_video(youtube, song)
            if video_id:
                add_video_to_playlist(youtube, PLAYLIST_ID, video_id)
                print(f"[ADDED] {song} -> {title} ({video_id})")
            else:
                print(f"[NOT FOUND] {song}")
            
            # Brief delay to respect API rate limits
            time.sleep(0.5)
            
        except HttpError as e:
            print(f"[API ERROR] Failed on '{song}': {e}")
            break

if __name__ == "__main__":
    main()