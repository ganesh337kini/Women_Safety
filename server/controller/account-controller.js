
import User from '../schema/user-schema.js';

// Create account
export const createAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone, relatives = [], location } = req.body;


    if (!Array.isArray(relatives) || relatives.length < 1 || relatives.length > 5) {
      return res.status(400).json({ message: 'Provide 1 to 5 relatives' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.account = { phone, relatives, location };  
    await user.save();

    res.status(201).json({ message: 'Account created', account: user.account });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Create account failed' });
  }
};



// Get account
export const getAccount = async (req, res) => {
  try {
   const userId = req.user.id;
    const user = await User.findById(userId).select('account');
    if (!user || !user.account) return res.status(404).json({ message: 'Account not found' });

    res.json({ account: user.account });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fetch failed' });
  }
};


// Update account
export const updateAccount = async (req, res) => {
  try {
   const userId = req.user.id;
    const { phone, relatives, location } = req.body;


    const user = await User.findById(userId);
    if (!user || !user.account) return res.status(404).json({ message: 'Account not found' });

    if (phone) user.account.phone = phone;
    if (location) user.account.location = location;
    if (relatives) {
      if (!Array.isArray(relatives) || relatives.length < 1 || relatives.length > 5) {
        return res.status(400).json({ message: 'Provide 1 to 5 relatives' });
      }
      user.account.relatives = relatives;
    }

    await user.save();
    res.json({ message: 'Account updated', account: user.account });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};


// Delete account
export const deleteAccount = async (req, res) => {
  try {
   const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.account) return res.status(404).json({ message: 'Account not found' });

    user.account = undefined;   // ✅ embedded schema ko null/undefined karna hoga
    await user.save();
    res.json({ message: 'Account deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
};
