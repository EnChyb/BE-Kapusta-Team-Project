import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getIncome = async (req, res) => {
	try {
		const userId = req.user._id;
		const currentYear = new Date().getFullYear();

		const incomes = await Transaction.find({
			userId: userId,
			category: "Income",
			date: {
				$gte: new Date(`${currentYear}-01-01`),
				$lte: new Date(`${currentYear}-12-31`),
			},
		}).select("description amount date category _id");

		if (!incomes || incomes.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "No incomes found for this user in the current year",
			});
		}

		const monthStats = {};
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		months.forEach((month) => (monthStats[month] = "N/A"));

		incomes.forEach((income) => {
			const monthIndex = new Date(income.date).getMonth();
			const monthName = months[monthIndex];
			monthStats[monthName] =
				(monthStats[monthName] !== "N/A" ? monthStats[monthName] : 0) +
				income.amount;
		});

		return res.status(StatusCodes.OK).json({
			incomes: incomes,
			monthStats: monthStats,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Error fetching incomes",
			error: error.message,
		});
	}
};

export default getIncome;
