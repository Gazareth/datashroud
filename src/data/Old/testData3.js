//COMPUTERS
var data = [
          {
            name: "Reception ",
            type: "Room",
            children: [
              { name: "Main Reception PC ",
               children: [
                { name: "Jane", department: "Admin", time: 8460 },
                { name: "Alison", department: "Admin", time: 9260 },
                { name: "Chester", department: "Admin", time: 13164 },
                ]
              },
              { name: "Second Reception PC",
               children: [
                { name: "Chester", department: "Admin", time: 4690 },
                { name: "Jane", department: "Admin", time: 16890 },
                { name: "Alison", department: "Admin", time: 10609 },
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
                  { name: "Alex", department: "Services", time: 28800 },
                ]
              },
              { name: "Elliott PC",
                children: [
                  { name: "Elliott", department: "Services", time: 29800 },
                ]
              },
              { name: "Claire PC",
                children: [
                  { name: "Claire", department: "Services", time: 26400 },
                ]
              },
            ]
          },
          {
            name: 'Account Management',
            type: "Room",
            children: [
              { name: "Graham PC",
                children: [
                  { name: "Graham", department: "Sales", time: 15840 },
                ]
              },
              { name: "Lynne PC",
                children: [
                  { name: "Elliott", department: "Sales", time: 29800 },
                ]
              },
              { name: "Francis PC",
                children: [
                  { name: "Francis", department: "Sales", time: 26400 },
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
                  { name: "Adam", department: "Software Development", time: 30001 },
                ]
              },
              { name: "Tyler PC",
                children: [
                  { name: "Tyler", department: "Software Development", time: 35020 },
                ]
              },
              { name: "Carl PC",
                children: [
                  { name: "Carl", department: "Software Development", time: 32560 },
                ]
              },
              { name: "Ryan PC",
                children: [
                  { name: "Ryan", department: "IT Infrastrucure", time: 29243 },
                ]
              },
              { name: "Tyler PC",
                children: [
                  { name: "Tyler", department: "Software Development", time: 11490 },
                ]
              },
              { name: "Calum PC",
                children: [
                  { name: "Calum", department: "IT Infrastrucure", time: 19670 },
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
                  { name: "Arthur", department: "CEO",  time: 3000 },
                ]
              },
              { name: "Glynis PC",
                children: [
                  { name: "Glynis", department: "HR", time: 35020 },
                ]
              },
              { name: "Ethan PC",
                children: [
                  { name: "Ethan", department: "HR", time: 32560 },
                ]
              }
            ]
          }
          ];

export default data;