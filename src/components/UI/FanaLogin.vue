<template>
    <BContainer class="login-container">
      <BRow class="justify-content-center align-items-center">
        <BCol md="8" lg="6" xl="5">
          <BCard no-body class="login-card shadow-lg">
            <BCardBody class="p-5">
              <!-- Header with Logo -->
              <div class="text-center mb-2">
                <font-awesome-icon 
                  :icon="['fas', 'user-lock']" 
                  class="login-icon mb-3"
                />
                <h3 class="fw-bold mb-1">Welcome Back</h3>
                <p class="text-muted">Please enter your credentials</p>
              </div>
  
              <!-- Login Form -->
              <BForm @submit.prevent="handleLogin">
                <!-- Email Input -->
                <div class="mb-2">
                  <label for="email" class="form-label">Email</label>
                  <BInputGroup>
                    <BInputGroupText>
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                    </BInputGroupText>
                    <BFormInput
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </BInputGroup>
                </div>
  
                <!-- Password Input -->
                <div class="mb-4">
                  <label for="password" class="form-label">Password</label>
                  <BInputGroup>
                    <BInputGroupText>
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </BInputGroupText>
                    <BFormInput
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Enter your password"
                      required
                    />
                    <BInputGroupText @click="showPassword = !showPassword" class="cursor-pointer">
                      <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
                    </BInputGroupText>
                  </BInputGroup>
                  <div class="text-end mt-2">
                    <BLink href="#" class="text-decoration-none small">Forgot password?</BLink>
                  </div>
                </div>
  
                <!-- Remember Me & Submit -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <BFormCheckbox
                    id="remember"
                    v-model="form.remember"
                    name="remember"
                    value="true"
                    unchecked-value="false"
                    class="small"
                  >
                    Remember me
                  </BFormCheckbox>
                  <BButton 
                    type="submit" 
                    variant="success" 
                    pill
                    class="px-4 login-btn"
                    :disabled="loading"
                  >
                    <template v-if="!loading">
                      Login
                    </template>
                    <template v-else>
                      <BSpinner small type="grow" />
                      Authenticating...
                    </template>
                  </BButton>
                </div>
  
                <!-- Divider -->
                <div class="divider d-flex align-items-center mb-4">
                  <div class="divider-line"></div>
                  <div class="divider-text px-3 small">OR</div>
                  <div class="divider-line"></div>
                </div>
  
                <!-- Social Login -->
                <div class="text-center">
                  <p class="small mb-3">Continue with social account</p>
                  <div class="d-flex justify-content-center gap-3">
                    <BButton variant="outline-primary" pill class="social-btn">
                      <font-awesome-icon :icon="['fab', 'google']" />
                    </BButton>
                    <BButton variant="outline-primary" pill class="social-btn">
                      <font-awesome-icon :icon="['fab', 'facebook-f']" />
                    </BButton>
                    <BButton variant="outline-primary" pill class="social-btn">
                      <font-awesome-icon :icon="['fab', 'twitter']" />
                    </BButton>
                  </div>
                </div>
              </BForm>
  
              <!-- Sign Up Link -->
              <div class="text-center mt-4">
                <p class="small mb-0">
                  Don't have an account? 
                  <BLink to="/register" class="text-decoration-none fw-bold">Sign up</BLink>
                </p>
              </div>
            </BCardBody>
          </BCard>
        </BCol>
      </BRow>
    </BContainer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const showPassword = ref(false);
  const loading = ref(false);
  
  const form = ref({
    email: '',
    password: '',
    remember: false
  });
  
  const handleLogin = () => {
    loading.value = true;
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
      loading.value = false;
    }, 1500);
  };
  </script>
  
  <style scoped>
  .login-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  
  .login-card {
    border: none;
    border-radius: 1rem;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
  
  .login-icon {
    color: #098c2e;
    font-size: 2.5rem;
  }
  
  .form-label {
    font-weight: 500;
    color: #5a5c69;
  }
  
  .input-group-text {
    background-color: #f8f9fc;
    border-right: none;
  }
  
  .form-control {
    border-left: none;
    background-color: #f8f9fc;
  }
  
  .form-control:focus {
    box-shadow: none;
    border-color: #d1d3e2;
  }
  
  .login-btn {
    transition: all 0.3s ease;
    background-color: #0ba42c;
    border: none;
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(78, 115, 223, 0.3);
  }
  
  .social-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .divider-line {
    flex: 1;
    height: 1px;
    background-color: #e3e6f0;
  }
  
  .divider-text {
    color: #b7b9cc;
  }
  
  .cursor-pointer {
    cursor: pointer;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .login-card {
      border-radius: 0;
    }
  }
  </style>