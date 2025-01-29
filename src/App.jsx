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
import TestClass from './components/Test/TestClass';
import TestSubject from './components/Test/TestSubject';
import TestChapter from './components/Test/TestChapter';
import TestTopics from './components/Test/TestTopics';
import TestUnitMediaUpload from './components/Test/TestUnitMediaUpload';
import TestBulkMediaUpload from './components/Test/TestBulkMediaUpload';
import TestTopicList from './components/Test/TestTopicList';
import AddTest from './components/Test/AddTest';
import TestDetail from './components/Test/TestDetails';
import UniversityList from './components/QuestionBank/UniversityList';
import UniversitySubjects from './components/QuestionBank/UniversitySubjects';
import UniversityAddSubject from './components/QuestionBank/UniversityAddSubject';
import UniversityAddPdf from './components/QuestionBank/UniversityAddPdf';
import UniversitySubjectDetail from './components/QuestionBank/UniversitySubjectDetail';
import UniList from './components/UniversityList/UniList';
import UniAdd from './components/UniversityList/UniAdd';
import EBook from './components/E-Book/EBook';
import AddSingleEbook from './components/E-Book/AddSingleEbook';
import AddBulkEbook from './components/E-Book/AddBulkEbook';
import  EBookDetails from './components/E-Book/EbookDetails';
import EbookList from './components/E-Book/EbookList';
import EbookOrderList from './components/E-Book/EbookOrderList';
import ResellerForm from './components/ResellerForm/ResellerForm';
import ResellerFormDetails from './components/ResellerForm/ResellerFormDetails';
import SevenHabitsBootcamp from './components/7HabitsBootcamp/7HabitsBootcamp';
import RegistrationDetails from './components/7HabitsBootcamp/RegistrationDetails';
import AddParticipant from './components/7HabitsBootcamp/AddParticipant';
import JAMBtutorial from './components/JAMB and SSCE Tutorial/JAMBtutorial';
import TutorialDetails from './components/JAMB and SSCE Tutorial/TutorialDetails';
import AddSingleParticipant from './components/JAMB and SSCE Tutorial/AddSingleParticipant';
import SummerCamp from './components/SummerCamp/SummerCamp';
import AddSingleCampParticipant from './components/SummerCamp/AddSIngleSummerCampParticipant';
import SummerCampDetails from './components/SummerCamp/SummerCampDetails';
import JobOpenings from './components/HumanResource/JobOpening';
import AddJobForm from './components/HumanResource/AddJobForm';
import JobDetails from './components/HumanResource/JobDetails';
import SubscriptionTypes from './components/SubscriptionTypes/SubscriptionTypes';
import SubscriptionPlanDetails from './components/SubscriptionTypes/SubscriptionPlanDetails';
import AddSubscriptionPlan from './components/SubscriptionTypes/AddSubscriptionPlan';
import PromoCodes from './components/PromoCodes/PromoCodes';
import AddPromoCode from './components/PromoCodes/AddPromoCode';
import PromoCodeDetails from './components/PromoCodes/PromoCodeDetails';
import AboutUs from './components/TeesasCorner/AboutUs';
import AddAboutUs from './components/TeesasCorner/AddAboutUs';
import PrivacyPolicy from './components/TeesasCorner/PrivacyPolicy';
import AddPrivacyPolicy from './components/TeesasCorner/AddPrivacyPolicy';
import Testimonials from './components/TeesasCorner/Testimonials';
import AddTestimonial from './components/TeesasCorner/AddTestimonial';
import ContactUs from './components/TeesasCorner/ContactUs';
import AddContactUs from './components/TeesasCorner/AddContactUs';
import Banner from './components/Banner/Banner';
import AddBanner from './components/Banner/AddBanner';
import BannerDetails from './components/Banner/BannerDetails';
import SalesTeam from './components/SalesTeam/SalesTeam';
import SalesTeamDetails from './components/SalesTeam/SalesTeamDetails';
import AddSalesTeam from './components/SalesTeam/AddSalesTeam';
import PushNotification from './components/PushNotification/PushNotification';
import AddNotification from './components/PushNotification/AddNotification';
import NotificationDetails from './components/PushNotification/NotificationDetails';
import CountryList from './components/Country/CountryList';
import AddCountry from './components/Country/AddCountry';
import CountryDetails from './components/Country/CountryDetails';
import Badges from './components/Badges/Badges';
import AddBadge from './components/Badges/AddBadge';
import BadgeDetails from './components/Badges/BadgeDetails';
import UserReport from './components/UserReport/UserReport';
import UserReportDetails from './components/UserReport/UserReportDetails';
import ProductList from './components/Store/ProductList';
import AddStoreItem from './components/Store/AddStoreItem';
import StoreItemDetails from './components/Store/StoreItemDetails';
import OrderItemDetails from './components/Store/OrderItemDetails';
import DonationEnquiry from './components/DonationEnquiry/DonationEnquiry';
import DonationDetails from './components/DonationEnquiry/DonationDetails';
import Topics from './components/Lesson/Topics';
import AddUnitMedia from './components/Lesson/AddUnitMedia';
import TopicDetails from './components/Lesson/TopicDetail';
import AddPracticeUtme from './components/UTME/AddPracticeUtme';
import AddPractice from './components/Practice/AddPractice';
import AddTestUtme from './components/UTME/AddTestUtme';
import PracticeDetails from './components/Practice/PracticeDetails';
import UniversityViewPdf from './components/QuestionBank/UniversityViewPdf';
import AddBulkSummerCampParticipant from './components/SummerCamp/AddBulkSummerCampParticipant';
import AddBulkJambParticipant from './components/JAMB and SSCE Tutorial/AddBulkJambParticipant';
import AddBulk7HabitBootcamp from './components/7HabitsBootcamp/AddBulk7HabitBootcamp';
import SignupPage from './pages/login/signup';



