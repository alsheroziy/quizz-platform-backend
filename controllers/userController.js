import User from '../models/user.js';

// Foydalanuvchi profilini yangilash
export const updateUserProfile = async (req, res) => {
    const { bio, telegram, github } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { bio, telegram, github },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        res.status(200).json({ message: "Profil yangilandi", user });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};

// Foydalanuvchi profilini o'chirish
export const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        res.status(200).json({ message: "Profil muvaffaqiyatli o'chirildi" });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};
