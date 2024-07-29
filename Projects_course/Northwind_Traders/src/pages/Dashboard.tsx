import React, { FC, useEffect, useState } from 'react';
import { fetchData } from '../utils/fetch';
import dashboardData from "../response.json";

interface LogData {
  logs: string;
  logsData: string;
  resultsCount: number;
}

interface DashboardData {
  sqlLogs: LogData[];
}

interface LocationData {
  location: string;
}

const Dashboard: FC = () => {
  const [data, setData] = useState<DashboardData | null>(dashboardData);
  // const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {

        const customers = await fetchData("/customers");
        await fetchData("/suppliers");
        
        console.log(customers)

        const data = await fetchData("/dashboard/logs");
        console.log(data)

        // console.log(data)
        // const [dashboardResponse, locationResponse] = await Promise.all([
        //   fetchData('/dashboard/logs'),
        //   fetchData('/dashboard/location')
        // ]);
        // setData(dashboardResponse);
        // setLocationData(locationResponse);
        // console.log(dashboardResponse)
        // console.log(locationResponse)

        // setData(data);

        // setData(dashboardData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    void fetchDashboardData();
  }, []);

  if (loading) {
    return <h4>Loading Dashboard Data</h4>;
  }

  if (error) {
    return <h4>An error has occurred: {error}</h4>;
  }

  // if (!data || !locationData) {
  //   return <h4>No Data</h4>;
  // }

  const { sqlLogs } = data;

  const queryCount = sqlLogs?.length ?? 0;
  const resultsCount = sqlLogs?.reduce((sum, log) => sum + log.resultsCount, 0) ?? 0;
  const selectCount = sqlLogs?.filter(log => log.logs.toLowerCase().startsWith('select')).length ?? 0;
  const selectWhereCount = sqlLogs?.filter(log => log.logs.toLowerCase().includes('where')).length ?? 0;
  const selectLeftJoinCount = sqlLogs?.filter(log => log.logs.toLowerCase().includes('left join')).length ?? 0;

  return (
    <section className="dashboard">
      <div className="dashboard__worker">
        <h2 className="dashboard__title">Worker</h2>
        <p className="dashboard__text">Colo: KBP</p>
        <p className="dashboard__text">Country: UA</p>
      </div>
      <div className="dashboard__sql">
        <h2 className="dashboard__title">SQL Metrics</h2>
        <p className="dashboard__text">Query count: {queryCount}</p>
        <p className="dashboard__text">Results count: {resultsCount}</p>
        <p className="dashboard__text"># SELECT: {selectCount}</p>
        <p className="dashboard__text"># SELECT WHERE: {selectWhereCount}</p>
        <p className="dashboard__text"># SELECT LEFT JOIN: {selectLeftJoinCount}</p>
      </div>
      <div className="dashboard__log">
        <h2 className="dashboard__title">Activity log</h2>
        <p className="dashboard__text dashboard__text--small">
          Explore the app and see metrics here
        </p>
        {sqlLogs?.map((log, index) => (
          <article key={index} className="dashboard__article">
            <p className="dashboard__text__data">{log.logsData}</p>
            <p className="dashboard__text">{log.logs.toUpperCase()}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;