const Record = require("../models/Record");

// SUMMARY
exports.getSummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach(r => {
      if (r._id === "income") totalIncome = r.total;
      if (r._id === "expense") totalExpense = r.total;
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });

  } catch {
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};


// CATEGORY BREAKDOWN
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.status(200).json(data);

  } catch {
    res.status(500).json({ message: "Failed to fetch category breakdown" });
  }
};


// MONTHLY TRENDS
exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.status(200).json(data);

  } catch {
    res.status(500).json({ message: "Failed to fetch monthly trends" });
  }
};


// WEEKLY TRENDS
exports.getWeeklyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    res.status(200).json(data);

  } catch {
    res.status(500).json({ message: "Failed to fetch weekly trends" });
  }
};


// RECENT ACTIVITY
exports.getRecentActivity = async (req, res) => {
  try {
    const data = await Record.find({ status: "active" })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(data);

  } catch {
    res.status(500).json({ message: "Failed to fetch recent activity" });
  }
};