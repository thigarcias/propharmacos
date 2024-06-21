import { Component, OnInit } from '@angular/core'
import axios from 'axios'

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.css']
})
export class ChatgptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.messages.push({ text: 'Olá! Como posso te ajudar?', isUser: false })
  }

  prompt = ''
  threadId: string | null = null
  messages: { text: string, isUser: boolean }[] = []
  isFirstMessage: boolean = true
  isLoading: boolean = false

  changeButtonColor() {
    const sendButton = document.getElementById('send')
    if (sendButton) {
      sendButton.style.background = this.prompt.trim() ? '#1a73e8' : '#848f95'
    }
  }

  scrollToBottom() {
    const messagesContainer = document.querySelector('.messages-container')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  async onSubmit() {
    if (!this.prompt.trim()) {
      return
    }
    this.isLoading = true
    const userMessage = this.prompt
    this.messages.push({ text: userMessage, isUser: true })
    this.prompt = ''
    this.changeButtonColor()
    this.scrollToBottom()

    try {
      var response
      if (this.isFirstMessage) {
        response = await axios.post('http://localhost:5000/iniciar_chat', {
          prompt: userMessage,
        })
      } else {
        response = await axios.post('http://localhost:5000/continuar_chat', {
          input: userMessage,
          thread_id: this.threadId
        })
      }
      const formattedResponse = response.data.response
      this.threadId = response.data.thread_id

      this.messages.push({ text: formattedResponse, isUser: false })
      this.scrollToBottom()
    } catch (error) {
      console.error('Erro ao enviar mensagem para a API', error)
    } finally {
      this.isLoading = false
    }
  }
}
