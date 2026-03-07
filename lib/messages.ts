import { MongoClient, ObjectId } from 'mongodb'

export interface Message {
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

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  global._mongoClientPromise = client.connect()
}

async function getCollection() {
  const client = await global._mongoClientPromise!
  return client.db('portfolio').collection('messages')
}

export async function getMessages(): Promise<Message[]> {
  const col = await getCollection()
  const msgs = await col.find({}).sort({ receivedAt: -1 }).toArray()
  // Safely serialize - strip _id and return plain objects
  return msgs.map((m) => ({
    id: m.id || m._id?.toString(),
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    receivedAt: m.receivedAt,
    read: m.read ?? false,
    replied: m.replied ?? false,
  }))
}

export async function saveMessage(
  msg: Omit<Message, 'id' | 'receivedAt' | 'read' | 'replied'>
): Promise<Message> {
  const col = await getCollection()
  const newMsg = {
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