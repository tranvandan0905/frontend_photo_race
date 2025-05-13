import React, { useEffect, useState } from "react";
import { Card, Button, Image, Spinner, Alert } from "react-bootstrap";
import { FaThumbsUp, FaComment, FaStar } from "react-icons/fa";
import { getAllPost } from "../services/submission.services";
import { getAllComment, postcommnet } from "../services/comment.services";
import { PostLike, DeleteLike, PostVoteSubmission, findVoteSub, findLike, DeleteVoteSubmission } from "../services/interaction.services";
import avatar from "../assets/avata.jpg";
function Post(user_id) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsData, setCommentsData] = useState({});
  const [showComments, setShowComments] = useState({});
  const [inputs, setInputs] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [voteCount, setVoteCount] = useState({});
  const [commentCount, setCommentCount] = useState({});
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  useEffect(() => {
    getAllPost(user_id).then(res => {
      if (res.errorCode === 0) {
        const fetchedPosts = res.data;
        setPosts(fetchedPosts);

        const initLikeCount = {};
        const initCommentCount = {};
        const initVoteCount = {};
        fetchedPosts.forEach(p => {
          initLikeCount[p._id] = p.like;
          initCommentCount[p._id] = p.comment;
          initVoteCount[p._id] = p.vote;
        });

        setLikeCount(initLikeCount);
        setVoteCount(initVoteCount);
        setCommentCount(initCommentCount);
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
  const postcomments = async (postId) => {
    const content = inputs[postId];
    if (!content || content.trim() === "") return;
    try {
      const res = await postcommnet(postId, content.trim());
      if (res.data) {
        const commentRes = await getAllComment(postId);
        setCommentsData((prev) => ({
          ...prev,
          [postId]: commentRes.data,
        }));
        setCommentCount(prev => ({ ...prev, [postId]: commentRes.Sumcomment }));
        setInputs((prev) => ({ ...prev, [postId]: "" }));
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  };

  const handleLikeClick = async (post) => {

    try {
      const isLiked = await findLike(post._id);
      if (!isLiked.check) {
        const like = await PostLike(post._id);
        if (like.data?.isLiked) {

          setLikeCount(prev => ({ ...prev, [post._id]: like.data?.likeCount }));
        }
      } else {
        const like = await DeleteLike(post._id);
        if (!like.data?.isLiked)

          setLikeCount(prev => ({ ...prev, [post._id]: like.data?.likeCount }));
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  };

  const handClipVoteSubmission = async (post) => {

    try {
      const isVoted = await findVoteSub(post._id)
      if (!isVoted.check) {
        const vote = await PostVoteSubmission(post._id);
        if (vote.data?.isVoted) {
          setVoteCount(prev => ({ ...prev, [post._id]: vote.data?.VoteCount }));
        }
      } else {
        const vote = await DeleteVoteSubmission(post._id);
        if (!vote.data?.isVoted)

          setVoteCount(prev => ({ ...prev, [post._id]: vote.data?.VoteCount }));
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  }

  if (loading) { return <div className="text-center py-5"><Spinner animation="border" /></div> };

  return (
    <>
      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}
      {posts.map(post => (

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
                className="d-flex align-items-center py-1 px-3 border-0 hover-shadow "
                onClick={() => handleLikeClick(post)}
              >
                <FaThumbsUp className="me-1" size={18} />
                {likeCount[post._id] || 0} Like
              </Button>

              <Button variant="outline-secondary" size="sm" className="d-flex align-items-center py-1 px-3 border-0 hover-shadow" onClick={() => toggleComments(post._id)}
              >
                <FaComment className="me-1" size={18} /> {commentCount[post._id] || 0}Comment
              </Button>

              <Button
                variant="outline-secondary" size="sm" className="d-flex align-items-center py-1 px-3 border-0 hover-shadow  "
                onClick={() => handClipVoteSubmission(post)}
              >
                <FaStar className="me-1" size={18} />
                {voteCount[post._id] || 0} Vote
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

                <input
                  className="form-control me-2"
                  placeholder="Viết bình luận..."
                  value={inputs[post._id] || ""}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [post._id]: e.target.value }))
                  }
                />
                <Button onClick={() => postcomments(post._id)}>Gửi</Button>

              </>
            )}

          </Card.Body>
        </Card>
      ))}
    </>);
}

export default Post;
