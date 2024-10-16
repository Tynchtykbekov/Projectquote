import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};


const QuoteList = (props) => {
const history = useHistory()
const location = useLocation()
console.log(history);
console.log(location);
const quaryParams = new URLSearchParams(location.search) // sort=asc
const isSortingAscending = quaryParams.get('sort') === 'asc'
console.log(isSortingAscending);


const sortChangeHandler = () => {
    // history.push(`${location.pathname}?sort=${(isSortingAscending ? 'decs' : 'asc')}`)
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'decs' : 'asc')}`
    })
}

const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)

  return (
    <>
      <div className={classes.sorting}>
          <button onClick={sortChangeHandler}>Sort {isSortingAscending ? 'Ascending' : 'Decsending' }</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>


  );
};

export default QuoteList;

// http://localhost:3000/quotes?sort=acs => search params / quary params = динимический роутинг
// http: //project?modal=false
// http://localhost:3000/quotes/:quoteId ==> path variable

