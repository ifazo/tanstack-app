import { createServerFileRoute } from '@tanstack/react-start/server'
import { json } from '@tanstack/react-start'
import fs from 'fs/promises'
import path from 'path'

const TAGS_FILE = path.join(process.cwd(), 'data', 'tags.json')

async function readTags(): Promise<string[]> {
  try {
    const raw = await fs.readFile(TAGS_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err: any) {
    if (err?.code === 'ENOENT') return []
    throw err
  }
}

async function writeTags(tags: string[]) {
  const content = JSON.stringify(tags, null, 2) + '\n'
  await fs.mkdir(path.dirname(TAGS_FILE), { recursive: true })
  await fs.writeFile(TAGS_FILE, content, 'utf-8')
}

export const ServerRoute = createServerFileRoute('/api/tags').methods({
  GET: async ({ request }) => {
    console.info('Reading tags... @', request.url)
    try {
      const tags = await readTags()
      return json(tags)
    } catch (err) {
      console.error(err)
      return json({ message: 'Failed to read tags' }, { status: 500 })
    }
  },

  POST: async ({ request }) => {
    console.info('Creating tag... @', request.url)
    try {
      const body = await request.json().catch(() => ({}))
      const tag = (body?.tag ?? '').toString()
      if (!tag) return json({ message: 'Invalid tag' }, { status: 400 })

      const normalized = tag.trim().toLowerCase()
      if (!normalized) return json({ message: 'Empty tag' }, { status: 400 })

      const tags = await readTags()
      if (tags.includes(normalized)) {
        return json({ message: 'Tag already exists' }, { status: 409 })
      }

      const updated = [...tags, normalized]
      await writeTags(updated)
      return json({ tag: normalized }, { status: 201 })
    } catch (err) {
      console.error(err)
      return json({ message: 'Failed to create tag' }, { status: 500 })
    }
  },
})
