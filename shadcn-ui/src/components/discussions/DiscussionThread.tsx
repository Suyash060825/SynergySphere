import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Reply, Heart, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  replies: Reply[];
  likes: number;
  isLiked: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'Design System Guidelines',
    content: 'We need to establish clear guidelines for our design system. What are your thoughts on the color palette and typography choices?',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-05T10:30:00Z',
    replies: [
      {
        id: '1',
        content: 'I think we should stick with a more neutral palette for better accessibility.',
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        createdAt: '2024-01-05T11:15:00Z',
        likes: 3,
        isLiked: false
      }
    ],
    likes: 5,
    isLiked: true
  },
  {
    id: '2',
    title: 'Performance Optimization',
    content: 'The homepage is loading slowly. We should optimize images and implement lazy loading.',
    author: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-04T14:20:00Z',
    replies: [],
    likes: 2,
    isLiked: false
  }
];

interface DiscussionThreadProps {
  projectId: string;
}

export default function DiscussionThread({ projectId }: DiscussionThreadProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleCreateDiscussion = () => {
    if (newDiscussion.title.trim() && newDiscussion.content.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        title: newDiscussion.title,
        content: newDiscussion.content,
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        createdAt: new Date().toISOString(),
        replies: [],
        likes: 0,
        isLiked: false
      };
      setDiscussions(prev => [discussion, ...prev]);
      setNewDiscussion({ title: '', content: '' });
      setShowNewDiscussion(false);
    }
  };

  const handleReply = (discussionId: string) => {
    if (replyContent.trim()) {
      const reply: Reply = {
        id: Date.now().toString(),
        content: replyContent,
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false
      };

      setDiscussions(prev => prev.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, replies: [...discussion.replies, reply] }
          : discussion
      ));
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Discussions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {discussions.length} discussions
          </p>
        </div>
        
        <Button onClick={() => setShowNewDiscussion(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      {/* New Discussion Form */}
      {showNewDiscussion && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Start a new discussion</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Discussion title..."
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            <Textarea
              placeholder="What would you like to discuss?"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewDiscussion(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDiscussion}>
                Post Discussion
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                  <AvatarFallback>
                    {discussion.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {discussion.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {discussion.author.name} • {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {discussion.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className={`flex items-center space-x-1 hover:text-red-500 ${discussion.isLiked ? 'text-red-500' : ''}`}>
                      <Heart className={`h-4 w-4 ${discussion.isLiked ? 'fill-current' : ''}`} />
                      <span>{discussion.likes}</span>
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1 hover:text-blue-500"
                      onClick={() => setReplyingTo(replyingTo === discussion.id ? null : discussion.id)}
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.replies.length} replies</span>
                    </div>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === discussion.id && (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={2}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleReply(discussion.id)}>
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="mt-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                            <AvatarFallback className="text-xs">
                              {reply.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {reply.author.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
