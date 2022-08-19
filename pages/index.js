//we have to pre-render this page ,
// we will use static generation because this page should be understood by search engine

import {getFeaturedEvents} from '../helpers/api.utils'
import EventList from '../components/events/event-list';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage(props){
   
   
    return (
        <div>
            <Head>
              <title>next js app</title>
              <meta name = "description" content = "this app has list of events for networking among introverts"/>
            </Head>
            <NewsletterRegistration />
          <EventList items = {props.events}/>
        </div>
    )
}

export async function getStaticProps(){

  const featuredEvents = await getFeaturedEvents(); 
  return {
    props :{
      events :featuredEvents// this should be fetched from firebase
    },
    revalidate : 1800
  }
}

export default HomePage;