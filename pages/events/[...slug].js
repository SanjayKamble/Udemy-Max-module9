import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// import { getFilteredEvents } from "../../helpers/api.utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://swr-project-62a8e-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      // console.log("inside useEffect"+events);
      setLoadedEvents(events);
    }
  }, [data]);

let pageHeadData = <Head>
  <title> Filtered events</title>
  <meta name = "description" content = "List of filtered events"></meta>
</Head>

  if (!loadedEvents) {
    return <Fragment>
      {pageHeadData}
      <p className="center">Loading...</p>;
      </Fragment>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title> Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  // this will be rendered if there is some error in the prop returned by getServerSideProps()
  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <div className="center">
          <ErrorAlert>
            <p>invalid filter. please adjust your values</p>
            <Button link="/events">Show all events</Button>
          </ErrorAlert>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // to check if data matches the events through date
  // this will be rendered if no data is found for the given input
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <div className="center">
          <ErrorAlert>
            <p>no events found for the chosen filter!</p>
            <Button link="/events">Show all events</Button>
          </ErrorAlert>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filteredData = params.slug;
//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numMonth) ||
//     isNaN(numYear) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth > 12

//   ) {
//     return {
//       props: { hasError: true },

//       // notFound:true,

//       //redirect:{
//       //destination :'/error'
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
