import React, { useEffect, useState } from "react";
import {
  Card, Button, Image, Spinner,
  Toast, ToastContainer
} from "react-bootstrap";
import { FaThumbsUp, FaComment, FaStar, FaTimes } from "react-icons/fa";
import { deleteSub, getAllPost } from "../services/submission.services";
import {
  deletecommnet,
  getAllComment, postcommnet
} from "../services/comment.services";
import {
  PostLike, DeleteLike, PostVoteSubmission,
  findVoteSub, findLike, DeleteVoteSubmission
} from "../services/interaction.services";
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
  const [likedPosts, setLikedPosts] = useState({});
  const [votePosts, setvotePosts] = useState({});
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const currentUserId = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllPost(user_id);
        if (res.errorCode === 0) {
          const fetchedPosts = res.data;
          setPosts(fetchedPosts);
          const initLikeCount = {};
          const initCommentCount = {};
          const initVoteCount = {};
          const likedStatusMap = {};
          const voteStatusMap = {};

          for (const p of fetchedPosts) {
            initLikeCount[p._id] = p.like;
            initCommentCount[p._id] = p.comment;
            initVoteCount[p._id] = p.vote;
              if (currentUserId) {
              const resLike = await findLike(p._id);
              likedStatusMap[p._id] = resLike?.check || false;

              const resvote = await findVoteSub(p._id);
              voteStatusMap[p._id] = resvote?.check || false;
            }
          }

          setLikeCount(initLikeCount);
          setVoteCount(initVoteCount);
          setCommentCount(initCommentCount);
          setLikedPosts(likedStatusMap);
          setvotePosts(voteStatusMap);
        }
      } catch (error) {
        console.error("Lỗi khi fetch bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        setCommentsData(prev => ({
          ...prev,
          [postId]: commentRes.data
        }));
        setCommentCount(prev => ({ ...prev, [postId]: commentRes.Sumcomment }));
        setInputs(prev => ({ ...prev, [postId]: "" }));
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger"
      });
    }
  };

  const handleLikeClick = async (post) => {
    try {
      const isLiked = likedPosts[post._id];
      if (!isLiked) {
        const like = await PostLike(post._id);
        if (like.data?.isLiked) {
          setLikeCount(prev => ({ ...prev, [post._id]: like.data.likeCount }));
          setLikedPosts(prev => ({ ...prev, [post._id]: true }));
        }
      } else {
        const like = await DeleteLike(post._id);
        if (!like.data?.isLiked) {
          setLikeCount(prev => ({ ...prev, [post._id]: like.data.likeCount }));
          setLikedPosts(prev => ({ ...prev, [post._id]: false }));
        }
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger"
      });
    }
  };


  const handClipVoteSubmission = async (post) => {
    try {
      const isVoted = votePosts[post._id];
      if (!isVoted) {
        const vote = await PostVoteSubmission(post._id);
        if (vote.data?.isVoted) {
          setVoteCount(prev => ({ ...prev, [post._id]: vote.data.VoteCount }));
          setvotePosts(prev => ({ ...prev, [post._id]: true }));
        }
      } else {
        // const vote = await DeleteVoteSubmission(post._id);
        // if (!vote.data?.isVoted) {
        //   setVoteCount(prev => ({ ...prev, [post._id]: vote.data.VoteCount }));
        //   setvotePosts(prev => ({ ...prev, [post._id]: true }));
        // }
         setAlert({
        message:"Không thể xóa khi đã vote!",
        variant: "danger"
      });
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger"
      });
    }
  };


  const handleDeletePost = async (postId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {

      await deleteSub(postId);
      setPosts(prev => prev.filter(p => p._id !== postId));
      setAlert({
        message: "Đã xóa bài viết!",
        variant: "success"
      });
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Xóa bài viết thất bại!",
        variant: "danger"
      });
    }
  };
  const handleDeleteCmt = async (commentId, postId) => {
    if (!window.confirm("Bạn có chắc muốn xóa comment này?")) return;
    try {
      await deletecommnet(commentId);
      const updatedComments = commentsData[postId].filter(cmt => cmt._id !== commentId);
      setCommentsData(prev => ({
        ...prev,
        [postId]: updatedComments,
      }));
      setCommentCount(prev => ({
        ...prev,
        [postId]: (prev[postId] || 1) - 1,
      }));

      setAlert({
        message: "Đã xóa bình luận!",
        variant: "success"
      });
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Xóa bình luận thất bại!",
        variant: "danger"
      });
    }
  };

  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" /></div>;
  }

  return (
    <>
      {posts.map(post => (

        <Card key={post._id}  className="mb-3 shadow-sm position-relative">

          <Button
            variant="link"
            size="sm"
            className="position-absolute top-0 end-0 m-2 p-1 border-0"
            onClick={() => handleDeletePost(post._id)}
            style={{ backgroundColor: "transparent", color: "#65676B" }}
            title="Xoá bài viết"
          >
            <FaTimes size={18} />
          </Button>




          <Card.Header className="d-flex align-items-center">
            <Image src={post.avatar || avatar} roundedCircle width={40} height={40} className="me-2" />
            <div>
              <strong>{post.user_name}</strong><br />
              <small className="text-muted">{new Date(post.submitted_at).toLocaleString()}</small>
            </div>
          </Card.Header>

          <Card.Body>
            <Card.Text>{post.title}</Card.Text>
            {post.image && (
              <img src={post.image} alt="" className="img-fluid rounded mb-3" />
            )}

            <div className="mt-3 d-flex justify-content-between align-items-center">
              <Button
                variant="light"
                size="sm"
                className="d-flex align-items-center py-1 px-3 border-0"
                onClick={() => handleLikeClick(post)}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <FaThumbsUp
                  className="me-1"
                  size={18}
                  style={{ color: likedPosts[post._id] ? "#0d6efd" : "#6c757d" }} // Xanh nếu like
                />
                <span style={{ color: likedPosts[post._id] ? "#0d6efd" : "#6c757d" }}>
                  {likeCount[post._id] || 0} Like
                </span>
              </Button>



              <Button variant="outline-secondary" size="sm" className="d-flex align-items-center py-1 px-3 border-0"
                onClick={() => toggleComments(post._id)}>
                <FaComment className="me-1" size={18} />
                {commentCount[post._id] || 0} Comment
              </Button>

              <Button
                variant="light"
                size="sm"
                className="d-flex align-items-center py-1 px-3 border-0"
                onClick={() => handClipVoteSubmission(post)}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <FaStar
                  className="me-1"
                  size={18}
                  style={{ color: votePosts[post._id] ? "#dc3545" : "#6c757d" }} // đỏ nếu đã vote
                />
                <span style={{ color: votePosts[post._id] ? "#dc3545" : "#6c757d" }}>
                  {voteCount[post._id] || 0} Vote
                </span>
              </Button>

            </div>

            {showComments[post._id] && (
              <>
                {(commentsData[post._id] || []).map((cmt, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-start mb-2 mt-3 position-relative"
                  >

                    <Button
                      variant="link"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2 p-1 border-0"
                      onClick={() => handleDeleteCmt(cmt._id, post._id)}
                      style={{ backgroundColor: "transparent", color: "#65676B" }}
                    >
                      <FaTimes size={18} />
                    </Button>

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
                    onChange={(e) =>
                      setInputs(prev => ({ ...prev, [post._id]: e.target.value }))
                    }
                  />
                  <Button onClick={() => postcomments(post._id)}>Gửi</Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      ))}

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          bg={alert.variant === 'success' ? 'success' : 'danger'}
          onClose={() => setAlert({ ...alert, message: null })}
          show={!!alert.message}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {alert.variant === 'success' ? '✅ Thành công' : '❌ Lỗi'}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{alert.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Post;
