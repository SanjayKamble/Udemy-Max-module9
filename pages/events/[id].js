import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api.utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import Head from "next/head";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">

        <p>no event found</p>
      </div>
    ) 
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name = "description" content = {event.description}/>
        </Head>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      ></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate:30
  };
}

//this function will tell next for which parameters value the page should be prerendered,
//and for which value getStaticProps() should be called
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  // go through all the events (event.map) and get a event from there whose  id(event.id).
  //  then assign that particular id into filename [id] and return that as params object as paths
  const paths = events.map((event) => ({ params: {id: event.id } }));
  return {
    paths: paths,// this path will be used by context object of getStaticProps()
    fallback: 'blocking'
  };
}

export default EventDetailPage;