function App() {

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

        // Change this route
<Route
  path="/signup"
  element={<SignupPage />} 
/>
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
  path="/topics" 
  element={
    <ProtectedRoute>
      <Topics isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/add-unit-media" 
  element={
    <ProtectedRoute>
      <AddUnitMedia isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/topic-details"
  element={
    <ProtectedRoute>
      <TopicDetails isOpen={isSidebarOpen} />
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
  path="/topic/:topicId" 
  element={
    <ProtectedRoute>
      <TopicDetails isOpen={isSidebarOpen} />
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
  path="/add-practice-utme" 
  element={
    <ProtectedRoute>
      <AddPracticeUtme isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/add-test-utme" 
  element={
    <ProtectedRoute>
      <AddTestUtme isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
add-practice

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
  path="/add-practice" 
  element={
    <ProtectedRoute>
      <AddPractice isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/practice-details" 
  element={
    <ProtectedRoute>
      <PracticeDetails isOpen={isSidebarOpen} />
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
<Route 
  path="/test-class" 
  element={
    <ProtectedRoute>
      <TestClass isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/test-subject" 
  element={
    <ProtectedRoute>
      <TestSubject isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/test-chapter" 
  element={
    <ProtectedRoute>
      <TestChapter isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/test-topic" 
  element={
    <ProtectedRoute>
      <TestTopics isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/Testbulk-media-upload" 
  element={
    <ProtectedRoute>
      <TestBulkMediaUpload isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/testUnit-media-upload" 
  element={
    <ProtectedRoute>
      <TestUnitMediaUpload isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/test-topic-list" 
  element={
    <ProtectedRoute>
      <TestTopicList isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/add-test" 
  element={
    <ProtectedRoute>
      <AddTest isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/test-detail" 
  element={
    <ProtectedRoute>
      <TestDetail isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/question-bank" 
  element={
    <ProtectedRoute>
      <UniversityList isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/university-subjects" 
  element={
    <ProtectedRoute>
      <UniversitySubjects isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/university-add-subject" 
  element={
    <ProtectedRoute>
      <UniversityAddSubject isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/university-add-pdf" 
  element={
    <ProtectedRoute>
      <UniversityAddPdf isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/university-view-pdf"
  element={
    <ProtectedRoute>
      <UniversityViewPdf isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/university-subject-detail" 
  element={
    <ProtectedRoute>
      <UniversitySubjectDetail isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>


<Route 
  path="/uni-list" 
  element={
    <ProtectedRoute>
      <UniList isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/uni-add" 
  element={
    <ProtectedRoute>
      <UniAdd isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/e-book" 
  element={
    <ProtectedRoute>
      <EBook isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-single-ebook" 
  element={
    <ProtectedRoute>
      <AddSingleEbook isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/add-bulk-ebook" 
  element={
    <ProtectedRoute>
      <AddBulkEbook isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/ebook-details" 
  element={
    <ProtectedRoute>
      <EBookDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/ebook-list" 
  element={
    <ProtectedRoute>
      <EbookList isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/ebook-orders" 
  element={
    <ProtectedRoute>
      <EbookOrderList isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/resellerform" 
  element={
    <ProtectedRoute>
      <ResellerForm isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/reseller-form-details" 
  element={
    <ProtectedRoute>
      <ResellerFormDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/7habitsbootcamp" 
  element={
    <ProtectedRoute>
      <SevenHabitsBootcamp isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/registration-details" 
  element={
    <ProtectedRoute>
      <RegistrationDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
/bulk-upload
<Route 
  path="/bulk-upload" 
  element={
    <ProtectedRoute>
      <AddBulk7HabitBootcamp isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/add-participant" 
  element={
    <ProtectedRoute>
      <AddParticipant isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/jamb-ssce" 
  element={
    <ProtectedRoute>
      <JAMBtutorial isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/tutorial-details" 
  element={
    <ProtectedRoute>
      <TutorialDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-single-participant" 
  element={
    <ProtectedRoute>
      <AddSingleParticipant isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-bulk-participant" 
  element={
    <ProtectedRoute>
      <AddBulkJambParticipant isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/summercamp" 
  element={
    <ProtectedRoute>
      <SummerCamp isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-single-summer-camp-participant" 
  element={
    <ProtectedRoute>
      <AddSingleCampParticipant isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/add-bulk-summer-camp-participant" 
  element={
    <ProtectedRoute>
      <AddBulkSummerCampParticipant isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/summer-camp-details" 
  element={
    <ProtectedRoute>
      <SummerCampDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/job-opening" 
  element={
    <ProtectedRoute>
      <JobOpenings isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>



<Route 
  path="/add-unit-job" 
  element={
    <ProtectedRoute>
      <AddJobForm isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>


<Route 
  path="/job-details" 
  element={
    <ProtectedRoute>
      <JobDetails isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/subscription-types" 
  element={
    <ProtectedRoute>
      <SubscriptionTypes isOpen={isSidebarOpen} />
    </ProtectedRoute>
  } 
/>


<Route path="/subscription" 
element={
  <ProtectedRoute>
    <SubscriptionPlanDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/add-subscription-plan" 
element={
  <ProtectedRoute>
    <AddSubscriptionPlan isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/promo-codes" 
element={
  <ProtectedRoute>
    <PromoCodes isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/add-promo-code" 
element={
  <ProtectedRoute>
    <AddPromoCode isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/promo-code-details" 
element={
  <ProtectedRoute>
    <PromoCodeDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/About-us" 
element={
  <ProtectedRoute>
    <AboutUs isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/add-about-us" 
element={
  <ProtectedRoute>
    <AddAboutUs isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/privacy-policy" 
element={
  <ProtectedRoute>
    <PrivacyPolicy isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/add-privacy-policy" 
element={
  <ProtectedRoute>
    <AddPrivacyPolicy isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/testimonials" 
element={
  <ProtectedRoute>
    <Testimonials isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/add-testimonials" 
element={
  <ProtectedRoute>
    <AddTestimonial isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/contact-us" 
element={
  <ProtectedRoute>
    <ContactUs isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/add-contact-us" 
element={
  <ProtectedRoute>
    <AddContactUs isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/parentsReportType" 
element={
  <ProtectedRoute>
    <ParentReportType isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/add-parent-report" 
element={
  <ProtectedRoute>
    <AddParentReportType isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/banner" 
element={
  <ProtectedRoute>
    <Banner isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>


<Route path="/Banner/AddBanner" 
element={
  <ProtectedRoute>
    <AddBanner isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/Banner/BannerDetails" 
element={
  <ProtectedRoute>
    <BannerDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/sales-team" 
element={
  <ProtectedRoute>
    <SalesTeam isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>


<Route path="/SalesTeam/Details" 
element={
  <ProtectedRoute>
    <SalesTeamDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/SalesTeam/AddsalesTeamMember" 
element={
  <ProtectedRoute>
    <AddSalesTeam isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/push-notification" 
element={
  <ProtectedRoute>
    <PushNotification isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="PushNotification/AddNotification" 
element={
  <ProtectedRoute>
    <AddNotification isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/PushNotification/NotificationDetails" 
element={
  <ProtectedRoute>
    <NotificationDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/country-list" 
element={
  <ProtectedRoute>
    <CountryList isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/Countries/AddCountry" 
element={
  <ProtectedRoute>
    <AddCountry isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/Countries/Details" 
element={
  <ProtectedRoute>
    <CountryDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/badges" 
element={
  <ProtectedRoute>
    <Badges isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/Badges/AddBadge" 
element={
  <ProtectedRoute>
    <AddBadge isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/Badges/Details" 
element={
  <ProtectedRoute>
    <BadgeDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/user-report" 
element={
  <ProtectedRoute>
    <UserReport isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/Reports/Details" 
element={
  <ProtectedRoute>
    <UserReportDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/produuct-list" 
element={
  <ProtectedRoute>
    <ProductList isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/store/add" 
element={
  <ProtectedRoute>
    <AddStoreItem isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/store/item-details" 
element={
  <ProtectedRoute>
    <StoreItemDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>
<Route path="/store/order-details" 
element={
  <ProtectedRoute>
    <OrderItemDetails isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>

<Route path="/donation-enquiry" 
element={
  <ProtectedRoute>
    <DonationEnquiry isOpen={isSidebarOpen} />
  </ProtectedRoute>
} 
/>


<Route path="donation-details" 
element={
  <ProtectedRoute>
    <DonationDetails isOpen={isSidebarOpen} />
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

