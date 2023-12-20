// TODO: refactor to enum/variant
type IncomeCategories = "Salary" | "Bonus" | "Scholarship";

type HomeCategories = "Current" | "Gas" | "Water" | "Heating" | "Rent" | "Equipment" | "Media" | "Renovation" | "CleaningProducts";

type FoodCategories = "EatingOut" | "Groceries";

type TransportCategories = "Tickets" | "Fuel" | "Parking" | "Repairs" | "FeesOrInsurance" | "Wash" | "Accessories";

type HealthCategories = "Dentist" | "Medicine";

type EntertainmentCategories = "Gifts" | "Games" | "Sport";

type PersonalExpensesCategories = "Studies" | "Training";

type RestCategories = "Accommodation" | "Food" | "Attractions";

type ClothesCategories = "Clothes" | "Jewelry" | "Perfume";

export type Category = IncomeCategories | HomeCategories | FoodCategories | TransportCategories | HealthCategories | EntertainmentCategories | PersonalExpensesCategories | RestCategories | ClothesCategories;