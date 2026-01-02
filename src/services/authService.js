import {authBaseURl} from "./mainBaseURLs"
const API_BASE_URL = authBaseURl


export const authService = {
  
  async sendOtp(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/get-OTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      return {
        success: true,
        message: data.message,
        hashOTP: data.hashOTP,
        otp: data.otp // This might be included in development only
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  },

  async verifyOtp(email, userOtp, hashOTP) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-OTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          otp: userOtp,
          hashOTP: hashOTP
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      return {
        success: true,
        message: data.message,
        token: data.token,
        user: data.user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  },

  async login(email, password) {
    console.log("login called",email ,password)
    try {
      const response = await fetch(`${API_BASE_URL}/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  },

  async register(userData) {
    console.log(userData)
    try {
      const response = await fetch(`${API_BASE_URL}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          
      username: userData.username,
      fullname: userData.name,
      email:userData.email,
     password: userData.password,
     isVerify:true

        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  },

  async logout(token) {
    try {
      await fetch(`${API_BASE_URL}/logoutUser`, {
        method: 'POST',
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async verifyToken(token) {
  console.log('Verifying token:', token);
  try {
    const response = await fetch(`${API_BASE_URL}/authozied_user`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',  
        authorization: `${token}` ,
      },
    });
    
    const data = await response.json();
    console.log("Auth verification response:", data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Token verification failed');
    }

    
    return {
      success: true,
      user: data.data || data.decoded || data.user 
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

}