
// Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "topic",
      foreignField: "topic",
      as: "tasks"
    }
  },
  {
    $lookup: {
      from: "attendance",
      localField: "tasks.date",
      foreignField: "month",
      as: "attendance"
    }
  },
  {
    $match: {
      "attendance.month": "October"
    }
  },
  {
    $project: {
      topic: 1,
      tasks: {
        $filter: {
          input: "$tasks",
          as: "task",
          cond: {
            $eq: ["$$task.date", "October"]
          }
        }
      }
    }
  }
])

// Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({
    date: {
      $gte: "10/15/2020",
      $lte: "10/31/2020"
    }
  })


// Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "company_drives_id",
      foreignField: "company_drives_id",
      as: "students"
    }
  }
])


// Find the number of problems solved by the user in codekata

db.users.aggregate([
  {
    $lookup: {
      from: "codekata",
      localField: "codekata_id",
      foreignField: "id",
      as: "codekata"
    }
  },
  {
    $project: {
      username: 1,
      solved_problems: {
        $sum: "$codekata.total_problems"
      }
    }
  }
])

// Find all the mentors with who has the mentee's count more than 15
db.mentors.find({
    mentees: {
      $gt: 15
    }
  })


// Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
  {
    $match: {
      month: "October",
      userpresent: {
        $nin: [1, 2, 3, 4, 5] // Assuming user IDs who are absent
      }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "userpresent",
      foreignField: "id",
      as: "absent_users"
    }
  },
  {
    $lookup: {
      from: "tasks",
      localField: "month",
      foreignField: "date",
      as: "tasks"
    }
  },
  {
    $project: {
      month: 1,
      absent_users: 1,
      tasks: {
        $filter: {
          input: "$tasks",
          as: "task",
          cond: {
            $and: [
              { $gte: ["$$task.date", "10/15/2020"] },
              { $lte: ["$$task.date", "10/31/2020"] }
            ]
          }
        }
      }
    }
  },
  {
    $match: {
      "tasks.topic": { $exists: false }
    }
  }
])