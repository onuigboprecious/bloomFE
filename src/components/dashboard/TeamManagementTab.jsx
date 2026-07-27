import React, { useState } from 'react';
import { Users, UserPlus, Shield, UserX, CheckCircle2, Search, Edit3, MoreHorizontal } from 'lucide-react';
import Button from '../ui/Button';
import { mockTeamCards } from '../../data/mockData';

export const TeamManagementTab = () => {
  const [members, setMembers] = useState(mockTeamCards);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const toggleDeactivate = (id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'Active' ? 'Deactivated' : 'Active' }
          : m
      )
    );
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || m.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Enterprise Team Roster</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold text-[10px]">
              Business Tier
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage company staff cards, bulk reassign hardware, or instantly deactivate offboarded staff.
          </p>
        </div>

        <Button variant="primary" size="md" className="bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-md">
          <UserPlus className="w-4 h-4 mr-1.5" />
          Add Staff Member
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search staff by name or email..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#00BCFF]"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
        >
          <option value="All">All Departments</option>
          <option value="Executive">Executive</option>
          <option value="Operations">Operations</option>
          <option value="Sales">Sales</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>

      {/* Staff Members Table */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3">Employee</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Card UID</th>
                <th className="px-5 py-3">Total Taps</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-slate-900 dark:text-white block">{member.name}</span>
                    <span className="text-[11px] text-slate-400">{member.title} • {member.email}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-medium text-[11px]">
                      {member.department}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {member.cardUid}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {member.taps}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        member.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => toggleDeactivate(member.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        member.status === 'Active'
                          ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {member.status === 'Active' ? 'Deactivate (Offboard)' : 'Re-activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamManagementTab;
