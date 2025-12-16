import React, { useState } from 'react';
import { MessageSquare, Send, User, Clock, Edit, Trash2 } from 'lucide-react';

const CommentSection = ({ clientId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Rajesh Kumar',
      role: 'HR Manager',
      time: '2 hours ago',
      content: 'Client confirmed they need the resource to start by next Monday. Please prioritize.',
      avatar: 'RK'
    },
    {
      id: 2,
      user: 'Priya Sharma',
      role: 'Technical Lead',
      time: '1 day ago',
      content: 'Technical interview scheduled for tomorrow. Need 2 more candidates for backup.',
      avatar: 'PS'
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [applyToGroup, setApplyToGroup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: comments.length + 1,
      user: 'Current User',
      role: 'Admin',
      time: 'Just now',
      content: newComment,
      avatar: 'CU'
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare size={20} className="text-gray-600" />
          <h2 className="text-xl font-bold text-gray-800">Comment Section</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          You can Add/View comment in this section of #{clientId}
        </p>
        
        {/* Job Description Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">Shriram B</h3>
              <p className="text-gray-600">Huber Group</p>
              <p className="text-sm text-blue-600">Campaign: LinkedIn connect Rashi 2025</p>
              <p className="text-sm text-gray-500">Others</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Job Description</p>
              <p className="text-gray-600">Senior (3+) Database, full time</p>
              <p className="text-sm text-gray-500">Location: Onsite</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="applyToGroup"
              checked={applyToGroup}
              onChange={(e) => setApplyToGroup(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="applyToGroup" className="text-sm text-gray-600">
              Apply to remaining demand of this group
            </label>
          </div>
        </div>
        
        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add comment
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
              rows={4}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              #3903 Lead Id
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send size={16} />
              Post Comment
            </button>
          </div>
        </form>
        
        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-800">{comment.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{comment.user}</h4>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {comment.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={12} />
                        <span>{comment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-500 hover:text-blue-600">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No comments found!</p>
              <p className="text-sm text-gray-400 mt-1">Be the first to comment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;