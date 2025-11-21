import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  Gift, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  ChevronRight,
  ChevronLeft, 
  Bell, 
  Cake,
  Church,
  Menu 
} from 'lucide-react';

// --- Mock Data (Dữ liệu cập nhật từ hình ảnh) ---
// Lưu ý: Năm sinh được giả định là 1990 và năm lễ bổn mạng là 2024 vì hình ảnh chỉ cung cấp ngày/tháng
const INITIAL_MEMBERS = [
  { id: 1, name: 'Đinh Thanh Huy', saintName: 'Giuse', feastDate: '2024-05-01', email: '', phone: '0909091533', role: 'Thành viên', dob: '1981-09-01' },
  { id: 2, name: 'Phương Tuyền', saintName: 'Maria', feastDate: '2024-08-15', email: '', phone: '01867227346', role: 'Thành viên', dob: '1992-01-15' },
  { id: 3, name: 'Nguyễn Thị Ngọc Tuyết', saintName: 'Agnes', feastDate: '2024-01-21', email: '', phone: '0974310246', role: 'Thành viên', dob: '1985-01-22' },
  { id: 4, name: 'Hoa Xinh', saintName: 'Maria', feastDate: '2024-12-08', email: '', phone: '0908395596', role: 'Thành viên', dob: '1982-03-31' },
  { id: 5, name: 'Song Hỷ', saintName: 'Gioan Baotixita', feastDate: '2024-06-24', email: '', phone: '0909144901', role: 'Thành viên', dob: '1983-04-26' },
  { id: 6, name: 'Nguyễn Thị Minh Lý', saintName: 'Têrêsa', feastDate: '2024-10-01', email: '', phone: '0947164509', role: 'Thành viên', dob: '1974-05-01' },
  { id: 7, name: 'Đức Khanh', saintName: 'Phêrô', feastDate: '2024-06-29', email: '', phone: '0933578034', role: 'Thành viên', dob: '1995-05-05' },
  { id: 8, name: 'Thúy Hạnh', saintName: 'Phanxica', feastDate: '2024-03-09', email: '', phone: '0971222957', role: 'Thành viên', dob: '1981-05-10' },
  { id: 9, name: 'Bích Thủy', saintName: 'Têrêsa', feastDate: '2024-10-01', email: '', phone: '0909648550', role: 'Thành viên', dob: '1990-05-22' },
  { id: 10, name: 'Ngọc Tiền', saintName: 'Maria', feastDate: '2024-08-15', email: '', phone: '0985028634', role: 'Thành viên', dob: '1990-06-08' },
  { id: 11, name: 'Hồ Văn Lâm', saintName: 'Phêrô', feastDate: '2024-06-29', email: '', phone: '0903867419', role: 'Thành viên', dob: '1974-08-15' },
  { id: 12, name: 'Minh Trang', saintName: 'Agata', feastDate: '2024-02-05', email: '', phone: '0909948228', role: 'Thành viên', dob: '1968-08-16' },
  { id: 13, name: 'Văn Trung', saintName: 'Gioan Baotixita', feastDate: '2024-06-24', email: '', phone: '0933071068', role: 'Thành viên', dob: '1968-10-07' },
  { id: 14, name: 'Ngọc Diễm', saintName: 'Anna', feastDate: '2024-07-26', email: '', phone: '0977160416', role: 'Thành viên', dob: '1986-11-02' },
  { id: 15, name: 'Ánh Ngân', saintName: 'Maria', feastDate: '2024-08-15', email: '', phone: '01266598011', role: 'Thành viên', dob: '1994-11-05' },
  { id: 16, name: 'Thu Thủy', saintName: 'Maria', feastDate: '2024-10-07', email: '', phone: '0909391439', role: 'Thành viên', dob: '1966-11-22' },
  { id: 17, name: 'Cô Xuân', saintName: 'Anna', feastDate: '2024-07-26', email: '', phone: '', role: 'Thành viên', dob: '1990-12-08' },
  { id: 18, name: 'Công An', saintName: 'Giuse', feastDate: '2024-03-19', email: '', phone: '0903822735', role: 'Thành viên', dob: '1965-12-10' },
];

