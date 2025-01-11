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
        // {
        //   name: "Admin Role",
        //   icon: hashtag,
        //   path:"/AdminRole"

        // },
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
 
   
  ];
  export default Sidebardata