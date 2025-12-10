import hashtag from "../../assets/images/hashtag.png";
import home from "../../assets/images/home.png";
import feedback from "../../assets/images/Feedback.png";

const Sidebardata = [
  {
    id: 1,
    heading: "User Management",
    items: [
      {
        name: "Users",
        icon: home,
        path: "/users",
        permissions: ["users:read"],
      },
      {
        name: "Subscribed Users",
        icon: hashtag,
        path: "/subscribed-users",
        permissions: ["subscribed_users:read"],
      },
      {
        name: "Feedback",
        icon: feedback,
        path: "/feedback",
        permissions: ["feedback:read"],
      },
      {
        name: "User Report",
        icon: feedback,
        path: "/user-report",
      },
      {
        name: "Parent Report",
        icon: feedback,
        path: "/parentsReport",
      },

      {
        name: "Leader Board",
        icon: feedback,
        path: "/leaderboard",
        permissions: ["leader_board:read"],
      },
    ],
  },
  {
    id: 2,
    heading: "Reseller Form",
    items: [
      {
        name: "Reseller Form",
        icon: hashtag,
        path: "/resellerform",
        permissions: ["reseller_forms:read"],
      },
    ],
  },
  {
    id: 3,
    heading: "Learning Center",
    items: [
      {
        name: "Learning Center Courses",
        icon: hashtag,
        path: "/learning-center-courses",
        permissions: ["jamb_ssce_tutorial:read"],
      },
      {
        name: "Learning Center Registration",
        icon: hashtag,
        path: "/learning-registrations",
        permissions: ["jamb_ssce_tutorial:read"],
      },
      {
        name: "Assessment Registration",
        icon: hashtag,
        path: "/assessment-registrations",
        permissions: ["jamb_ssce_tutorial:read"],
      },
      // {
      //   name: "7 Habits Bootcamp",
      //   icon: hashtag,
      //   path: "/7habitsbootcamp",
      //   permissions: ["habits_bootcamps:read"]
      // },
      // {
      //   name: "Summer Camp",
      //   icon: hashtag,
      //   path: "/summercamp",
      //   permissions: ["summer_camp:read"]
      // }
    ],
  },
  {
    id: 4,
    heading: "Payments Management",
    items: [
      {
        name: "Payment History",
        icon: hashtag,
        path: "/payments",
        permissions: ["bank_transfer_history:read"],
      },
      {
        name: "Bank Details",
        icon: hashtag,
        path: "/payments/bank-details",
        permissions: ["bank_account_details:read"],
      },
      {
        name: "Withdraw Details",
        icon: hashtag,
        path: "/payments/withdraw-requests",
        permissions: ["bank_account_details:read"],
      },
    ],
  },
  {
    id: 5,
    heading: "Product/App Management",
    items: [
      {
        name: "Categories",
        icon: hashtag,
        path: "/Categories",
        permissions: ["categories:read"],
      },
      {
        name: "Lesson",
        icon: hashtag,
        path: "/lesson",
        permissions: ["lessons:read"],
      },
      {
        name: " Test",
        icon: hashtag,
        path: "/test",
        permissions: ["test:read"],
      },
      {
        name: "Question Bank",
        icon: hashtag,
        path: "/question-bank",
        permissions: ["question_bank:read"],
      },
      {
        name: "University List",
        icon: hashtag,
        path: "/uni-list",
        permissions: ["university_list:read"],
      },
      {
        name: "E-Book",
        icon: hashtag,
        path: "/e-book",
        permissions: ["ebook_list:read"],
      },
      {
        name: "Link Lesson Media",
        icon: hashtag,
        path: "/link-lesson-media",
      },
    ],
  },
  {
    id: 6,
    heading: "Subscriptions",
    items: [
      {
        name: "Subsription Types",
        icon: hashtag,
        path: "/subscription-types",
        permissions: ["subscription_types:read"],
      },
      {
        name: "Promo Codes",
        icon: hashtag,
        path: "/promo-codes",
        permissions: ["promocodes:read"],
      },
    ],
  },
  {
    id: 7,
    heading: "Live Classes Management",
    items: [
      {
        name: "Teacher List",
        icon: hashtag,
        path: "/teacherlistmanagement",
        permissions: ["staff:read"],
      },
      {
        name: "Schedule Live Classes",
        icon: hashtag,
        path: "/scheduleliveclasses",
        permissions: ["schedule_live_classes:read"],
      },
      {
        name: "One-on-One Class Management",
        icon: hashtag,
        path: "/one-on-oneclassmanagement",
        permissions: ["one_on_one_class:read"],
      },
    ],
  },
  {
    id: 8,
    heading: "Support Management/System",
    items: [
      {
        name: "Support Ticket",
        icon: hashtag,
        path: "/supportmanagement",
        permissions: ["support_ticket:read"],
      },
      {
        name: "General Enquiry",
        icon: hashtag,
        path: "/general-enquiries",
        permissions: ["support_ticket:read"],
      },
    ],
  },
  {
    id: 9,
    heading: "Teesas Corner",
    items: [
      {
        name: "About Us",
        icon: hashtag,
        path: "/about-us",
        permissions: ["about_us:read"],
      },
      {
        name: "Privacy Policy",
        icon: hashtag,
        path: "/privacy-policy",
        permissions: ["privacy_policy:read"],
      },
      {
        name: "Testimonials",
        icon: hashtag,
        path: "/testimonials",
        permissions: ["testimonials:read"],
      },
      {
        name: "Blogs",
        icon: hashtag,
        path: "/blogs",
        permissions: ["blog_news:read"],
      },
      {
        name: "Contact Us",
        icon: hashtag,
        path: "/contact-us",
        permissions: ["contact_info:read"],
      },
      
    ],
  },
  {
    id: 10,
    heading: "Marketing",
    items: [
      {
        name: "Banner",
        icon: hashtag,
        path: "/banner",
        permissions: ["home_banner:read"],
      },
      {
        name: "Sales Team",
        icon: hashtag,
        path: "/sales-team",
        permissions: ["sales_team:read"],
      },
      {
        name: "Push Notification",
        icon: hashtag,
        path: "/push-notification",
        permissions: ["push_notifications:read"],
      },
      {
        name: "Country",
        icon: hashtag,
        path: "/country-list",
        permissions: ["country_list:read"],
      },
    ],
  },
  {
    id: 11,
    heading: "Human Resource Center",
    items: [
      {
        name: "Job Openings",
        icon: hashtag,
        path: "/job-opening",
        permissions: ["job_openings:read"],
      },
    ],
  },
  {
    id: 12,
    heading: "Settings",
    items: [
      {
        name: "Change Password",
        icon: hashtag,
        path: "/ChangePassword",
        permissions: ["change_password:read"],
      },
    ],
  },
  {
    id: 13,
    heading: "Store",
    items: [
      {
        name: "Overview & Product List",
        icon: hashtag,
        path: "/produuct-list",
        permissions: ["store_product_list:read"],
      },
    ],
  },
  {
    id: 14,
    heading: "Admin",
    items: [
      {
        name: "Admin Role",
        icon: hashtag,
        path: "/AdminRole",
        permissions: ["admin_roles:read"],
      },
      {
        name: "Admin Users",
        icon: hashtag,
        path: "/AdminUser",
        permissions: ["admin_users:read"],
      },
    ],
  },
];

export default Sidebardata;
