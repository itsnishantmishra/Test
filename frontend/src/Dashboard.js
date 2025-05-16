import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/agents-tasks').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Agent Task Dashboard</h2>
      {data.map(({ agent, tasks }) => (
        <div key={agent._id} style={{ marginBottom: '20px' }}>
          <h3>{agent.name} ({agent.email})</h3>
          <ul>
            {tasks.map((task, idx) => (
              <li key={idx}>{task.firstName} - {task.phone} - {task.notes}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
