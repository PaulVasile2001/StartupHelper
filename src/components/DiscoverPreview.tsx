import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { categories, ideas } from '../data/ideas'
import IdeaCard from './IdeaCard'

export default function DiscoverPreview() {
  const [category, setCategory] = useState('All ideas')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<number[]>([])

  const filteredIdeas = useMemo(() => ideas.filter((idea) => {
    const matchesCategory = category === 'All ideas' || idea.category === category
    const term = search.trim().toLowerCase()
    const matchesSearch = !term || `${idea.title} ${idea.description} ${idea.founder} ${idea.category}`.toLowerCase().includes(term)
    return matchesCategory && matchesSearch
  }), [category, search])

  const toggleSave = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <section className="discover-section page-wrap" id="discover">
      <div className="discover-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> THE COMMUNITY STARTS HERE</div>
          <h2>Ideas are better <span>together.</span></h2>
          <p>Explore what people are working on. Find an idea that sparks your curiosity.</p>
        </div>
        <span className="live-pill"><i /> SAMPLE IDEAS</span>
      </div>

      <div className="discover-toolbar">
        <label className="search-box">
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ideas, topics, or founders..." />
        </label>
        <span className="filter-label"><SlidersHorizontal size={15} /> Filter by topic</span>
      </div>

      <div className="feed-tabs" role="tablist" aria-label="Filter ideas by category">
        {categories.map((item) => (
          <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="ideas-grid">
        {filteredIdeas.length > 0 ? filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} saved={saved.includes(idea.id)} onSave={toggleSave} />
        )) : (
          <div className="empty-state">
            <Sparkles size={24} />
            <b>No ideas found</b>
            <span>Try another search or choose a different topic.</span>
          </div>
        )}
      </div>
      <p className="demo-note">This is a frontend demo with sample content. Ideas and saved items are not connected to an account or database.</p>
    </section>
  )
}
