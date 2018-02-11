//COMPUTERS
var data = [
          {
            name: "Reception ",
            type: "Room",
            children: [
              { name: "Main Reception PC ", type: "Computer",
               children: [
                { name: "Jane", type: "User", department: "Admin", time: 8460 },
                { name: "Alison", type: "User", department: "Admin", time: 9260 },
                { name: "Chester", type: "User", department: "Admin", time: 13164 },
                ]
              },
              { name: "Second Reception PC", type: "Computer",
               children: [
                { name: "Chester", type: "User", department: "Admin", time: 4690 },
                { name: "Jane", type: "User", department: "Admin", time: 16890 },
                { name: "Alison", type: "User", department: "Admin", time: 10609 },
                ]
              },
            ],
          },
          {
            name: 'Services',
            type: "Room",
            children: [
              { name: "Alex PC", type: "Computer",
                children: [
                  { name: "Alex", type: "User", department: "Services", time: 28800 },
                ]
              },
              { name: "Elliott PC", type: "Computer",
                children: [
                  { name: "Elliott", type: "User", department: "Services", time: 29800 },
                ]
              },
              { name: "Claire PC", type: "Computer",
                children: [
                  { name: "Claire", type: "User", department: "Services", time: 26400 },
                ]
              },
            ]
          },
          {
            name: 'Sales',
            type: "Room",
            children: [
              { name: "Graham PC", type: "Computer",
                children: [
                  { name: "Graham", type: "User", department: "Account Management", time: 15840 },
                ]
              },
              { name: "Lynne PC", type: "Computer",
                children: [
                  { name: "Elliott", type: "User", department: "Account Management", time: 29800 },
                ]
              },
              { name: "Francis PC", type: "Computer",
                children: [
                  { name: "Francis", type: "User", department: "Business Development", time: 26400 },
                ]
              },
            ]
          },
          {
            name: 'IT',
            type: "Room",
            children: [
              { name: "Adam PC", type: "Computer",
                children: [
                  { name: "Adam", type: "User", department: "Software Development", time: 30001 },
                ]
              },
              { name: "Tyler PC", type: "Computer",
                children: [
                  { name: "Tyler", type: "User", department: "Software Development", time: 35020 },
                ]
              },
              { name: "Carl PC", type: "Computer",
                children: [
                  { name: "Carl", type: "User", department: "Software Development", time: 32560 },
                ]
              },
              { name: "Ryan PC", type: "Computer",
                children: [
                  { name: "Ryan", type: "User", department: "IT Infrastrucure", time: 29243 },
                ]
              },
              { name: "Tyler PC", type: "Computer",
                children: [
                  { name: "Tyler", type: "User", department: "Software Development", time: 11490 },
                ]
              },
              { name: "Calum PC", type: "Computer",
                children: [
                  { name: "Calum", type: "User", department: "IT Infrastrucure", time: 19670 },
                ]
              },
              { name: "Elisha PC", type: "Computer",
                children: [
                  { name: "Elisha", type: "User", department: "Business Analyst", time: 30210 },
                ]
              },
            ]
          },
          {
            name: 'Management', type: "Computer",
            type: "Room",
            children: [
              { name: "Arthur PC", type: "Computer",
                children: [
                  { name: "Arthur", type: "User", department: "CEO",  time: 3000 },
                ]
              },
              { name: "Glynis PC", type: "Computer",
                children: [
                  { name: "Glynis", type: "User", department: "HR", time: 35020 },
                ]
              },
              { name: "Ethan PC", type: "Computer",
                children: [
                  { name: "Ethan", type: "User", department: "HR", time: 32560 },
                ]
              }
            ]
          }
          ];

export default data;