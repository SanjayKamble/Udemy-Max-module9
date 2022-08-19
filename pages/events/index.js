import { getAllEvents } from "../../helpers/api.utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullpath = `/events/${year}/${month}/abc`;
    router.push(fullpath);
  }

  return (
    <Fragment>
      <Head>
        <title>All events</title>
        <meta name = "description"content = "Here is list of all the events " />
      </Head>
      <EventsSearch onSearch={findEventsHandler}></EventsSearch>
      <EventList items={events}></EventList>
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate : 60,
  };
}

export default AllEventsPage;
