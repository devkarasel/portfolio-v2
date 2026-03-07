import { MongoClient, ObjectId } from 'mongodb'

export interface Message {
  _id?: string
  id: string
  name: string
  email: string
  subject: string
  message: string
  receivedAt: string
  read: boolean
  replied: boolean
}

const uri = process.env.MONGODB_URI!

let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise!

async function getCollection() {
  const client = await clientPromise
  return client.db('portfolio').collection<Message>('messages')
}

export async function getMessages(): Promise<Message[]> {
  const col = await getCollection()
  const msgs = await col.find({}).sort({ receivedAt: -1 }).toArray()
  return msgs.map((m) => ({ ...m, id: m._id?.toString() || m.id }))
}

export async function saveMessage(
  msg: Omit<Message, 'id' | 'receivedAt' | 'read' | 'replied'>
): Promise<Message> {
  const col = await getCollection()
  const newMsg: Message = {
    ...msg,
    id: new ObjectId().toString(),
    receivedAt: new Date().toISOString(),
    read: false,
    replied: false,
  }
  await col.insertOne(newMsg)
  return newMsg
}

export async function markRead(id: string): Promise<void> {
  const col = await getCollection()
  await col.updateOne({ id }, { $set: { read: true } })
}

export async function markReplied(id: string): Promise<void> {
  const col = await getCollection()
  await col.updateOne({ id }, { $set: { read: true, replied: true } })
}

export async function deleteMessage(id: string): Promise<void> {
  const col = await getCollection()
  await col.deleteOne({ id })
}