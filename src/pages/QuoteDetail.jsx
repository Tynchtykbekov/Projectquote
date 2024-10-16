import React, {useEffect} from 'react'
import { useParams, Route, Link } from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'
 
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

 

const QuoteDetail = () => {
    const params = useParams()
    const {quoteId} = params
    const {sendRequest, data: loadedQuote,  status, error} = useHttp(getSingleQuote, true)
useEffect(() => {
        sendRequest(quoteId)
}, [sendRequest, quoteId])

 

    // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId)
 
    if (status === 'pending') {
        return <div className='cnetered'>
            <LoadingSpinner/>
        </div>
    }
    if (error) {
        return <p className='centered focuced'>{error}</p>
    }
    

    return (
        <React.Fragment>
            <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
            <div className='centered'>
                <Route path={`/quotes/${params.quoteId}`} exact>
                    <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Loaded Comments</Link>
                </Route>

            </div>
            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>

        </React.Fragment>
    )
}

export default QuoteDetail