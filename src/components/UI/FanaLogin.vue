<template>
    <BContainer class="login-container d-flex align-items-center justify-content-center">
      <BRow class="justify-content-center">
        <BCol md="10" lg="12" xl="16">
          <BCard class="login-card shadow-md">
            <BCardBody>
              <!-- Header with Logo -->
              <div class="text-center mb-4">
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
                <label for="email" class="form-label">Email Address</label>
                 <BInputGroup>
                    <BInputGroupText class="bg-light">
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
                <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <BInputGroup>
                    <BInputGroupText class="bg-light">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                    </BInputGroupText>
                    <BFormInput
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter your password"
                    required
                    class="border-start-0 py-2"
                    />
                    <BInputGroupText 
                    @click="showPassword = !showPassword" 
                    class="cursor-pointer bg-light border-start-0"
                    >
                    <font-awesome-icon 
                        :icon="['fas', showPassword ? 'eye-slash' : 'eye']" 
                        class="text-muted"
                    />
                    </BInputGroupText>
                </BInputGroup>
                </div>
  
                <!-- Remember Me & Forgot Password -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <BFormCheckbox
                    id="remember"
                    v-model="form.remember"
                    name="remember"
                    value="true"
                    unchecked-value="false"
                    class="small text-muted"
                  >
                    Remember me
                  </BFormCheckbox>
                  <BLink 
                    href="#" 
                    class="text-decoration-none small text-primary"
                  >
                    Forgot password ?
                  </BLink>
                </div>
  
                <!-- Submit Button -->
                <div class="text-center mb-4">
                <BButton 
                    type="submit" 
                    variant="success" 
                    pill
                    class="px-5 login-btn fw-bold"
                    :disabled="loading"
                >
                    <template v-if="!loading">
                    <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="me-2" />
                    Login
                    </template>
                    <template v-else>
                    <BSpinner small type="grow" class="me-2" />
                    Authenticating...
                    </template>
                </BButton>
                </div>

              </BForm>

                <!-- Divider -->
                <div class="d-flex align-items-center mb-4">
                  <div class="divider-line"></div>
                  <div class="px-3 text-dark font-bold">OR</div>
                  <div class="divider-line"></div>
                </div>
  
                <!-- Social Login -->
                <div class="text-center">
                  <p class="small mb-3 text-muted">Continue with social account</p>
                  <div class="d-flex justify-content-center gap-3">
                    <BButton variant="outline-light" pill class="social-btn">
                      <font-awesome-icon :icon="['fab', 'google']" class="text-danger" />
                    </BButton>
                    <BButton variant="outline-light" pill class="social-btn">
                      <font-awesome-icon :icon="['fab', 'facebook-f']" class="text-primary" />
                    </BButton>
                    <BButton variant="outline-light" pill class="social-btn">
                      <font-awesome-icon :icon="['fab', 'twitter']" class="text-dark" />
                    </BButton>
                  </div>
                </div>
  
              <!-- Sign Up Link -->
              <div class="text-center mt-4">
                <p class="small mb-0 text-dark">
                  Don't have an account? 
                  <BLink to="/register" class="text-decoration-none fw-bold text-success">Sign up</BLink>
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
  import {
  BContainer, BRow, BCol, BCard,BCardBody,BLink,BForm, BFormInput,BFormCheckbox,
  BInputGroup,BInputGroupText, BButton
} from 'bootstrap-vue-next'
  
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
      router.push('/dashboard'); // redirect to dashboard after login
      loading.value = false;
    }, 1500);
  };
  </script>
  
  <style scoped>
  .login-container {
    /* background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
    padding: 1rem;
  }
  
  .login-card {
    border: none;
    border-radius: 1rem;
    background-color: white;
  }
  
  .login-icon {
    color: #099128;
    font-size: 2.5rem;
  }
  
  .form-label {
    font-weight: 500;
    color: #393c40;
  }

  /* .login-btn styling  */
  
  .login-btn {
    transition: all 0.3s ease;
    background-color: #099128;
    border: none;
  }
  
  .login-btn:hover {
    background-color: #f5fcf6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    border:#111111;
    border-radius: 2px;
    color: #038f24;
    outline-color: #111111;
  }

   /* social-btn styling  */
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
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  }
  
  /* divider-line style */
  .divider-line {
    flex: 1;
    height: 1px;
    background-color: #858484;
  }

  input {
    display: block !important;
}

  
  .cursor-pointer {
    cursor: pointer;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .login-container {
      padding: 1rem;
    }
    
    .login-card {
      border-radius: 0.5rem;
    }
  }
  </style>