const INITIAL_EVENTS = [
  { id: 1, title: 'Họp tổng kết tháng 11', date: '2023-11-30', location: 'Phòng họp A', description: 'Báo cáo doanh thu và KPI.' },
  { id: 2, title: 'Year End Party', date: '2023-12-25', location: 'Nhà hàng Sen', description: 'Tiệc tất niên cuối năm.' },
];

// --- Helper Functions ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const formatDateShort = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}`;
};

// Hàm kiểm tra ngày sắp tới
const checkUpcomingDate = (dateString) => {
  if (!dateString) return { isUpcoming: false, daysLeft: 999 };

  const today = new Date();
  const targetDate = new Date(dateString);
  const currentYear = today.getFullYear();
  
  let nextDate = new Date(currentYear, targetDate.getMonth(), targetDate.getDate());
  
  const todayZero = new Date(today);
  todayZero.setHours(0,0,0,0);

  if (nextDate < todayZero) {
    nextDate.setFullYear(currentYear + 1);
  }

  const diffTime = nextDate - todayZero;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  return {
    isUpcoming: diffDays <= 30, 
    daysLeft: diffDays,
    date: nextDate
  };
};

export default function MemberManager() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  // Sửa logic khởi tạo để ưu tiên dữ liệu mới nếu người dùng đã lưu cache cũ
  // Hoặc bạn có thể xóa localStorage.clear() ở console để reset
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('members');
    // Nếu dữ liệu cũ quá ít (mock data cũ), reset về danh sách mới
    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length < 10 && parsed[0]?.name === 'Nguyễn Văn A') {
            return INITIAL_MEMBERS;
        }
        return parsed;
    }
    return INITIAL_MEMBERS;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // State cho Modal/Form
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form States
  const [memberForm, setMemberForm] = useState({ 
    name: '', saintName: '', feastDate: '', 
    email: '', phone: '', role: 'Thành viên', dob: '' 
  });
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '' });
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Persist Data
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('events', JSON.stringify(events));
  }, [members, events]);

  // --- Logic Handlers ---

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMembers(members.map(m => m.id === editingItem.id ? { ...memberForm, id: editingItem.id } : m));
    } else {
      setMembers([...members, { ...memberForm, id: Date.now() }]);
    }
    closeMemberModal();
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa thành viên này?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingItem) {
      setEvents(events.map(ev => ev.id === editingItem.id ? { ...eventForm, id: editingItem.id } : ev));
    } else {
      setEvents([...events, { ...eventForm, id: Date.now() }]);
    }
    closeEventModal();
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Xóa sự kiện này?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const openMemberModal = (member = null) => {
    if (member) {
      setEditingItem(member);
      setMemberForm(member);
    } else {
      setEditingItem(null);
      setMemberForm({ name: '', saintName: '', feastDate: '', email: '', phone: '', role: 'Thành viên', dob: '' });
    }
    setIsMemberModalOpen(true);
  };

  const closeMemberModal = () => setIsMemberModalOpen(false);

  const openEventModal = (event = null) => {
    if (event) {
      setEditingItem(event);
      setEventForm(event);
    } else {
      setEditingItem(null);
      setEventForm({ title: '', date: '', location: '', description: '' });
    }
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => setIsEventModalOpen(false);

  // --- Computed Data ---

  const upcomingBirthdays = useMemo(() => {
    return members
      .map(m => ({ ...m, ...checkUpcomingDate(m.dob) }))
      .filter(m => m.isUpcoming)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [members]);

  const upcomingFeasts = useMemo(() => {
    return members
      .filter(m => m.feastDate)
      .map(m => ({ ...m, ...checkUpcomingDate(m.feastDate) }))
      .filter(m => m.isUpcoming)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [members]);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.saintName && m.saintName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (m.email && m.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (m.phone && m.phone.includes(searchTerm))
  );

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  // --- Components ---

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false); 
      }}
      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 mb-1 group relative ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100'
      } ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
      title={isSidebarCollapsed ? label : ''}
    >
      <Icon size={20} className="flex-shrink-0" />
      
      {!isSidebarCollapsed && <span className="font-medium whitespace-nowrap transition-opacity duration-200">{label}</span>}

      {isSidebarCollapsed && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap shadow-lg transition-opacity duration-200">
          {label}
        </div>
      )}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 transition-transform hover:scale-105 duration-200">
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-20`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );

  // --- Views ---

  const DashboardView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng thành viên" value={members.length} icon={Users} colorClass="bg-blue-500 text-blue-600" />
        <StatCard title="Sinh nhật (30 ngày)" value={upcomingBirthdays.length} icon={Cake} colorClass="bg-pink-500 text-pink-600" />
        <StatCard title="Bổn mạng (30 ngày)" value={upcomingFeasts.length} icon={Church} colorClass="bg-purple-500 text-purple-600" />
        <StatCard title="Sự kiện sắp tới" value={events.filter(e => new Date(e.date) >= new Date()).length} icon={Calendar} colorClass="bg-emerald-500 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Birthday Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-pink-50 to-white">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-pink-500" />
              Sắp sinh nhật
            </h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto max-h-80 custom-scrollbar">
            {upcomingBirthdays.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">Không có sinh nhật sắp tới</div>
            ) : (
              <div className="space-y-3">
                {upcomingBirthdays.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-2 bg-pink-50 rounded-lg border border-pink-100 hover:bg-pink-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 text-sm truncate max-w-[100px]">{member.name}</p>
                        <p className="text-xs text-slate-500">{formatDateShort(member.dob)}</p>
                      </div>
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-white text-pink-600 text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                      {member.daysLeft === 0 ? 'Hôm nay' : `${member.daysLeft} ngày`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feast Day Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-white">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Church className="w-5 h-5 mr-2 text-purple-500" />
              Lễ Bổn Mạng
            </h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto max-h-80 custom-scrollbar">
            {upcomingFeasts.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">Không có lễ bổn mạng sắp tới</div>
            ) : (
              <div className="space-y-3">
                {upcomingFeasts.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-2 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs">
                        {member.saintName ? member.saintName.charAt(0) : '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 text-sm truncate max-w-[100px]">
                           {member.saintName} {member.name}
                        </p>
                        <p className="text-xs text-slate-500">Lễ: {formatDateShort(member.feastDate)}</p>
                      </div>
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-white text-purple-600 text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                       {member.daysLeft === 0 ? 'Hôm nay' : `${member.daysLeft} ngày`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Sự kiện
            </h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto max-h-80 custom-scrollbar">
             {sortedEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 3).length === 0 ? (
               <div className="text-center py-8 text-slate-400 text-sm">Chưa có sự kiện mới</div>
             ) : (
               <div className="space-y-4 relative">
                 <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                 {sortedEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 3).map((event, idx) => (
                   <div key={event.id} className="relative pl-10">
                     <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10"></div>
                     <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                       <p className="text-xs font-bold text-blue-600 mb-1">{formatDate(event.date)}</p>
                       <h4 className="font-medium text-slate-800 text-sm">{event.title}</h4>
                       <p className="text-xs text-slate-500 mt-1 truncate">{event.location}</p>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );

  const MembersView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full animate-fade-in">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Tìm theo tên, tên thánh, email..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => openMemberModal()}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm thành viên
        </button>
      </div>
      
      {/* --- Mobile Card View (Visible on Mobile only) --- */}
      <div className="md:hidden flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                   <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                      {member.name.substring(0, 2).toUpperCase()}
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800">{member.name}</h4>
                      <p className="text-xs text-slate-400">ID: {member.id}</p>
                   </div>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {member.role}
                </span>
              </div>
              
              {/* Card Body */}
              <div className="space-y-2 text-sm text-slate-600 mb-4 border-t border-slate-50 pt-3">
                 <div className="flex justify-between">
                    <span className="text-slate-400">Bổn mạng:</span>
                    <span className="font-medium text-purple-700">
                        {member.saintName ? member.saintName : '--'} 
                        {member.feastDate && ` (${formatDateShort(member.feastDate)})`}
                    </span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-400">Ngày sinh:</span>
                    <span>{formatDate(member.dob)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-400">SĐT:</span>
                    <span className="font-medium">{member.phone || '--'}</span>
                 </div>
                 {member.email && (
                   <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="truncate max-w-[180px]">{member.email}</span>
                   </div>
                 )}
              </div>

              {/* Card Actions */}
              <div className="flex space-x-3">
                 <button 
                    onClick={() => openMemberModal(member)}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center"
                 >
                    <Edit2 size={16} className="mr-1" /> Sửa
                 </button>
                 <button 
                    onClick={() => handleDeleteMember(member.id)}
                    className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center"
                 >
                    <Trash2 size={16} className="mr-1" /> Xóa
                 </button>
              </div>
            </div>
          ))
        ) : (
           <div className="text-center py-8 text-slate-400">Không tìm thấy thành viên nào.</div>
        )}
      </div>

      {/* --- Desktop Table View (Hidden on Mobile) --- */}
      <div className="hidden md:block overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold sticky top-0 z-10">
            <tr>
              <th className="p-4">Họ và Tên</th>
              <th className="p-4">Tên Thánh & Bổn Mạng</th>
              <th className="p-4">Liên hệ</th>
              <th className="p-4">Vai trò</th>
              <th className="p-4">Ngày sinh</th>
              <th className="p-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{member.name}</div>
                        <div className="text-xs text-slate-400">ID: {member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {member.saintName ? (
                      <div>
                        <div className="font-medium text-purple-700">{member.saintName}</div>
                        <div className="text-xs text-slate-500">{member.feastDate ? formatDateShort(member.feastDate) : 'Chưa có ngày'}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-600">{member.email}</div>
                    <div className="text-sm text-slate-500">{member.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {formatDate(member.dob)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openMemberModal(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">Không tìm thấy thành viên nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const EventsView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 animate-fade-in">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="font-bold text-lg text-slate-800">Lịch sự kiện</h2>
        <button 
          onClick={() => openEventModal()}
          className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo sự kiện
        </button>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map(event => {
          const isPast = new Date(event.date) < new Date().setHours(0,0,0,0);
          return (
            <div key={event.id} className={`relative rounded-xl border p-5 transition-all hover:shadow-md flex flex-col h-full ${isPast ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200'}`}>
              {isPast && <div className="absolute top-3 right-3 text-xs font-bold bg-slate-200 text-slate-500 px-2 py-1 rounded">Đã qua</div>}
              
              <div className="mb-3">
                <p className={`text-sm font-bold uppercase tracking-wide mb-1 ${isPast ? 'text-slate-500' : 'text-emerald-600'}`}>
                  {formatDate(event.date)}
                </p>
                <h3 className="text-xl font-bold text-slate-800 leading-tight">{event.title}</h3>
              </div>
              
              <p className="text-sm text-slate-600 mb-4 flex-1">{event.description}</p>
              
              <div className="pt-4 border-t border-slate-100 mt-auto">
                 <div className="flex items-center text-sm text-slate-500 mb-3">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">📍</div>
                    {event.location}
                 </div>
                 <div className="flex justify-end space-x-2">
                    <button onClick={() => openEventModal(event)} className="text-xs font-medium text-blue-600 hover:underline px-2 py-1">Chỉnh sửa</button>
                    <button onClick={() => handleDeleteEvent(event.id)} className="text-xs font-medium text-red-600 hover:underline px-2 py-1">Hủy bỏ</button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-row overflow-hidden">
      
      {/* Sidebar (Desktop & Mobile overlay) */}
      <aside 
        className={`
          bg-white border-r border-slate-200 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out z-30
          fixed md:relative h-full
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className={`p-6 flex items-center h-20 border-b border-slate-100 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold">M</div>
            <span className={`text-xl font-bold text-slate-800 whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              MemberHub
            </span>
          </div>
        </div>
        
        {/* Nav Items (Ẩn thanh cuộn khi thu nhỏ) */}
        <nav className={`p-4 space-y-1 flex-1 ${isSidebarCollapsed ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'}`}>
          <SidebarItem id="dashboard" icon={Users} label="Tổng quan" />
          <SidebarItem id="members" icon={ChevronRight} label="Danh sách thành viên" />
          <SidebarItem id="events" icon={Calendar} label="Sự kiện" />
        </nav>
        
        {/* Toggle Button (Nút mũi tên mới ở dưới cùng) */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex w-full items-center p-4 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors border-t border-slate-100"
        >
           <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
              {/* Mũi tên đảo chiều: Thu nhỏ hiện Right (để mở), Mở rộng hiện Left (để thu) */}
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Thu gọn</span>}
           </div>
        </button>

        {/* Mobile Close Button */}
        <div className="md:hidden p-4 border-t border-slate-100">
          <button onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center py-2 text-slate-500 hover:bg-slate-100 rounded-lg">
             <X size={20} className="mr-2" /> Đóng menu
          </button>
        </div>

        {/* Version Info */}
        <div className={`p-4 border-t border-slate-100 hidden md:block overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'text-center' : ''}`}>
          <div className={`bg-indigo-50 p-3 rounded-lg ${isSidebarCollapsed ? 'bg-transparent p-0' : ''}`}>
            {isSidebarCollapsed ? (
               <span className="text-xs font-bold text-indigo-800 cursor-default" title="v1.1">v1.1</span>
            ) : (
               <p className="text-xs text-indigo-800 font-medium">Hệ thống quản lý nội bộ v1.1</p>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen bg-slate-50 transition-all duration-300">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 py-3 px-4 flex justify-between items-center md:hidden flex-shrink-0">
           <div className="flex items-center space-x-3">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600 p-1">
                <Menu size={24} />
              </button>
              <span className="font-bold text-lg">MemberHub</span>
           </div>
           <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
              AD
           </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                {activeTab === 'dashboard' && 'Xin chào, Quản lý!'}
                {activeTab === 'members' && 'Quản lý thành viên'}
                {activeTab === 'events' && 'Sự kiện & Hoạt động'}
              </h1>
              <p className="text-slate-500">
                {activeTab === 'dashboard' && `Hôm nay là ${formatDate(new Date().toISOString().split('T')[0])}`}
                {activeTab === 'members' && `Tổng số: ${members.length} người`}
                {activeTab === 'events' && 'Lên kế hoạch cho các hoạt động sắp tới'}
              </p>
            </div>

            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'members' && <MembersView />}
            {activeTab === 'events' && <EventsView />}
          </div>
        </div>
      </main>

      {/* --- Modals --- */}

      {/* Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg">{editingItem ? 'Chỉnh sửa thông tin' : 'Thêm thành viên mới'}</h3>
              <button onClick={closeMemberModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveMember} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                <input required type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
              </div>
              
              {/* Phần nhập Tên Thánh và Ngày Bổn Mạng */}
              <div className="grid grid-cols-2 gap-4 bg-purple-50 p-3 rounded-lg border border-purple-100">
                 <div>
                    <label className="block text-sm font-medium text-purple-800 mb-1">Tên Thánh</label>
                    <input type="text" placeholder="Vd: Giuse" className="w-full border border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                      value={memberForm.saintName} onChange={e => setMemberForm({...memberForm, saintName: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-purple-800 mb-1">Ngày mừng bổn mạng</label>
                    <input type="date" className="w-full border border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                      value={memberForm.feastDate} onChange={e => setMemberForm({...memberForm, feastDate: e.target.value})} />
                    <p className="text-[10px] text-purple-600 mt-1">*Chỉ cần đúng ngày/tháng</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh</label>
                    <input required type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={memberForm.dob} onChange={e => setMemberForm({...memberForm, dob: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vai trò</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})}>
                      <option>Thành viên</option>
                      <option>Trưởng nhóm</option>
                      <option>Thư ký</option>
                      <option>Kế toán</option>
                    </select>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={memberForm.email} onChange={e => setMemberForm({...memberForm, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
                  <input type="tel" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={memberForm.phone} onChange={e => setMemberForm({...memberForm, phone: e.target.value})} />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeMemberModal} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Hủy</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center">
                  <Save size={18} className="mr-2" /> Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg">{editingItem ? 'Sửa sự kiện' : 'Tạo sự kiện mới'}</h3>
              <button onClick={closeEventModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên sự kiện</label>
                <input required type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                  value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày diễn ra</label>
                    <input required type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                      value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Địa điểm</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                      value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} />
                 </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả chi tiết</label>
                <textarea rows="3" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                  value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeEventModal} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Hủy</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium flex items-center">
                  <Save size={18} className="mr-2" /> Lưu sự kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        /* Custom Scrollbar for Webkit browsers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; /* slate-300 */
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8; /* slate-400 */
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}

