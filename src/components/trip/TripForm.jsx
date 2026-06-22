import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  createTrip,
  updateTrip,
  getTripById,
} from "../../services/tripService";

import Counter from "./Counter";

const TripForm = ({ mode = "create" }) => {
  const isEdit = mode === "edit";

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    country: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
    budgetType: "Medium",
    budgetAmount: "",
    travelStyle: "Adventure",
    transportMode: "Flight",
    accommodationType: "Hotel",
    interests: [],
    specialRequirements: "",
    status: "Planning",
  });

  const interestOptions = [
    "Food",
    "Beach",
    "Shopping",
    "Culture",
    "Photography",
    "Adventure",
    "Nature",
    "Nightlife",
    "History",
    "Luxury",
  ];

  // LOAD FOR EDIT
  useEffect(() => {
    if (!isEdit) return;

    const loadTrip = async () => {
      try {
        const res = await getTripById(id);
        const trip = res.trip;

        setFormData({
          destination: trip.destination || "",
          country: trip.country || "",
          startDate: trip.startDate?.split("T")[0] || "",
          endDate: trip.endDate?.split("T")[0] || "",
          adults: trip.adults || 1,
          children: trip.children || 0,
          budgetType: trip.budgetType || "Medium",
          budgetAmount: trip.budgetAmount || "",
          travelStyle: trip.travelStyle || "Adventure",
          transportMode: trip.transportMode || "Flight",
          accommodationType: trip.accommodationType || "Hotel",
          interests: trip.interests || [],
          specialRequirements: trip.specialRequirements || "",
          status: trip.status || "Planning",
        });
      } catch {
        toast.error("Failed to load trip");
      }
    };

    loadTrip();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleInterest = (item) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const days =
    formData.startDate && formData.endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(formData.endDate) - new Date(formData.startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0;

  const increase = (field) => {
    setFormData((p) => ({ ...p, [field]: p[field] + 1 }));
  };

  const decrease = (field, min = 0) => {
    setFormData((p) => ({
      ...p,
      [field]: Math.max(min, p[field] - 1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        days,
      };

      const res = isEdit
        ? await updateTrip(id, payload)
        : await createTrip(payload);

      toast.success(res.message || "Success");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto p-4 md:p-6 text-slate-900 dark:text-white"
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-black">
          {isEdit ? "Edit Trip" : "Create Trip"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Plan your journey with structured details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* DESTINATION */}
        <Section title="Destination Details">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
            />
            <Input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
        </Section>

        {/* DATES */}
        <Section title="Travel Dates">
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500">Duration</p>
              <p className="font-bold text-lg">{days} Days</p>
            </div>
          </div>
        </Section>

        {/* TRAVELERS */}
        <Section title="Travelers">
          <div className="grid md:grid-cols-2 gap-4">
            <Counter
              title="Adults"
              value={formData.adults}
              onIncrease={() => increase("adults")}
              onDecrease={() => decrease("adults", 1)}
            />
            <Counter
              title="Children"
              value={formData.children}
              onIncrease={() => increase("children")}
              onDecrease={() => decrease("children", 0)}
            />
          </div>
        </Section>

        {/* INTERESTS */}
        <Section title="Interests">
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => toggleInterest(item)}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  formData.interests.includes(item)
                    ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Section>

        {/* SUBMIT */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 font-bold transition-all"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Trip"
            : "Create Trip"}
        </motion.button>
      </form>
    </motion.div>
  );
};

/* ---------------- UI COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <h2 className="text-lg font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all ${className}`}
  />
);

export default TripForm;