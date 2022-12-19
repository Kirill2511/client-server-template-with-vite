import dotenv from 'dotenv'
import cors from 'cors'
import express, { Request } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import bodyParser from 'body-parser'

import { startApp } from './app/config/db.config'

import userRouter from './routes/userRoutes'
import themeRouter from './routes/themeRoutes'
import forumRouter from './routes/forumRoutes'
import leaderRouter from './routes/leaderRoutes'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import type { Session, SessionData } from 'express-session'
import { getAllSessions } from './app/models/userSession'

export type SessionReq = Request & {
    session: Session & Partial<SessionData> & { userID?: number };
  };

const sID = {
  sid: '',
}

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json())

app.use('/api/user', userRouter)
app.use('/api/theme', themeRouter)
app.use('/api/forum', forumRouter)
app.use('/api/leaderboard', leaderRouter)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('pg')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressSession = require('express-session')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pgSession = require('connect-pg-simple')(expressSession)

const pgPool = new pg.Pool({
  host: 'localhost',
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  port: Number(POSTGRES_PORT),
  ssl: false,
})
app.use(
  expressSession({
    // eslint-disable-next-line new-cap
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: 'user_sessions', // Use another table-name than the default "session" one
      createTableIfMissing: true,
    }),
    secret: 'postgres',
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
)

startApp()

app.get('/', (_, res) => {
  const result = render()
  const template = path.resolve(__dirname, '../client/dist/client/index.html')
  const htmlString = fs.readFileSync(template, 'utf-8')
  const newString = htmlString.replace('<!--ssr-outlet-->', result)
  res.send(newString)
})

app.post('/login123', (req: SessionReq, res) => {
  console.log(req.body, 'BODY');
  const { id } = req.body;
  req.session.userID = Number(id);
  sID.sid = req.session.id;
  req.session.save((err) => console.log(err));
  console.log(req.session, req.session.id);

  console.log(sID, 'SESSION ID');
  res.redirect('/');
})

app.get('/gimme', getAllSessions)

app.use(express.static(path.resolve(__dirname, '../client/dist/client')))

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})

export default sID;
