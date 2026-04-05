const Record = require("../models/Record");
const mongoose = require("mongoose");


// ✅ CREATE RECORD (Admin only)
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      description,
    });

    res.status(201).json({
      message: "Record created",
      record,
    });

  } catch {
    res.status(500).json({ message: "Failed to create record" });
  }
};



// ✅ VIEW ALL RECORDS (NO FILTER) → Viewer + Analyst + Admin
exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find({ status: "active" }).sort({ date: -1 });

    res.status(200).json(records);

  } catch {
    res.status(500).json({ message: "Failed to fetch records" });
  }
};



// ✅ FILTER RECORDS (SEPARATE API)
exports.filterRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = { status: "active" };

    if (type) {
      if (!["income", "expense"].includes(type)) {
        return res.status(400).json({ message: "Invalid type filter" });
      }
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.status(200).json(records);

  } catch {
    res.status(500).json({ message: "Filtering failed" });
  }
};



// ✅ GET SINGLE RECORD
exports.getRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid record ID" });
    }

    const record = await Record.findById(id);

    if (!record || record.status === "deleted") {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);

  } catch {
    res.status(500).json({ message: "Failed to fetch record" });
  }
};



// ✅ UPDATE RECORD (Admin only)
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid record ID" });
    }

    const record = await Record.findById(id);

    if (!record || record.status === "deleted") {
      return res.status(404).json({ message: "Record not found" });
    }

    if (type && !["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (amount && amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (amount) record.amount = amount;
    if (type) record.type = type;
    if (category) record.category = category;
    if (date) record.date = date;
    if (description !== undefined) record.description = description;

    await record.save();

    res.status(200).json({
      message: "Record updated",
      record,
    });

  } catch {
    res.status(500).json({ message: "Failed to update record" });
  }
};



// ✅ DELETE (SOFT DELETE) (Admin only)
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid record ID" });
    }

    const record = await Record.findById(id);

    if (!record || record.status === "deleted") {
      return res.status(404).json({ message: "Record not found" });
    }

    record.status = "deleted";
    await record.save();

    res.status(200).json({
      message: "Record deleted successfully",
    });

  } catch {
    res.status(500).json({ message: "Failed to delete record" });
  }
};