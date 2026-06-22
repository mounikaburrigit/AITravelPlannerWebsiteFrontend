import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { getProfile, updateProfile } from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { loadUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    city: "",
    country: "",
    travelType: "",
    budget: "",
    interests: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();

        if (!res.success) throw new Error(res.message);

        setFormData({
          name: res.user?.name || "",
          email: res.user?.email || "",
          phone: res.user?.phone || "",
          age: res.user?.age || "",
          gender: res.user?.gender || "",
          city: res.user?.city || "",
          country: res.user?.country || "",
          travelType: res.user?.travelType || "",
          budget: res.user?.budget || "",
          interests: res.user?.interests || "",
          bio: res.user?.bio || "",
        });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load profile"
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await updateProfile(formData);

      await loadUser();

      toast.success(res.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Loading Profile...
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto p-4 md:p-6 text-slate-900 dark:text-white"
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black">Travel Profile</h1>
        <p className="text-slate-500 mt-1">
          Manage your personal and travel preferences
        </p>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8"
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              value={formData.email}
              disabled
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* AGE */}
          <div>
            <label className="text-sm font-semibold">Age</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* CITY */}
          <div>
            <label className="text-sm font-semibold">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="text-sm font-semibold">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* TRAVEL TYPE */}
          <div>
            <label className="text-sm font-semibold">Travel Type</label>
            <select
              name="travelType"
              value={formData.travelType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              <option>Solo</option>
              <option>Couple</option>
              <option>Family</option>
              <option>Friends</option>
            </select>
          </div>

          {/* BUDGET */}
          <div>
            <label className="text-sm font-semibold">Budget Range</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* INTERESTS */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">
              Interests (comma separated)
            </label>
            <input
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Beach, Adventure, Food, Culture"
              className={inputClass}
            />
          </div>

          {/* BIO */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 font-bold"
            >
              {loading ? "Updating..." : "Save Travel Profile"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Profile;