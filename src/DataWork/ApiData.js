const APiData = async () => {
    try {
      const fetchdata = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await fetchdata.json();
      
      let tickets = data.tickets;
      const users = data.users;
  
      // Define the possible ticket statuses
      const allStatuses = ["Backlog","Todo", "In progress", "Done", "Canceled"]; // Add all possible statuses here
      
      // Get the current statuses from the API response
      const existingStatuses = [...new Set(tickets.map(ticket => ticket.status))];
  
      // Find the missing statuses
      const missingStatuses = allStatuses.filter(status => !existingStatuses.includes(status));
  
      missingStatuses.forEach(status => {
        tickets.push({
          id: ``,
          title: ``,
          userId: ``,
          priority: `-1`,
          status: status // Keep only the status to group, leave the rest blank
        });
      });
  
      return { tickets, users };
    } catch (error) {
      console.error("Error fetching API data:", error);
      return { tickets: [], users: [] };  // Return empty arrays in case of error
    }
  };
  
  export default APiData;
  