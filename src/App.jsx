import { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from './pages/forgot-password';
import Home from './pages/user/Home';
import User from './components/Core/Dashboard/users/User';
import AddUser from './pages/user/AddUser';
import Navigation from './components/common/Navigation';
import UserDetails from './pages/user/UserDetails';
import SignInList from './pages/admin/SignInList';
import Feedback from './pages/admin/Feedback';
import UserFeedbackDetails from './pages/admin/UserFeedbackDetails';
import Sidebar from './components/common/Sidebar';
import LeaderBoard from './pages/admin/LeaderBoard/LeaderBoard';
import LeaderboardProfile from './components/Core/Dashboard/Admin/LeaderboardProfile';
import LiveClases from './pages/admin/LiveClasses/LiveClases';
import AddLiveClass from './pages/admin/LiveClasses/AddLiveClass';
import LiveClassDetails from './pages/admin/LiveClasses/LiveClassDetails';
import ManageLiveClass from './pages/admin/LiveClasses/ManageLiveClass';
import Teachers from './pages/admin/TeacherMangement/Teachers';
import TestDetails from './pages/admin/TeacherMangement/TestDetails';
import StudentManagement from './pages/admin/StudentMangemet/StudentManagement';
import AddStudent from './pages/admin/StudentMangemet/AddStudent';
import OneOnclass from './pages/admin/one-on-oneclass/OneOnclass';
import AddoneOnOneclass from './pages/admin/one-on-oneclass/AddoneOnOneclass';
import TeacherList from './pages/admin/TeacherList/TeacherList';
import TeacherDetails from './pages/admin/TeacherList/TeacherDetails';
import AddTeacher from './pages/admin/TeacherList/AddTeacher';
import SupportTicket from './pages/admin/supportTicket/SupportTicket';
import SupportTicketDetails from './pages/admin/supportTicket/SupportTicketDetails';
import ParentReportType from './pages/admin/ParentReportType/ParentReportType';
import AddParentReportType from './pages/admin/ParentReportType/AddParentReportType';
import ParentReportTypeDetails from './pages/admin/ParentReportType/ParentReportTypeDetails';
import ParentSuggestions from './pages/admin/ParentReportType/ParentSuggestions';
import ChangePassword from './pages/admin/ChangePassword/ChangePassword';
import AdminRole from './pages/admin/AdminRole/AdminRole';
import AddAdminRole from './pages/admin/AdminRole/AddAdminRole';
import AdminUser from './pages/admin/AdminUser/AdminUser';
import AdminUserDetails from './pages/admin/AdminUser/AdminUserDetails';
import AddAdminUser from './pages/admin/AdminUser/AddAdminUser';
import Profile from './pages/user/Profile/Profile';
import EditUser from './pages/user/EditUser';
import DataAnalytics from './pages/user/DataAnalytics/DataAnalytics';
import ViewAnalytics from './pages/user/DataAnalytics/ViewAnalytics';
import ConversionRates from './pages/user/DataAnalytics/CoversionRates';
import Parent from './pages/user/Parent';
import Customadduser from './components/common/Customadduser';
import ProtectedRoute from './components/common/ProtectedRoute';
import SubscribedUser from "./components/Core/SubscribedUser"; 
import AddSingleSubscription from './pages/subscriptions/AddSingleSubscription';
import UploadBulkSubscription from './pages/subscriptions/UploadBulkSubscription';
import AddSubscriptionForm from './pages/subscriptions/AddSubscriptionForm';
import Lesson from './components/Lesson/Lession';
import Classes from './components/Lesson/Classes';
import Subjects from './components/Lesson/Subjects';
import Chapters from './components/Lesson/Chapters';
import Payments from './components/Payments/Payments';
import PaymentDetails from './components/Payments/PaymentDetails';
import BankDetails from './components/Payments/BankDetails';
import AddBank from './components/Payments/AddBank';
import ViewBankDetails from './components/Payments/ViewBankDetails';
import EditBankDetails from './components/Payments/EditBankDetails';
import Categories from './components/Categories/Categories';
import AddCategory from './components/Categories/AddCategory';
import UploadBulkCategory from './components/Categories/UploadBulkCategory';
import CategoryDetails from './components/Categories/CategoryDetails';
import SubjectDetails from './components/Categories/SubjectDetails';
import AddSubject from './components/Categories/AddSubject';
import SubjectChapterDetails from './components/Categories/SubjectChapterDetails';
import AddUnitChapter from './components/Categories/AddUnitChapter';
import BulkUploadChapter from './components/Categories/BulkUploadChapter';
import AddUnitTopic from './components/Categories/AddUnitTopic';
import BulkUploadTopic from './components/Categories/BulkUploadTopic';
import UTME from './components/UTME/UTME';
import UTMELesson from './components/UTME/UTMELesson';
import AddSubjectUtme from './components/UTME/AddSubjectUtme';
import CreateSubject from './components/UTME/CreateSubject';
import CreateChapter from './components/UTME/CreateChapterUtme';
import AddTopicUtme from './components/UTME/AddTopicUtme';
import AddMedia from './components/UTME/AddMedia';
import Practice from './components/Practice/Practice';
import PracticeClasses from './components/Practice/PracticeClasses';
import PracticeSubject from './components/Practice/PracticeSubject';
import PracticeChapters from './components/Practice/PracticeChapters';
import PracticeTopic from './components/Practice/PracticeTopic';
// Import the ProtectedRoute component

import { ToastContainer } from 'react-toastify';
import PracticeUnitMediaUpload from './components/Practice/PracticeUnitMediaUpload';
import PracticeBulkMediaUpload from './components/Practice/PracticeBulkMediaUpload';
import PracticeTopicList from './components/Practice/PracticeTopicList';
import Test from './components/Test/Test'



function App() {
  // Add this to bypass the login page
  localStorage.setItem('authToken', 'dev-token-123');
  // End of bypass

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const location = useLocation();

  // Check if the current location matches the login page path
  const isLoginPage = location.pathname === '/';
  const isForgetPage = location.pathname === '/forgot-password';

  return (
    <>
      {/* Render Navigation only if it's not the login page */}
      {!isLoginPage && !isForgetPage && <Navigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      {!isLoginPage && !isForgetPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        
        {/* Protected Routes */}
        <Route
          path="/addusers"
          element={
            <ProtectedRoute>
              <AddUser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdetails"
          element={
            <ProtectedRoute>
              <UserDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Parent"
          element={
            <ProtectedRoute>
              <Parent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditUser"
          element={
            <ProtectedRoute>
              <EditUser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <SignInList isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Home isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Feedback"
          element={
            <ProtectedRoute>
              <Feedback isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserFeedBackDetails"
          element={
            <ProtectedRoute>
              <UserFeedbackDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LeaderBoard"
          element={
            <ProtectedRoute>
              <LeaderBoard isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LeaderBoardProfile"
          element={
            <ProtectedRoute>
              <LeaderboardProfile isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduleliveclasses"
          element={
            <ProtectedRoute>
              <LiveClases isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddLiveClass"
          element={
            <ProtectedRoute>
              <AddLiveClass isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LiveClassDetails"
          element={
            <ProtectedRoute>
              <LiveClassDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ManageLiveClass"
          element={
            <ProtectedRoute>
              <ManageLiveClass isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher"
          element={
            <ProtectedRoute>
              <Teachers isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TestDetails"
          element={
            <ProtectedRoute>
              <TestDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentlistmanagement"
          element={
            <ProtectedRoute>
              <StudentManagement isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddLiveClassStudent"
          element={
            <ProtectedRoute>
              <AddStudent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/one-on-oneclassmanagement"
          element={
            <ProtectedRoute>
              <OneOnclass isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Addone-on-oneClass"
          element={
            <ProtectedRoute>
              <AddoneOnOneclass isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherlistmanagement"
          element={
            <ProtectedRoute>
              <TeacherList isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/TeacherDetails"
          element={
            <ProtectedRoute>
              <TeacherDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/AddTeacher"
          element={
            <ProtectedRoute>
              <AddTeacher isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportmanagement"
          element={
            <ProtectedRoute>
              <SupportTicket isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportTicketDetails"
          element={
            <ProtectedRoute>
              <SupportTicketDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ParentReportType"
          element={
            <ProtectedRoute>
              <ParentReportType isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddParentReportType"
          element={
            <ProtectedRoute>
              <AddParentReportType isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ParentReportTypeDetails"
          element={
            <ProtectedRoute>
              <ParentReportTypeDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ParentSuggestions"
          element={
            <ProtectedRoute>
              <ParentSuggestions isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ChangePassword"
          element={
            <ProtectedRoute>
              <ChangePassword isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminRole"
          element={
            <ProtectedRoute>
              <AdminRole isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddAdminRole"
          element={
            <ProtectedRoute>
              <AddAdminRole isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminUser"
          element={
            <ProtectedRoute>
              <AdminUser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminUserDetails"
          element={
            <ProtectedRoute>
              <AdminUserDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddAdminUser"
          element={
            <ProtectedRoute>
              <AddAdminUser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DataAnalytics"
          element={
            <ProtectedRoute>
              <DataAnalytics isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewAnalytics"
          element={
            <ProtectedRoute>
              <ViewAnalytics isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ConversionRates"
          element={
            <ProtectedRoute>
              <ConversionRates isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
         

<Route
  path="/subscribed-users"
  element={
    <ProtectedRoute>
      <SubscribedUser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </ProtectedRoute>
  }
/>

<Route
  path="/addSingleSubscription"
  element={
    <ProtectedRoute>
      <AddSingleSubscription isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </ProtectedRoute>
  }
/>
<Route
  path="/UploadBulkSubscription"
  element={
    <ProtectedRoute>
      <UploadBulkSubscription isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </ProtectedRoute>
  }
/>
<Route
  path="/UploadBulkSubscription"
  element={
    <ProtectedRoute>
      <UploadBulkSubscription isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-subscription-form"
  element={
    <ProtectedRoute>
      <AddSubscriptionForm isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </ProtectedRoute>
  }
/>
<Route 
        path="/lesson" 
        element={
          <ProtectedRoute>
            <Lesson isOpen={isSidebarOpen} />
          </ProtectedRoute>
        } 

      />

<Route 
  path="/classes" 
  element={
    <ProtectedRoute>
      <Classes isOpen={isSidebarOpen} /> 
    </ProtectedRoute>
  } 
/>
<Route 
  path="/subjects" 
  element={
    <ProtectedRoute>
      <Subjects isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/chapters" 
  element={
    <ProtectedRoute>
      <Chapters isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/payments" 
  element={
    <ProtectedRoute>
      <Payments isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/payments/details" 
  element={
    <ProtectedRoute>
      <PaymentDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/payments/bank-details" 
  element={
    <ProtectedRoute>
      <BankDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/payments/view-bank" 
  element={
    <ProtectedRoute>
      <ViewBankDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>


<Route 
  path="/payments/add-bank" 
  element={
    <ProtectedRoute>
      <AddBank isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/payments/edit-bank" 
  element={
    <ProtectedRoute>
      <EditBankDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/categories" 
  element={
    <ProtectedRoute>
      <Categories isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/categories/add-category" 
  element={
    <ProtectedRoute>
      <AddCategory isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/categories/upload-bulk" 
  element={
    <ProtectedRoute>
      <UploadBulkCategory isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/categories/details/:name" 
  element={
    <ProtectedRoute>
      <CategoryDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>



<Route 
  path="/subjectsdetails" 
  element={
    <ProtectedRoute>
      <SubjectDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>



<Route 
  path="/add-subject" 
  element={
    <ProtectedRoute>
      <AddSubject isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>



<Route 
  path="/subjects/:subjectName" 
  element={
    <ProtectedRoute>
      <SubjectChapterDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>



      
<Route 
  path="/add-unit-chapter" 
  element={
    <ProtectedRoute>
      <AddUnitChapter isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>




      
<Route 
  path="/bulk-upload-chapter" 
  element={
    <ProtectedRoute>
      <BulkUploadChapter isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>




<Route 
  path="/add-unit-topic" 
  element={
    <ProtectedRoute>
      <AddUnitTopic isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route path="/bulk-upload-topic" element={<BulkUploadTopic />} />

<Route 
  path="/bulk-upload-topic" 
  element={
    <ProtectedRoute>
      <BulkUploadTopic isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/utme" 
  element={
    <ProtectedRoute>
      <UTME isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>


<Route 
  path="/utme-lesson" 
  element={
    <ProtectedRoute>
      <UTMELesson isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-subject-utme" 
  element={
    <ProtectedRoute>
      <AddSubjectUtme isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/create-new-subject" 
  element={
    <ProtectedRoute>
      <CreateSubject isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/create-chapter" 
  element={
    <ProtectedRoute>
      <CreateChapter isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>


<Route 
  path="/add-topic-utme" 
  element={
    <ProtectedRoute>
      <AddTopicUtme isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-media" 
  element={
    <ProtectedRoute>
      <AddMedia isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/practice" 
  element={
    <ProtectedRoute>
      <Practice isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/practice-classes" 
  element={
    <ProtectedRoute>
      <PracticeClasses isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/practice-subject" 
  element={
    <ProtectedRoute>
      <PracticeSubject isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/practice-chapters" 
  element={
    <ProtectedRoute>
      <PracticeChapters isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/practice-topic" 
  element={
    <ProtectedRoute>
      <PracticeTopic isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/practice-media-upload" 
  element={
    <ProtectedRoute>
      <PracticeUnitMediaUpload isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/bulk-upload-media" 
  element={
    <ProtectedRoute>
      <PracticeBulkMediaUpload isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/practice-topic-list" 
  element={
    <ProtectedRoute>
      <PracticeTopicList isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/test" 
  element={
    <ProtectedRoute>
      <Test isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>






        <Route path='/UploadBulkUser' element={ <ProtectedRoute>
          <Customadduser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </ProtectedRoute> } />
      </Routes>
      
      
      <ToastContainer position="top-right"
    autoClose={2000}
    ProgressBar={true}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnHover={false}/>
    </>
  );
}

export default App;

