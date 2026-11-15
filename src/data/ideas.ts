export type Idea = {
  id: number
  category: string
  stage: string
  title: string
  description: string
  founder: string
  role: string
  location: string
  initials: string
  votes: number
  lookingFor: string
}

export const ideas: Idea[] = [
  {
    id: 1,
    category: 'Community',
    stage: 'Validating',
    title: 'What if your next coworker lived next door?',
    description: 'A neighborhood coworking club for remote people who miss having people around.',
    founder: 'Maya Chen',
    role: 'Product designer',
    location: 'San Francisco',
    initials: 'M',
    votes: 128,
    lookingFor: 'Looking for a builder',
  },
  {
    id: 2,
    category: 'Food',
    stage: 'Exploring',
    title: 'A better way to plan what to cook',
    description: 'A simple tool that turns what is already in your fridge into a weekly meal plan.',
    founder: 'Mehmet Yilmaz',
    role: 'Home cook',
    location: 'Berlin',
    initials: 'M',
    votes: 86,
    lookingFor: 'Open to feedback',
  },
  {
    id: 3,
    category: 'Climate',
    stage: 'Building',
    title: 'Make repairing things the easy option',
    description: 'A local directory connecting people with repair shops and independent makers.',
    founder: 'Alex Rivera',
    role: 'Software developer',
    location: 'Amsterdam',
    initials: 'A',
    votes: 64,
    lookingFor: 'Seeking a co-founder',
  },
]

export const categories = ['All ideas', 'Community', 'Food', 'Climate']
