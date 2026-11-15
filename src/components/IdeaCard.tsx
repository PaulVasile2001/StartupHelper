import { Bookmark, MapPin, ArrowUpRight } from 'lucide-react'
import type { Idea } from '../data/ideas'

type Props = {
  idea: Idea
  saved: boolean
  onSave: (id: number) => void
}

export default function IdeaCard({ idea, saved, onSave }: Props) {
  return (
    <article className="idea-card">
      <div className="tag-row">
        <span className="tag tag-blue">{idea.category}</span>
        <span className="tag">{idea.stage}</span>
      </div>
      <button
        className={`bookmark ${saved ? 'saved' : ''}`}
        aria-label={saved ? 'Remove saved idea' : 'Save idea'}
        onClick={() => onSave(idea.id)}
      >
        <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <div className="idea-footer">
        <div className="founder">
          <span className={`person person-${idea.id}`}>{idea.initials}</span>
          <span>
            <b>{idea.founder}</b>
            <small>{idea.role}</small>
          </span>
        </div>
        <span className="location"><MapPin size={11} /> {idea.location}</span>
      </div>
      <div className="idea-bottom">
        <span className="upvote">↑ {idea.votes}</span>
        <span>{idea.lookingFor}</span>
        <ArrowUpRight size={14} />
      </div>
    </article>
  )
}
