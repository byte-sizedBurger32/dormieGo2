"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MessageSquare, ThumbsUp, Shield, Reply, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ThreadPage() {
  const params = useParams()
  const [replies, setReplies] = useState(3)
  const [newReply, setNewReply] = useState("")

  const threadData = {
    id: params.id,
    title: "Best tips for keeping your dorm room cool during summer?",
    category: "maintenance",
    author: "Maria Santos",
    verified: true,
    avatar: "/placeholder.svg?key=avatar1",
    timestamp: "2 hours ago",
    content:
      "I've been struggling with heat in my room during summer. It gets unbearably hot, especially in the afternoons. Does anyone have tips or tricks to keep the room cooler without relying too much on AC? Looking for budget-friendly solutions.",
    replies: 24,
    views: 512,
    likes: 45,
    comments: [
      {
        id: 1,
        author: "Alex Johnson",
        verified: true,
        avatar: "/placeholder.svg?key=avatar2",
        timestamp: "1 hour ago",
        content:
          "Use blackout curtains during the day! Makes a huge difference. I also leave the door open in the evening when it's cooler outside.",
        likes: 12,
      },
      {
        id: 2,
        author: "Lisa Chen",
        verified: true,
        avatar: "/placeholder.svg?key=avatar3",
        timestamp: "45 mins ago",
        content: "Ceiling fan + box fan combination works wonders. Also, take a cool shower before bed!",
        likes: 18,
      },
      {
        id: 3,
        author: "Pedro Fernandez",
        verified: true,
        avatar: "/placeholder.svg?key=avatar4",
        timestamp: "30 mins ago",
        content:
          "Budget-friendly tip: Put a bowl of ice in front of a fan. It creates cool air circulation. Changed my life!",
        likes: 24,
      },
    ],
  }

  const handleReply = () => {
    if (newReply.trim()) {
      setReplies(replies + 1)
      setNewReply("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/forum" className="flex items-center gap-2 text-primary hover:gap-3 transition-all mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Original Post */}
        <Card className="p-6 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={threadData.avatar || "/placeholder.svg"}
              alt={threadData.author}
              className="w-12 h-12 rounded-full bg-muted"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold">{threadData.author}</h2>
                {threadData.verified && <Shield className="w-4 h-4 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground">{threadData.timestamp}</p>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">Maintenance</span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{threadData.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">{threadData.content}</p>

          <div className="flex items-center gap-6 pt-6 border-t border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{threadData.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{replies} Replies</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition ml-auto">
              <Flag className="w-4 h-4" />
              <span className="text-sm">Report</span>
            </button>
          </div>
        </Card>

        {/* Comments */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-lg mb-4">{threadData.comments.length} Replies</h3>
          {threadData.comments.map((comment) => (
            <Card key={comment.id} className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={comment.avatar || "/placeholder.svg"}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full bg-muted"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-sm">{comment.author}</p>
                    {comment.verified && <Shield className="w-3 h-3 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{comment.content}</p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                  <Reply className="w-4 h-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        <Card className="p-6 bg-card border-2 border-primary/20">
          <h3 className="font-bold text-lg mb-4">Add Your Reply</h3>
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts or experience..."
            rows={4}
            className="w-full border border-border rounded-lg px-4 py-2 mb-4"
          />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleReply}>
              Post Reply
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
