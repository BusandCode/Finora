// Mock Authentication Service using localStorage

const USERS_KEY = "mock_db_users";

// Helper to get users from localStorage
const getUsers = (): any[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  /**
   * Get all registered users (for admin UI)
   */
  getAllUsers: (): any[] => {
    return getUsers();
  },

  /**
   * Register a new user
   */
  register: async (userData: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const existingUser = users.find((u) => u.email === userData.email);

        if (existingUser) {
          reject(new Error("User with this email already exists"));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          password: userData.password, // In a real app, never store plain text passwords!
          role: userData.email.toLowerCase().startsWith("admin") ? "admin" : "user",
        };

        users.push(newUser);
        saveUsers(users);

        // Don't leak the password in the response user object
        const { password, ...userWithoutPassword } = newUser;
        
        resolve({
          user: userWithoutPassword,
          token: `mock-jwt-token-${newUser.id}`,
        });
      }, 500); // Simulate network latency
    });
  },

  /**
   * Log in an existing user
   */
  login: async (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
          reject(new Error("Invalid email or password"));
          return;
        }

        const { password: _, ...userWithoutPassword } = user;

        resolve({
          user: userWithoutPassword,
          token: `mock-jwt-token-${user.id}`,
        });
      }, 500); // Simulate network latency
    });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
          reject(new Error("No account found with this email address. Please check and try again."));
          return;
        }

        // In a real app, this would send an email. For now, just succeed.
        resolve();
      }, 1000); // Simulate network latency
    });
  },
};
