

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './React_JS_Code/Index';  
import Student from './React_JS_Code/Student';
import Admin from './React_JS_Code/Admin';
import Paper_Setter from './React_JS_Code/Paper_Setter';
import Centre from './React_JS_Code/Centre';
import Change_Password from './React_JS_Code/Change_Password';
import Add_User from './React_JS_Code/Add_User';
import Make_Announcement from './React_JS_Code/Make_Announcement';
import Announcement from './React_JS_Code/StudentAnnouncements';
import StudentQuery from './React_JS_Code/StudentQuery';
import PaperSetterResponse from './React_JS_Code/PaperSetterResponse';
import ViewCenter from './React_JS_Code/View_Center';
import Admin_Center from './React_JS_Code/Admin_Center';
import Center_Student from './React_JS_Code/Center_Student';
import Report_Student from './React_JS_Code/Report_Student';
import See_ReportedStudent from './React_JS_Code/See_ReportedStudents';
import Publish_Result from './React_JS_Code/Publish_Result';
import Result_View from './React_JS_Code/Result_View';
import PaperView from './React_JS_Code/PaperView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/student" element={<Student/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/paper_setter" element={<Paper_Setter/>}/>
        <Route path="/centre" element={<Centre/>}/>
        <Route path="/change_password" element={<Change_Password/>}/>
        <Route path="/add_user" element={<Add_User/>}/>
        <Route path="/make_announcement" element={<Make_Announcement/>}/>
        <Route path="/announcement" element={<Announcement/>}/>
        <Route path="/studentquery" element={<StudentQuery/>}/>
        <Route path="/papersetterresponse" element={<PaperSetterResponse/>}/>
        <Route path="/view_center" element={<ViewCenter/>}/>
        <Route path="/admin_center" element={<Admin_Center/>}/>
        <Route path="/center_student" element={<Center_Student/>}/>
        <Route path="/report_student" element={<Report_Student/>}/>
        <Route path="/see_reportedstudent" element={<See_ReportedStudent/>}/>
        <Route path="/publish" element={<Publish_Result/>}/>
        <Route path="/result_view" element={<Result_View/>}/>
        <Route path="/paperview" element={<PaperView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
