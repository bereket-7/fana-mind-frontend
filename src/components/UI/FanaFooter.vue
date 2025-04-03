<template>
    <BContainer fluid class="footer bg-dark text-white pt-5 pb-4">
      <BRow>
        <!-- Company Info -->
        <BCol md="4" class="mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4" style="color: #20c997;">My Vue App</h5>
          <p>Building modern web applications with Vue 3 and Bootstrap 5.</p>
          <div class="social-icons mt-4">
            <BIcon icon="facebook" class="me-3" font-scale="1.5"></BIcon>
            <BIcon icon="twitter-x" class="me-3" font-scale="1.5"></BIcon> <!-- Changed from twitter -->
            <BIcon icon="instagram" class="me-3" font-scale="1.5"></BIcon>
            <BIcon icon="linkedin" font-scale="1.5"></BIcon>
        </div>
        </BCol>
  
        <!-- Quick Links -->
        <BCol md="2" class="mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Quick Links</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Home</a></li>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">About</a></li>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Services</a></li>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Contact</a></li>
          </ul>
        </BCol>
  
        <!-- Contact Info -->
        <BCol md="3" class="mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Contact Us</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <BIcon icon="geo-alt-fill" class="me-2"></BIcon> 123 Main St, City
            </li>
            <li class="mb-2">
              <BIcon icon="envelope-fill" class="me-2"></BIcon> info@myvueapp.com
            </li>
            <li class="mb-2">
              <BIcon icon="telephone-fill" class="me-2"></BIcon> +1 (555) 123-4567
            </li>
          </ul>
        </BCol>
  
        <!-- Newsletter -->
        <BCol md="3">
          <h5 class="text-uppercase mb-4">Newsletter</h5>
          <p>Subscribe to our newsletter for updates.</p>
          <BForm class="mt-3">
            <BInputGroup>
              <BFormInput placeholder="Your email" class="bg-secondary border-0"></BFormInput>
              <BButton variant="success" class="px-3">
                <BIcon icon="envelope"></BIcon>
              </BButton>
            </BInputGroup>
          </BForm>
        </BCol>
      </BRow>
  
      <!-- Copyright -->
      <BRow class="mt-4 pt-3 border-top border-secondary">
        <BCol class="text-center">
          <p class="mb-0">&copy; {{ new Date().getFullYear() }} My Vue App. All rights reserved.</p>
        </BCol>
      </BRow>
    </BContainer>
  </template>
  
  <script setup>
  import {
    BContainer, BRow, BCol,
    BIcon, BForm, BFormInput,
    BInputGroup, BButton
  } from 'bootstrap-vue-next'
  </script>
  
  <style scoped>
  .footer {
    background-color: #1a1a1a;
  }
  
  .footer a:hover {
    color: #20c997 !important;
    transition: color 0.3s ease;
  }
  
  .social-icons .b-icon:hover {
    color: #20c997 !important;
    transform: translateY(-3px);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  </style>