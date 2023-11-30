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
import {useMediaQuery} from "react-responsive";
import {DRAWER_WIDTH, MOBILE_SCREEN_MAX_WIDTH} from "./constants/GlobalConstants";
import StudentUpdate from "./ui/student_update/StudentUpdate";
import ClassUpdate from "./ui/class_update/ClassUpdate";
import LectureUpdate from "./ui/lecture_update/LectureUpdate";


function App() {
    const isMobileScreen = useMediaQuery({ maxWidth: MOBILE_SCREEN_MAX_WIDTH });
    let drawerWidth;
    let screenWidth;

    if (isMobileScreen) drawerWidth = 0;
    else drawerWidth = DRAWER_WIDTH;

    screenWidth = `calc(100vw - ${drawerWidth}px)`;

    return (
        <HashRouter>
          <AppbarAndDrawer />
          <Routes>
            <Route path="/" element={<Dashboard drawerWidth={`${drawerWidth}`} />} />
            <Route path="/dashboard" element={<Dashboard drawerWidth={`${drawerWidth}`} />} />
            <Route path="/student_list" Component={ StudentList } />
            <Route path="/student_info" element={<StudentInfo drawerWidth={drawerWidth} /> } />
            <Route path="/student_update" Component={ StudentUpdate } />
            <Route path="/class_list" Component={ ClassList } />
            <Route path="/class_info" element={ <ClassInfo drawerWidth={drawerWidth} /> } />
            <Route path="/class_update" Component={ ClassUpdate } />
            <Route path="/class_manage" Component={ ClassManage } />
            <Route path="/lecture_update" Component={ LectureUpdate } />
            <Route path="/weight_manage" Component={ WeightManage } />
          </Routes>
        </HashRouter>
    );
}

export default App;
