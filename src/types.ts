export type User  = {
  id: string;
  name: string;
  email: string
  avatarUrl: string

}



export type Message = {
  id: string
  content: string
  author: User
  createdAt: Date
}

export type Chat = {
  id:string
  chatName: string;
  messages: Message[]
  lastMessage: Message
  members: User[]
}


