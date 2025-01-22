import hashtag from '../../assets/images/hashtag.png'
import home from '../../assets/images/home.png';
import feedback from '../../assets/images/Feedback.png';

  const Sidebardata = [
    {
      id: 1,
      heading: "User Management",
      items: [
        {
          name: "Users",
        icon: home,
        path:"/users"
        },
        {
          name: "Subscribed Users",
          icon: hashtag,
          path: "/subscribed-users"
        },
        
        // {
        //   name: "Active Users",
        //   icon: hashtag,
        //   path:"/activeusers"
        // },
        {
          name: "Feedback",
          icon: feedback,
          path:"/feedback"
        }
      ]
    },
   

    {
      id: 2,
      heading: "Product/App Management",
      items: [
        {
          name: "Categories",
          icon: hashtag,
          path:"/Categories"
        
          
        },
        {
          name: 'Lesson',
          icon: hashtag,
          path: "/lesson"

        },

        {
          name: 'UTME',
          icon: hashtag,
          path: "/utme"             

        },

        {
          name: 'Practice',
          icon: hashtag,
          path: "/practice"             

        },
        {
          name: 'Text',
          icon: hashtag,
          path: "/test"             

        },
        {
          name: 'Question Bank',
          icon: hashtag,
          path: "/question-bank"             

        },

        {
          name: 'University List',
          icon: hashtag,
          path: "/uni-list"             

        },
        {
          name: 'E-Book',
          icon: hashtag,
          path: "/e-book"             

        },

        
      ]
    },
    {
      id: 3,
      heading: "Live Classes Management",
      items: [
        {
          name: "Teacher List",
          icon: hashtag,
          path:"/teacherlistmanagement"
        },
        {
          name: "Teacher List/Management",
          icon: hashtag,
          path:"/Teacher"
        },
        {
          name: "Student List/Management",
          icon: hashtag,
          path:"/studentlistmanagement"
        },
        {
          name: "Schedule Live Classes",
          icon: hashtag,
          path:"/scheduleliveclasses"
        },
        {
          name: "One-on-One Class Management",
          icon: hashtag,
          path:"/one-on-oneclassmanagement"
        }
      ]
    },
    {
      id: 4,
      heading: "Support Management/System",
      items: [
        {
          name: "Support Ticket",
          icon: hashtag,
          path:"/supportmanagement"
          
        }
      ]
    },
    {
      id: 5,
      heading: "Data Analytics",
      items: [
        {
          name: "Data Analytics",
          icon: hashtag,
          path:"/DataAnalytics"
          
        }
      ]
    },
    {
      id: 5,
      heading: "Settings",
      items: [
        {
          name: "Change Password",
          icon: hashtag,
          path:"/ChangePassword"
        }
      ]
    },
    {
      id: 6,
      heading: "Admin",
      items: [
        {
          name: "Admin Role",
          icon: hashtag,
          path:"/AdminRole"

        },
        {
          name: "Admin Users",
          icon:hashtag,
          path:"/AdminUser"
        }
      ]
    },
      {
        id: 7,
        heading: "Payments Management",
        items: [
          {
            name: "Payment History",
            icon: hashtag,
            path: "/payments"
          },
        {
          name: "Bank Details",
          icon: hashtag,
          path: "/payments/bank-details"
        }
        


        ]
      },

      {
        id: 8,
        heading: "Reseller Form",
        items: [
          {
            name: "Reseller Form",
            icon: hashtag,
            path: "/resellerform"
          },
        


        ]
      },
      {
        id: 8,
        heading: "Learning Center",
        items: [

          {
            name: "JAMB and SSCE Tutorial",
            icon: hashtag,
            path: "/jamb-ssce"
          },
          {
            name: "7 Habits Bootcamp",
            icon: hashtag,
            path: "/7habitsbootcamp"
          },
          {
            name: "Summer Camp",
            icon: hashtag,
            path: "/summercamp"
          },
        


        ]
      },
      {
        id: 8,
        heading: "Human Resource Center",
        items: [
          {
            name: "Job Openings",
            icon: hashtag,
            path: "/job-opening"
          },
          
        


        ]
      },
      {
        id: 9,
        heading: "Subscriptions",
        items: [
          {
            name: "Subsription Types",
            icon: hashtag,
            path: "/subscription-types"
          },
          {
            name: "Promo Codes",
            icon: hashtag,
            path: "/promo-codes"
          },
        
        


        ]
      },
      {
        id: 9,
        heading: "Teesas Corner",
        items: [
          {
            name: "About Us",
            icon: hashtag,
            path: "/about-us"
          },
          {
            name: "Privacy Policy",
            icon: hashtag,
            path: "/privacy-policy"
          },
          {
            name: "Testimonials",
            icon: hashtag,
            path: "/testimonials"
          },
          {
            name: "Contact Us",
            icon: hashtag,
            path: "/contact-us"
          },


        ]
      },
      {
        id: 9,
        heading: "Marketing",
        items: [
          {
            name: "Parents",
            icon: hashtag,
            path: "/parentsReportType"
          },
          {
            name: "Sales Team",
            icon: hashtag,
            path: "/sales-team"
          },
          {
            name: "Push Notification",
            icon: hashtag,
            path: "/push-notification"
          },
          {
            name: "Country",
            icon: hashtag,
            path: "/country-list"
          },
          {
            name: "Badges",
            icon: hashtag,
            path: "/badges"
          },
          {
            name: "User Report",
            icon: hashtag,
            path: "/user-report"
          },


        ]
      },
      {
        id: 9,
        heading: "Banner",
        items: [
          {
            name: "Banner",
            icon: hashtag,
            path: "/banner"
          },

        ]
      },
      {
        id: 9,
        heading: "Store",
        items: [
          {
            name: "Overview & Product List",
            icon: hashtag,
            path: "/produuct-list"
          },

        ]
      },
      {
        id: 9,
        heading: "Other",
        items: [
          {
            name: "Donation Enquiry",
            icon: hashtag,
          path: "/donation-enquiry"
          },

        ]
      },
      
      
      
 
   
  ];
  export default Sidebardata