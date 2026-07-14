// utils/authService.js

const isBrowser = typeof window !== 'undefined';

const initializeDefaultUsers = () => {
  if (!isBrowser) return;
  
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  let isModified = false;

  if (!existingUsers.some(u => u.id === 'admin-001')) {
    existingUsers.push({
      id: 'admin-001',
      name: 'Super Admin',
      email: 'admin@chapter.co',
      password: btoa('admin1234'),
      role: 'ADMIN',
      status: 'Active',
      phone: '099-999-9999',
      address: 'สำนักงานใหญ่ Chapter.Co',
      createdAt: new Date().toISOString()
    });
    isModified = true;
  }

  if (!existingUsers.some(u => u.id === 'staff-001')) {
    existingUsers.push({
      id: 'staff-001',
      name: 'Staff Member',
      email: 'staff@chapter.co',
      password: btoa('staff1234'),
      role: 'STAFF',
      status: 'Active',
      phone: '088-888-8888',
      address: 'สาขาหลัก Chapter.Co',
      createdAt: new Date().toISOString()
    });
    isModified = true;
  }

  if (isModified) {
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }
};

if (isBrowser) {
  initializeDefaultUsers();
}

export const authService = {
  register: (name, email, password) => {
    if (!isBrowser) return { success: false, message: 'Server error' };
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some(user => user.email === email)) {
        return { success: false, message: 'อีเมลนี้ถูกใช้งานแล้ว' };
      }
      
      const mockHashedPassword = btoa(password); 
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: mockHashedPassword, 
        role: 'CUSTOMER',
        status: 'Active',
        createdAt: new Date().toISOString(),
        phone: '',
        birthdate: '',
        address: ''
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      return { success: true, message: 'ลงทะเบียนสำเร็จ' };
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' };
    }
  },

  login: (email, password) => {
    if (!isBrowser) return { success: false, message: 'Server error' };
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const mockHashedPassword = btoa(password);
      const user = users.find(u => u.email === email && u.password === mockHashedPassword);
      
      if (user) {
        // --- ระบบเช็คการแบน (Banned) ทำงานตรงนี้ ---
        if (user.status === 'Banned') {
          return { success: false, message: 'บัญชีของคุณถูกระงับการใช้งานชั่วคราว กรุณาติดต่อผู้ดูแลระบบ' };
        }
        // ----------------------------------------

        const sessionData = {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'CUSTOMER',
          phone: user.phone || '',
          birthdate: user.birthdate || '',
          address: user.address || '',
          profileImage: user.profileImage || null,
          token: `mock-token-${Date.now()}`
        };
        localStorage.setItem('session', JSON.stringify(sessionData));
        localStorage.setItem('isLoggedIn', 'true'); 
        return { success: true, user: sessionData };
      }
      return { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาด' };
    }
  },

  logout: () => {
    if (isBrowser) {
      localStorage.removeItem('session');
      localStorage.removeItem('isLoggedIn');
    }
  },

  getCurrentUser: () => {
    if (!isBrowser) return null;
    try {
      return JSON.parse(localStorage.getItem('session'));
    } catch {
      return null;
    }
  },

  updateUserProfile: (userId, updatedData) => {
    if (!isBrowser) return { success: false };
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem('users', JSON.stringify(users));

        const currentSession = JSON.parse(localStorage.getItem('session'));
        if (currentSession && currentSession.userId === userId) {
          const newSession = { ...currentSession, ...updatedData };
          localStorage.setItem('session', JSON.stringify(newSession));
          return { success: true, user: newSession };
        }
      }
      return { success: false, message: 'ไม่พบผู้ใช้งาน' };
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' };
    }
  },

  sendResetLink: (email) => {
    if (!isBrowser) return { success: false, message: 'Server error' };
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(u => u.email === email);
      if (userExists) return { success: true, message: 'ส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว' };
      return { success: false, message: 'ไม่พบอีเมลนี้ในระบบ' };
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาด' };
    }
  },

  resetPassword: (email, newPassword) => {
    if (!isBrowser) return { success: false, message: 'Server error' };
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].password = btoa(newPassword);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว' };
      }
      return { success: false, message: 'ไม่พบอีเมลนี้ในระบบ' };
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน' };
    }
  }
};