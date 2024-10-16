import { useState, useEffect } from "react";
import classes from "./Comments.module.css";
import { useParams } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";
import { getAllComments } from "../../lib/api";
 
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
const params = useParams()
const {quoteId} = params
const {sendRequest, status, data: loadedComments, error} = useHttp(getAllComments, true)
 useEffect(() => {
  sendRequest(quoteId)
 }, [sendRequest, quoteId])
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  let comments 
  if (status === 'pending') {
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }
   
  if (error) {
  comments = <p className="centered focuced">{error}</p>
  }
  if (status === 'completed' && (!loadedComments || loadedComments.length === 0))
  comments = <h1 className="centered">No comments were added yet!</h1>
  if (status === 'completed' && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments}/>
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId}/>}

 {comments}
    </section>
  );
};

export default Comments;
