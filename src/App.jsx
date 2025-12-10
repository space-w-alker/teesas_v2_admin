import { useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgot-password";
import Home from "./pages/user/Home";
import User from "./components/Core/Dashboard/users/User";
import AddUser from "./pages/user/AddUser";
import Navigation from "./components/common/Navigation";
import UserDetails from "./pages/user/UserDetails";
import SignInList from "./pages/admin/SignInList";
import Feedback from "./pages/admin/Feedback";
import UserFeedbackDetails from "./pages/admin/UserFeedbackDetails";
import Sidebar from "./components/common/Sidebar";
import LeaderBoard from "./pages/admin/LeaderBoard/LeaderBoard";
import LeaderboardProfile from "./components/Core/Dashboard/Admin/LeaderboardProfile";
import LiveClases from "./pages/admin/LiveClasses/LiveClases";
import AddLiveClass from "./pages/admin/LiveClasses/AddLiveClass";
import LiveClassDetails from "./pages/admin/LiveClasses/LiveClassDetails";
import ManageLiveClass from "./pages/admin/LiveClasses/ManageLiveClass";
import Teachers from "./pages/admin/TeacherMangement/Teachers";
import TestDetails from "./pages/admin/TeacherMangement/TestDetails";
import StudentManagement from "./pages/admin/StudentMangemet/StudentManagement";
import AddStudent from "./pages/admin/StudentMangemet/AddStudent";
import OneOnclass from "./pages/admin/one-on-oneclass/OneOnclass";
import AddoneOnOneclass from "./pages/admin/one-on-oneclass/AddoneOnOneclass";
import TeacherList from "./pages/admin/TeacherList/TeacherList";
import TeacherDetails from "./pages/admin/TeacherList/TeacherDetails";
import AddTeacher from "./pages/admin/TeacherList/AddTeacher";
import SupportTicket from "./pages/admin/supportTicket/SupportTicket";
import SupportTicketDetails from "./pages/admin/supportTicket/SupportTicketDetails";
import ParentReportType from "./pages/admin/ParentReportType/ParentReportType";
import AddParentReportType from "./pages/admin/ParentReportType/AddParentReportType";
import ParentReportTypeDetails from "./pages/admin/ParentReportType/ParentReportTypeDetails";
import ParentSuggestions from "./pages/admin/ParentReportType/ParentSuggestions";
import ChangePassword from "./pages/admin/ChangePassword/ChangePassword";
import AdminRole from "./pages/admin/AdminRole/AdminRole";
import AddAdminRole from "./pages/admin/AdminRole/AddAdminRole";
import AdminUser from "./pages/admin/AdminUser/AdminUser";
import AdminUserDetails from "./pages/admin/AdminUser/AdminUserDetails";
import AddAdminUser from "./pages/admin/AdminUser/AddAdminUser";
import Profile from "./pages/user/Profile/Profile";
import EditUser from "./pages/user/EditUser";
import DataAnalytics from "./pages/user/DataAnalytics/DataAnalytics";
import ViewAnalytics from "./pages/user/DataAnalytics/ViewAnalytics";
import ConversionRates from "./pages/user/DataAnalytics/CoversionRates";
import Parent from "./pages/user/Parent";
import Customadduser from "./components/common/Customadduser";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SubscribedUser from "./components/Core/SubscribedUser";
import AddSingleSubscription from "./pages/subscriptions/AddSingleSubscription";
import UploadBulkSubscription from "./pages/subscriptions/UploadBulkSubscription";
import AddSubscriptionForm from "./pages/subscriptions/AddSubscriptionForm";
import Lesson from "./components/Lesson/Lession";
import Classes from "./components/Lesson/Classes";
import Subjects from "./components/Lesson/Subjects";
import Chapters from "./components/Lesson/Chapters";
import Payments from "./components/Payments/Payments";
import PaymentDetails from "./components/Payments/PaymentDetails";
import BankDetails from "./components/Payments/BankDetails";
import AddBank from "./components/Payments/AddBank";
import ViewBank from "./components/Payments/ViewBank";
import Categories from "./components/Categories/Categories";
import AddCategory from "./components/Categories/AddCategory";
import UploadBulkCategory from "./components/Categories/UploadBulkCategory";
import CategoryDetails from "./components/Categories/CategoryDetails";
import SubjectDetails from "./components/Categories/SubjectDetails";
import AddSubject from "./components/Categories/AddSubject";
import SubjectChapterDetails from "./components/Categories/SubjectChapterDetails";
import AddUnitChapter from "./components/Categories/AddUnitChapter";
import BulkUploadChapter from "./components/Categories/BulkUploadChapter";
import AddUnitTopic from "./components/Categories/AddUnitTopic";
import UTMELesson from "./components/UTME/UTMELesson";
import AddSubjectUtme from "./components/UTME/AddSubjectUtme";
import CreateSubject from "./components/UTME/CreateSubject";
import CreateChapter from "./components/UTME/CreateChapterUtme";

import Practice from "./components/Practice/Practice";
import PracticeClasses from "./components/Practice/PracticeClasses";
import PracticeSubject from "./components/Practice/PracticeSubject";
import PracticeChapters from "./components/Practice/PracticeChapters";
import PracticeTopic from "./components/Practice/PracticeTopic";
// Import the ProtectedRoute component

import { ToastContainer } from "react-toastify";
import PracticeUnitMediaUpload from "./components/Practice/PracticeUnitMediaUpload";
import PracticeBulkMediaUpload from "./components/Practice/PracticeBulkMediaUpload";
import PracticeTopicList from "./components/Practice/PracticeTopicList";
import Test from "./components/Test/Test";
import TestClass from "./components/Test/TestClass";
import TestSubject from "./components/Test/TestSubject";
import TestChapter from "./components/Test/TestChapter";
import TestTopics from "./components/Test/TestTopics";
import TestTopicList from "./components/Test/TestTopicList";
import AddTest from "./components/Test/AddTest";
import TestDetail from "./components/Test/TestDetails";
import UniversityList from "./components/QuestionBank/UniversityList";
import UniversitySubjects from "./components/QuestionBank/UniversitySubjects";
import UniversityAddSubject from "./components/QuestionBank/UniversityAddSubject";
import UniversityAddPdf from "./components/QuestionBank/UniversityAddPdf";
import UniversitySubjectDetail from "./components/QuestionBank/UniversitySubjectDetail";
import UniList from "./components/UniversityList/UniList";
import UniAdd from "./components/UniversityList/UniAdd";
import EBook from "./components/E-Book/EBook";
import AddSingleEbook from "./components/E-Book/AddSingleEbook";
import AddBulkEbook from "./components/E-Book/AddBulkEbook";
import EBookDetails from "./components/E-Book/EbookDetails";
import EbookList from "./components/E-Book/EbookList";
import EbookOrderList from "./components/E-Book/EbookOrderList";
import ResellerForm from "./components/ResellerForm/ResellerForm";
import ResellerFormDetails from "./components/ResellerForm/ResellerFormDetails";
import SevenHabitsBootcamp from "./components/7HabitsBootcamp/7HabitsBootcamp";
import RegistrationDetails from "./components/7HabitsBootcamp/RegistrationDetails";
import AddParticipant from "./components/7HabitsBootcamp/AddParticipant";
import JAMBtutorial from "./components/LearningCenter/JAMBtutorial";
import TutorialDetails from "./components/LearningCenter/TutorialDetails";
import AddSingleParticipant from "./components/LearningCenter/AddSingleParticipant";
import SummerCamp from "./components/SummerCamp/SummerCamp";
import AddSingleCampParticipant from "./components/SummerCamp/AddSIngleSummerCampParticipant";
import SummerCampDetails from "./components/SummerCamp/SummerCampDetails";
import JobOpenings from "./components/HumanResource/JobOpening";
import AddJobForm from "./components/HumanResource/AddJobForm";
import JobDetails from "./components/HumanResource/JobDetails";
import SubscriptionTypes from "./components/SubscriptionTypes/SubscriptionTypes";
import SubscriptionPlanDetails from "./components/SubscriptionTypes/SubscriptionPlanDetails";
import AddSubscriptionPlan from "./components/SubscriptionTypes/AddSubscriptionPlan";
import PromoCodes from "./components/PromoCodes/PromoCodes";
import AddPromoCode from "./components/PromoCodes/AddPromoCode";
import PromoCodeDetails from "./components/PromoCodes/PromoCodeDetails";
import AboutUs from "./components/TeesasCorner/AboutUs";
import AddAboutUs from "./components/TeesasCorner/AddAboutUs";
import PrivacyPolicy from "./components/TeesasCorner/PrivacyPolicy";
import AddPrivacyPolicy from "./components/TeesasCorner/AddPrivacyPolicy";
import Testimonials from "./components/TeesasCorner/Testimonials";
import AddTestimonial from "./components/TeesasCorner/AddTestimonial";
import ContactUs from "./components/TeesasCorner/ContactUs";
import AddContactUs from "./components/TeesasCorner/AddContactUs";
import Banner from "./components/Banner/Banner";
import AddBanner from "./components/Banner/AddBanner";
import BannerDetails from "./components/Banner/BannerDetails";
import SalesTeam from "./components/SalesTeam/SalesTeam";
import SalesTeamDetails from "./components/SalesTeam/SalesTeamDetails";
import AddSalesTeam from "./components/SalesTeam/AddSalesTeam";
import PushNotification from "./components/PushNotification/PushNotification";
import AddNotification from "./components/PushNotification/AddNotification";
import NotificationDetails from "./components/PushNotification/NotificationDetails";
import CountryList from "./components/Country/CountryList";
import AddCountry from "./components/Country/AddCountry";
import CountryDetails from "./components/Country/CountryDetails";
import Badges from "./components/Badges/Badges";
import AddBadge from "./components/Badges/AddBadge";
import BadgeDetails from "./components/Badges/BadgeDetails";
import UserReport from "./components/UserReport/UserReport";
import UserReportDetails from "./components/UserReport/UserReportDetails";
import ProductList from "./components/Store/ProductList";
import AddStoreItem from "./components/Store/AddStoreItem";
import StoreItemDetails from "./components/Store/StoreItemDetails";
import OrderItemDetails from "./components/Store/OrderItemDetails";
import DonationEnquiry from "./components/DonationEnquiry/DonationEnquiry";
import DonationDetails from "./components/DonationEnquiry/DonationDetails";
import Topics from "./components/Lesson/Topics";
import AddUnitMedia from "./components/Lesson/AddUnitMedia";
import TopicDetails from "./components/Lesson/TopicDetail";
import AddPracticeUtme from "./components/UTME/AddPracticeUtme";
import AddPractice from "./components/Practice/AddPractice";

import PracticeDetails from "./components/Practice/PracticeDetails";
import UniversityViewPdf from "./components/QuestionBank/UniversityViewPdf";
import AddBulkSummerCampParticipant from "./components/SummerCamp/AddBulkSummerCampParticipant";
import AddBulkJambParticipant from "./components/LearningCenter/AddBulkJambParticipant";
import AddBulk7HabitBootcamp from "./components/7HabitsBootcamp/AddBulk7HabitBootcamp";
import AddClass from "./components/Categories/AddClass";
import TopicsList from "./components/Categories/TopicsList";
import AddTopic from "./components/Categories/AddTopic";
import TopicDetail from "./components/Categories/TopicDetail";
import UploadQuestions from "./components/Test/UploadQuestions";
import QuestionView from "./components/Test/QuestionView";
import AdminDetails from "./pages/admin/AdminRole/AdminDetails";
import AdminPermission from "./pages/admin/AdminRole/AdminPermission";
import PermissionGuard from "./components/common/PermissionGuard";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import UploadBulkLiveClass from "./pages/admin/LiveClasses/UploadBulkLiveClass";
import PaymentProof from "./pages/admin/one-on-oneclass/PaymentProof";
import LearningCenterCourses from "./components/LearningCenter/LearningCenterCourses";
import AddSubjectLearningCenter from "./components/LearningCenter/AddSubjectLearningCenter";
import BulkUploadMedia from "./components/Categories/BulkUploadMedia";
import LinkLessonMedia from "./components/Categories/LinkLessonMedia";
import ParentReport from "./components/ParentReport/ParentReport";
import EditSubscriptionPlan from "./components/SubscriptionTypes/EditSubscriptionPlan";
import WithdrawRequest from "./components/Payments/WithdrawRequest";
import WithdrawRequestDetails from "./components/Payments/WithdrawRequestDetails";
import Blogs from "./pages/admin/Blogs/Blogs";
import AddBlog from "./pages/admin/Blogs/AddBlog";
import BlogDetails from "./pages/admin/Blogs/BlogDetails";
import GeneralEnquiry from "./pages/admin/GeneralEnquiry/GeneralEnquiry";
import GeneralEnquiryDetails from "./pages/admin/GeneralEnquiry/GeneralEnquiryDetails";
import LearningRegistration from "./pages/admin/LearningRegistration/LearningRegistration";
import LearningRegistrationDetails from "./pages/admin/LearningRegistration/LearningRegistrationDetails";
import AssessmentRegistration from "./pages/admin/AssessmentRegistration/AssessmentRegistration";
import AssessmentRegistrationDetails from "./pages/admin/AssessmentRegistration/AssessmentRegistrationDetails";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const location = useLocation();

  // Check if the current location matches the login page path
  const isLoginPage = location.pathname === "/";
  const isForgetPage = location.pathname === "/forgot-password";

  return (
    <>
      {/* Render Navigation only if it's not the login page */}
      {!isLoginPage && !isForgetPage && (
        <Navigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {!isLoginPage && !isForgetPage && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Routes */}
        <Route
          path="/addusers"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  "users:create",
                  "users:read",
                  "users:update",
                ]}
              >
                <AddUser isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdetails/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["users:read"]}>
                <UserDetails
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Parent"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["users:read"]}>
                <Parent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditUser/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["users:update"]}>
                <EditUser
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <SignInList
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["users:read"]}>
                <Home isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Feedback"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["feedback:read", "feedback:create"]}
              >
                <Feedback
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserFeedBackDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["feedback:read"]}>
                <UserFeedbackDetails
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/LeaderBoard"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["leader_board:read"]}>
                <LeaderBoard
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/LeaderBoardProfile"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["leader_board:read"]}>
                <LeaderboardProfile
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduleliveclasses"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["lessons:read", "lessons:create"]}
              >
                <LiveClases
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddLiveClass"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["lessons:create"]}>
                <AddLiveClass
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-proof/:id"
          element={
            <ProtectedRoute>
              <PaymentProof
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/LiveClassDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["lessons:read"]}>
                <LiveClassDetails
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ManageLiveClass"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["lessons:read", "lessons:update"]}
              >
                <ManageLiveClass
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["teachers:read", "teachers:create"]}
              >
                <Teachers
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/TestDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["tests:read"]}>
                <TestDetails
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/question-view"
          element={
            <ProtectedRoute>
              {/* <PermissionGuard requiredPermissions={["tests:read"]}> */}
              <QuestionView
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
              {/* </PermissionGuard> */}
            </ProtectedRoute>
          }
        />

        <Route
          path="/studentlistmanagement"
          element={
            <ProtectedRoute>
              <StudentManagement
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddLiveClassStudent"
          element={
            <ProtectedRoute>
              <AddStudent
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/one-on-oneclassmanagement"
          element={
            <ProtectedRoute>
              <OneOnclass
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Addone-on-oneClass"
          element={
            <ProtectedRoute>
              <AddoneOnOneclass
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-bulk-live-classes"
          element={
            <ProtectedRoute>
              <UploadBulkLiveClass
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacherlistmanagement"
          element={
            <ProtectedRoute>
              <TeacherList
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/TeacherDetails"
          element={
            <ProtectedRoute>
              <TeacherDetails
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/AddTeacher"
          element={
            <ProtectedRoute>
              <AddTeacher
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportmanagement"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  "support_ticket:read",
                  "support_ticket:create",
                ]}
              >
                <SupportTicket
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportTicketDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["support_ticket:read"]}>
                <SupportTicketDetails
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ParentReportType"
          element={
            <ProtectedRoute>
              <ParentReportType
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddParentReportType"
          element={
            <ProtectedRoute>
              <AddParentReportType
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ParentReportTypeDetails"
          element={
            <ProtectedRoute>
              <ParentReportTypeDetails
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ParentSuggestions"
          element={
            <ProtectedRoute>
              <ParentSuggestions
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ChangePassword"
          element={
            <ProtectedRoute>
              <ChangePassword
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminDetails/:id"
          element={
            <ProtectedRoute>
              <AdminDetails
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminRole"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["admin_roles:read", "admin_roles:create"]}
              >
                <AdminRole isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminPermission"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["admin_roles:read", "admin_roles:update"]}
              >
                <AdminPermission
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddAdminRole"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["admin_roles:create"]}>
                <AddAdminRole
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminUser"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["admin_users:read", "admin_users:create"]}
              >
                <AdminUser
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminUserDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["admin_users:read"]}>
                <AdminUserDetails
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddAdminUser"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["admin_users:create"]}>
                <AddAdminUser
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["users:read"]}>
                <Profile isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/DataAnalytics"
          element={
            <ProtectedRoute>
              <DataAnalytics
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewAnalytics"
          element={
            <ProtectedRoute>
              <ViewAnalytics
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ConversionRates"
          element={
            <ProtectedRoute>
              <ConversionRates
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscribed-users"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  "subscribed_users:read",
                  "subscribed_users:create",
                ]}
              >
                <SubscribedUser
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/addSingleSubscription"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["subscribed_users:create"]}
              >
                <AddSingleSubscription
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/UploadBulkSubscription"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["subscribed_users:create"]}
              >
                <UploadBulkSubscription
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-subscription-form"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["subscribed_users:create"]}
              >
                <AddSubscriptionForm
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lesson"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["categories:read", "categories:create"]}
              >
                <Lesson isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <Classes isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <Subjects isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chapters"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <Chapters isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/topics"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <Topics isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk-upload-media/:topicId"
          element={
            <ProtectedRoute>
              <BulkUploadMedia isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-lesson-media"
          element={
            <ProtectedRoute>
              <BulkUploadMedia isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/link-lesson-media"
          element={
            <ProtectedRoute>
              <LinkLessonMedia isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-unit-media"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddUnitMedia isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/topic-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <TopicDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
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
          path="/payments/:id/details"
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
          path="/payments/view-bank/:id"
          element={
            <ProtectedRoute>
              <ViewBank isOpen={isSidebarOpen} />
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
          path="/payments/withdraw-requests"
          element={
            <ProtectedRoute>
              <WithdrawRequest isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments/withdraw-details"
          element={
            <ProtectedRoute>
              <WithdrawRequestDetails isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Categories"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <Categories isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/special-category/:id"
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
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddCategory isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/upload-bulk"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <UploadBulkCategory isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/details/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <CategoryDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/:id/add-class"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddClass isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/:id/edit-class"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddClass isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/class/:id/subjects"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <SubjectDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-subject/:id/:subjectId?"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddSubject isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects/:id/chapters"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <SubjectChapterDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-unit-chapter/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddUnitChapter isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-unit-chapter/:id/:chapterId"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddUnitChapter isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bulk-upload-chapter"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <BulkUploadChapter isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/topic-detail/:id"
          element={
            <ProtectedRoute>
              <TopicDetail isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-media/:id"
          element={
            <ProtectedRoute>
              <AddUnitTopic isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chapters/:id/topics"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <TopicsList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-topic/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddTopic isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-topic/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddTopic isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/utme-lesson"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <UTMELesson isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-subject-utme"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddSubjectUtme isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-new-subject"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <CreateSubject isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-chapter"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <CreateChapter isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/topic/:topicId"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <TopicDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-practice-utme"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddPracticeUtme isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <Practice isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice-classes"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <PracticeClasses isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice-subject"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <PracticeSubject isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice-chapters"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <PracticeChapters isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice-topic"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <PracticeTopic isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice-media-upload"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <PracticeUnitMediaUpload isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk-upload-media"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <PracticeBulkMediaUpload isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice-topic-list"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <PracticeTopicList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-practice"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <AddPractice isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:read"]}>
                <PracticeDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["test:read", "test:create"]}
              >
                <Test isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/test-class"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["test:read", "test:create"]}
              >
                <TestClass isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test-subject"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["test:read", "test:create"]}
              >
                <TestSubject isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test-chapter"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["test:read", "test:create"]}
              >
                <TestChapter isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/test-topic"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["test:read", "test:create"]}
              >
                <TestTopics isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test-topic-list"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["categories:create"]}>
                <TestTopicList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-questions"
          element={
            <ProtectedRoute>
              {/* <PermissionGuard requiredPermissions={["questions:create"]}> */}
              <UploadQuestions isOpen={isSidebarOpen} />
              {/* </PermissionGuard> */}
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-test"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["test:create"]}>
                <AddTest isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test-detail"
          element={
            <ProtectedRoute>
              {/* <PermissionGuard requiredPermissions={["university_list:read"]}> */}
              <TestDetail isOpen={isSidebarOpen} />
              {/* </PermissionGuard> */}
            </ProtectedRoute>
          }
        />

        <Route
          path="/question-bank"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["question_bank:read"]}>
                <UniversityList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/university-subjects"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:read"]}>
                <UniversitySubjects isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/university-add-subject"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:create"]}>
                <UniversityAddSubject isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/university-add-pdf"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:create"]}>
                <UniversityAddPdf isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/university-view-pdf"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:read"]}>
                <UniversityViewPdf isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/university-subject-detail"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:read"]}>
                <UniversitySubjectDetail isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/uni-list"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:read"]}>
                <UniList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uni-add"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["university_list:create"]}>
                <UniAdd isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/e-book"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["ebook_list:read"]}>
                <EBook isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-single-ebook"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["ebook_list:create"]}>
                <AddSingleEbook isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-bulk-ebook"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["ebook_list:create"]}>
                <AddBulkEbook isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ebook-details/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["ebook_list:read"]}>
                <EBookDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ebook-list"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["ebook_list:read"]}>
                <EbookList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ebook-orders"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["ebook_list:read"]}>
                <EbookOrderList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resellerform"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["reseller_forms:create"]}>
                <ResellerForm isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reseller-form-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["reseller_forms:read"]}>
                <ResellerFormDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/7habitsbootcamp"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["habits_bootcamps:read"]}>
                <SevenHabitsBootcamp isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/registration-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["habits_bootcamps:read"]}>
                <RegistrationDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk-upload"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["habits_bootcamps:create"]}
              >
                <AddBulk7HabitBootcamp isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-participant"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["habits_bootcamps:create"]}
              >
                <AddParticipant isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jamb-ssce"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  "jamb_ssce_tutorial:create",
                  "jamb_ssce_tutorial:read",
                ]}
              >
                <JAMBtutorial isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning-center-courses"
          element={
            <ProtectedRoute>
              <LearningCenterCourses isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning-center/add-subject"
          element={
            <ProtectedRoute>
              <AddSubjectLearningCenter isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tutorial-details"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  "jamb_ssce_tutorial:create",
                  "jamb_ssce_tutorial:read",
                ]}
              >
                <TutorialDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-single-participant"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["jamb_ssce_tutorial:read"]}
              >
                <AddSingleParticipant isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-bulk-participant"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["jamb_ssce_tutorial:read"]}
              >
                <AddBulkJambParticipant isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/summercamp"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["summer_camp:read"]}>
                <SummerCamp isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-single-summer-camp-participant"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["summer_camp:create"]}>
                <AddSingleCampParticipant isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-bulk-summer-camp-participant"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["summer_camp:create"]}>
                <AddBulkSummerCampParticipant isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/summer-camp-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["summer_camp:read"]}>
                <SummerCampDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-opening"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["job_openings:read"]}>
                <JobOpenings isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-unit-job"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["job_openings:create"]}>
                <AddJobForm isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["job_openings:read"]}>
                <JobDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription-types"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["subscription_types:read"]}
              >
                <SubscriptionTypes isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription-plans/:courseId"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["subscription_types:read"]}
              >
                <SubscriptionPlanDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-subscription-plan/:planId"
          element={
            <ProtectedRoute>
              <EditSubscriptionPlan isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-subscription-plan"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["subscription_types:create"]}
              >
                <AddSubscriptionPlan isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/promo-codes"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["promocodes:read"]}>
                <PromoCodes isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-promo-code"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["promocodes:create"]}>
                <AddPromoCode isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/promo-code-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["promocodes:read"]}>
                <PromoCodeDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["about_us:read"]}>
                <AboutUs isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-about-us"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["about_us:create"]}>
                <AddAboutUs isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["privacy_policy:read"]}>
                <PrivacyPolicy isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-privacy-policy"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["privacy_policy:create"]}>
                <AddPrivacyPolicy isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/testimonials"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["testimonials:read"]}>
                <Testimonials isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-testimonials"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["testimonials:create"]}>
                <AddTestimonial isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["contact_info:read"]}>
                <ContactUs isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-contact-us"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["contact_info:create"]}>
                <AddContactUs isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/parentsReport"
          element={
            <ProtectedRoute>
              <ParentReport isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parentsReportType"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["parent:read"]}>
                <ParentReportType isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-parent-report"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["parent:create"]}>
                <AddParentReportType isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/banner"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["home_banner:read"]}>
                <Banner isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Banner/AddBanner"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["home_banner:create"]}>
                <AddBanner isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Banner/BannerDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["home_banner:read"]}>
                <BannerDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales-team"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["sales_team:read"]}>
                <SalesTeam isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/SalesTeam/Details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["sales_team:read"]}>
                <SalesTeamDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/SalesTeam/AddsalesTeamMember"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["sales_team:create"]}>
                <AddSalesTeam isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/push-notification"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["push_notifications:read"]}
              >
                <PushNotification isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="PushNotification/AddNotification"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["push_notifications:create"]}
              >
                <AddNotification isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/PushNotification/NotificationDetails"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["push_notifications:read"]}
              >
                <NotificationDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/country-list"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["country_list:read"]}>
                <CountryList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Countries/AddCountry"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["country_list:create"]}>
                <AddCountry isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Countries/Details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["country_list:read"]}>
                <CountryDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/badges"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["badge:read"]}>
                <Badges isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Badges/AddBadge"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["badge:create"]}>
                <AddBadge isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Badges/Details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["badge:read"]}>
                <BadgeDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-report"
          element={
            <ProtectedRoute>
              <UserReport isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Reports/Details"
          element={
            <ProtectedRoute>
              <UserReportDetails isOpen={isSidebarOpen} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/produuct-list"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["store_product_list:read"]}
              >
                <ProductList isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/add"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["store_product_list:create"]}
              >
                <AddStoreItem isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/store/item-details/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["store_product_list:read"]}
              >
                <StoreItemDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/order-details/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["store_order_list:read"]}>
                <OrderItemDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/donation-enquiry"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["donation_enquiry:read"]}>
                <DonationEnquiry isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="donation-details"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["donation_enquiry:read"]}>
                <DonationDetails isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/UploadBulkUser"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={["users:create"]}>
                <Customadduser
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-role/permissions/:id"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={["admin_roles:read", "admin_roles:update"]}
              >
                <AdminPermission isOpen={isSidebarOpen} />
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/add"
          element={
            <ProtectedRoute>
              <AddBlog isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/edit/:id"
          element={
            <ProtectedRoute>
              <AddBlog isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/details/:id"
          element={
            <ProtectedRoute>
              <BlogDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/general-enquiries"
          element={
            <ProtectedRoute>
              <GeneralEnquiry isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/general-enquiries/details/:id"
          element={
            <ProtectedRoute>
              <GeneralEnquiryDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning-registrations"
          element={
            <ProtectedRoute>
              <LearningRegistration isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-registrations/details/:id"
          element={
            <ProtectedRoute>
              <LearningRegistrationDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessment-registrations"
          element={
            <ProtectedRoute>
              <AssessmentRegistration isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment-registrations/details/:id"
          element={
            <ProtectedRoute>
              <AssessmentRegistrationDetails isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        ProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
