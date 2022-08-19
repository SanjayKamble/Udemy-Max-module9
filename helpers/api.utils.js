export async function getAllEvents(){
const response = await fetch("https://swr-project-62a8e-default-rtdb.firebaseio.com/events.json");
const data = await response.json();



// firebase returns data in form of objects.Below code is to convert object into array
const events = [];

for (const key in data){
    events.push({
        id:key,
        ...data[key]  // distributing data from database into events array
    });
}

return events;// the promise will resolve to this events array

}



export async function getFeaturedEvents(){
    const allEvents = await getAllEvents();
    return allEvents.filter((eventt)=>eventt.isFeatured);
}


export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  }


  export async function getFilteredEvents(dateFilter){
      const { year,month} = dateFilter;
      const allEvents = await getAllEvents();

      let filteredEvents = allEvents.filter((event)=>{
          const eventDate = new Date(event.date);
          return eventDate.getFullYear()===year && eventDate.getMonth()===month-1;
      })
      return filteredEvents;

  }