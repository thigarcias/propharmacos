import { Component, HostListener, OnInit } from '@angular/core'
import axios from 'axios'

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.css']
})
export class ChatgptComponent implements OnInit {
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit()
    }
  }


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
        response = await axios.post('https://gogood.brazilsouth.cloudapp.azure.com/iniciar_chat', {
          prompt: userMessage,
        })
        this.isFirstMessage = false
      } else {
        response = await axios.post('https://gogood.brazilsouth.cloudapp.azure.com/continuar_chat', {
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
  newChat(){
    this.messages = []
    this.threadId = null
    this.isFirstMessage = true
    this.messages.push({ text: 'Olá! Como posso te ajudar?', isUser: false})
  }
}
