import React from 'react';
import {
  DashboardLayout,
  Header,
  WelcomeHeader,
  InboxCard,
  IncomeVariationsChart,
  NetIncomeChart,
  SalesCard,
  MonthlySalesCard,
  ProjectsTable
} from '../../../components/dashboard';

export default function TeacherDashboard() {
  // Sample data for the dashboard
  const user = {
    name: "Pablo Nicolus",
    location: "NY, USA",
    image: null
  };
  
  const projects = [
    {
      lead: {
        name: "John Doe",
        email: "john@gmail.com"
      },
      name: "Starbuck",
      team: [
        { initials: "AE" },
        { initials: "CA" },
        { initials: "DR" }
      ],
      status: "WORKING",
      week: 20,
      budget: "$56k"
    },
    {
      lead: {
        name: "Martin Loiness",
        email: "martin_lo@gmail.com"
      },
      name: "Starbuck",
      team: [
        { initials: "AE" },
        { initials: "CA" },
        { initials: "DR" }
      ],
      status: "COMPLETE",
      week: 20,
      budget: "$56k"
    },
    {
      lead: {
        name: "Amelia Nelson",
        email: "amelia@gmail.com"
      },
      name: "Starbuck",
      team: [
        { initials: "AE" },
        { initials: "CA" },
        { initials: "DR" }
      ],
      status: "PENDING",
      week: 20,
      budget: "$56k"
    }
  ];

  return (
    <DashboardLayout>
      <Header user={user} />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <WelcomeHeader name={user.name} location={user.location} />
        </div>
        <div className="col-span-4">
          <InboxCard messageCount={23} />
        </div>
        
        <div className="col-span-4">
          <IncomeVariationsChart />
        </div>
        <div className="col-span-4">
          <NetIncomeChart />
        </div>
        <div className="col-span-4">
          <SalesCard amount="5878" salesCount="200-500" />
        </div>
        
        <div className="col-span-4">
          <MonthlySalesCard amount="5878" salesCount="200-500" />
        </div>
        
        <div className="col-span-12">
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </DashboardLayout>
  );
}
