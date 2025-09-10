import React from 'react';
import Image from 'next/image';

const ProjectsTable = ({ projects }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Projects of the month</h3>
        <p className="text-sm text-gray-500">Overview of latest month</p>
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-3 font-medium">Team Lead</th>
            <th className="pb-3 font-medium">Project</th>
            <th className="pb-3 font-medium">Team</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Week</th>
            <th className="pb-3 font-medium">Budget</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border-t border-gray-100">
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {/* Placeholder for profile image */}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{project.lead.name}</p>
                    <p className="text-xs text-gray-500">{project.lead.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 text-sm">{project.name}</td>
              <td className="py-3">
                <div className="flex -space-x-2">
                  {project.team.map((member, idx) => (
                    <div key={idx} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                      {member.initials}
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-3">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  project.status === 'COMPLETE' ? 'bg-green-100 text-green-600' :
                  project.status === 'WORKING' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {project.status}
                </span>
              </td>
              <td className="py-3 text-sm">{project.week}</td>
              <td className="py-3 text-sm font-medium">{project.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
