import React, { useEffect, useState } from "react";
import { Card, Button, Image, Spinner } from "react-bootstrap";
import { FaThumbsUp, FaComment, FaStar } from "react-icons/fa";
import { getAllPost } from "../services/submission.services";
import { getAllComment } from "../services/comment.services";
import { PostLike, DeleteLike } from "../services/interaction.services";
import avatar from "../assets/avata.jpg";

function Post(user_id) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsData, setCommentsData] = useState({});
  const [showComments, setShowComments] = useState({});
  const [inputs, setInputs] = useState({});
  const [liked, setLiked] = useState({});
  const [likeCount, setLikeCount] = useState({});
useEffect(() => {
    getAllPost(user_id).then(res => {
    if (res.errorCode === 0) {
      const fetchedPosts = res.data;
      setPosts(fetchedPosts);
      const initLiked = {};
      const initLikeCount = {};
      fetchedPosts.forEach(p => {
        initLiked[p._id] = p.isLiked || false; 
        initLikeCount[p._id] = p.like || 0;
      });

      setLiked(initLiked);
      setLikeCount(initLikeCount);
    }
    setLoading(false);
  });
}, [user_id]);


  const toggleComments = async (postId) => {
    const showing = showComments[postId];
    if (!showing) {
      const res = await getAllComment(postId);
      setCommentsData(prev => ({ ...prev, [postId]: res.data }));
    }
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };
  const handleLikeClick = async (post) => {
  const isLiked = liked[post._id];
  try {
    if (!isLiked) {
      await PostLike(post._id);
      setLiked(prev => ({ ...prev, [post._id]: true }));
      setLikeCount(prev => ({ ...prev, [post._id]: prev[post._id] + 1 }));
    } else {
      await DeleteLike(post._id);
      setLiked(prev => ({ ...prev, [post._id]: false }));
      setLikeCount(prev => ({ ...prev, [post._id]: prev[post._id] - 1 }));
    }
  } catch (err) {
    console.error("Error updating like:", err);
  }
};


  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return posts.map(post => (
    <Card key={post._id} className="mb-3 shadow-sm">
      <Card.Header className="d-flex align-items-center">
        <Image src={post.avatar || avatar} roundedCircle width={40} height={40} className="me-2" />
        <div>
          <strong>{post.user_name}</strong><br />
          <small className="text-muted">{new Date(post.submitted_at).toLocaleString()}</small>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text>{post.title}</Card.Text>
        {post.image && <img src={post.image} alt="" className="img-fluid rounded mb-3" />}


        <div className="mt-3 d-flex justify-content-between align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            className={`d-flex align-items-center py-1 px-3 border-0 hover-shadow ${liked[post._id] ? "text-primary" : ""}`}
            onClick={() => handleLikeClick(post)}
          >
            <FaThumbsUp className="me-1" size={18} />
            {likeCount[post._id] || 0} Like
          </Button>

          <Button variant="outline-secondary" size="sm" className="d-flex align-items-center py-1 px-3 border-0 hover-shadow" onClick={() => toggleComments(post._id)}
          >
            <FaComment className="me-1" size={18} /> {post.comment}Comment
          </Button>

          <Button
            variant="outline-secondary" size="sm" className="d-flex align-items-center py-1 px-3 border-0 hover-shadow"

          >
            <FaStar className="me-1" size={18} />{post.vote} Vote
          </Button>
        </div>

        {showComments[post._id] && (
          <>
            {(commentsData[post._id] || []).map((cmt, idx) => (
              <div key={idx} className="d-flex align-items-start mb-2">
                <Image
                  src={cmt.avatar || avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-2"
                />
                <div>
                  <strong>{cmt.user_name}</strong><br />
                  <span>{cmt.content}</span><br />
                  <small className="text-muted">{new Date(cmt.commented_at).toLocaleString()}</small>
                </div>
              </div>
            ))}

            <div className="d-flex mt-2">
              <input
                className="form-control me-2"
                placeholder="Viết bình luận..."
                value={inputs[post._id] || ""}
                onChange={e => setInputs({ ...inputs, [post._id]: e.target.value })}
              />
              <Button onClick={() => alert(`Gửi: ${inputs[post._id]}`)}>Gửi</Button>
            </div>
          </>
        )}

      </Card.Body>
    </Card>
  ));
}

export default Post;
