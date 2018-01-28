//COMPUTERS
var data = [
          {
            name: "Reception ",
            type: "Room",
            children: [
              { name: "Main Reception PC ",
               children: [
                { name: "Jane", type: "user", department: "Admin", time: 8460 },
                { name: "Alison", type: "user", department: "Admin", time: 9260 },
                { name: "Chester", type: "user", department: "Admin", time: 13164 },
                ]
              },
              { name: "Second Reception PC",
               children: [
                { name: "Chester", type: "user", department: "Admin", time: 4690 },
                { name: "Jane", type: "user", department: "Admin", time: 16890 },
                { name: "Alison", type: "user", department: "Admin", time: 10609 },
                ]
              },
            ],
          },
          {
            name: 'Services',
            type: "Room",
            children: [
              { name: "Alex PC",
                children: [
                  { name: "Alex", type: "user", department: "Services", time: 28800 },
                ]
              },
              { name: "Elliott PC",
                children: [
                  { name: "Elliott", type: "user", department: "Services", time: 29800 },
                ]
              },
              { name: "Claire PC",
                children: [
                  { name: "Claire", type: "user", department: "Services", time: 26400 },
                ]
              },
            ]
          },
          {
            name: 'Sales',
            type: "Room",
            children: [
              { name: "Graham PC",
                children: [
                  { name: "Graham", type: "user", department: "Account Management", time: 15840 },
                ]
              },
              { name: "Lynne PC",
                children: [
                  { name: "Elliott", type: "user", department: "Account Management", time: 29800 },
                ]
              },
              { name: "Francis PC",
                children: [
                  { name: "Francis", type: "user", department: "Business Development", time: 26400 },
                ]
              },
            ]
          },
          {
            name: 'IT',
            type: "Room",
            children: [
              { name: "Adam PC",
                children: [
                  { name: "Adam", type: "user", department: "Software Development", time: 30001 },
                ]
              },
              { name: "Tyler PC",
                children: [
                  { name: "Tyler", type: "user", department: "Software Development", time: 35020 },
                ]
              },
              { name: "Carl PC",
                children: [
                  { name: "Carl", type: "user", department: "Software Development", time: 32560 },
                ]
              },
              { name: "Ryan PC",
                children: [
                  { name: "Ryan", type: "user", department: "IT Infrastrucure", time: 29243 },
                ]
              },
              { name: "Tyler PC",
                children: [
                  { name: "Tyler", type: "user", department: "Software Development", time: 11490 },
                ]
              },
              { name: "Calum PC",
                children: [
                  { name: "Calum", type: "user", department: "IT Infrastrucure", time: 19670 },
                ]
              },
              { name: "Elisha PC",
                children: [
                  { name: "Elisha", type: "user", department: "Business Analyst", time: 30210 },
                ]
              },
            ]
          },
          {
            name: 'Management',
            type: "Room",
            children: [
              { name: "Arthur PC",
                children: [
                  { name: "Arthur", type: "user", department: "CEO",  time: 3000 },
                ]
              },
              { name: "Glynis PC",
                children: [
                  { name: "Glynis", type: "user", department: "HR", time: 35020 },
                ]
              },
              { name: "Ethan PC",
                children: [
                  { name: "Ethan", type: "user", department: "HR", time: 32560 },
                ]
              }
            ]
          }
          ];

export default data;