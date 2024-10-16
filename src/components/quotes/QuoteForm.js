import { useRef, useState, Fragment, useEffect } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './QuoteForm.module.css';

 import LoadingSpinner from '../UI/LoadingSpinner'

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false)
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const history = useHistory()
//  useEffect(() => {
//   history.push('/quotes')
//  }, [history] )


  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
    event.target.reset()
   history.push('/quotes')

  }

  const formFocusHandler = () => setIsEntering(true)
  const finishEntering = () => {
      setIsEntering(false)
  }
  

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location) => 'Are you sure you want go to'}/>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler} onFocus={formFocusHandler}>
      {props.isLoading  &&
      <div className={classes.loading}>
        <LoadingSpinner/>
      </div> }

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEntering}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
