export default function PlaylistPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-green-400 text-2xl font-mono mb-4">🎵 Big Farl Playlist</h1>
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full border-4 border-green-400 rounded-md"
          src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_n-3OjtmnPXaX7YvPdX7s6Co8xbAeebEoc&autoplay=1&mute=1"
          title="Big Farl Playlist"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

      </div>
    </div>
  );
}
