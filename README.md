# Welcome to Yoodli Spotify App

## Using the app
To run the app, run the following command in your terminal

### `npm start`

## Transcription Implementation Write-up:
For lyric transcription I am assuming that the music transcription feature is associated with a media player. With that in mind, I would display the text below or to the side of the media player. Key information that a user might want to see is text-highlighting that is synced with the media's timestamp and/ or text that is written/becomes visible in association with the timestamp. As a result, a key feature of implementation would be determining how to associate lyrics with the media being played. In the absence of lyrics syncing with the timestamp exactly, the lyrics could appear in a container of a fixed size that the user can scroll through at their own pace, or that automatically scrolls at a speed associated with the metadata of the song. Use cases and edge cases for the transcription might depend on the third party API or app being used to transcribe. Some use and edge cases include: what to display when multiple singers are harmonzing or are singing at the same time with different lyrics, instrumental breaks, long pauses in the music, non-word vocalizations etc. Users may have different preferences with regard to lyrics display, and so lyric transcription should include the ability to toggle the settings related to the transcription. Some things a user might want to be able to toggle are: whether the lyrics appear at all, whether the lyrics appear below or to the side of the media player, whether the lyrics include real time highlighting/ display or are available all at once so that the user can scroll through themselves. Overall, key considerations for this display would be to ensure the lyrics are available in the way and to the extent the user wants them, and that the lyrics are visible and readable without creating clutter. A key point in thinking about how the lyrics should be displayed includes thinking about user interaction with the lyrics and why/ how they might want to see them.

## TODOs
There are TODOs included throughought this code to highlight places in which features could be added or improved. In addition to those todos, below are high level updates and areas for refactoring that would be included in an update:

### Login session persistance and refactoring reauthentication logic
Currently authentication data is cleared each time the App renders. This is a temporary means to ensure the user is directed to login each time they access the app, in the absence of logout functionality. At present it also means that when a user hits refresh they will be redirected to login, which is not disirable behavior. With additional time, the login logic would be refactored to allow session persistence and logout functionality would be added.

### Refactor fetching of data
Currently all of a user's data is fetched when the Main Page is displayed after login. If a user has a large amount of data, this leads to a delay in the page loading which is not desirable. Refector would include possible refactor of when data is fetched relative to when search is run. Longer term and more in depth refactor would include use of caching.

### Styling refactor
Curently size styling is done with px. A refactor would include changing this to rem to make layouts more responsive on different screen sizes. Additionally, styling for different screen sizes would be added with @media.
The styling for all components is currently in App.css. Refactor would also include creating separate CSS files for each component.

### Additional detail on results
Either additional fields in the results table, or user ability to click on an item and go to a show page for that item with additional details.

### Testing
Add testing to ensure more robust and reliable code. Additional manual testing would be done as well to determine additional edge cases that need to be accounted for in styling.