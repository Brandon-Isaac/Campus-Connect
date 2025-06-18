'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Send, Smile, UserCircle } from 'lucide-react';
import PageTitle from '@/components/shared/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock data for conversations and messages
const mockConversations = [
  { id: 'c1', name: 'John Mentor', lastMessage: 'Sure, let\'s discuss your project.', unread: 2, avatarUrl: 'https://placehold.co/40x40.png?text=JM', dataAiHint: 'mentor portrait' },
  { id: 'c2', name: 'Innovate Inc. Recruiter', lastMessage: 'Thanks for your application!', unread: 0, avatarUrl: 'https://placehold.co/40x40.png?text=IR', dataAiHint: 'recruiter smiling' },
  { id: 'c3', name: 'Sarah Peer', lastMessage: 'Are you going to the webinar?', unread: 0, avatarUrl: 'https://placehold.co/40x40.png?text=SP', dataAiHint: 'student happy' },
];

const mockMessages: { [key: string]: { id: string, sender: string, text: string, time: string, isMe: boolean }[] } = {
  'c1': [
    { id: 'm1', sender: 'John Mentor', text: 'Hi Alex, how can I help you today?', time: '10:00 AM', isMe: false },
    { id: 'm2', sender: 'You', text: 'Hi John, I had a question about my AI project.', time: '10:01 AM', isMe: true },
    { id: 'm3', sender: 'John Mentor', text: 'Sure, let\'s discuss your project.', time: '10:02 AM', isMe: false },
  ],
  'c2': [
    { id: 'm4', sender: 'Innovate Inc. Recruiter', text: 'Thanks for your application! We are reviewing it.', time: 'Yesterday', isMe: false },
  ],
   'c3': [
    { id: 'm5', sender: 'Sarah Peer', text: 'Hey, are you going to the career webinar tomorrow?', time: '9:30 AM', isMe: false },
    { id: 'm6', sender: 'You', text: 'Yes, I plan to! See you there.', time: '9:32 AM', isMe: true },
  ],
};

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(mockConversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
  const messages = selectedConversationId ? mockMessages[selectedConversationId] || [] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;
    // Mock sending message
    const newMsg = { id: `m${Date.now()}`, sender: 'You', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true };
    mockMessages[selectedConversationId]?.push(newMsg);
    setNewMessage('');
    // In a real app, update conversation list (last message, etc.)
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col"> {/* Adjusted height for better fit */}
      <PageTitle title="Direct Messages" description="Communicate with mentors, companies, and peers." icon={<MessageSquare className="w-8 h-8 text-primary" />} />

      <div className="flex-grow flex border rounded-lg shadow-lg overflow-hidden mt-4 bg-card">
        {/* Conversation List */}
        <div className="w-1/3 border-r">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-lg font-headline">Conversations</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100%-4rem)]"> {/* Adjusted height */}
            {mockConversations.map(convo => (
              <div
                key={convo.id}
                className={cn(
                  "p-4 flex items-center space-x-3 cursor-pointer hover:bg-muted/50",
                  selectedConversationId === convo.id && "bg-muted"
                )}
                onClick={() => setSelectedConversationId(convo.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={convo.avatarUrl} alt={convo.name} data-ai-hint={convo.dataAiHint} />
                  <AvatarFallback>{convo.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{convo.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">{convo.unread}</span>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center space-x-3 bg-card">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.name} data-ai-hint={selectedConversation.dataAiHint} />
                  <AvatarFallback>{selectedConversation.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.name}</p>
                  {/* Add online status or other info here */}
                </div>
              </div>
              <ScrollArea className="flex-grow p-4 space-y-4 bg-background/30">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-xs lg:max-w-md p-3 rounded-lg shadow",
                      msg.isMe ? "bg-primary text-primary-foreground" : "bg-card border"
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn("text-xs mt-1", msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-card flex items-center space-x-2">
                <Button variant="ghost" size="icon"><Smile className="h-5 w-5 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5 text-muted-foreground" /></Button>
                <Input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon"><Send className="h-5 w-5" /></Button>
              </form>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground bg-background/30">
              <MessageSquare className="h-24 w-24 mb-4" />
              <p className="text-lg">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
