export const en = {
  global: {
    errors: {
      required: 'Please fill in all fields',
      invalidCredentials: 'Email or password is incorrect',
      userExists: 'User already exists',
      passwordMismatch: "Passwords don't match",
      loginFailed: 'Unable to login. Please try again',
      registrationFailed: 'Registration failed',
    },
    buttons: {
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      back: 'Back',
    },
  },
  auth: {
    login: {
      title: 'Welcome Back',
      noAccount: "Don't have an account? Register",
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      backToStart: 'Back to start',
    },
    register: {
      title: 'Create Account',
      hasAccount: 'Already have an account? Login',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      confirmPasswordPlaceholder: 'Confirm Password',
    },
  },
  pages: {
    profile: {
      title: 'Profile',
    },
    home: {
      title: 'Home',
      nextPayment: 'Next payment',
      amount: 'Amount',
      status: {
        active: 'Active',
        pending: 'Pending',
        expired: 'Expired',
      },
      swiper: {
        noSubscriptions: 'No active subscriptions',
        paymentDue: 'Payment due',
        monthly: '/month',
        yearly: '/year',
        quarterly: '/quarter',
      }
    },
    subscriptions: {
      title: 'My Subscriptions',
    },
  },
  onboarding: {
    title: 'Welcome to MySubs',
    subtitle: 'How would you like to proceed?',
    subscribeButton: 'Quick Join Organization',
    loginButton: 'Login with MySubs Account',
  },
  join: {
    title: 'Join Organization',
    subtitle: 'Scan a QR code or enter the organization code to join',
    qrButton: 'Scan QR Code',
    qrDescription: 'Use your camera to scan the QR code',
    slugTitle: 'Or enter organization code',
    slugPlaceholder: 'e.g., skatepark-de-fabriek',
    slugDescription: 'Enter the unique code of the organization',
    joinButton: 'Join Organization',
  },
  scan: {
    noAccess: 'Camera Access Required',
    enableCamera: 'Please enable camera access in your phone settings to scan QR codes',
    goBack: 'Go Back',
  },
  components: {
    subscriptionSwiper: {
      nextPayment: 'Next payment',
      amount: 'Amount',
      paymentDue: 'Payment due',
      noSubscriptions: 'No active subscriptions',
      monthly: '/month',
      yearly: '/year',
      quarterly: '/quarter',
      status: {
        active: 'Active',
        pending: 'Pending',
        expired: 'Expired',
      },
    },
  },
}; 