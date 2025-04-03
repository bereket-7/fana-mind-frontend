<template>
    <BContainer class="signup-container d-flex align-items-center justify-content-center">
      <BRow class="justify-content-center">
        <BCol md="10" lg="12" xl="16">
          <BCard class="signup-card shadow-md">
            <BCardBody>
              <!-- Header with Logo -->
              <div class="text-center mb-4">
                <h3 class="fw-bold mb-1">Create Your Account</h3>
                <p class="text-muted">Join us today! It only takes a minute</p>
              </div>
  
              <!-- Signup Form -->
                <BForm @submit.prevent="handleSignup">
                <!-- Name Inputs -->
                <div class="row">
                    <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <BInputGroup>
                        <BInputGroupText class="bg-light">
                        <font-awesome-icon :icon="['fas', 'user']" class="text-primary"/>
                        </BInputGroupText>
                        <BFormInput
                        id="firstName"
                        v-model="form.firstName"
                        type="text"
                        placeholder="Enter your first name"
                        required
                        />
                    </BInputGroup>
                    </div>
                    <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <BInputGroup>
                        <BInputGroupText class="bg-light">
                        <font-awesome-icon :icon="['fas', 'user']" class="text-primary"/>
                        </BInputGroupText>
                        <BFormInput
                        id="lastName"
                        v-model="form.lastName"
                        type="text"
                        placeholder="Enter your last name"
                        required
                        />
                    </BInputGroup>
                    </div>
                </div>

                <!-- Email Input -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <BInputGroup>
                    <BInputGroupText class="bg-light">
                        <font-awesome-icon :icon="['fas', 'envelope']" class="text-danger"/>
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

                <!-- Phone Input -->
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <BInputGroup>
                    <BInputGroupText class="bg-light">
                        <font-awesome-icon :icon="['fas', 'phone']" class="text-success"/>
                    </BInputGroupText>
                    <BFormInput
                        id="phone"
                        v-model="form.phone"
                        type="tel"
                        placeholder="Enter your phone number"
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
                        placeholder="Create a password"
                        required
                    />
                    <BInputGroupText 
                        @click="showPassword = !showPassword" 
                        class="cursor-pointer bg-light"
                    >
                        <font-awesome-icon 
                        :icon="['fas', showPassword ? 'eye-slash' : 'eye']" 
                        class="text-muted"
                        />
                    </BInputGroupText>
                    </BInputGroup>
                    <small class="text-muted">At least 8 characters with 1 number</small>
                </div>

                <!-- Confirm Password -->
                <div class="mb-4">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <BInputGroup>
                    <BInputGroupText class="bg-light">
                        <font-awesome-icon :icon="['fas', 'lock']" />
                    </BInputGroupText>
                    <BFormInput
                        id="confirmPassword"
                        v-model="form.confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        required
                    />
                    </BInputGroup>
                </div>

                <!-- Terms Checkbox -->
                <BFormCheckbox
                    id="terms"
                    v-model="form.agreeTerms"
                    name="terms"
                    value="true"
                    unchecked-value="false"
                    class="mb-4 small"
                >
                    I agree to the <BLink href="#" class="text-decoration-none">Terms</BLink> and <BLink href="#" class="text-decoration-none">Privacy Policy</BLink>
                </BFormCheckbox>

                <!-- Submit Button -->
                <div class="d-grid mb-4">
                    <BButton 
                    type="submit" 
                    variant="success" 
                    pill
                    class="py-2 signup-btn fw-bold"
                    :disabled="loading"
                    >
                    <template v-if="!loading">
                        <font-awesome-icon :icon="['fas', 'user-plus']" class="me-2" />
                        Sign Up
                    </template>
                    <template v-else>
                        <BSpinner small type="grow" class="me-2" />
                        Registering...
                    </template>
                    </BButton>
                </div>

                <!-- Divider and Social Login -->
                <div class="d-flex align-items-center mb-4">
                    <div class="divider-line"></div>
                    <div class="px-3 text-dark font-bold">OR</div>
                    <div class="divider-line"></div>
                </div>

                <div class="text-center">
                    <p class="small mb-3 text-muted">Sign up with social account</p>
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

                <!-- Login Link -->
                <div class="text-center mt-4">
                    <p class="small mb-0 text-dark">
                    Already have an account? 
                    <BLink to="/login" class="text-decoration-none fw-bold text-success">Log in</BLink>
                    </p>
                </div>
                </BForm>
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
    BContainer, BRow, BCol, BCard, BCardBody, BLink,
    BForm, BFormInput, BFormCheckbox, BInputGroup,
    BInputGroupText, BButton, BSpinner
  } from 'bootstrap-vue-next'
  
  const router = useRouter();
  const showPassword = ref(false);
  const loading = ref(false);
  
  const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const handleSignup = () => {
    loading.value = true;
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
      loading.value = false;
    }, 1500);
  };
  </script>
  
  <style scoped>
  .signup-container {
    padding: 2rem;
  }
  
  .signup-card {
    border: none;
    border-radius: 1rem;
    background-color: white;
  }
  
  .form-label {
    font-weight: 500;
    color: #393c40;
  }
  
  .signup-btn {
    transition: all 0.3s ease;
    background-color: #099340;
    border: none;
  }
  
  .signup-btn:hover {
    background-color: #3a5dca;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(78, 115, 223, 0.3);
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
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .divider-line {
    flex: 1;
    height: 1px;
    background-color: #e9ecef;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .signup-container {
      padding: 1rem;
    }
    
    .signup-card {
      border-radius: 0.5rem;
    }
  }
  
  /* Input styling to match your login page */
  input {
    display: block !important;
    border: 1px solid #ced4da !important;
    background-color: #fff !important;
  }
  
  .input-group-text {
    border: 1px solid #ced4da !important;
    border-right: none !important;
  }
  
  .form-control:not(:first-child) {
    border-left: none !important;
  }
  </style>