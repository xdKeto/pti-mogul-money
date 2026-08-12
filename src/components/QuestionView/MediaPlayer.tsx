import { useRef, useState } from 'react'
import type { QuestionType } from '../../types/quiz'

interface MediaPlayerProps {
  type: QuestionType
  source: string | null | undefined
  alt: string
}

export function MediaPlayer({ type, source, alt }: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (type === 'text') return null

  if (!source) {
    return <p className="media-placeholder">Media belum disediakan.</p>
  }

  if (type === 'image') {
    return <img className="question-media question-media--image" src={source} alt={alt} />
  }

  const togglePlayback = async () => {
    const media = type === 'audio' ? audioRef.current : videoRef.current
    if (!media) return

    if (media.paused) {
      await media.play()
    } else {
      media.pause()
    }
  }

  const replay = async () => {
    const media = type === 'audio' ? audioRef.current : videoRef.current
    if (!media) return

    media.currentTime = 0
    await media.play()
  }

  const mediaElement = type === 'audio' ? (
    <audio ref={audioRef} className="question-media question-media--audio" src={source} controls onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
  ) : (
    <video ref={videoRef} className="question-media question-media--video" src={source} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
  )

  return (
    <div className={type === 'audio' ? 'audio-player' : 'video-player'}>
      {mediaElement}
      <div className={`${type === 'audio' ? 'audio' : 'video'}-player__controls`}>
        <button type="button" onClick={() => void togglePlayback()}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={() => void replay()}>
          Replay
        </button>
      </div>
    </div>
  )
}
