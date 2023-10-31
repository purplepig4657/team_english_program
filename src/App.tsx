import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './ui/dashboard/Dashboard';
import StudentList from './ui/student_list/StudentList';
import StudentInfo from './ui/student_info/StudentInfo';
import ClassList from './ui/class_list/ClassList';
import ClassInfo from './ui/class_info/ClassInfo';
import ClassManage from './ui/class_manage/ClassManage';
import WeightManage from './ui/weight_manage/WeightManage';

import './App.css';
import AppbarAndDrawer from './components/AppbarAndDrawer';


function App() {
  return (
    <HashRouter>
      <AppbarAndDrawer />
      <Routes>
        <Route path="/" Component={ Dashboard } />
        <Route path="/dashboard" Component={ Dashboard } />
        <Route path="/student_list" Component={ StudentList } />
        <Route path="/student_info" Component={ StudentInfo } />
        <Route path="/class_list" Component={ ClassList } />
        <Route path="/class_info" Component={ ClassInfo } />
        <Route path="/class_manage" Component={ ClassManage } />
        <Route path="/weight_manage" Component={ WeightManage } />
      </Routes>
    </HashRouter>
  );
}

export default App;
