import { initializeApp } from 'firebase'

const app = initializeApp({
  databaseURL: 'https://kanban-79392.firebaseio.com',
  projectId: 'kanban-79392'
})

export const db = app.database()
