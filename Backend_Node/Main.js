const express = require('express');
const path = require('path');
const router = express.Router();


const IndexRoutes=require('./Index.js');
const ClientRoutes=require('./Client.js');
const ChangePasswordRoutes=require('./Change_Password.js');
const AddUserRoutes=require('./Add_User.js');
const MakeAnnouncementRoutes=require('./Make_Announcement.js');
const AnnouncementsRoutes=require('./StudentAnnouncements.js');
const QueryRoutes=require('./Query.js');
const ViewCenterRoutes=require('./View_Center.js');
const AdminCenterRoutes=require('./Admin_Center.js');
const CenterStudentRoutes=require('./Center_Student.js');
const ReportStudentRoutes=require('./Report_Student.js');
const ResultRoutes=require('./Result.js');
const PaperRoutes=require('./Paper.js');

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use('/', IndexRoutes);
app.use('/change_password',ChangePasswordRoutes);
app.use('/add_user',AddUserRoutes);
app.use('/make_announcement',MakeAnnouncementRoutes);
app.use('/announcement',AnnouncementsRoutes);
app.use('/q',QueryRoutes);
app.use('/view_center',ViewCenterRoutes);
app.use('/admin_center',AdminCenterRoutes);
app.use('/center_student',CenterStudentRoutes);
app.use('/report',ReportStudentRoutes);
app.use('/result',ResultRoutes);
app.use('/paper',PaperRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



