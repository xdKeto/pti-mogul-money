import type { QuestionType } from '../../types/quiz'

interface MediaPlayerProps {
  type: QuestionType
  source: string | null | undefined
  alt: string
  autoPlay?: boolean
}

export function MediaPlayer({ type, source, alt, autoPlay = false }: MediaPlayerProps) {
  if (type === 'text') return null

  if (!source) {
    return <p className="media-placeholder">Media belum disediakan.</p>
  }

  if (type === 'image') {
    return <img className="question-media question-media--image" src={source} alt={alt} />
  }

  const mediaElement = type === 'audio' ? (
    <audio className="question-media question-media--audio" src={source} controls />
  ) : (
    <video className="question-media question-media--video" src={source} controls autoPlay={autoPlay} />
  )

  if (type === 'audio') {
    return <div className="audio-player">{mediaElement}</div>
  }

  return (
    <div className="video-player">
      {mediaElement}
    </div>
  )
}
