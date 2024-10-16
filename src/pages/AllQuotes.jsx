import React, {useEffect} from 'react'
import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
const AllQuotes = () => {
  const {sendRequest, data: loadedQuotes, error, status} = useHttp(getAllQuotes, true)

useEffect(() => {
  sendRequest() 
}, [sendRequest])
if (status === 'pending' && (!loadedQuotes || loadedQuotes.length === 0)) {
  return <div className='centered'>
    <LoadingSpinner/>
  </div>
}
if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0))  {
  return <h1 className='centered'>No Quotes Found</h1>
}
if (error) {
  return <p className='centered focuced'>{error}</p>
}
    // const DUMMY_QUOTES = [
    //     {
    //         id: 'q1',
    //         author: 'Meerim',
    //         text: 'Learning React is awesome!'
    //     },
    //     {
    //         id: 'q2',
    //         author: 'Aitegin',
    //         text: 'I like JS!'
    //     },
    // ]

  return (
    <QuoteList quotes={loadedQuotes}/>
  )
}

export default AllQuotes